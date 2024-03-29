import type { GetImageResult } from "astro"
import { For, Show, createSignal, type Accessor, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import { styled } from "solid-styled-components"
import { theme, } from "../theme"
import type { Image } from "../dataTypes"
import { ImageSlider, createSliderState } from "./imageSlider"
import { icons } from "./icons"
import { baseElementStyles } from "./elements/atoms"
import { TooltipElement } from "./elements/tooltip"

interface GridImage extends Image {
  title: string
  link?: string
  // Show button to spotify
  spotifyLink?: string
  description?: string
}

interface ImageGridProps {
  images: GridImage[]
  onImageClick?: (index: number) => void
  count?: Accessor<number>
}


const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(var(--count, 5), 1fr);
  gap: 2rem;
  width: 100%;

  font-family: ${theme.font.family};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`


const GridItem = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;
  min-width: 100px;

  transition: all 0.3s ease-in-out;
  .imgContainer {
    --grid-num: calc(var(--count, 5));
    --grid-width: calc(100vw - 2rem - 1rem * var(--grid-num));
    --img-width: var(--image-width-raw, calc(var(--grid-width) / var(--count, 5)));
    display: flex;
    border-radius: ${theme.border.radius};
    overflow: hidden;
    cursor: pointer;
    
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05) translateY(-2.5%);
    }
    img {
      border-radius: ${theme.border.radius};
      width: var(--img-width);
      height: var(--img-width);
    }

    @media (max-width: 768px) {
      --grid-num: 0;
      --grid-width: 100%;
      --img-width: 100%;
    }
  }
`

const Image = (props: {
  img: GetImageResult
  alt?: string
  count?: Accessor<number>
}) => {
  const sizes = () => {
    if (!props.count) {
      return `(min-width: 1200px) 1200px, 512px`;
    }
    const count = props.count()
    if (count >= 5) {
      return `(min-width: 1200px) 512px, 256px`;
    } else if (count >= 3) {
      return `(min-width: 1200px) 1200px, 512px`;
    } else {
      return `(min-width: 1200px) 1200px, 1200px`;
    }
  }
  // console.log(props)

  return <img
    src={props.img.src}
    srcset={props.img.srcSet?.attribute}
    sizes={sizes()}
    width={props.img.attributes?.width ?? undefined}
    height={props.img.attributes?.height ?? undefined}
    style={{
      '--count': props.count ? props.count() : '5'
    }}
    loading="lazy" alt={props.alt}
  />
}


export const ImageGrid = (props: ImageGridProps) => {
  const hasLink = (img: GridImage) => img.link && img.link.length > 0
  const imgLinkProps = (img: GridImage) => ({
    href: img.link,
    target: "_blank",
    rel: "noopener noreferrer"
  })
  return (
    <GridWrapper>
      <For each={props.images}>
        {(img) => (
          <GridItem>
            <Dynamic
              class="imgContainer"
              component={hasLink(img) ? 'a' : 'div'}
              {...(hasLink(img) ? imgLinkProps(img) : {
                onclick: props.onImageClick ? () => { props.onImageClick!(props.images.indexOf(img)) } : undefined,
                role: "button",
                title: img.title
              })}>
              <Show when={img.image}>
                <Image img={img.image} alt={img.alt} count={props.count} />
              </Show>
            </Dynamic>
            {/* Capitalize the name */}
            <p class="img-name">{img.title}</p>
            <Show when={img.description}>
              <p class="img-description">{img.description}</p>
            </Show>
          </GridItem>
        )}
      </For>
    </GridWrapper>
  )
}

export interface Collage {
  title: string
  description?: string
  id: string
  images: GridImage[]
}

interface ImageCollageProps<T extends GridImage> {
  collages: Collage[]
  Alt?: (props: { image: T }) => JSX.Element
}

// @keyframes curtain {
//   0% {
//     grid-gap: 100vw; 
//   }
//   
//   100% {
//     grid-gap: 0;
//   }
// }
const CollageWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin: 2rem auto;

  transition: all 0.3s ease-in-out;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
  }
`

const ControlWrapper = styled("div")`
  position: sticky;
  margin-top: 1rem;
  top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`


const Controls = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: max-content;
  height: 3rem;
  padding: 0rem 0.5rem;
  background: ${theme.background};
  border: 1px solid ${theme.border.color};
  border-radius: calc(2 * ${theme.border.radius});
  box-shadow: ${theme.shadow.card};

  & > svg {
    width: 2rem;
    height: 2rem;
  }
`

const Control = styled("button")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: calc(${theme.border.radius} * 2);
  border: none;
  background: transparent;
  color: ${theme.fadeText};
  &:hover {
    transform: scale(1.1);
    color: ${theme.text};
  }
  &:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }
  transition: all 0.3s ease-in-out;
  iconify-icon {
    font-size: ${theme.font.size.md};
  }
`

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  h2.title {
    margin: 0;
    font-size: ${theme.font.size.lg};
    color: var(--secondary-color);
  }
  p {
    margin: 0;
    font-size: ${theme.font.size.base};
  }
`

const AltContainer = styled("a")`
  ${baseElementStyles}
  pointer-events: auto;

  position: absolute;

  width: max-content;
  z-index: 1002;

  text-decoration: none;
  color: ${theme.text};

  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem; 
  background: ${theme.background};
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  transition: all 0.3s ease-in-out;
  opacity: 0;
  bottom: 2rem;

  p {
    margin: 0;
  }
  iconify-icon {
    font-size: 1.25em;
  }

  &:hover {
    opacity: 1;
    background: ${theme.primary.color};
    color: ${theme.primary.contrast};
    border-color: ${theme.primary.color};
    transform: scale(1.1);
    iconify-icon {
      color: ${theme.primary.contrast};
    }
  }

  &:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }


  @media (max-width: 600px) {
    opacity: 1;
    bottom: 0;
  }
`

const DefaultAlt = (props: { image: GridImage }) => props.image.spotifyLink ? (
  <AltContainer class="altText" href={props.image.spotifyLink} target="_blank" rel="noopener noreferrer">
    <iconify-icon icon={icons.spotify} />
    <p>Play</p>
  </AltContainer>
) : <></>

export const ImageCollage = (props: ImageCollageProps<GridImage>) => {
  const [showControls, setShowControls] = createSignal(true);

  const [imageCount, setImageCount] = createSignal(5)
  const imageCounts = () => {
    // All images inside all covers
    const allImageCount = props.collages.map((collage) => collage.images.length)
    return allImageCount
  }

  const allImages = () => {
    return props.collages.reduce((acc, collage) => acc.concat(collage.images), [] as GridImage[])
  }

  const sliderState = createSliderState(0, imageCounts().reduce((acc, count) => acc + count, 0))

  return (
    <>
      <ImageSlider<GridImage>
        sliderState={sliderState}
        images={allImages()}
        Alt={props.Alt ?? DefaultAlt}
      />
      <ControlWrapper>
        <Controls>

          <TooltipElement
            element={Control}
            props={{ onClick: () => setShowControls(c => !c) }}
            tooltip={
              showControls() ? "Hide Controls" : "Show Controls"
            } placement="bottom"
          >
            <iconify-icon
              icon={showControls() ? icons.controls : icons.controlsCollapsed}
            />
          </TooltipElement>

          <Show when={showControls()}>
            <Control
              title="Zoom in"
              classList={{
                "disabled": imageCount() === 1
              }}
              onClick={() => {
                //decrease by one
                if (imageCount() > 1) {
                  setImageCount(imageCount() - 1)
                }
              }}
            >
              <iconify-icon icon={icons.zoomIn} />
            </Control>
            <Control
              title="Zoom out"
              classList={{
                "disabled": imageCount() >= 4
              }}
              onClick={() => { setImageCount(imageCount() + 1) }}
            >
              <iconify-icon icon={icons.zoomOut} />
            </Control>
          </Show>
        </Controls>
      </ControlWrapper>
      <CollageWrapper>
        <For each={props.collages}>
          {(collage, colIndex) => (
            <Wrapper
              style={{
                "--count": imageCount(),
              }}
            >
              <h2 id={collage.id} class="title">{collage.title}</h2>
              <Show when={collage.description}>
                <p class="description">{collage.description}</p>
              </Show>
              <ImageGrid
                count={imageCount}
                images={collage.images}
                onImageClick={(index) => {
                  sliderState.setCurrent(index + imageCounts().slice(0, colIndex()).reduce((acc, count) => acc + count, 0))
                  sliderState.toggle()
                }}
              />
            </Wrapper>
          )}
        </For>
      </CollageWrapper>
    </>
  )
}

