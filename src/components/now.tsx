import { For, Match, Show, Switch, type JSX } from "solid-js"
import { Masonry } from "./grids/masonry"
import { styled } from "solid-styled-components"
import { theme } from "../theme"
import { cardStyles, cardTransition } from "./elements/atoms"
import { data, type NowCardData, type NowCardType } from "../content/now"
import { Updated } from "./elements/relativeTime"


import IconLink from '~icons/ph/globe-duotone'
import IconProject from '~icons/ph/code-duotone'
import IconLocation from '~icons/ph/map-pin-line-duotone'
import IconSpotify from '~icons/ph/spotify-logo-duotone'
import IconCollab from '~icons/ph/buildings-duotone'


const ItemWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${cardStyles};
  ${cardTransition};
  border-radius: calc(${theme.border.radius} * 8);
  overflow: hidden;
  gap: 1rem;
  padding: ${theme.font.size.md};

  h2, div, p {
    word-break: normal; 
    word-break: break-all; 
    word-break: keep-all;
  }

  &.items-intro {
    padding: ${theme.font.size.xl};
    .item-content {
      gap: 1rem;
    }
  }

  h1, h2 {
    color: ${theme.heading};
  }
  h1 {
    font-size: ${theme.font.size.xl};
  }
  h2 {
    font-size: ${theme.font.size.lg};
  }
  p {
    font-size: ${theme.font.size.base};
  }
  h1, h2, p {
    margin: 0;
  }
  a {
    color: ${theme.primary.color};
    text-decoration: none;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    width: 100%;
  }

  .item-label {
    font-size: ${theme.font.size.base};
  }

  .url {
    svg {
      font-size: 0.8em;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.25em;
      color: ${theme.fadeText};
    }
  }

  .icon svg {
    font-size: 3rem;
    align-self: center;
    color: ${theme.fadeText};
  }

  &:hover .icon svg {
    color: ${theme.primary.color};
  }
`

const ProfileImage = styled("div")`
  max-width: 30em;
  max-height: 30em;
  --scale1: 0.85;
  --scale2: 0.7;
  @keyframes rotating {
    0% {
      transform: rotate(0deg) translateX(0%) scaleX(1.0) scaleY(var(--scale2));
    }
    25% {
      transform: rotate(90deg) translateX(-5%) scaleX(var(--scale1)) scaleY(var(--scale1));
    }
    50% {
      transform: rotate(180deg) translateX(0%) scaleX(var(--scale2)) scaleY(1.0);
    }
    75% {
      transform: rotate(270deg) translateX(5%) scaleX(var(--scale1)) scaleY(var(--scale1));
    }
    100% {
      transform: rotate(360deg) translateX(0%) scaleX(1.0) scaleY(var(--scale2));
    }
  }
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    padding: 16%;
  }

  .fixed-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    border: 0.3em outset ${theme.border.color};
    z-index: -1;
  }

  .glow-1, .glow-2, .glow-3 {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    z-index: -1;
    /* opacity: 0.5; */
    border-width: 8px;
    border-style: double inset;
    animation: rotating 24s linear infinite;
  }
  .glow-1 {
    animation-delay: 0s;
    border-color: ${theme.primary.color};
  }
  .glow-2 {
    animation-delay: -8s;
    border-color: ${theme.secondary.color};
  }
  .glow-3 {
    animation-delay: -16s;
    border-color: ${theme.fadeText};
  }
`


// for all timezones
const getDateOfTimeZone = (description: string) => {
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale
  // We need to convert current time to the time in this timezone
  const date = new Date().toLocaleString(userLocale, { timeZone: description })
  return date.toString()
}



const trimUrl = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')
}

const NowCard = (props: { card: NowCardData }) => {
  // import IconAccessibility from '~icons/carbon/accessibility'
  // import IconAccountBox from '~icons/mdi/account-box'
  const nowIcons: Record<NowCardType, () => JSX.Element> = {
    'project': () => <IconProject />,
    'location': () => <IconLocation />,
    'spotify': () => <IconSpotify />,
    'collab': () => <IconCollab />,
  }

  return <ItemWrapper>
    <div class="icon">
      {nowIcons[props.card.type]()}
    </div>
    <div class="item-content">
      <Show when={props.card.label}>
        <p class="item-label">{props.card.label}</p>
      </Show>
      <Switch>
        <Match when={props.card.type === "project" || props.card.type === "collab"}>
          <h2>{props.card.title}</h2>
          <Show when={props.card.description}>
            <p>{props.card.description}</p>
          </Show>
          <Show when={props.card.url}>
            <p><a href={props.card.url} class="url">
              <IconLink />
              {trimUrl(props.card.url!)}
            </a>
            </p>
          </Show>
        </Match>

        <Match when={props.card.type === "location"}>
          <h2>{props.card.title}</h2>
          <Show when={props.card.description}>
            <p aria-live="off">
              <Updated newVal={() => getDateOfTimeZone(props.card.description!)} refreshInterval={100} />
            </p>
          </Show>
        </Match>

        <Match when={props.card.type === "spotify"}>
          <Show when={props.card.title}>
            <h2>
              <Show when={props.card.url}>
                <a href={props.card.url}> {props.card.title} </a>
              </Show>
              <Show when={!props.card.url}>
                {props.card.title}
              </Show>
            </h2>
          </Show>
        </Match>
      </Switch>
    </div>
  </ItemWrapper >
}

export const Now = () => {
  return (
    <div>
      <Masonry
        minColumns={1}
        maxColumns={3}
        colWidth={400}
        gap={2}
      >
        <Show when={data.photo}>
          <ProfileImage >
            <img
              style={{
                // width: '100%',
                'max-width': '30em',
                // height: '100%',
                'max-height': '30em',
              }}
              src={data.photo} alt={data.photoAlt} title={data.photoAlt} />
            {/* <img src={'/logo.svg'} alt={data.photoAlt} title={data.photoAlt} /> */}
            <div class="fixed-ring" />
            <div class="glow-1" />
            <div class="glow-2" />
            <div class="glow-3" />
            <div style={{ width: 'var(--scale2)', height: 'var(--scale2)', position: 'absolute', border: '1px solid black' }} />
          </ProfileImage>
        </Show>
        <ItemWrapper class="items-intro">
          <div class="item-content">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
        </ItemWrapper>
        <For each={data.cards}>
          {(card) => (
            <NowCard card={card} />
          )}
        </For>
      </Masonry>
    </div>
  )
}
