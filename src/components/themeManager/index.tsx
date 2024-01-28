import { For, createEffect } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { theme } from "../../theme";
import { defaultThemes } from "../../theme";
import { capitalize } from "../../lib/text";

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

const WIPTag = styled('span')`
  background: ${theme.primary.color};
  color: ${theme.primary.contrast};
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.border.radius};
  font-size: ${theme.font.size.sm};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: max-content;
  iconify-icon {
    font-size: ${theme.font.size.base};
  }
`

const ManagerWrapper = styled('div')`
  width: 100%;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    margin: 0;
    font-size: ${theme.font.size.base};
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.size.base};
    border: none;
    background: ${theme.surface};
    color: ${theme.text};
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
  flex-wrap: wrap;
`

const ThemeManager = () => {

  createEffect(() => {
    const theme = themeState.cssTheme;
    updateThemeStyle(theme());
  })

  const changeTheme = (theme: string) => {
    const root = document.documentElement;
    // root.style.transition = 'all 0.5s ease';
    document.body.classList.add('all-transition');

    themeState.changeTheme(theme);
    setTimeout(() => {
      // root.style.transition = '';
      document.body.classList.remove('all-transition');
    }, 500);
  }

  const changeMode = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    // Set transition to all elements on the page ease * { }
    // root.style.transition = 'all 0.5s ease';
    document.body.classList.add('all-transition');
    themeState.changeMode(mode);
    setTimeout(() => {
      // root.style.transition = '';
      document.body.classList.remove('all-transition');
    }, 500);
  }

  return (
    <ManagerWrapper>
      <div>
        <WIPTag>
          <iconify-icon icon="ph:traffic-cone-duotone"></iconify-icon>
          Work In Progress
        </WIPTag>
      </div>
      <div>
        <h2>Theme</h2>
        <ButtonRow>
          <For each={defaultThemes}>
            {theme => (
              <button onClick={() => changeTheme(theme.name)}>{theme.name}</button>
            )}
          </For>
        </ButtonRow>
      </div>
      <div>
        <h2>Mode</h2>
        <ButtonRow>
          <For each={['light', 'dark'] as const}>
            {mode => (
              <button onClick={() => changeMode(mode)}>{capitalize(mode)}</button>
            )}
          </For>
        </ButtonRow>
      </div>
    </ManagerWrapper>
  )
}

export default ThemeManager
