import { createSignal, Show, type Accessor, type Signal, createEffect, type Component, type JSX } from "solid-js"
import type { Image } from "../dataTypes"
import { Portal } from "solid-js/web"
import { styled } from "solid-styled-components"
import { theme } from "../theme"
import { icons } from "./icons"
import { Button } from "./elements/atoms"
import { enableScroll, disableScroll } from "../utils/scroll"
import { createShortcut } from "@solid-primitives/keyboard"

interface SliderState {
  current: Signal<number>
  next: () => void
  prev: () => void
  visible: Accessor<boolean>
  toggle: () => void
}

interface ImageSliderProps<T> {
  images: T[]
  sliderState: SliderState
  Alt?: (props: { image: T }) => JSX.Element
}

export const createSliderState = (initial: number, max: number) => {
  const current = createSignal(initial)
  const [visible, setVisible] = createSignal(false)
  const setCurrent = current[1]
  return {
    current,
    setCurrent,

    visible: visible,
    toggle: () => setVisible((prev) => !prev),

    next: () => setCurrent((prev) => (prev + 1) % max),
    prev: () => setCurrent((prev) => (prev - 1 + max) % max),
  }
}

const Backdrop = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    background: ${theme.background};
  }
`

const SliderContents = styled("div")`
  width: 100%;
  max-width: 100%;
  pointer-events: none;
`

const ImageContents = styled("div")`
  position: relative;
  width: 100%;
  height: calc(100vh - 7rem);
  max-width: 100%;
  z-index: 2001;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  pointer-events: none;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 0;
  }
`

const ThumbnailWrapper = styled("div")`
  width: 100%;
  max-width: 100%;
  pointer-events: all;
  overflow-x: hidden;
`

const Thumbnails = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  height: 6rem;
  transform: translateX(var(--left));
  transition: transform 0.5s ease-out;
  & > * {
    pointer-events: all;
  }
`

const Thumbnail = styled("img")`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  transition: width 0.25s ease-in-out, height 0.25s ease-in-out, opacity 0.25s ease-in-out;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    width: 6rem;
    height: 6rem;
  }

  &.active {
    opacity: 1;
    width: 6rem;
    height: 6rem;
  }
`

const Contents = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: 100%;
  height: calc(100vh - 7rem);
  padding: 1rem;
  .altText {
    z-index: 1002;
    pointer-events: all;
  }
  &:has(img:hover) {
    .altText {
      opacity: 1;
    }
  }
`
const ImageWrapper = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-grow: 1;

  z-index: 1001;
  max-width: 100%;
  height: 100%;
  max-height: max-content;
`

const ImageElement = styled("img")`
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  width: max-content;
  height: auto;
  object-fit: contain;
  pointer-events: all;
`

const SliderButton = styled(Button)`
  pointer-events: all;
  padding: 1rem;
  border-radius: 50%;
  background: ${theme.background};
  box-shadow: ${theme.mediumShadow};
`



export const ImageSlider = <T extends Image>(props: ImageSliderProps<T>) => {
  const current = props.sliderState.current[0]
  const Alt = props.Alt!
  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.sliderState.toggle()
    }
  }
  createEffect(() => {
    if (props.sliderState.visible()) {
      disableScroll()
      createShortcut(["Escape"], () => {
        props.sliderState.toggle()
      })
      createShortcut(["ArrowLeft"], () => {
        props.sliderState.prev()
      })
      createShortcut(["ArrowRight"], () => {
        props.sliderState.next()
      })
    } else {
      enableScroll()
    }
  })
  // Use currernt index to determine how many to subtract from the center
  const leftPad = () => `calc(50% - ${current() * 4 + 3}rem)`
  return (
    <Portal>
      <Show when={props.sliderState.visible()}>
        <Backdrop onClick={onBackdropClick}>
          <SliderContents>
            <ImageContents>
              <SliderButton onClick={() => props.sliderState.prev()}>
                <iconify-icon icon={icons.prev} />
              </SliderButton>

              <Contents>
                <ImageWrapper>
                  <ImageElement src={props.images[current()].image.src} alt={props.images[current()].alt} />
                  <Show when={Alt}>
                    <Alt image={props.images[current()]} />
                  </Show>
                </ImageWrapper>
              </Contents>

              <SliderButton onClick={() => props.sliderState.next()}>
                <iconify-icon icon={icons.next} />
              </SliderButton>
            </ImageContents>

            <ThumbnailWrapper style={{
              '--left': leftPad(),
            }}>
              <Thumbnails>
                {props.images.map((image, i) => (
                  <Thumbnail
                    classList={{ active: i === current() }}
                    src={image.image.src}
                    srcSet={image.image.srcSet.attribute}
                    sizes={'256px'}
                    alt={image.alt}
                    onClick={() => props.sliderState.current[1](i)}
                  />
                ))}
              </Thumbnails>
            </ThumbnailWrapper>
          </SliderContents>
        </Backdrop>
      </Show>
    </Portal>
  )
}
