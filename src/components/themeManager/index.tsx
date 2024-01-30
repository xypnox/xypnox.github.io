import { For, Show, createEffect, createSignal } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { defaultThemePalette, generateThemeFromPalette, theme } from "../../theme";
import { defaultThemes } from "../../theme";
import { capitalize } from "../../lib/text";
import { generateName } from "../../lib/nameGen";
import { ThemeEditor } from "./editor";
import { nanoid } from "nanoid";

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
  background: linear-gradient(45deg, ${theme.border.color} 25%, ${theme.surface} 25%, ${theme.surface} 50%, ${theme.border.color} 50%, ${theme.border.color} 75%, ${theme.surface} 75%, ${theme.surface});
  color: ${theme.primary.color};
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

  h3 {
    margin: 0;
    font-size: ${theme.font.size.base};
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0;
    font-size: ${theme.font.size.md};
  }

`

const Button = styled('button')`
    padding: 0.5rem 1rem;
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.size.base};
    border: 1px solid transparent;
    background: ${theme.surface};
    color: ${theme.text};
    transition: all 0.2s ease;
    font-family: inherit;

  &.active {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }
`;

const ButtonRow = styled('div')`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`

const ThemeManager = () => {
  const [editing, setEditing] = createSignal(false);
  createEffect(() => {
    const theme = themeState.cssTheme;
    updateThemeStyle(theme());
  })

  // const changeTheme = (theme: string) => {
  //   const root = document.documentElement;
  //   // root.style.transition = 'all 0.5s ease';
  //   document.body.classList.add('all-transition');

  //   themeState.changeTheme(theme);
  //   setTimeout(() => {
  //     // root.style.transition = '';
  //     document.body.classList.remove('all-transition');
  //   }, 500);
  // }

  // const changeMode = (mode: 'light' | 'dark') => {
  //   // document.body.classList.add('all-transition');
  //   themeState.changeMode(mode);
  //   // setTimeout(() => {
  //   //   document.body.classList.remove('all-transition');
  //   // }, 500);
  // }

  const newTheme = () => {
    // Generate 10 names
    // const names = Array.from({ length: 10 }, () => generateName());
    // console.log('New Theme', { names });

    const themeName = generateName();

    // const theme = generateThemeFromPalette(themeName, nanoid(), defaultThemePalette);

    const themeId = nanoid();
    const deepCloned = JSON.parse(JSON.stringify(defaultThemePalette));
    themeState.addTheme({
      ...deepCloned,
      id: themeId,
      name: themeName,
    });
    // console.log('New Theme', { themeName, theme });
    themeState.changeTheme(themeId);
  }

  // createEffect(() => {
  //   console.log('Theme State', {
  //     themeState,
  //     name: themeState.theme.name,
  //   })
  // })

  return (
    <ManagerWrapper>
      <ButtonRow>
        <h2>Customize</h2>
        <WIPTag>
          <iconify-icon icon="ph:traffic-cone-duotone"></iconify-icon>
          Work In Progress
        </WIPTag>
      </ButtonRow>
      <Show when={!editing()}>
        <ButtonRow>
          <Button onClick={() => newTheme()}>New Theme</Button>
          <Show when={!themeState.isThemeDefault()}>
            <Button onClick={() => setEditing(!editing())}>Edit</Button>
          </Show>
        </ButtonRow>
        <div>
          <h3>Theme</h3>
          <ButtonRow>
            <For each={themeState.themes()}>
              {theme => (
                <Button
                  // class={`${theme.name === themeState.theme().name ? 'active' : ''}`}
                  classList={{
                    active: themeState.theme().name === theme.name
                  }}
                  onClick={() => themeState.changeTheme(theme.id)}>{theme.name}</Button>
              )}
            </For>
          </ButtonRow>
        </div>
      </Show>
      <Show when={editing()}>
        <ThemeEditor
          closeEditor={() => setEditing(false)}
        />
      </Show>
      <div>
        <h3>Mode</h3>
        <ButtonRow>
          <For each={['light', 'dark'] as const}>
            {mode => (
              <Button onClick={() => themeState.changeMode(mode)}>{capitalize(mode)}</Button>
            )}
          </For>
        </ButtonRow>
      </div>
      {/* <Show when={!themeState.isThemeDefault()}> */}
      {/* </Show> */}
    </ManagerWrapper>
  )
}

export default ThemeManager
