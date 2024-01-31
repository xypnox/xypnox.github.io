import { createEffect } from "solid-js"
import { themeState } from "./themeState"
import { Button, ButtonGroup } from "../elements/atoms"
import { icons } from "../icons"

export const DebugModeButton = () => {
  const debugStyles = `html * { outline: 1px solid var(--border-color); }
    html *:hover { outline: 1px solid var(--primary-color); }`

  createEffect(() => {
    const debugVal = themeState.themeConfig.get().debug
    const prevStyle = document.getElementById('debug-styles')
    if (prevStyle) {
      if (!debugVal) {
        prevStyle.remove()
      } else { return }
    }
    if (debugVal) {
      const style = document.createElement('style')
      style.id = 'debug-styles'
      style.innerHTML = debugStyles
      document.head.appendChild(style)
    }
  })

  return <ButtonGroup>
    <Button onClick={() => { themeState.setDebugMode(!themeState.themeConfig.get().debug) }}
    >
      <iconify-icon icon={icons.debug} />
      Debug Mode
    </Button>
  </ButtonGroup>
}

