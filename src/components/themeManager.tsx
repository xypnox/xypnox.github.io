import { createEffect } from "solid-js";
import { themeState } from "./themeManager/themeState";
import { styled } from "solid-styled-components";

const updateThemeStyle = (themeCss: string) => {
  // Find style element with id _themeVars
  let style = document.getElementById('_themeVars') as HTMLStyleElement;
  if (!style) {
    return;
  } else {
    // Update style element with new theme variables
    style.innerHTML = `
      :root {
        ${themeCss}
      }
    `
  }
}

const ManagerWrapper = styled('div')`
  pointer-events: all;
  display: flex;
`

export const ThemeManager = () => {

  createEffect(() => {
    const theme = themeState.cssTheme;
    updateThemeStyle(theme());
  })

  return (
    <ManagerWrapper>
      <h1>Theme Manager</h1>
      <div>
        <h2>Theme</h2>
        <button onClick={() => themeState.changeTheme('Studio')}>Brutalist</button>
        <button onClick={() => themeState.changeTheme('Brutalist')}>Brutalist</button>
      </div>
      <div>
        <h2>Mode</h2>
        <button onClick={() => themeState.changeMode('light')}>Light</button>
        <button onClick={() => themeState.changeMode('dark')}>Dark</button>
      </div>
    </ManagerWrapper>
  )
}


