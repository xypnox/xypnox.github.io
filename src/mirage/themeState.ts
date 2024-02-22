import { defaultPalettes, generateThemeFromPalette, cssConverter } from "./theme";
import { createThemeState } from "../components/themeManager/themeStateDef";


export const mirageThemeState = createThemeState(
  'mirage',
  defaultPalettes,
  generateThemeFromPalette,
  cssConverter,
  'default_mirage', 'dark');
