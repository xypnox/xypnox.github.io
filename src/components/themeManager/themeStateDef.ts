import { createEffect, createMemo, createSignal, on, onMount } from "solid-js";
import { createStoredStore, parseLocalStorage, setLocalStorage } from "../../utils/localStore";

import { generateThemeFromPalette, type ThemeMode, type ThemePalette, defaultPalettes, cssConverter } from "../../theme"
import { THEME_MANAGER_VERSION } from "./version";

const getUserPreferenceMode = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export const createThemeState = (initTheme?: 'default_aster' | 'default_brutalist', initMode?: ThemeMode) => {
  const themesData = createStoredStore<ThemePalette[]>('xypnox-themes', []);

  const defaultConfig = {
    mode: initMode ?? 'auto',
    theme: initTheme ?? 'default_aster',
    debug: false,
    version: THEME_MANAGER_VERSION,
  }

  const themeConfig = createStoredStore<{
    mode: ThemeMode;
    theme: string;
    debug: boolean;
    version: number;
  }>('xypnox-themeConfig', {
    mode: initMode ?? 'auto',
    theme: initTheme ?? 'default_aster',
    debug: false,
    version: THEME_MANAGER_VERSION,
  }); // This is the default configuration

  // If it is a old version, we need to update it, for now the structure remains same for config, no need to update it,
  // and the css generators are functions that are updated as new version is shipped

  onMount(() => {
    const localConf = parseLocalStorage('xypnox-themeConfig', defaultConfig);
    if (localConf.version !== THEME_MANAGER_VERSION) {
      console.log("Theme Manager version mismatch, Updating version.", {
        localVersion: localConf.version,
        currentVersion: THEME_MANAGER_VERSION,
      });
      setLocalStorage('xypnox-themeConfig', {
        ...localConf,
        version: THEME_MANAGER_VERSION,
      });
    }
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
      () => ({ theme: theme() })
      , (v) => {
        // console.log('generating cssTheme for themeState', { theme: theme(), v, currentMode: themeConfig.get().mode })
        // console.log('generating cssTheme for themeState', { v })
        return cssConverter(v.theme);
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
    if (mode !== 'dark' && mode !== 'light' && mode !== 'auto') {
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

  const [themeMode, setThemeMode] = createSignal(initMode === 'auto' ? getUserPreferenceMode() : initMode ?? 'light');

  createEffect((): 'light' | 'dark' => {
    // console.log('themeMode', { themeConfig: themeConfig.get() })
    const curMode = themeConfig.get().mode
    if (curMode === 'auto') {
      return setThemeMode(getUserPreferenceMode());
    } else {
      return setThemeMode(curMode);
    }
  });

  const setDebugMode = (debug: boolean) => {
    themeConfig.set({
      ...themeConfig.get(),
      debug,
    });
  }

  return {
    theme,
    themes,
    themeMode,
    setThemeMode,
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

