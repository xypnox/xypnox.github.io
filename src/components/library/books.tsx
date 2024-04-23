import { keyframes, styled } from "solid-styled-components"
import { theme } from "../../theme"
import { Masonry } from "../grids/masonry"
import { For } from "solid-js"
import type { Image } from "../../dataTypes"
import type { Book } from "../../data/books"

const randomRotations = [
  "3.72",
  "-4.10",
  "-7.75",
  "2.59",
  "-5.89",
  "0.12",
  "9.08",
  "0.31",
  "8.02",
  "5.12",
  "-4.43",
  "7.97",
  "3.24",
  "-1.74",
  "2.13",
  "15.78",
  "6.18",
  "11.99",
  "8.53",
  "2.55",
  "5.00",
  "7.63",
  "11.47",
  "1.89",
  "3.87",
  "15.19",
  "9.22",
  "10.75",
  "20.61",
  "14.74",
  "5.59",
  "6.75"
]
// Array.from({ length: 32 }, (_, i) => ((Math.random() + i * 0.02) * 20 - 10).toFixed(2));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// console.log({ randomRotations })

const MasonryImage = styled("div")`
  /* overflow: hidden; */
  img {
    width: 100%;
    height: auto;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    border-radius: calc(${theme.border.radius} * 2);
    animation: ${fadeIn} 1s ease-in;
    animation-fill-mode: both;
  }
    ${randomRotations.map((rotation, i) => `
      &:nth-child(${i}n) img {
        transform: rotate(${rotation}deg);
        animation-delay: ${i * 0.05}s;
      }`).join('')}

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
      gap={2}
      imageDimensions={props.images.map((item) => [item.image.attributes.width, item.image.attributes.height])}
    >
      <For each={props.images}>
        {(item) => (
          <MasonryImage>
            <img src={item.image.src}
              {...item.image.attributes}
              alt="placeholder" loading="lazy" />
            <div class="caption">
              {item.book['My Rating'] && item.book['My Rating'] > 0 &&
                <p>
                  <For each={[...Array(item.book['My Rating'])]}>
                    {() => <span>★</span>}
                  </For>
                </p>
              }
              <p>{item.book.Title}</p>
            </div>
          </MasonryImage>
        )}
      </For>
    </Masonry>
  )
}
