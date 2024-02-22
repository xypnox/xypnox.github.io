import { cssConverter, generateThemeFromPalette } from "../../theme";
import { defaultPalettes } from "../../theme";
import { createThemeState } from "./themeStateDef";

export const themeState = createThemeState(
  'xypnox',
  defaultPalettes,
  generateThemeFromPalette,
  cssConverter,
  'default_aster',
  'dark'
);
