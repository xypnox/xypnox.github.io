import { For, Show, createEffect, createSignal } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { theme, type ThemePalette } from "../../theme";
import { capitalize } from "../../lib/text";
import { generateName } from "../../lib/nameGen";
import { ThemeEditor } from "./editor";
import { nanoid } from "nanoid";
import { icons } from "../icons";

const updateThemeStyle = (themeCss: string, palette: ThemePalette) => {
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

  const getFirstFont = (style: string) => {
    const font = style.split(',')[0];
    return font.replace(/"/g, '');
  }
  if (palette.base.font.family) {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${getFirstFont(palette.base.font.family)}:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap`;
    link.rel = 'stylesheet';
    link.id = '_fontFamily';
    document.head.appendChild(link);
  }
}

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

  .guide-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${theme.text};
    padding: 0.5rem 1rem;
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.size.sm};
    iconify-icon {
      font-size: ${theme.font.size.base};
    }
    border: 1px solid ${theme.border.color};
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

interface Props {
  isPopup?: boolean;
}

const ThemeManager = (props: Props) => {
  const [editing, setEditing] = createSignal(false);
  createEffect(() => {
    const theme = themeState.cssTheme;
    updateThemeStyle(theme(), themeState.themePalette());
  })

  const newTheme = () => {
    // Generate 10 names
    // const names = Array.from({ length: 10 }, () => generateName());
    // console.log('New Theme', { names });

    const themeName = generateName();

    // const theme = generateThemeFromPalette(themeName, nanoid(), defaultThemePalette);

    const themeId = nanoid();
    const deepCloned = JSON.parse(JSON.stringify(themeState.themePalette()));
    themeState.addTheme({
      ...deepCloned,
      id: themeId,
      name: themeName,
    });
    // console.log('New Theme', { themeName, theme });
    themeState.changeTheme(themeId);
    setEditing(true);
  }

  return (
    <ManagerWrapper>
      <Show when={props.isPopup}>
        <ButtonRow>
          <h2>Customize</h2>
          <a class="guide-link" href="/customize">
            <iconify-icon icon={icons.guide} />
            Guide
          </a>
          <span class="wip-tag">
            <iconify-icon icon={icons.wip} />
            Work In Progress
          </span>
        </ButtonRow>
      </Show>
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
