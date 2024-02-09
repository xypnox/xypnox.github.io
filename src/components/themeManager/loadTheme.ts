import type { ThemePalette } from "../../theme";
import { THEME_MANAGER_VERSION } from "./version";

const themeCss = localStorage.getItem("xypnoxCssTheme");
let style = document.getElementById("_themeVars");

if (style && themeCss) {
  const themeString = JSON.parse(themeCss);
  const themeConfig = localStorage.getItem("xypnox-themeConfig");
  if (themeConfig) {
    const conf = JSON.parse(themeConfig);
    const version = conf.version;
    if (version && version === THEME_MANAGER_VERSION) {
      if (themeString) style.innerHTML = themeString;
    } else {
      console.log("Theme Manager outdated, not loading theme, setting version");
      localStorage.setItem("xypnox-themeConfig", JSON.stringify({ ...conf, version: THEME_MANAGER_VERSION }));
    }
  }
}

(() => {
  const themeConfig = localStorage.getItem("xypnox-themeConfig");

  if (themeConfig) {
    const conf = JSON.parse(themeConfig);
    // console.log({ conf });
    if (conf && conf.mode) {
      const mode = conf.mode;
      const root = document.documentElement;
      if (mode === "auto") {
        // Remove both classes
        root.classList.remove("dark-mode");
        root.classList.remove("light-mode");
      } else if (mode === "light") {
        root.classList.remove("dark-mode");
        root.classList.add("light-mode");
      } else if (mode === "dark") {
        root.classList.remove("light-mode");
        root.classList.add("dark-mode");
      }
    }
  }

  const themes = localStorage.getItem("xypnox-themes");

  if (themes && themeConfig) {
    const themesPalette = JSON.parse(themes);
    const themeConfigPalette = JSON.parse(themeConfig);
    // find theme from config in palettes
    const theme = themesPalette.find(
      (theme: ThemePalette) => theme.id === themeConfigPalette.theme,
    );
    if (!theme) return;
    const fontFamily = theme.base.font.family;
    // console.log({ theme, fontFamily });

    const getFirstFont = (style: string) => {
      const font = style.split(",")[0];
      return font.replace(/"/g, "");
    };
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${getFirstFont(
      fontFamily,
    )}:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap`;
    link.rel = "stylesheet";
    link.classList.add("_fontFamily");
    document.head.appendChild(link);
  }
})();
