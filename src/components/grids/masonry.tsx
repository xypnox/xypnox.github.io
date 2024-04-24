import { children, type ParentProps, createEffect, on, createRenderEffect, type Signal } from "solid-js";
import { css, styled } from "solid-styled-components";
import { makeResizeObserver } from "@solid-primitives/resize-observer";
import { themeState } from "../themeManager/themeState";

type ImageDimensions = [number, number][]

/** Columns vary based on the width of the container, 
 * It will try to choose number of columns such that the column width is close to the ideal column width.
 * */

interface MasonryConfig {
  /** Maximum number of columns */
  maxColumns: number
  /** Minimum number of columns */
  minColumns: number
  /** ideal column width, it can be increased if the container is too wide */
  colWidth: number

  /** If image dimensions are not provided,
   * children are layout one by one to find correct height */
  imageDimensions?: ImageDimensions

  gap?: number

  /**
  * Repaints that depend on changes in the children, theme, and resize are handled automatically.
  * Increment/Change repaint to > 0 to trigger a repaint for other scenarios: Images have loaded */
  repaint?: Signal<number>

  updateLayoutData?: (layout: LayoutData) => void
}


interface MasonryProps extends ParentProps, MasonryConfig { }

const Wrapper = styled("div")`
  position: relative;
`

type Dimension = {
  conHeight: number
  conWidth: number
  childrenHeights: number[] | null
}

// This contains the data about the columns filled and at what heights
// example
// const layoutData: LayoutData = [
//   [100, 200, 300], // Column 1, heights of items
//   [150, 250, 350]  // Column 2, heights of items
//   // ...
// ]
type LayoutData = number[][]

const getDimensions = (el: HTMLElement, imageDimensions?: ImageDimensions): Dimension => {
  if (!el) return { conHeight: 0, conWidth: 0, childrenHeights: null }
  // Get dimensions of viewport and container
  const containerWidth = el.offsetWidth
  const containerHeight = el.offsetHeight

  // Each child is image
  const normalizedWidth = containerWidth
  const childrenHeights = imageDimensions ? Array.from(el.children).map((child: any, i: number) => {
    // Normalize the height of the child to the width of the container
    if (imageDimensions[i]) {
      const [w, h] = imageDimensions[i]
      return h * (normalizedWidth / w)
    } else return 0
  }) : null;

  return { conHeight: containerHeight, conWidth: containerWidth, childrenHeights }
}

const calculateColumnWidth = (dimensions: Dimension, config: MasonryConfig, gap: number) => {
  const { conWidth: containerWidth } = dimensions
  const { maxColumns, minColumns, colWidth } = config
  const idealColumns = Math.floor(containerWidth / colWidth)
  const columns = Math.min(maxColumns, Math.max(minColumns, idealColumns))
  const calGap = gap ?? 0
  const width = (containerWidth - calGap * (columns - 1)) / columns
  // console.log({ containerWidth, idealColumns, columns, width })
  return [width, columns]
}

const masonryItemClass = css`
  position: absolute;
`

const getItemStyle = (p: {
  left: number
  top: number
  columnWidth: number
  childHeight: number | null
}) => `
  transform: translate(${p.left}px, ${p.top}px);
  width: ${p.columnWidth}px;
  ${p.childHeight ? "height: " + p.childHeight + "px;" : ''}
`

export const Masonry = (props: MasonryProps) => {

  // console.log('Rendering: Masonry', { props })
  let wrapper: HTMLDivElement | null = null;

  const c = children(() => {
    const r = props.children
    return r
  });

  const applyLayout = () => {
    // console.log('Applying layout')
    if (!wrapper) return;
    const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gap = (props.gap ?? 0) * remValue;
    const list = c.toArray();
    const dimensions = getDimensions(wrapper!, props.imageDimensions);
    const [columnWidth, columnNum] = calculateColumnWidth(dimensions, props, gap);

    let layoutData;

    if (props.updateLayoutData) {
      layoutData = Array.from({ length: columnNum }, () => [] as number[]);
    }

    // console.log({ gap, remValue })

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

        const left = insertColumnIndex * columnWidth + (insertColumnIndex > 0 ? (gap ?? 0) * (insertColumnIndex) : 0);
        const top = insertColumn[0] + (insertColumn[1] > 0 ? (gap ?? 0) * (insertColumn[1]) : 0);

        const childDimensions = dimensions.childrenHeights ? dimensions.childrenHeights[i] : null;
        const childHeight = childDimensions ? childDimensions * columnWidth / dimensions.conWidth : null;

        // console.log({ i, childHeight, insertColumnIndex, insertColumn, columns, left, top })

        // Width will be calculated based on the number of columns
        cE.setAttribute?.("style",
          // Transform performs better than top and left
          getItemStyle({ left, top, columnWidth, childHeight })
        );

        // Update the height of the column
        if (childHeight) {
          columns[insertColumnIndex] = [insertColumn[0] + childHeight, insertColumn[1] + 1];
          if (props.updateLayoutData) {
            if (layoutData) layoutData[insertColumnIndex].push(childHeight ?? cE.offsetHeight);
          }
        } else {
          const childHeightEl = cE.offsetHeight;
          // console.log({ childHeightEl })
          columns[insertColumnIndex] = [insertColumn[0] + childHeightEl, insertColumn[1] + 1];
          if (props.updateLayoutData) {
            if (layoutData) layoutData[insertColumnIndex].push(childHeightEl);
          }
        }
      }
    }

    const maxHeight = Math.max(...columns.map((c) => c[0])) + (gap ?? 0) * (Math.max(...columns.map((c) => c[1] - 1)));
    wrapper!.style.height = `${maxHeight}px`;

    if (props.updateLayoutData) {
      props.updateLayoutData(layoutData!);
    }
  }


  function handleObserverCallback(entries: ResizeObserverEntry[]) {
    for (let entry of entries) {
      if (entry.target === document.body) {
        applyLayout();
      }
    }
  }
  const { observe } = makeResizeObserver(handleObserverCallback, { box: "content-box" });


  /** Observe the body for changes */
  createEffect(() => {
    if (document) observe(document.body);
  })

  /** Repaint when children change */
  createEffect(on(c, () => {
    applyLayout();
  }));

  /** Repaint when theme changes */
  createEffect(on(themeState.theme, () => {
    // console.log('Theme changed, Inside Masonry, Repainting...');
    applyLayout();
  }))

  createEffect(() => {
    if (props.repaint) {
      // We have to repaint when the repaint signal changes to true
      if (props.repaint[0]()) {
        // console.log('Repainting... in Masonry')
        applyLayout();
      }
    }
  })

  return (
    <Wrapper ref={wrapper!}>
      {c()}
    </Wrapper>
  )
}
