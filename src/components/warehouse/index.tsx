import { For } from "solid-js"
import { styled } from "solid-styled-components"
import { Masonry } from "../grids/masonry"
import { MasonrySample } from "./rawData"
import { ImageSlider, createSliderState } from "../imageSlider"
import { theme } from "../../theme"
import { Col } from "../elements/atoms/layout"
import { Elements, ElementsPageStructure } from "./elements"
import { MasonryText } from "./masonry-text";
import { slugify } from "../../lib/text"
import { Heading, hg, type HeadingSpec } from "./headings"

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

const WareNav = styled('nav')`
  position: sticky;
  top: 1rem;
  right: 1rem;
  width: 100%;
  max-width: 100%;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  height: 3.25rem;

  .linklists {
    display: flex;
    align-items: flex-start;
    background: ${theme.background};
    border: 1px solid ${theme.border.color};
    border-radius: calc(${theme.border.radius} * 2);
    height: max-content;
    max-height: 3.25rem;
    transition: max-height 0.5s ease-in-out;
    overflow: hidden;
  }

  &:focus-within .linklists,
  .linklists:hover {
    max-height: 50vh;
    border-color: ${theme.primary.color};
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: max-content;
  }

  li {
    margin-inline-start: var(--pad-start);
  }

  li::marker {
    color: ${theme.fadeText};
  }

  a {
    color: ${theme.text};
    text-decoration: none;
  }
  a:hover {
    color: ${theme.primary.color};
    text-decoration: underline;
  }
`

const BaseHeadings = [
  { title: "Masonry", level: 1 },
  { title: "Text", level: 2 },
  { title: "Image with caption", level: 2 },
  { title: "Image with Slider", level: 2 },
] as const

const h = hg(BaseHeadings)

const LinkList = ({ list }: { list: readonly HeadingSpec[] }) => <ul>
  <For each={list}>
    {(item) => (
      <li style={{ "--pad-start": `${item.level * 1}rem` }}>
        <a href={`#${slugify(item.title)}`}>{item.title}</a>
      </li>
    )}
  </For>
</ul>

const WarehouseNav = () => {
  return (
    <WareNav>
      <div tabindex="0" class="linklists">
        <LinkList list={ElementsPageStructure} />
        <LinkList list={BaseHeadings} />
      </div>
    </WareNav>
  )
}

export const WarehouseSolidJS = () => {
  const masonryData2 = MasonrySample.masonryData2.slice(0, 16)
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
      <WarehouseNav />
      <Elements />
      <Heading h={h("Masonry")} />
      <Heading h={h("Text")} />
      <MasonryText />

      <Heading h={h("Image with caption")} />
      <Col>
        <Masonry
          minColumns={1}
          maxColumns={4}
          colWidth={400}
          gap={1}
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

      <Heading h={h("Image with Slider")} />
      <Col>
        <Masonry
          minColumns={1}
          maxColumns={4}
          colWidth={400}
          gap={1}
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

