import { createSignal, Show, type Accessor, type Signal, createEffect, type Component, type JSX, createMemo, For } from "solid-js"
import type { Image } from "../dataTypes"
import { Portal } from "solid-js/web"
import { keyframes, styled } from "solid-styled-components"
import { theme } from "../theme"
import { icons } from "./icons"
import { Button } from "./elements/atoms"
import { enableScroll, disableScroll } from "../utils/scroll"
import { createShortcut } from "@solid-primitives/keyboard"

interface SliderState {
  current: Signal<number>
  setCurrent: (i: number) => void

  visible: Accessor<boolean>
  toggle: () => void

  newIm: Accessor<number>

  nextImage: () => number
  prevImage: () => number

  changing: Accessor<boolean>
  changeCurrent: (i: number) => void

  next: () => void
  prev: () => void

  quickChange: Accessor<boolean>
}

interface ImageSliderProps<T> {
  images: T[]
  sliderState: SliderState
  Alt?: (props: { image: T }) => JSX.Element
}

export const createSliderState = (initial: number, max: number, duration = 0.3): SliderState => {
  const current = createSignal(initial);
  const [visible, setVisible] = createSignal(false);
  const [changing, setChanging] = createSignal(false);
  const [lastChanged, setLastChanged] = createSignal(0);
  const setCurrent = current[1];
  const [quickChange, setQuickChange] = createSignal(false);
  const [changeTimeout, setChangeTimeout] = createSignal<any | null>(null);

  const [newIm, setNewIm] = createSignal(initial);

  const nextImage = () => (current[0]() + 1) % max;
  const prevImage = () => (current[0]() - 1 + max) % max;

  const changeCurrent = (i: number) => {
    // This determines if the change was made before the transition was done
    if (Date.now() - lastChanged() < duration * 1000) {
      if (changeTimeout()) {
        clearTimeout(changeTimeout());
      }
      setChanging(false);
      setQuickChange(true); // We enter the quick change mode
      setNewIm(i); // We set the new image
      setCurrent(i); // We set the current image immediately
      return // And exit
    }
    setChanging(true);
    setNewIm(i);
    setLastChanged(Date.now())
    setChangeTimeout(setTimeout(() => {
      setCurrent(i)
      setChanging(false)
      // console.log("done")
      setQuickChange(false);
    }, duration * 1000))
  }

  return {
    current,
    setCurrent: (i: number) => { setCurrent(i); setNewIm(i) },

    visible: visible,
    toggle: () => setVisible((prev) => !prev),

    newIm,

    changing,
    changeCurrent,

    nextImage,
    prevImage,

    quickChange,

    next: () => {
      changeCurrent(nextImage())
    },

    prev: () => {
      changeCurrent(prevImage())
    },
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
    padding: 0;
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
  transition: transform var(--duration, 0.5s) ease-out;
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
  justify-content: center;
  gap: 1rem;

  z-index: 1001;
  max-width: 100%;
  max-height: 100%;

  &.newWrapper {
    padding: 0.9rem;
    position: absolute;
    display: flex;
    z-index: 1002;
  }
`

const FadeZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const ImageElement = styled("img")`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  pointer-events: all;
  animation: ${FadeZoomIn} 0.3s ease-out;
`

const HiddenImage = styled("img")`
  display: none;
  width: 0;
  height: 0;
  opacity: 0;
`

const SliderButton = styled(Button)`
  && {
    pointer-events: all;
    padding: 1rem;
    border-radius: 50%;
    background: ${theme.background};
    box-shadow: ${theme.mediumShadow};
  }

  &.top-right {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
  }
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
  const newImage = () => props.images[props.sliderState.newIm()].image
  const leftPad = createMemo(() => `calc(50% - ${props.sliderState.newIm() * 4 + 3}rem)`)
  const currentimage = () => props.images[current()].image

  return (
    <Portal>
      <Show when={props.sliderState.visible()}>
        <Backdrop onClick={onBackdropClick}>
          <SliderContents>
            <ImageContents>
              <SliderButton
                class="top-right"
                onClick={() => props.sliderState.toggle()}>
                <iconify-icon icon={icons.close} />
              </SliderButton>
              <SliderButton onClick={() => props.sliderState.prev()}>
                <iconify-icon icon={icons.prev} />
              </SliderButton>

              <Contents>
                <Show when={props.sliderState.changing() && !props.sliderState.quickChange()}>
                  <ImageWrapper class="newWrapper">
                    <ImageElement
                      class="newImage"
                      src={newImage().src}
                      width={newImage().attributes?.width ?? undefined}
                      style={{
                        'max-width': newImage().attributes?.width,
                        'max-height': newImage().attributes?.height,
                      }}
                      alt={props.images[props.sliderState.newIm()].alt}
                    />
                  </ImageWrapper>
                </Show>
                <ImageWrapper>
                  <HiddenImage src={props.images[props.sliderState.nextImage()].image.src} />
                  <HiddenImage src={props.images[props.sliderState.prevImage()].image.src} />
                  {/* Show the new image if we are changing and not in quick change mode */}
                  <ImageElement
                    src={currentimage().src}
                    width={currentimage().attributes?.width ?? undefined}
                    alt={props.images[current()].alt}
                  />
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
              '--duration': props.sliderState.quickChange() ? '0s' : '0.5s'
            }}>
              <Thumbnails>
                <For each={props.images}>
                  {
                    (image, i) => (
                      <Thumbnail
                        classList={{ active: i() === props.sliderState.newIm() }}
                        src={image.image.src}
                        srcSet={image.image.srcSet.attribute}
                        sizes={'256px'}
                        alt={image.alt}
                        onClick={() => props.sliderState.changeCurrent(i())}
                      />
                    )}
                </For>
              </Thumbnails>
            </ThumbnailWrapper>
          </SliderContents>
        </Backdrop>
      </Show>
    </Portal>
  )
}
