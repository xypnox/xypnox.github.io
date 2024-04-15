import { children, type ParentProps, createEffect } from "solid-js";
import { css, styled } from "solid-styled-components";
import { makeResizeObserver } from "@solid-primitives/resize-observer";

type ImageDimensions = [number, number][]

interface MasonryConfig {
  maxColumns: number
  minColumns: number
  // ideal column width, it can be increased if the container is too wide
  colWidth: number
  imageDimensions?: ImageDimensions
  gap?: number
}

interface MasonryProps extends ParentProps, MasonryConfig { }

const Wrapper = styled("div")`
  position: relative;
`

type Dimension = {
  conHeight: number
  conWidth: number
  childrenHeights: number[]
}

const getDimensions = (el: HTMLElement, imageDimensions?: ImageDimensions): Dimension => {
  if (!el) return { conHeight: 0, conWidth: 0, childrenHeights: [] }
  // Get dimensions of viewport and container
  const containerWidth = el.offsetWidth
  const containerHeight = el.offsetHeight

  // Each child is image
  const normalizedWidth = containerWidth
  const childrenHeights = Array.from(el.children).map((child: any, i: number) => {
    // Normalize the height of the child to the width of the container
    if (imageDimensions && imageDimensions[i]) {
      const [w, h] = imageDimensions[i]
      return h * (normalizedWidth / w)
    }
    return child.offsetHeight * (normalizedWidth / child.offsetWidth)

  });

  return { conHeight: containerHeight, conWidth: containerWidth, childrenHeights }
}

const calculateColumnWidth = (dimensions: Dimension, config: MasonryConfig) => {
  const { conWidth: containerWidth } = dimensions
  const { maxColumns, minColumns, colWidth, gap } = config
  const idealColumns = Math.floor(containerWidth / colWidth)
  const columns = Math.min(maxColumns, Math.max(minColumns, idealColumns))
  const calGap = gap ?? 0
  const width = (containerWidth - calGap * (columns - 1)) / columns
  return width
}

const masonryItemClass = css`
  position: absolute;
`

export const Masonry = (props: MasonryProps) => {

  // console.log('Rendering: Masonry', { props })
  let wrapper: HTMLDivElement | null = null;

  const c = children(() => {
    const r = props.children
    return r
  });

  const colWidth = (dimensions: Dimension) => {
    if (!wrapper) return 0;
    return calculateColumnWidth(dimensions, props)
  }

  const applyLayout = () => {
    const list = c.toArray();
    const dimensions = getDimensions(wrapper!, props.imageDimensions);
    const columnWidth = colWidth(dimensions);
    const columnNum = Math.floor(wrapper!.offsetWidth / columnWidth);

    // To track the height and number of items of the columns filled
    const columns = Array.from({ length: columnNum }, () => [0, 0]); // [height, numItems]

    for (let [i, child] of list.entries()) {
      if (typeof child === "object") {
        const cE = child as HTMLElement;
        if (!cE) return;
        // Add clas of masonry item
        cE.classList.add(masonryItemClass);

        // Get the column to be inserted in, which has the smallest height
        const minColHeight = Math.min(...columns.map((c) => c[0]));
        const insertColumnIndex = columns.findIndex((c) => c[0] === minColHeight);
        const insertColumn = columns[insertColumnIndex];

        const left = insertColumnIndex * columnWidth + (insertColumnIndex > 0 ? (props.gap ?? 0) * (insertColumnIndex) : 0);
        const top = insertColumn[0] + (insertColumn[1] > 0 ? (props.gap ?? 0) * (insertColumn[1]) : 0);

        const childDimensions = dimensions.childrenHeights[i];
        const childHeight = childDimensions * columnWidth / dimensions.conWidth;

        // Width will be calculated based on the number of columns
        cE.setAttribute?.("style",
          // Transform performs better than top and left
          `transform: translate(${left}px, ${top}px);   width: ${columnWidth}px;  height: ${childHeight}px;`
        );

        // Update the height of the column
        columns[insertColumnIndex] = [insertColumn[0] + childHeight, insertColumn[1] + 1];
      }
    }

    const maxHeight = Math.max(...columns.map((c) => c[0])) + (props.gap ?? 0) * (Math.max(...columns.map((c) => c[1] - 1)));
    wrapper!.style.height = `${maxHeight}px`;
  }


  function handleObserverCallback(entries: ResizeObserverEntry[]) {
    for (let entry of entries) {
      if (entry.target === document.body) {
        applyLayout();
      }
    }
  }
  const { observe } = makeResizeObserver(handleObserverCallback, { box: "content-box" });

  createEffect(() => {
    if (document) observe(document.body);
  })

  return (
    <Wrapper ref={wrapper!}>
      {c()}
    </Wrapper>
  )
}
