import { styled } from "solid-styled-components"
import { theme } from "../theme"
import { Masonry } from "./grids/masonry"
import { For } from "solid-js"
import type { Image } from "../dataTypes"
import type { Book } from "../data/books"

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
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
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

export interface BookImage extends Image {
  book: Book
}

interface BookProps {
  images: BookImage[]
}

export const Books = (props: BookProps) => {
  return (
    <Masonry
      minColumns={1}
      maxColumns={8}
      colWidth={200}
      gap={16}
      imageDimensions={props.images.map((item) => [item.image.attributes.width, item.image.attributes.height])}
    >
      <For each={props.images}>
        {(item) => (
          <MasonryImage>
            <img src={item.image.src}
              {...item.image.attributes}
              alt="placeholder" loading="lazy" />
            <div class="caption">
              <p>{item.book.Title}</p>
              {item.book['My Rating'] && item.book['My Rating'] > 0 &&
                <p>Rating: {item.book['My Rating']}</p>
              }
            </div>
          </MasonryImage>
        )}
      </For>
    </Masonry>
  )
}
