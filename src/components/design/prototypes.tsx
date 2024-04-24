import { keyframes, styled } from "solid-styled-components"
import { theme } from "../../theme"
import { Masonry } from "../grids/masonry"
import { For, Show, createEffect, createSignal } from "solid-js"
import type { Image } from "../../dataTypes"
import type { PrototypeData } from "../../data/prototypes"
import { ImageSlider, createSliderState } from "../imageSlider"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// console.log({ randomRotations })

const MasonryImage = styled("div")`
  /* overflow: hidden; */
  img {
    width: 100%;
    height: auto;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    border-radius: calc(${theme.border.radius} * 2);
    animation: ${fadeIn} 1s ease-in;
    animation-fill-mode: both;
  }

  h1 {
    font-size: ${theme.font.size.xl};
    font-weight: 500;
    margin: 0;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`

export interface PrototypeImage extends Image {
  data: PrototypeData
}

interface PrototypesProps {
  images: PrototypeImage[]
}

const MasonryWrapper = styled("div")`
  padding: 1rem;
  margin: 1rem;
  position: relative;
  z-index: 0;

  overflow: hidden;
  border-radius: calc(${theme.border.radius} * 4);
  border: var(--border);
`

// This contains the data about the columns filled and at what heights
// example
// const layoutData: LayoutData = [
//   [100, 200, 300], // Column 1, heights of items
//   [150, 250, 350]  // Column 2, heights of items
//   // ...
// ]
// type LayoutData = number[][]

type Lines = {
  vertical: number[],
  horizontal: { x1: number, y: number }[]
  linewidth: number
}

const calculateLines = (layoutData: number[][], wrapperElement: HTMLElement | null): Lines | null => {
  // We want to calculate the vertical lines  and the horizontal lines to draw.
  //
  // For vertical we want to calculate the x position of the lines
  // For horizontal we want to calculate the x start and end and y position of the lines
  if (!wrapperElement) return null
  if (layoutData.length === 0) return null
  const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const gap = 2 * remValue;
  const computedStyle = getComputedStyle(wrapperElement)
  const padLeft = parseFloat(computedStyle.paddingLeft)
  const padTop = parseFloat(computedStyle.paddingTop)
  const width = (wrapperElement.offsetWidth - padLeft * 2)
  const colWidth = (width - gap * (layoutData.length - 1)) / layoutData.length

  console.log({ padLeft, padTop, width, layoutData, colWidth, gap })
  // Here as it is equal division, we don't care about gap
  const vertical = layoutData.map((_column, i) => {
    if (i === 0) return padLeft + colWidth + gap / 2
    return padLeft + ((i + 1) * colWidth) + (gap * (i + 0.5))
  })

  // We need to add gap/half to the height after 0, for the rest we add gap, and last we add gap/2
  // We do the half so that the line is in the middle of the two items

  const horizontal = layoutData.reduce(
    (acc, column, coli) => {
      // We already add the first height as gap/2, for next, calculate height + gap
      const heights = column.reduce((a, height, i) => {
        const h = height
        const hor = {
          x1: padLeft + (coli * colWidth) + (gap * (coli - 0.5)),
          y: padTop + a.totalHeight + h + gap * (i + 0.5)
        }
        a.heights.push(hor);
        a.totalHeight += h
        return a
      }, { heights: [] as { x1: number, y: number }[], totalHeight: 0 })
      return [...acc, ...heights.heights]
    }, [] as { x1: number, y: number }[]
  )


  return { vertical, horizontal, linewidth: colWidth + gap }
}


const VLine = styled("div")`
  position: absolute;
  left: var(--line-left);
  top: 0;
  width: 1px;
  border-left: var(--border);
  height: 200vh;
  z-index: 0;
`

const HLine = styled("div")`
  position: absolute;
  left: 0;
  height: 1px;
  border-top: var(--border);
  z-index: 0;
  top: var(--line-top);
  left: var(--line-left);
  width: var(--line-width);
`
const Lines = (props: { lines: Lines }) => {
  return (
    <>
      <For each={props.lines.vertical}>
        {((line) => (
          <VLine style={`--line-left: ${line}px;`}></VLine>
        ))}
      </For>
      <For each={props.lines.horizontal}>
        {((line) => (
          <HLine style={`
              --line-top: ${line.y}px;
              --line-left: ${line.x1}px;
              --line-width: ${props.lines.linewidth}px;
            `}></HLine>
        ))}
      </For>
    </>
  )
}


export const Prototypes = (props: PrototypesProps) => {
  const [layoutData, setLayoutData] = createSignal<number[][]>([])
  let wrapperElement: HTMLDivElement;

  const [lines, setLines] = createSignal<Lines>({
    vertical: [],
    horizontal: [],
    linewidth: 0
  })

  // (() => {
  //   if (!wrapperElement) return null
  //   const lines = calculateLines(layoutData(), wrapperElement)
  //   // console.log('lines', lines)
  //   return lines
  // })

  createEffect(() => {
    if (!wrapperElement) return
    const linesNew = calculateLines(layoutData(), wrapperElement);
    if (linesNew !== null) setLines(linesNew)
  })

  const sliderState = createSliderState(0, props.images.length)

  return (
    <div>
      <MasonryWrapper ref={wrapperElement!}
        style={{
          '--border': theme.card.border,
        }}
      >
        <div style="z-index: 2; position: relative;">
          <Masonry
            minColumns={1}
            maxColumns={4}
            colWidth={300}
            gap={2}
            // imageDimensions={props.images.map((item) => [item.image.attributes.width, item.image.attributes.height])}
            updateLayoutData={setLayoutData}
          >
            <MasonryImage>
              <h1>Prototypes</h1>
              <p>A few prototypes I made, for a bunch of random projects.</p>
              <p>This also includes other design related assets.</p>
            </MasonryImage>
            <For each={props.images}>
              {(item, i) => (
                <MasonryImage
                  onClick={() => {
                    sliderState.setCurrent(i());
                    sliderState.toggle();
                  }}
                >
                  <img src={item.image.src}
                    {...item.image.attributes}
                    alt="placeholder" loading="lazy" />
                </MasonryImage>
              )}
            </For>
          </Masonry>
        </div>
        <Show when={lines() !== null}>
          <Lines lines={lines()!} />
        </Show>
      </MasonryWrapper>
      <ImageSlider
        images={props.images}
        sliderState={sliderState}
      // Alt={() => <p>Prototype</p>}
      />
    </div>
  )
}
