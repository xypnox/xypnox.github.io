import { Portal } from "solid-js/web"
import { icons } from "../icons"
import { createSignal, onCleanup, onMount } from "solid-js"

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
    // console.log("Saving last playing timestamp")
    if (playing()) localStorage.setItem(lastPlayingTimestampKey, new Date().getTime().toString())
  }

  onMount(() => {
    const lastPlayingTimestamp = localStorage.getItem(lastPlayingTimestampKey)
    console.log("Last playing timestamp", { lastPlayingTimestamp })
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
        // Pause audio if it was playing before
        pauseAudio()
      } else {
        // Start playing audio if it was playing before
        if (playing()) playAudio(true)
      }
      saveLastPlayingTimestamp()
    })
  })

  let interval: NodeJS.Timeout | undefined = setInterval(saveLastPlayingTimestamp, 10000)

  onCleanup(() => {
    if (interval) clearInterval(interval)
  })

  //pr = play repeat only
  const playAudio = async (pr = false) => {
    intro.volume = 0.5
    repeat.volume = 0.5
    if (pr) {
      try {
        intro.pause()
        repeat.loop = true
        return repeat.play()
      } catch (e) {
        console.error("Failed to play audio", e)
        throw new Error("Failed to play audio")
      }
    }
    intro.onended = () => {
      repeat.loop = true
      repeat.play()
    }
    return intro.play()
  }

  const pauseAudio = () => {
    intro.pause()
    repeat.pause()
    localStorage.removeItem(lastPlayingTimestampKey)
  }

  const toggleAudio = () => {
    if (playing()) {
      pauseAudio()
    } else {
      playAudio()
      saveLastPlayingTimestamp()
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
        <audio ref={intro!} src={audiotracks.intro} preload="metadata" />
        <audio ref={repeat!} src={audiotracks.repeat} preload="metadata" />
      </Portal>
    </>
  )
}
