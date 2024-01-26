import { createEffect, createMemo, on } from "solid-js";
import { createStoredStore, setLocalStorage } from "../../utils/localStore";

import { flattenObject } from "../../lib/objects";
import { defaultThemes, type ThemeMode, type UITheme } from "../../theme"

const cssConverter = (theme: UITheme, mode: ThemeMode) => {
  const cssVars = flattenObject(theme.vars[mode], (keys: string[], value: string) => [
    `${keys.join("-")}`,
    value,
  ]);
  const cssVarsString = Object.entries(cssVars).map(([key, value]) => {
    return `--${key}: ${value};`
  }).join('\n');
  // console.log({ cssVarsString })
  return cssVarsString;
}


export const createThemeState = (initTheme?: 'Studio' | 'Brutalist', initMode?: ThemeMode) => {
  const themesData = createStoredStore<UITheme[]>('themes', []);

  const themeConfig = createStoredStore<{
    mode: ThemeMode;
    theme: string;
  }>('themeConfig', {
    mode: initMode ?? 'light',
    theme: initTheme ?? 'Studio',
  });

  const themes = createMemo(() => {
    return [...themesData.get(), ...defaultThemes];
  });

  const theme = createMemo(() => {
    const config = themeConfig.get();
    const theme = themes().find(t => t.name === config.theme);
    if (!theme) {
      console.error(`Theme ${config.theme} is not available`);
      return themes()[0];
    }
    return theme;
  });

  const cssTheme = createMemo(
    on(
      () => ({ config: themeConfig.get().mode, theme: theme() })
      , (v) => {
        // console.log('generating cssTheme for themeState', { theme: theme(), v, currentMode: themeConfig.get().mode })
        return cssConverter(theme(), themeConfig.get().mode);
      }
    )
  );

  createEffect(() => {
    setLocalStorage('xypnoxCssTheme', cssTheme());
  })

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
  }
}

