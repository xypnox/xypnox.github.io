import { Portal } from "solid-js/web"
import { icons } from "../icons"
import { createSignal, onMount } from "solid-js"

const lastPlayingTimestampKey = "xyp-lastPlayingTimestamp"

const audiotracks = {
  intro: '/coverless-book-intro.ogg',
  repeat: '/coverless-book-repeat.ogg',
}

const [playing, setPlaying] = createSignal(false)

export const AudioButton = () => {
  let intro: HTMLAudioElement;
  let repeat: HTMLAudioElement;

  const saveLastPlayingTimestamp = () => {
    localStorage.setItem(lastPlayingTimestampKey, new Date().getTime().toString())
  }

  onMount(() => {
    const lastPlayingTimestamp = localStorage.getItem(lastPlayingTimestampKey)
    if (lastPlayingTimestamp) {
      const now = new Date().getTime()
      const diff = now - parseInt(lastPlayingTimestamp)
      // We want to only play repeat 
      // if difference is less than 1 hour
      setTimeout(() => {
        if (diff < 60 * 60 * 1000) {
          console.log("Playing audio")
          playAudio(true)
            .then(() => setPlaying(true))
            .catch(e => console.error('Audio could not be played automatically:', e))
        }
      }, 200)
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (playing()) saveLastPlayingTimestamp()
        pauseAudio()
      }
    })

    document.addEventListener("beforeunload", () => {
      if (playing()) saveLastPlayingTimestamp()
    })
  })

  //pr = play repeat only
  const playAudio = async (pr = false) => {
    if (pr) {
      try {
        console.log("Playing audio")
        intro.pause()
        repeat.loop = true
        console.log("Playing repeat")
        return repeat.play()
      } catch (e) {
        console.error("Failed to play audio")
        throw new Error("Failed to play audio")
      }
    }
    intro.volume = 0.5
    repeat.volume = 0.5
    intro.onended = () => {
      repeat.loop = true
      repeat.play()
    }
    return intro.play()
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
