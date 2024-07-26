import { For, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { themeState } from "./themeState";
import { keyframes, styled } from "solid-styled-components";
import { theme, type ThemeMode, type ThemePalette } from "../../theme";
import { generateName } from "../../lib/nameGen";
import { ThemeEditor } from "./editor";
import { nanoid } from "nanoid";
import { icons } from "../icons";
import ModeSwitcher from "./modeSwitcher";
import { stripChar } from "../../lib/text";

const attachFontLink = (newFamily: string) => {
  const existingLinks = document.getElementsByClassName('_fontFamily');
  const doesLinkExist = Array.from(existingLinks).some(link => {
    const href = (link as HTMLLinkElement).href;
    const encondedFont = href.split('=')[1].split(':')[0];
    const font = decodeURIComponent(encondedFont);
    return font == newFamily;
  });
  if (doesLinkExist) {
    return;
  }
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${(newFamily)}:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600`;
  link.rel = 'stylesheet';
  link.classList.add('_fontFamily');
  document.head.appendChild(link);
}

// element Classes .dark-mode .light-mode
const updateThemeMode = (mode: ThemeMode) => {
  const root = document.documentElement;
  if (mode === 'auto') {
    root.classList.remove('dark-mode');
    root.classList.remove('light-mode');
  } else if (mode === 'light') {
    root.classList.remove('dark-mode');
    root.classList.add('light-mode');
  } else if (mode === 'dark') {
    root.classList.remove('light-mode');
    root.classList.add('dark-mode');
  }
}

const updateThemeStyle = (themeCss: string) => {
  // Find style element with id _themeVars
  let style = document.getElementById('_themeVars') as HTMLStyleElement;
  if (!style) {
    return;
  } else {
    // Update style element with new theme variables
    style.innerHTML = themeCss;
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
    text-decoration: none;
    gap: 0.5rem;
    color: ${theme.fadeText};
    padding: 0.5rem 0.75rem;
    font-size: ${theme.font.size.sm};
    border-radius: ${theme.border.radius};
    background: ${theme.surface};
    iconify-icon {
      font-size: ${theme.font.size.base};
    }
    &:hover {
      color: ${theme.text};
    }
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

  display: flex;
  align-items: center;
  gap: 0.25rem;

  &.active {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }
`;

const ThemeButtonEl = styled(Button)`
  gap: 0.5em;
  svg {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
`

const ButtonRow = styled('div')`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`

const slideDown = keyframes`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`

const ErrorMessage = styled('div')`
  color: ${theme.secondary.color};
  background: ${theme.surface};
  padding: 1rem;
  border: 1px solid ${theme.border.color};
  border-radius: ${theme.border.radius};
  animation: ${slideDown} 0.1s ease-out forwards;
`

const ImportWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${theme.surface};
  border: 1px solid ${theme.border.color};
  padding: 1rem;
  border-radius: ${theme.border.radius};
  animation: ${slideDown} 0.1s ease-out forwards;
  h3 {
    margin: 0;
  }
`

const ImportPopup = (props: {
  close: () => void;
}) => {
  const [error, setError] = createSignal('');
  const listener = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData('text');
    if (text) {
      importTheme(text);
    }
  }

  onMount(() => {
    window.addEventListener('paste', listener);
  })

  onCleanup(() => {
    window.removeEventListener('paste', listener);
  });

  const importTheme = (text: string) => {
    // Read from clipboard
    // Parse JSON
    try {
      const theme: ThemePalette = JSON.parse(text);
      try {
        themeState.addTheme(theme);
      } catch (e) {
        setError(e as string);
        console.error('Error adding theme', e);
        return
      }
      themeState.changeTheme(theme.id);
      props.close();
    } catch (e) {
      if (e instanceof SyntaxError) {
        /// do nothing, JSON is wrong!
        // console.error('Error parsing JSON', e);
        setError('What\'s that JSON SON?');
      } else {
        console.error('Error importing theme', e);
        setError('Error importing theme');
      }
    }
  }

  return (
    <ImportWrapper>
      <h3>Import Theme</h3>
      Paste the theme palette's object to import theme.
      <Show when={error()}>
        <ErrorMessage>{error()}</ErrorMessage>
      </Show>
    </ImportWrapper>
  )
}

const ThemeButton = (props: {
  theme: ThemePalette;
  available?: boolean;
}) => {
  return (
    <ThemeButtonEl
      onClick={() => {
        if (props.available) {
          themeState.addTheme(props.theme);
          themeState.changeTheme(props.theme.id);
          return;
        }
        themeState.changeTheme(props.theme.id)
      }}
      classList={{ 'active': themeState.themeConfig.get().theme === props.theme.id }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill={props.theme.vars[themeState.themeMode()].background} />
        <circle cx="16" cy="16" r="8" fill={props.theme.vars[themeState.themeMode()].primary} />
      </svg>
      {props.theme.name}
    </ThemeButtonEl>
  )
}

interface Props {
  isPopup?: boolean;
}

const ThemeManager = (props: Props) => {
  const [editing, setEditing] = createSignal(false);
  const [showImport, setShowImport] = createSignal(false);
  // const [oldFont, setOldFont] = createSignal('');

  createEffect(() => {
    const theme = themeState.cssTheme;
    const newFont = themeState.themePalette().base.font.family;
    attachFontLink(stripChar(newFont, "\""));
    updateThemeStyle(theme());
  })

  createEffect(() => {
    const mode = themeState.themeConfig.get().mode;
    updateThemeMode(mode);
  })

  createEffect(() => {
    if (themeState.isThemeDefault()) {
      setEditing(false);
    }
  })

  createEffect(() => {
    if (editing() && showImport()) {
      setShowImport(false);
    }
  });

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
        </ButtonRow>
      </Show>
      <Show when={showImport()}>
        <ImportPopup close={() => setShowImport(false)} />
      </Show>
      <Show when={!editing()}>
        <ButtonRow>
          <Button onClick={() => newTheme()}>
            <iconify-icon icon={icons.new} />
            New Theme
          </Button>
          <Button onClick={() => setEditing(!editing())}>
            <iconify-icon icon={icons.edit} />
            Edit
          </Button>
          <Button onClick={() => setShowImport(i => !i)}>
            <iconify-icon icon={icons.import} />
            Import
          </Button>
        </ButtonRow>
        <div>
          <h3>Theme</h3>
          <h4>Local Themes</h4>
          <ButtonRow>
            <For each={themeState.themes()}>
              {theme => (<ThemeButton theme={theme} />)}
            </For>
          </ButtonRow>
          <Show when={themeState.availableThemes().length > 0}>
            <h4 style={{ 'width': '100%' }}>Available Themes</h4>
            <ButtonRow>
              <For each={themeState.availableThemes()}>
                {theme => (<ThemeButton available theme={theme} />)}
              </For>
            </ButtonRow>
          </Show>
        </div>
      </Show>
      <Show when={editing()}>
        <ThemeEditor
          closeEditor={() => setEditing(false)}
        />
      </Show>
      <Show when={!props.isPopup}>
        <ModeSwitcher />
      </Show>

      {/* <DebugModeButton /> */}
      {/* <Show when={!themeState.isThemeDefault()}> */}
      {/* </Show> */}
    </ManagerWrapper>
  )
}

export default ThemeManager
