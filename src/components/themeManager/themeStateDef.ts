import { createMemo, on } from "solid-js";
import { createStoredStore } from "../../utils/localStore";
import { themeVars } from "../../theme";

import type { ThemeVars } from "../../theme";
import { flattenObject } from "../../lib/objects";


type ThemeMode = 'light' | 'dark'

interface UITheme {
  name: string;
  vars: Record<ThemeMode, ThemeVars>;
}


const defaultThemes: UITheme[] = [
  {
    name: 'Studio',
    vars: {
      light: {
        ...themeVars,
      },
      dark: {
        ...themeVars,
      }
    }
  },
  {
    name: 'Brutalist',
    vars: {
      light: {
        ...themeVars,
        card: {
          ...themeVars.card,
          background: '#ffffff50',
          border: '2px solid #999',
          borderHover: '2px solid #666'
        },
        font: {
          family: 'Iosevka Term, sans-serif',
          size: themeVars.font.size
        },
        primary: {
          color: '#4e6bdc',
          contrast: '#ffffff',
        },

        secondary: {
          color: '#ff5370',
        },

        colors: {
          purple: '#569867',
        },

        background: '#f2f0f8',
        surface: '#ffffff50',

        border: '#00000020',

        heading: '#000000',
        text: '#333333',
        fadeText: '#666666',
      },
      dark: {
        ...themeVars,
      }
    }
  }
]

const cssConverter = (theme: UITheme, mode: ThemeMode) => {
  const cssVars = flattenObject(theme.vars[mode], (keys: string[], value: string) => [
    `${keys.join("-")}`,
    value,
  ]);
  const cssVarsString = Object.entries(cssVars).map(([key, value]) => {
    return `--${key}: ${value};`
  }).join('\n');
  console.log({ cssVarsString })
  return cssVarsString;
}


export const createThemeState = (initTheme?: 'Studio' | 'Brutalist', initMode?: ThemeMode) => {
  // const [theme, setTheme] = createStore<UITheme>({...(initTheme ?? defaultThemes[0])});

  const themesData = createStoredStore<UITheme[]>('themes', []);

  const themeConfig = createStoredStore<{
    mode: ThemeMode;
    theme: string;
  }>('themeConfig', {
    mode: initMode ?? 'light',
    theme: initTheme ?? 'Studio',
  });

  const theme = createMemo(() => {
    const themes = [...themesData.get(), ...defaultThemes];
    const config = themeConfig.get();
    const theme = themes.find(t => t.name === config.theme);
    if (!theme) {
      console.error(`Theme ${config.theme} is not available`);
      return themes[0];
    }
    return theme;
  });

  // const [currentMode, setCurrentMode] = createSignal<DefaultModes>(initMode ?? "dark");

  const cssTheme = createMemo(
    on(
      () => ({ config: themeConfig.get().mode, theme: theme() })
      , (v) => {
        console.log('generating cssTheme for themeState', { theme: theme(), v, currentMode: themeConfig.get().mode })
        return cssConverter(theme(), themeConfig.get().mode);
      }
    )
  );

  const debugLog = (theme: UITheme) => {
    console.log('Theme', JSON.stringify(theme, null, 2));
  };

  const changeTheme = (name: string) => {
    const themes = [...themesData.get(), ...defaultThemes];
    const newTheme = themes.find(t => t.name === name);
    if (!newTheme) {
      console.error(`Theme ${name} is not available`);
      return;
    }
    themeConfig.set({
      ...themeConfig.get(),
      theme: name,
    });
  }

  const changeMode = (mode: ThemeMode) => {
    if (mode !== 'dark' && mode !== 'light') {
      console.error(`Mode ${mode} is not available`);
      return;
    }
    themeConfig.set({
      ...themeConfig.get(),
      mode,
    });
  }

  return {
    theme,
    changeTheme,
    changeMode,
    themesData,
    cssTheme,
    debugLog,
  }
}

