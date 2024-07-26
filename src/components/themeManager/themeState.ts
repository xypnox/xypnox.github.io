import { cssConverter, generateThemeFromPalette } from "../../theme";
import { defaultThemePalette } from "../../theme";
import { showcaseThemes } from "./showcaseThemes";
import { createThemeState } from "./themeStateDef";

export const themeState = createThemeState(
  'xypnox',
  showcaseThemes,
  generateThemeFromPalette,
  cssConverter,
  defaultThemePalette,
  'dark'
);
