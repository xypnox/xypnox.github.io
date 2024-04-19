import { createSignal } from "solid-js"
import { styled } from "solid-styled-components"

// Link and name of youtube streams
const streams: YtStream[] = [
  {
    name: 'Lo-fi Hip Hop Radio - Beats to Relax/Study to',
    id: 'jfKfPfyJRdk'
  }
]

type YtStream = {
  name: string
  id: string
}

const getEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=0&amp;mute=0&amp;controls=0&amp;origin=https%3A%2F%2Fwww.lofi.cafe&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=true&amp;color=black&amp;enablejsapi=1&amp;widgetid=1`

const HiddenFrame = styled('div')`
  display: block;
  position: relative;
  width: 0px;
  height: 0px;
  opacity: 0;
  overflow: hidden;
`

const YtEmbed = (props: { stream: YtStream }) => {
  return (
    <HiddenFrame>
      <iframe
        id="ytplayer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title={props.stream.name}
        width="100%" height="100%"
        src={getEmbedUrl(props.stream.id)}
      ></iframe>
    </HiddenFrame>
  )
}

const GifBackground = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.66;
`

const Controls = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
`

export const LoStream = () => {
  const [currentStream, setCurrentStream] = createSignal(streams[0]);

  return (
    <div>
      <Controls>
        <GifBackground src="/lofi/lofi-rainy-night-alley-cat.webp" />
        <div>
          <h1>{currentStream().name}</h1>
        </div>
        <YtEmbed stream={currentStream()} />
      </Controls>
    </div>
  )
}



