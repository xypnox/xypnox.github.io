import { createEffect } from "solid-js"
import { themeState } from "./themeState"
import { Button, ButtonGroup } from "../elements/atoms"

export const DebugModeButton = () => {
  const debugStyles = `html * { outline: 1px solid var(--border-color); }
    html *:hover { outline: 1px solid var(--primary-color); }`

  createEffect(() => {
    if (themeState.themeConfig.get().debug) {
      const style = document.createElement('style')
      style.id = 'debug-styles'
      style.innerHTML = debugStyles
      document.head.appendChild(style)
    } else {
      const prevStyle = document.getElementById('debug-styles')
      if (prevStyle) {
        prevStyle.remove()
      }
    }
  })

  return <ButtonGroup>
    <Button
      classList={{
        active: themeState.themeConfig.get().debug
      }}
      onClick={() => {
        themeState.setDebugMode(!themeState.themeConfig.get().debug)
      }}
    >
      Debug Mode
    </Button>
  </ButtonGroup>
}

