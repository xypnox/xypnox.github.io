import { For } from "solid-js"
import { styled } from "solid-styled-components"
import { Masonry } from "../grids/masonry"
import { theme } from "../../theme"
import { Col } from "../elements/atoms/layout"

interface Quote {
  quote: string
  author?: string
}

const sanitizeQuote = (quote: Quote) => {
  const quoteTextTrimmed = quote.quote.trim()
  // We want to trim and remove the double quotes if at start and end
  const quoteText = quoteTextTrimmed.startsWith('"') && quoteTextTrimmed.endsWith('"') ? quoteTextTrimmed.slice(1, -1) : quoteTextTrimmed

  return {
    quote: quoteText,
    author: quote.author?.trim()
  }
}

const quotes: Quote[] = [
  {
    quote: "No one who was both independent-minded and ambitious would want to waste the effort it takes to fit in.",
    author: "Paul Graham"
  },
  {
    quote: "We do not write in order to be understood; we write in order to understand.",
    author: "C. S. Lewis"
  },
  {
    quote: "When there's a will to fail, obstacles can be found.",
    author: "John McCarthy"
  },
  {
    quote: "Compound interest is the 8th wonder of the world. He who understands it, earns it; he who doesn't, pays it.",
    author: "Albert Einstein"
  },
  {
    quote: "Luck loves persistence",
    author: ""
  },
  {
    quote: `"When I use a word," Humpty-Dumpty said, "it means just what I choose it to mean -- neither more nor less."`,
    author: "Lewis Carroll"
  },
  {
    quote: "There is no such thing as a new idea. It is impossible. We simply take a lot of old ideas and put them into a sort of mental kaleidoscope.",
    author: "Mark Twain"
  },
  {
    quote: "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them.",
    author: "Frank Herbert"
  },
  {
    quote: "The best theory is inspired by practice; The best practice is inspired by theory.",
    author: "Donald Knuth"
  },
].map(sanitizeQuote);



const MasonryItem = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: ${theme.font.size.lg};
  background: ${theme.surface};
  border-radius: calc(${theme.border.radius} * 2);

  .quote {
    font-size: ${theme.font.size.lg};
    font-weight: 500;
  }

  .author {
    font-size: ${theme.font.size.base};
    color: ${theme.fadeText};
  }
`

export const MasonryText = () => {
  return (
    <Col>
      <h2>A masonry wall with text</h2>
      <Col>
        <Masonry
          minColumns={1}
          maxColumns={4}
          colWidth={400}
          gap={16}
        // imageDimensions={[].map((item) => [item.w, item.h])}
        >
          <For each={quotes}>
            {(quote, i) => (
              <MasonryItem
              >
                <div class="quote">{quote.quote}</div>
                {quote.author && <div class="author">{quote.author}</div>}
              </MasonryItem>
            )}
          </For>
        </Masonry>
      </Col>
    </Col>
  )
}

