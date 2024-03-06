import { Portal } from "solid-js/web"
import { icons } from "../icons"
import { createSignal } from "solid-js"

const audiotracks = {
  intro: '/coverless-book-intro.ogg',
  repeat: '/coverless-book-repeat.ogg',
}

const [playing, setPlaying] = createSignal(false)

export const AudioButton = () => {
  let intro: HTMLAudioElement;
  let repeat: HTMLAudioElement;

  const playAudio = () => {
    intro.volume = 0.5
    repeat.volume = 0.5
    intro.play()
    intro.onended = () => {
      repeat.loop = true
      repeat.play()
    }
  }

  const pauseAudio = () => {
    intro.pause()
    repeat.pause()
  }

  const toggleAudio = () => {
    if (playing()) {
      pauseAudio()
    } else {
      playAudio()
    }
    setPlaying(p => !p)
  }

  return (
    <>
      <button class="navButton" id="audioButton"
        aria-label={playing() ? "Pause audio" : "Play audio"}
        classList={{ playing: playing() }}
        onClick={() => toggleAudio()}
      >
        <iconify-icon icon={
          playing() ? icons.music : icons["musicMute"]
        }></iconify-icon>
      </button>
      <Portal>
        <audio ref={intro!} src={audiotracks.intro} preload="auto" />
        <audio ref={repeat!} src={audiotracks.repeat} preload="auto" />
      </Portal>
    </>
  )
}
