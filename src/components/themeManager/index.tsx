import { createEffect } from "solid-js";
import { themeState } from "./themeState";
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
  flex-direction: column;
  gap: 2rem;

  h2 {
    margin: 0;
    font-size: var(--font-size-base);
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: var(--font-size-base);
    border: none;
    background: var(--surface);
    color: var(--text);
    transition: all 0.2s ease;
    font-family: inherit;
  }

  button:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }
`

const ButtonRow = styled('div')`
  display: flex;
  gap: 1rem;
`

const ThemeManager = () => {

  createEffect(() => {
    const theme = themeState.cssTheme;
    updateThemeStyle(theme());
  })

  const changeTheme = (theme: string) => {
    const root = document.documentElement;
    root.style.transition = 'all 0.5s ease';

    themeState.changeTheme(theme);
    setTimeout(() => {
      root.style.transition = '';
    }, 500);
  }

  const changeMode = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    // Set transition to all elements on the page ease * { }
    root.style.transition = 'all 0.5s ease';
    themeState.changeMode(mode);
    setTimeout(() => {
      root.style.transition = '';
    }, 500);
  }

  return (
    <ManagerWrapper>
      <div>
        <h2>Theme</h2>
        <ButtonRow>
          <button onClick={() => changeTheme('Studio')}>Studio</button>
          <button onClick={() => changeTheme('Brutalist')}>Brutalist</button>
        </ButtonRow>
      </div>
      <div>
        <h2>Mode</h2>
        <ButtonRow>
          <button onClick={() => changeMode('light')}>Light</button>
          <button onClick={() => changeMode('dark')}>Dark</button>
        </ButtonRow>
      </div>
    </ManagerWrapper>
  )
}

export default ThemeManager
