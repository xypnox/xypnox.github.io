import { createSignal, Show, type Accessor, type Signal, createEffect } from "solid-js"
import type { Image } from "../dataTypes"
import { Portal } from "solid-js/web"
import { styled } from "solid-styled-components"
import { theme } from "../theme"
import { icons } from "./icons"
import { Button } from "./elements/atoms"
import { enableScroll, disableScroll } from "../utils/scroll"

interface SliderState {
  current: Signal<number>
  next: () => void
  prev: () => void
  visible: Accessor<boolean>
  toggle: () => void
}

interface ImageSliderProps {
  images: Image[]
  sliderState: SliderState
}

export const createSliderState = (initial: number, max: number) => {
  const current = createSignal(initial)
  const [visible, setVisible] = createSignal(false)
  const setCurrent = current[1]
  return {
    current,

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
  pointer-events: none;
`

const ImageContents = styled("div")`
  position: relative;
  width: 100%;
  height: calc(100% - 4rem);
  z-index: 2001;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  pointer-events: none;
  & > * {
    pointer-events: all;
  }
`

const ThumbnailWrapper = styled("div")`
  pointer-events: all;
`

const Thumbnails = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -2rem;
  height: 6rem;
  left: var(--left);
  transition: left 0.3s ease-in-out;
  & > * {
    pointer-events: all;
  }
`

const Thumbnail = styled("img")`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;

  &:hover {
    width: 6rem;
    height: 6rem;
  }

  &.active {
    width: 6rem;
    height: 6rem;
  }
`

const ImageWrapper = styled("div")``

const ImageElement = styled("img")``

const SliderButton = styled(Button)`
  padding: 1rem;
  border-radius: 50%;
  background: ${theme.background};
  box-shadow: ${theme.smallShadow};
  &:hover {
    transform: scale(1.1);
    color: ${theme.text};
  }
  &:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }
  transition: all 0.3s ease-in-out;
`



export const ImageSlider = (props: ImageSliderProps) => {
  const current = props.sliderState.current[0]
  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.sliderState.toggle()
    }
  }
  createEffect(() => {
    if (props.sliderState.visible()) {
      disableScroll()
    } else {
      enableScroll()
    }
  })
  // Use currernt index to determine how many to subtract from the center
  const leftPad = () => `calc(50% - ${current() * 4.5}rem)`
  return (
    <Portal>
      <Show when={props.sliderState.visible()}>
        <Backdrop onClick={onBackdropClick}>
          <SliderContents>
            <ImageContents>
              <SliderButton onClick={() => props.sliderState.prev()}>
                <iconify-icon icon={icons.prev} />
              </SliderButton>
              <ImageWrapper>
                <ImageElement src={props.images[current()].image.src} alt={props.images[current()].alt} />
              </ImageWrapper>
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
