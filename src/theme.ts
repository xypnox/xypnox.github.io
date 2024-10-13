import { flattenObject, forObjectReplace } from "./lib/objects";

import tinycolor from "tinycolor2";

interface GeneratedTheme<T> {
  themeCss: string;
  theme: T;
}

export const generateTheme = <T extends Record<string, any>>(
  vars: T,
  prefix = "",
) => {
  const themeCssVars = flattenObject(vars, (keys, value) => [
    `${prefix}${keys.join("-")}`,
    value,
  ]);

  const theme = forObjectReplace(vars, (keys) => `var(--${keys.join("-")})`);

  const generated: GeneratedTheme<T> = {
    themeCss: `:root { ${Object.entries(themeCssVars)
      .map(([k, v]) => `--${k}: ${v};`)
      .join("\n")} }`,
    theme,
  };

  return generated;
};

function isObject<T>(item: T) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export const deepMerge = <
  T extends Record<string, any>,
  U extends Record<string, any>,
>(
  theme1: T,
  theme2: U,
): T & U => {
  // Deep merge as deep object
  let output = Object.assign({}, theme1) as T & U;
  if (isObject(theme1) && isObject(theme2)) {
    Object.keys(theme2).forEach((key) => {
      if (isObject(theme2[key])) {
        if (!(key in theme1)) Object.assign(output, { [key]: theme2[key] });
        else output[key as keyof T & U] = deepMerge(theme1[key], theme2[key]);
      } else {
        Object.assign(output, { [key]: theme2[key] });
      }
    });
  }
  return output;
};

const newKey = (keys: string[], value: any) =>
  [`--${keys.join("-")}`, value] as [string, any];

const joinVariables = (vars: Record<string, any>) =>
  Object.entries(vars)
    .map(([k, v]) => `${k}: ${v};`)
    .join("\n");

/**
 * Final css should be
 * :root { // Base vars }
 * @media (prefers-color-scheme: dark) {
 *   :root { // Dark mode vars }
 * }
 * @media (prefers-color-scheme: light) {
 *   :root { // Light mode vars }
 * }
 * .dark-mode {  // This is added to the body tag }
 * .light-mode {  // This is added to the body tag }
 * The class is selected last to override preference
 * when it is set specifically by user
 */
export const cssConverter = (theme: UITheme) => {
  const baseCssVars = flattenObject(theme.base, newKey);
  const modeVars = {
    dark: flattenObject(theme.vars.dark, newKey),
    light: flattenObject(theme.vars.light, newKey),
  };

  const baseStyles = `:root { ${joinVariables(baseCssVars)} }`;

  const modeVarsStyles = ["dark", "light"]
    .map((key) => {
      const value = modeVars[key as keyof typeof modeVars];
      return ` .${key}-mode { ${joinVariables(value)} } `;
    })
    .join("\n");

  const mediaVarsStyles = ["dark", "light"]
    .map((key) => {
      const value = modeVars[key as keyof typeof modeVars];
      return `
      @media (prefers-color-scheme: ${key}) { :root { ${joinVariables(value)} } }
    `;
    })
    .join("\n");

  return `${baseStyles} ${mediaVarsStyles} ${modeVarsStyles}`;
};

/**
 * Generates a theme from a UITheme
 *
 * param theme: UITheme to generate from
 * param mode: ThemeMode to generate
 * param prefix: Prefix to add to the css variables
 *
 * returns: GeneratedTheme
 *
 * Example:
 * const custom = generateUITheme(defaultThemes[0], 'light')
 * const customThemeCssVars = custom.themeCssVars
 * const customTheme = custom.theme  // can be imported as theme
 *
 * Usage of theme:
 *
 * - Styled:
 * const StyledDiv = styled.div`
 *  font-size: ${theme.font.size.xl};
 * `
 *
 * - CSS:
 * div {
 *   font-size: var(--font-size-xl);
 * }
 */
export const generateUITheme = (
  theme: UITheme,
  mode: ThemeMode,
  prefix = "",
) => {
  // Extends the base theme with the mode theme , add specific type from UITheme
  const themeVars = deepMerge(theme.base, theme.vars["light"]);

  const generatedTheme = forObjectReplace(
    themeVars,
    (keys) => `var(--${prefix}${keys.join("-")})`,
  );

  const generated: GeneratedTheme<typeof themeVars> = {
    themeCss: cssConverter(theme),
    theme: generatedTheme,
  };

  return generated;
};
// --step--2: clamp(0.7813rem, 0.7526rem + 0.0763vw, 0.8442rem);
//   --step--1: clamp(0.9375rem, 0.8521rem + 0.2276vw, 1.1253rem);
//   --step-0: clamp(1.125rem, 0.9545rem + 0.4545vw, 1.5rem);
//   --step-1: clamp(1.35rem, 1.0548rem + 0.7873vw, 1.9995rem);
//   --step-2: clamp(1.62rem, 1.1448rem + 1.2671vw, 2.6653rem);
//   --step-3: clamp(1.944rem, 1.2127rem + 1.9502vw, 3.5529rem);
//   --step-4: clamp(2.3328rem, 1.2404rem + 2.913vw, 4.736rem);
//   --step-5: clamp(2.7994rem, 1.2022rem + 4.2591vw, 6.3131rem);
const fontSizes = {
  // sm: "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
  // base: "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
  // md: "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
  // lg: "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
  // xl: "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
  // xxl: "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
  // xxxl: "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)",
  sm: "clamp(0.9375rem, 0.8521rem + 0.2276vw, 1.1253rem)",
  base: "clamp(1.125rem, 0.9545rem + 0.4545vw, 1.5rem)",
  md: "clamp(1.35rem, 1.0548rem + 0.7873vw, 1.9995rem)",
  lg: "clamp(1.62rem, 1.1448rem + 1.2671vw, 2.6653rem)",
  xl: "clamp(1.944rem, 1.2127rem + 1.9502vw, 3.5529rem)",
  xxl: "clamp(2.3328rem, 1.2404rem + 2.913vw, 4.736rem)",
  xxxl: "clamp(2.7994rem, 1.2022rem + 4.2591vw, 6.3131rem)",
};

const layout = {
  content: {
    wide: "1200px",
    main: "800px",
  },

  nav: {
    height: "3rem",
  },
};

// Create union from array
export const CardTypes = [
  "gradient",
  "solid",
  "solid-border",
  "border",
  "transparent",
] as const;
export type CardType = (typeof CardTypes)[number];

const baseVars = {
  layout,
  font: {
    family: "Jost",
    size: fontSizes,
  },
  border: {
    radius: "0.5rem",
  },
};

export const poemThemeVars = {
  font: {
    size: {
      ...fontSizes,
    },
  },
  poems: {
    fontFamily: "EB Garamond",
    headingFont: '"Cormorant Garamond", serif',
    background: "#ffffff",

    heading: "#222",
    text: "#444",
    fadeText: "#666666",
    surface: "#f5f5f5",
    border: "#aaa",
  },
};

const poemThemeGen =
  // We add a custom prefix to the theme variables
  generateTheme(poemThemeVars);

/** Use for setting css variables in the parent
 * Ex: { 'poems-text' : '#444' } */
export const poemThemeCssVars = poemThemeGen.themeCss;

/** Use for declaring css styles in css-in-js
 * Ex: { 'text': 'var(--poems-text)' } */
export const poemTheme = poemThemeGen.theme;

export type ThemeMode = "auto" | "light" | "dark";
export type BaseVars = typeof baseVars;

export interface UITheme {
  id: string;
  name: string;
  base: BaseVars;
  vars: {
    light: ThemeVars;
    dark: ThemeVars;
  };
}

const defaultPaletteColors = {
  primary: "#ff0000",
  secondary: "#ffff00",

  background: "#000000",
  surface: "#222",
  text: "#ffffff",
};

type PaletteColors = typeof defaultPaletteColors;

const defaultBasePalette = {
  border: {
    radius: "0.2rem",
  },

  font: {
    family: "Jost",
  },
};

type BasePalette = typeof defaultBasePalette;

export interface ThemePalette {
  name: string;
  id: string;
  base: BasePalette;
  card: CardType;
  vars: {
    light: PaletteColors;
    dark: PaletteColors;
  };
}

export const defaultThemePalette: ThemePalette = {
  name: "Aster",
  id: "default_aster",
  base: {
    border: {
      radius: "0.2rem",
    },
    font: {
      family: "Isoso Web",
    },
  },
  card: "gradient",

  vars: {
    light: {
      primary: "#613de3",
      secondary: "#b55089",
      background: "#dfdfed",
      surface: "#9f9fe02d",
      text: "#343654",
    },
    dark: {
      primary: "#ff5370",
      secondary: "#5d86ff",

      background: "#0f111a",
      surface: "#1e2139a0",
      text: "#919DCF",
    },
  },
};

export const defaultPalettes: ThemePalette[] = [defaultThemePalette];

const getCard = (cardType: CardType) => {
  if (cardType === "gradient") {
    return {
      card: {
        border: "2px dashed var(--border-color)",
        background:
          "linear-gradient(-45deg, var(--background), var(--background), var(--surface))",
        backgroundHover:
          "linear-gradient(-45deg, var(--background), var(--background), var(--surface))",
        backgroundPosition: "90% 0",
        backgroundSize: "200%",
        borderHover: "2px solid var(--border-color)",
        backgroundPositionHover: "10% 20%",
      },
    };
  } else if (cardType === "solid") {
    return {
      card: {
        border: "none",
        background: "var(--surface)",
        backgroundPosition: "initial",
        backgroundSize: "initial",
        borderHover: "none",
        backgroundHover: "var(--surface)",
        backgroundPositionHover: "initial",
      },
    };
  } else if (cardType === "solid-border") {
    return {
      card: {
        border: "1px solid var(--border-color)",
        background: "var(--surface)",
        backgroundPosition: "initial",
        backgroundHover: "initial",
        backgroundSize: "initial",
        borderHover: "1px solid var(--border-color)",
        backgroundPositionHover: "initial",
      },
    };
  } else if (cardType === "border") {
    return {
      card: {
        border: "1px solid var(--border-color)",
        background: "var(--background)",
        backgroundHover: "var(--background)",
        backgroundPosition: "initial",
        backgroundSize: "initial",
        borderHover: "1px solid var(--border-color)",
        backgroundPositionHover: "initial",
      },
    };
  } else {
    // and also if (cardType === 'transparent')
    return {
      card: {
        border: "none",
        background:
          "linear-gradient(-45deg, var(--background), var(--background), var(--surface))",
        backgroundHover: "inherit",
        backgroundPosition: "90% 0",
        backgroundSize: "200%",
        borderHover: "none",
        backgroundPositionHover: "0% 0%",
      },
    };
  }
};

const generateModeVarsFromPaletteColors = (
  palette: PaletteColors,
  cardType: CardType,
) => {
  // verify if theme is dark or light by
  // checking if background is dark or light
  const isDark = tinycolor(palette.background).isDark();

  // the color between surface and background (middle earth)
  const midErth = tinycolor
    .mix(palette.surface, palette.background, 50)
    .toString();
  const borderColor = tinycolor
    .mix(palette.text, palette.background, 75)
    .toString();

  const tooltip = tinycolor
    .mix(palette.background, tinycolor(palette.text).setAlpha(1), 15)
    .toString();

  return {
    primary: {
      color: palette.primary,
      // For now, between black and white depending on primary color
      // This is used to set the color of the text over the surfaces with primary background
      contrast: tinycolor(palette.primary).isDark() ? "#ffffff" : "#000000",
    },
    secondary: { color: palette.secondary }, // Duh
    colors: { purple: palette.primary /* More could be added */ },
    background: palette.background,
    surface: palette.surface,
    surface2: tinycolor.mix(palette.surface, borderColor, 25).toString(),
    tooltip,
    border: {
      style: "solid",
      // Border color is between text and midErth
      color: borderColor,
    },

    text: palette.text,
    heading: tinycolor(palette.text)
      [isDark ? "brighten" : "darken"]()
      .toString(),

    // Fade with midErth
    fadeText: tinycolor.mix(palette.text, midErth, 30).toString(),
    shadow: {
      card: `0 1rem 2rem 0 rgba(0, 0, 0, ${isDark ? 0.6 : 0.2})`,
      medium: `0 0.5rem 1rem 0 rgba(0, 0, 0, ${isDark ? 0.3 : 0.15})`,
      small: `0 0.1rem 0.2rem 0 rgba(0, 0, 0, ${isDark ? 0.3 : 0.3})`,
      cardDrop: `0 1rem 2rem rgba(0, 0, 0, ${isDark ? 0.6 : 0.2})`,
    },

    // We can use these inside new vars
    ...getCard(cardType),

    // For now we use the primary color, less noise
    bold: palette.primary,
    italic: palette.primary,
    strikethrough: palette.primary,

    // Variables for variables.
    gradient: {
      "color-1": "var(--primary-color)",
      "color-2": "var(--colors-purple)",
    },
    "animated-gradient":
      "linear-gradient(-60deg,  var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1), var(--secondary-color), var(--gradient-color-1), var(--gradient-color-2))",
  };
};

export type ThemeVars = ReturnType<typeof generateModeVarsFromPaletteColors>;

export const generateThemeFromPalette = (palette: ThemePalette): UITheme => {
  const theme: UITheme = {
    id: palette.id,
    name: palette.name,
    base: {
      layout,
      ...palette.base,
      font: {
        family: palette.base.font.family,
        size: fontSizes,
      },
    },
    vars: {
      light: generateModeVarsFromPaletteColors(
        palette.vars.light,
        palette.card,
      ),
      dark: generateModeVarsFromPaletteColors(palette.vars.dark, palette.card),
    },
  };

  // console.log('Generated theme', theme);
  return theme;
};

const defaultTheme = generateUITheme(
  generateThemeFromPalette(defaultThemePalette),
  "dark",
);
export const themeCssVars = defaultTheme.themeCss;
export const theme = defaultTheme.theme;
