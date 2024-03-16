import { styled } from "solid-styled-components";
import type { ProjectImage } from "../content/projects";
import { ImageSlider, createSliderState } from "./imageSlider";
import { For } from "solid-js";
import { baseElementStyles } from "./elements/atoms";
import { theme } from "../theme";

interface ProjectImagesProps {
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
    box-shadow: ${theme.mediumShadow};
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
  const sliderState = createSliderState(0, props.images.length)
  return props.images.length > 0 && (
    <Images>
      <ImageSlider images={props.images}
        sliderState={sliderState}
        Alt={DefaultAlt}
      />
      <For each={props.images}>
        {(image, index) => {
          const title = image.title ?? image.alt;
          return (
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
          );
        }}
      </For>
    </Images>
  )
}

const Images = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem 4rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

`

const Image = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  &:nth-child(2n) {
    margin-top: 50%;
    margin-bottom: -50%;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .imageWrapper {
    cursor: zoom-in;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
  @media (max-width: 768px) {
    &:nth-child(2n) {
      margin-top: 0;
      margin-bottom: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  img {
    width: 100%;
    border-radius: calc(var(--border-radius) * 2);
    box-shadow: var(--mediumShadow);
  }
`

const ImageInfo = styled("div")`
  padding: 1.5rem 2rem;
  background-color: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 60ch;
  border-radius: calc(var(--border-radius) * 2);
  h3 {
    font-size: var(--font-size-lg);
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
`
