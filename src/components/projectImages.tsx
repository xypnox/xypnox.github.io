import { styled } from "solid-styled-components";
import type { ProjectImage } from "../content/projects/types";
import { ImageSlider, createSliderState } from "./imageSlider";
import { For, Show } from "solid-js";
import { baseElementStyles } from "./elements/atoms";
import { theme } from "../theme";

interface ProjectImagesProps {
  cover?: ProjectImage;
  images: ProjectImage[];
}

const AltContainer = styled("div")`
  ${baseElementStyles}
  pointer-events: auto;

  position: absolute;

  width: max-content;
  z-index: 1002;

  text-decoration: none;
  color: ${theme.text};

  display: flex;
  flex-shrink: 0;
  align-items: center;
  transition: all 0.3s ease-in-out;
  bottom: 2rem;
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  & > div {
    background: ${theme.background};
    box-shadow: ${theme.shadow.medium};
    border: 1px solid ${theme.border.color};
    h3 {
      font-size: ${theme.font.size.md};
    }
    li {
      font-size: ${theme.font.size.base};
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const DefaultAlt = (props: { image: ProjectImage }) => (
  <AltContainer class="altText">
    <ImageInfo>
      {props.image.title && <h3>{props.image.title}</h3>}
      <ul>
        {props.image.description.map((desc) => (
          <li>{desc}</li>
        ))}
      </ul>
    </ImageInfo>
  </AltContainer>
)


export const ProjectImages = (props: ProjectImagesProps) => {
  const images = props.cover ? [...props.images, props.cover] : props.images
  const sliderState = createSliderState(0, images.length)
  return images.length > 0 && (
    <Images>
      <ImageSlider
        images={images}
        sliderState={sliderState}
        Alt={DefaultAlt}
      />
      <For each={images}>
        {(image, index) => {
          const title = image.title ?? image.alt;
          return (
            <Show when={props.cover ? index() !== images.length - 1 : true}>
              <Image>
                <div
                  class="imageWrapper"
                  onClick={() => {
                    sliderState.setCurrent(index())
                    sliderState.toggle()
                  }}
                >
                  <img
                    src={image.image.src}
                    alt={title ?? image.description.join(" ")}
                    loading="lazy"
                  />
                </div>
                <ImageInfo>
                  {title && <h3>{title}</h3>}
                  <ul>
                    {image.description.map((desc) => (
                      <li>{desc}</li>
                    ))}
                  </ul>
                </ImageInfo>
              </Image>
            </Show>
          );
        }}
      </For>
    </Images>
  )
}

const Images = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  @media (max-width: 768px) {
    gap: 4rem;
  }

`

const Image = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  height: max-content;
  width: 100%;
  padding: 0 4rem;
  &:nth-child(2n) {
    flex-direction: row-reverse;
  }
  .imageWrapper {
    cursor: zoom-in;
    transition: all 0.3s ease-in-out;
    flex-grow: 0;
    flex-shrink: 1;
    &:hover {
      transform: scale(1.05);
    }
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 0;
    &:nth-child(2n) {
      flex-direction: column;
    }
  }
  img {
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    border-radius: calc(${theme.border.radius} * 2);
    -webkit-filter: drop-shadow(${theme.shadow.cardDrop});
    filter: drop-shadow(${theme.shadow.cardDrop});
  }
`

const ImageInfo = styled("div")`
  width: 100%;
  min-width: 20rem;
  padding: 1.5rem;
  background-color: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 70ch;
  border-radius: calc(var(--border-radius) * 2);
  h3 {
    font-size: var(--font-size-md);
    font-weight: 400;
    color: var(--secondary-color);
    margin: 0;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    list-style: circle;
    padding: 0;
    padding-left: 1.25rem;
  }
  li {
    font-size: var(--font-size-base);
    margin: 0;
  }
  @media (max-width: 1200px) {
    min-width: 100%;
    max-width: 100%;
  }
`
