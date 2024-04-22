import { For, Show } from "solid-js"
import type { Feed } from "../dataTypes"
import { Masonry } from "./grids/masonry"
import { styled } from "solid-styled-components"
import { theme } from "../theme"
import { RelativeTime } from "./elements/relativeTime"

interface TootFeedProps {
  feed: Feed
}

const TootWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  .card {
    display: flex;
    flex-direction: column;
    gap: 0rem;
    background: ${theme.surface};
    border-radius: calc(${theme.border.radius} * 4);
    overflow: hidden;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.25rem;
    padding: ${theme.font.size.md};
  }
  h2 {
    margin: 0;
  }
  p {
    margin-block: 1rem;
  }
  p:first-child {
    margin-block-start: 0;
  }
  p:last-child {
    margin-block-end: 0;
  }
  img {
    max-width: 100%;
    border-radius: calc(${theme.border.radius} * 2);
  }
  a {
    color: ${theme.primary.color};
    text-decoration: none;
    border-bottom: none;
    .invisible {
      display: none;
    }
  }
  .meta {
    align-self: flex-end;
  }
  .meta .link {
    color: ${theme.fadeText};
    font-size: 0.75rem;
    &:hover {
      color: ${theme.primary.color};
    }
  }
`

export const TootFeed = (props: TootFeedProps) => {
  return (
    <Masonry
      minColumns={1}
      maxColumns={6}
      colWidth={430}
      gap={24}
    >
      <TootWrapper>
        <div class="card">
          <div class="content">
            <h2>TootFeed</h2>
            <p>A replica of my feed @ <a href={props.feed.link}>Mastodon</a></p>
          </div>
        </div>
      </TootWrapper>
      <For each={props.feed.items}>
        {(toot) => (
          <TootWrapper>
            <div class="card">
              <div class="content" >
                <div
                  innerHTML={toot.description} />
                <div class="meta">
                  <a class="link" href={toot.link}>
                    <RelativeTime date={new Date(toot.isoDate).getTime()} />
                  </a>
                </div>
              </div>
              <Show when={toot["media:content"]}>
                <img src={toot["media:content"]!.$.url} alt={toot["media:content"]!["media:description"].join(' ')} />
              </Show>
            </div>
          </TootWrapper>
        )}
      </For>
    </Masonry>
  )
}
