import { createEffect, createMemo, createSignal, on } from "solid-js";
import { createStoredStore, setLocalStorage } from "../../utils/localStore";

import { flattenObject } from "../../lib/objects";
import { generateThemeFromPalette, deepMerge, type ThemeMode, type ThemePalette, type UITheme, defaultPalettes } from "../../theme"

const cssConverter = (theme: UITheme, mode: ThemeMode) => {
  const cssVars = flattenObject(deepMerge(theme.vars[mode], theme.base), (keys: string[], value: string) => [
    `${keys.join("-")}`,
    value,
  ]);
  const cssVarsString = Object.entries(cssVars).map(([key, value]) => {
    return `--${key}: ${value};`
  }).join('\n');
  // console.log({ cssVarsString })
  return cssVarsString;
}


export const createThemeState = (initTheme?: 'default_aster' | 'default_brutalist', initMode?: ThemeMode) => {
  const themesData = createStoredStore<ThemePalette[]>('xypnox-themes', []);

  const themeConfig = createStoredStore<{
    mode: ThemeMode;
    theme: string;
    debug: boolean;
  }>('xypnox-themeConfig', {
    mode: initMode ?? 'dark',
    theme: initTheme ?? 'default_aster',
    debug: false,
  });

  const themes = createMemo(() => {
    return [...themesData.get(), ...defaultPalettes];
  });

  const themePalette = createMemo(() => {
    const config = themeConfig.get();
    let themePalette = themes().find(t => t.id === config.theme);
    if (!themePalette) {
      console.error(`Theme ${config.theme} is not available`);
      themePalette = defaultPalettes[0];
    }
    return themePalette;
  })

  const theme = createMemo(() => {
    const theme = generateThemeFromPalette(themePalette());
    return theme;
  });

  const cssTheme = createMemo(
    on(
      () => ({ mode: themeConfig.get().mode, theme: theme() })
      , (v) => {
        // console.log('generating cssTheme for themeState', { theme: theme(), v, currentMode: themeConfig.get().mode })
        // console.log('generating cssTheme for themeState', { v })
        return cssConverter(v.theme, v.mode);
      }
    )
  );

  createEffect(() => {
    setLocalStorage('xypnoxCssTheme', cssTheme());
  })


  const changeTheme = (id: string) => {
    const newTheme = themes().find(t => t.id === id);
    if (!newTheme) {
      console.error(`Theme ${id} is not available`);
      return;
    }
    themeConfig.set({
      ...themeConfig.get(),
      theme: id,
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

  // is the current theme one of the default theme?
  const isThemeDefault = createMemo(() => {
    return defaultPalettes.some(t => t.id === theme().id);
  })

  const themeExists = (id: string) => {
    return themesData.get().some(t => t.id === id);
  }

  const addTheme = (theme: ThemePalette) => {
    const isDefault = defaultPalettes.some(t => t.id === theme.id);
    if (isDefault) {
      console.error(`Default theme cannot be added`);
      return Error(`Default theme cannot be added`);
    }
    const alreadyExists = themesData.get().some(t => t.id === theme.id);
    if (alreadyExists) {
      // console.error(`Theme already exists`);
      return Error(`Theme already exists`);
    }
    themesData.set([theme, ...themesData.get()]);
  }

  const deleteTheme = (id: string) => {
    themesData.set(themesData.get().filter(t => t.id !== id));
    if (themeConfig.get().theme === id) {
      themeConfig.set({
        ...themeConfig.get(),
        theme: themes()[0].id,
      })
    }
  }

  const modifyTheme = (id: string, theme: ThemePalette) => {
    const themes = [...themesData.get()];
    const index = themes.findIndex(t => t.id === id);
    if (index === -1) {
      console.error(`Theme ${id} is not available`);
      // return Error(`Theme ${id} is not available`);
    }
    themes[index] = theme;
    themesData.set(themes);
  }

  const setDebugMode = (debug: boolean) => {
    themeConfig.set({
      ...themeConfig.get(),
      debug,
    });
  }

  return {
    theme,
    themes,
    changeTheme,
    changeMode,
    themesData,
    addTheme,
    deleteTheme,
    cssTheme,
    modifyTheme,
    isThemeDefault,
    themeConfig,
    themePalette,
    themeExists,
    setDebugMode,
  }
}

