import { For, createSignal } from "solid-js"
import { RangeInput } from "../elements/range"
import { styled } from "solid-styled-components"
import { Masonry } from "../grids/masonry"
import { MasonrySample } from "./rawData"
import { ImageSlider, createSliderState } from "../imageSlider"
import { theme } from "../../theme"

const Row = styled("div")`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`

const Col = styled("div")`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`

const MasonryImage = styled("div")`
  /* overflow: hidden; */
  img {
    width: 100%;
    height: auto;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    border-radius: calc(${theme.border.radius} * 4);
  }

  .caption {
    padding: 1rem;
    position: absolute;
    bottom: 0;
    opacity: 0;
    width: 100%;
    z-index: 20;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%);
    color: white;
    transition: all 0.3s ease-in-out;
    transform: translateY(30%);
    border-radius: calc(${theme.border.radius} * 2);
    p {
      margin: 0;
    }
  }
  &:hover {
    z-index: 30;
    img {
      box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.3);
      transform: scale(1.066);
    }
    .caption {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const SliderAlt = styled("div")`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%);
  color: white;
  transition: all 0.3s ease-in-out;
  max-width: 60ch;
  pointer-events: none !important;
`


export const WarehouseSolidJS = () => {

  const [value, setValue] = createSignal(0.24)

  const onChange = (e: Event) => {
    setValue((e.target as HTMLInputElement).valueAsNumber)
  }

  const masonryData2 = MasonrySample.masonryData2
  const masonryData3 = MasonrySample.masonryData3

  const sliderImages = masonryData2.map((item, i) => {
    return {
      // rawOptions: ImageTransform;
      // options: ImageTransform;
      // src: string;
      // srcSet: {
      //     values: SrcSetValue[];
      //     attribute: string;
      // };
      // attributes: Record<string, any>;
      image: {
        src: `https://placehold.co/${item.w}x${item.h}/${item.back}/${item.color}?text=${i + 1} - ${item.h}x${item.w}`,
        rawOptions: {
          src: `https://placehold.co/${item.w}x${item.h}/${item.back}/${item.color}?text=${i + 1} - ${item.h}x${item.w}`,
          w: item.w,
          h: item.h,
          back: item.back,
          color: item.color
        },
        options: {
          src: `https://placehold.co/${item.w}x${item.h}/${item.back}/${item.color}?text=${i + 1} - ${item.h}x${item.w}`,
          w: item.w,
          h: item.h,
          back: item.back,
          color: item.color
        },
        srcSet: {
          values: [],
          attribute: ""
        },
        attributes: {}
      },
      alt: `The randomly generated Image #${i + 1} with Dimensions ${item.h}x${item.w} and Colors ${item.back} & ${item.color}`
    }
  })
  const sliderState = createSliderState(0, sliderImages.length)

  // console.log({ masonryData2, masonryData3 })

  return (
    <Col>
      <RangeInput
        label="Range Input"
        value={value()}
        min={0} max={1} step={0.01}
        onChange={onChange}
      />
      <RangeInput
        label="Range Input"
        value={value()}
        showValue
        min={0}
        max={1}
        step={0.01}
        onChange={onChange}
      />
      <Row>
        <RangeInput
          label="Range Input"
          value={value()}
          min={0} max={1} step={0.01}
          onChange={onChange}
        />
        <RangeInput
          label="Range Input"
          value={value()}
          showValue
          min={0} max={1} step={0.01}
          onChange={onChange}
        />
        <RangeInput
          label="Range Input"
          value={value()}
          min={0} max={1} step={0.01}
          onChange={onChange}
        />

      </Row>

      <Col>
        <For each={[1, 2, 4, 6, 8]}>
          {(item) => (<Row
            style={{ 'font-size': `calc(${item} * 0.5rem)` }}
          >
            {item}
            <RangeInput
              label="Range Input"
              value={value()}
              showValue
              min={0} max={1} step={0.01}
              onChange={onChange}
            />
          </Row>)}
        </For>
      </Col>

      <h2>A few random images in a masonry with a slider</h2>
      <Col>
        <Masonry
          minColumns={1}
          maxColumns={4}
          colWidth={400}
          gap={16}
          imageDimensions={masonryData3.map((item) => [item.w, item.h])}
        >
          <For each={masonryData3}>
            {(item, i) => (
              <MasonryImage
              >
                <img src={`https://placehold.co/${item.w}x${item.h}/${item.back}/${item.color}?text=${i() + 1} - ${item.h}x${item.w}`} alt="placeholder" loading="lazy" />
                <div class="caption">
                  <p>{sliderImages[i()].alt}</p>
                </div>
              </MasonryImage>
            )}
          </For>
        </Masonry>
      </Col>

      <h2>A thousand random images in a masonry with a slider</h2>
      <Col>
        <Masonry
          minColumns={1}
          maxColumns={4}
          colWidth={400}
          gap={16}
          imageDimensions={masonryData2.map((item) => [item.w, item.h])}
        >
          <For each={masonryData2}>
            {(item, i) => (
              <MasonryImage
                onClick={() => {
                  sliderState.setCurrent(i())
                  sliderState.toggle()
                }}
              >
                <img src={`https://placehold.co/${item.w}x${item.h}/${item.back}/${item.color}?text=${i() + 1} - ${item.h}x${item.w}`} alt="placeholder" loading="lazy" />
                <div class="caption">
                  <p>{sliderImages[i()].alt}</p>
                </div>
              </MasonryImage>
            )}
          </For>
        </Masonry>
      </Col>

      <ImageSlider
        images={sliderImages}
        sliderState={sliderState}
        Alt={(props) => (
          <SliderAlt class="altText">{props.image.alt}</SliderAlt>
        )}
      />
    </Col>
  )
}
