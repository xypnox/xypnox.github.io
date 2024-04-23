import { For, Show, createEffect, createResource, createSignal } from "solid-js"
import { Masonry } from "./grids/masonry"
import { styled } from "solid-styled-components"
import { theme } from "../theme"
import { RelativeTime } from "./elements/relativeTime"
import { parse } from 'rss-to-json';
import type { RootObject, Thumbnail } from "../dataTypes"
import { Button } from "./elements/atoms"
import { icons } from "./icons"

const feedURL = "https://fosstodon.org/@xypnox.rss"

const TootWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  .card {
    display: flex;
    flex-direction: column;
    gap: 0rem;
    border-radius: 1em;
    overflow: hidden;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.25em;
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
    border-radius: 0.5em;
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
    font-size: 0.75em;
    &:hover {
      color: ${theme.primary.color};
    }
  }

  .refetch-time {
    font-size: ${theme.font.size.sm};
    flex-grow: 1 !important;
  }
`

const parseFeed = async () => {
  return await parse(feedURL) as RootObject;
}

interface TootFeedProps {
  max?: number
}

export const TootFeed = (props: TootFeedProps) => {
  const repaint = createSignal(0)
  const [lastFetched, setLastFetched] = createSignal(Date.now())
  const [loadCount, setLoadCount] = createSignal({
    count: 0,
    total: 0
  })

  const increaseCount = () => setLoadCount(s => ({ ...s, count: s.count + 1 }))
  const [feed, { refetch }] = createResource(async () => {
    try {
      // console.log("Fetching feed");
      const feedData = await parseFeed()
      if (props.max) feedData.items = feedData.items.slice(0, props.max)
      // Setting last fetched time
      setLastFetched(Date.now())
      return feedData
    } catch (error) {
      console.error(error);
      throw error
    }
  })
  // createEffect(() => {
  //   console.log("last fetched time", lastFetched());
  // })

  createEffect(() => {
    if (feed()) {
      // Add the lenth of thumbnail | thumbnail[]
      const mediaCount = feed()!.items.reduce((acc, item) => {
        if (item.media && item.media.thumbnail) {
          if (Array.isArray(item.media.thumbnail)) {
            return acc + item.media.thumbnail.length
          }
          return acc + 1
        }
        return acc
      }, 0)

      setLoadCount({
        count: 0,
        total: mediaCount,
      })
    }
  })

  createEffect(() => {
    // Repaint when all images are loaded
    if (loadCount().count !== 0 && loadCount().total === loadCount().count) {
      repaint[1](1)
    }
  })

  return (
    <div>
      <Masonry
        minColumns={1}
        maxColumns={5}
        colWidth={props.max ? 300 : 400}
        gap={1}
        repaint={repaint}
      >
        <TootWrapper>
          <div class="theme-card card">
            <div class="content">
              <div class="title">
                <h2>
                  <a href={'/tootfeed/'}>TootFeed</a>
                </h2>
              </div>
              <p>A replica of my feed @ <a href={feedURL.replace('.rss', '')}>Fosstodon</a></p>
              <Button class="small" onClick={() => refetch()}>
                <Show when={lastFetched() !== 0}>
                  <iconify-icon icon={icons.refresh} />
                  <RelativeTime date={lastFetched()} />
                </Show>
              </Button>
            </div>
          </div>
        </TootWrapper>
        <Show when={feed.loading}>
          <div>Loading...</div>
        </Show>
        <Show when={feed.error}>
          <div>Error: {feed.error.message}</div>
        </Show>
        <Show when={feed() !== undefined}>
          <For each={feed()!.items} fallback={<div>Loading...</div>}>
            {(toot) => (
              <TootWrapper>
                <div class="theme-card card">
                  <div class="content" >
                    <div
                      innerHTML={toot.description} />
                    <div class="meta">
                      <a class="link" href={toot.link}>
                        <RelativeTime date={toot.published} />
                      </a>
                    </div>
                  </div>
                  <Show when={toot.media}>
                    <Show when={Array.isArray(toot.media.thumbnail)}>
                      <For each={toot.media.thumbnail as Thumbnail[]}>
                        {(im) => (
                          <Thumb onLoad={() => increaseCount()} media={im} />
                        )}
                      </For>
                    </Show>
                    <Show when={toot.media.thumbnail && !Array.isArray(toot.media.thumbnail)}>
                      {
                        (<Thumb onLoad={() => increaseCount()} media={toot.media.thumbnail as Thumbnail} />)
                      }
                    </Show>
                  </Show>
                </div>
              </TootWrapper>
            )}
          </For>
        </Show>
      </Masonry>
    </div>
  )
}

const Thumb = (props: { media: Thumbnail, onLoad: () => void }) => <img src={props.media.url} alt={props.media["media:description"].$text}
  onLoad={props.onLoad}
/>
