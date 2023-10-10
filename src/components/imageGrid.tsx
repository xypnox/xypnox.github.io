import { For, Show, createEffect, createSignal } from "solid-js"
import { Dynamic } from "solid-js/web"
import { styled } from "solid-styled-components"
import { theme, } from "../theme"

interface Image {
  url: string
  thumbnail?: string
  alt: string
  title: string
  description?: string
  link?: string
}

interface ImageGridProps {
  images: Image[]
}


const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(var(--count), 1fr);
  gap: 2rem;
  width: 100%;

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

  transition: all 0.3s ease-in-out;
  img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
`


export const ImageGrid = (props: ImageGridProps) => {
  const hasLink = (img: Image) => img.link && img.link.length > 0

  return (
    <GridWrapper
    >
      <For each={props.images}>
        {(img) => (
          <GridItem>
            <Dynamic component={hasLink(img) ? 'a' : 'div'} href={img.url} target="_blank" rel="noopener noreferrer">
              <img src={img.url} loading="lazy" alt={img.title} />
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
  images: Image[]
}

interface ImageCollageProps {
  collages: Collage[]
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
`


const Controls = styled("div")`
  position: sticky;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  top: 1rem;
  height: 3rem;
  background-color: ${theme.surface};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${theme.border};
  padding: 0 1rem;
  border-radius: 1rem;

  & > svg {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const Control = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  &:hover {
    background-color: ${theme.surface};
    transform: scale(1.1);
  }
  transition: all 0.3s ease-in-out;
  svg {
    width: 1rem;
    height: 1rem;
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
export const ImageCollage = (props: ImageCollageProps) => {
  const [showControls, setShowControls] = createSignal(true);

  const [imageCount, setImageCount] = createSignal(5)

  return (
    <CollageWrapper>
      <Controls>
        <svg
          onClick={() => setShowControls(c => !c)}
          xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="currentColor"><g opacity=".2"><path d="M5 5.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5v-12Z" /><path fill-rule="evenodd" d="M6.5 6.5v10h10v-10h-10ZM5.5 5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-12Z" clip-rule="evenodd" /></g><path fill-rule="evenodd" d="M4.5 4.5v4h4v-4h-4Zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Zm7.5 1v4h4v-4h-4Zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-5Zm-6.5 8v4h4v-4h-4Zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5H4Zm7.5 1v4h4v-4h-4Zm-.5-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z" clip-rule="evenodd" /></g></svg>
        <Show when={showControls()}>
          <Control
            role="button"
            aria-roledescription="decrease count"
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
            <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z" /></svg>
          </Control>
          <Control
            role="button"
            aria-roledescription="increase count"
            classList={{
              "disabled": imageCount() >= 4
            }}
            onClick={() => { setImageCount(imageCount() + 1) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12Z" /></svg>
          </Control>
        </Show>
      </Controls>
      <For each={props.collages}>
        {(collage) => (
          <Wrapper
            style={{
              "--count": imageCount(),
            }}
          >
            <h2 id={collage.id} class="title">{collage.title}</h2>
            <Show when={collage.description}>
              <p class="description">{collage.description}</p>
            </Show>
            <ImageGrid images={collage.images} />
          </Wrapper>
        )}
      </For>
    </CollageWrapper>
  )
}
