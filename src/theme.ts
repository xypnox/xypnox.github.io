import { flattenObject, forObjectReplace } from "./lib/objects";

import tinycolor from 'tinycolor2'

interface GeneratedTheme<T> {
  themeCssVars: Record<string, string>;
  theme: T;
}

export const generateTheme = <T extends Record<string, any>>(vars: T, prefix = '') => {
  const themeCssVars = flattenObject(vars, (keys, value) => [
    `${prefix}${keys.join("-")}`,
    value,
  ]);

  const theme = forObjectReplace(vars, (keys) => `var(--${keys.join("-")})`)

  const generated: GeneratedTheme<T> = {
    themeCssVars,
    theme,
  }

  return generated
}

function isObject<T>(item: T) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export const deepMerge = <T extends Record<string, any>, U extends Record<string, any>>(theme1: T, theme2: U): T & U => {
  // Deep merge as deep object
  let output = Object.assign({}, theme1) as T & U;
  if (isObject(theme1) && isObject(theme2)) {
    Object.keys(theme2).forEach(key => {
      if (isObject(theme2[key])) {
        if (!(key in theme1))
          Object.assign(output, { [key]: theme2[key] });
        else
          output[key as keyof T & U] = deepMerge(theme1[key], theme2[key]);
      } else {
        Object.assign(output, { [key]: theme2[key] });
      }
    });
  }
  return output;
}

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
export const generateUITheme = (theme: UITheme, mode: ThemeMode, prefix = '') => {
  // Extends the base theme with the mode theme , add specific type from UITheme
  const themeVars = deepMerge(theme.base, theme.vars[mode])
  const themeCssVars = flattenObject(themeVars, (keys, value) => [
    `${prefix}${keys.join("-")}`,
    value,
  ]);

  const generatedTheme = forObjectReplace(themeVars, (keys) => `var(--${keys.join("-")})`)

  const generated: GeneratedTheme<typeof themeVars> = {
    themeCssVars,
    theme: generatedTheme,
  }

  return generated
}


const fontSizes = {
  sm: "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
  base: "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
  md: "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
  lg: "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
  xl: "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
  xxl: "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
  xxxl: "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)",
}

const technoCard = {
  border: '2px dashed var(--border-color)',
  background: 'linear-gradient(-45deg, var(--surface), var(--background), var(--background))',
  backgroundSize: '200%',
  borderHover: '2px solid var(--border-color)',
  backgroundPositionHover: '-100% 0',
}

const card = {
  border: '2px dashed var(--border-color)',
  background: 'linear-gradient(-45deg, var(--background), var(--background), var(--surface))',
  backgroundPosition: '90% 0',
  backgroundSize: '200%',
  borderHover: '2px solid var(--border-color)',
  backgroundPositionHover: '10% 20%',
}

const layout = {
  content: {
    wide: '1200px',
    main: '800px',
  },

  nav: {
    height: '3rem',
  },
}

const baseVars = {
  layout,
  font: {
    family: 'Jost, sans-serif',
    size: fontSizes,
  },
  border: {
    radius: '0.5rem',
  }
}

export const modeVars = {
  primary: {
    color: '#ff5370',
    contrast: '#0f111a',
  },

  secondary: {
    color: '#CCA685',
  },

  colors: {
    purple: '#6b5eff',
    dev: '#63f6ff',
    design: '#ff5370',
    literature: '#72ff80',
  },

  background: '#0f111a',
  surface: '#1e2139a0',

  border: {
    style: 'dashed',
    color: '#ffffff10'
  },

  heading: '#CCA685',
  text: '#919DCF',
  fadeText: '#919DCF9a',

  cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.5)',

  card,

  bold: '#BB6170',
  italic: '#CC64AD',
  strikethrough: '#ff5370',

  gradient: {
    'color-1': 'var(--primary-color)',
    'color-2': 'var(--colors-purple)',
  },

  'animated-gradient': 'linear-gradient(-60deg,  var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1), var(--secondary-color), var(--gradient-color-1), var(--gradient-color-2))'
}

export type ThemeVars = typeof modeVars


export const poemThemeVars = {
  font: {
    size: {
      ...fontSizes,
    }
  },
  poems: {
    fontFamily: 'EB Garamond, serif',
    headingFont: '"Cormorant Garamond", serif',
    background: '#ffffff',

    heading: '#222',
    text: '#444',
    fadeText: '#666666',
    surface: '#f5f5f5',
    border: '#aaa',
  }
}

const poemThemeGen =
  // We add a custom prefix to the theme variables
  generateTheme(poemThemeVars)

/** Use for setting css variables in the parent
 * Ex: { 'poems-text' : '#444' } */
export const poemThemeCssVars = poemThemeGen.themeCssVars

/** Use for declaring css styles in css-in-js
 * Ex: { 'text': 'var(--poems-text)' } */
export const poemTheme = poemThemeGen.theme

export type ThemeMode = 'light' | 'dark'
export type BaseVars = typeof baseVars

export interface UITheme {
  id: string;
  name: string;
  base: BaseVars;
  vars: Record<ThemeMode, ThemeVars>;
}

const lightTheme: ThemeVars = {
  ...modeVars,
  card: {
    ...modeVars.card,
    background: '#ffffff80',
    border: '2px dashed #919DCF50',
    borderHover: '2px solid #919DCFa0'
  },
  primary: {
    color: '#6E49F2',
    contrast: '#ffffff',
  },

  secondary: {
    color: '#b55089',
  },

  colors: {
    purple: '#569867',
    dev: '#008a93',
    design: '#ac1a65',
    literature: '#0e7718',
  },

  background: '#d7d7ea',
  surface: '#9797dd2e',

  border: {
    style: 'dashed',
    color: '#2d3a6020',
  },

  heading: '#b55089',
  text: '#2d3a60',
  fadeText: '#687197',

  cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.25)',
}

const BrutalistTheme: UITheme = {
  name: 'Brutalist',
  id: 'default_brutalist',
  base: {
    layout: {
      ...layout,
    },
    border: {
      radius: '0',
    },
    font: {
      family: 'Iosevka Term, monospace',
      size: fontSizes,
    },
  },
  vars: {
    light: {
      ...modeVars,
      card: {
        ...modeVars.card,
        background: '#ffffff80',
        border: '1px solid #999',
        borderHover: '1px solid #666'
      },
      primary: {
        color: '#222',
        contrast: '#fff',
      },

      secondary: {
        color: '#ff5370',
      },

      colors: {
        purple: '#2080ff',
        dev: '#444',
        design: '#444',
        literature: '#444',
      },

      background: '#f0f0f0',
      surface: '#e0e0e0',

      border: {
        style: 'solid',
        color: '#00000020'
      },

      heading: '#000000',
      text: '#333333',
      fadeText: '#666666',

      cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.25)',
    },
    dark: {
      ...modeVars,
      card: {
        ...modeVars.card,
        background: '#33333380',
        border: '1px solid #444',
        borderHover: '1px solid #666'
      },
      primary: {
        color: '#fff',
        contrast: '#222',
      },

      secondary: {
        color: '#ff5370',
      },

      colors: {
        ...modeVars.colors,
        purple: '#2080ff',
      },

      background: '#000000',
      surface: '#30303080',

      border: {
        style: 'solid',
        color: '#ffffff20'
      },

      heading: '#ffffff',
      text: '#cccccc',
      fadeText: '#999999',

      cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.25)',
    }
  }

}

export const defaultThemes: UITheme[] = [
  {
    name: 'Aster',
    id: 'default_aster',
    base: baseVars,
    vars: {
      light: lightTheme,
      dark: modeVars,
    }
  },
  BrutalistTheme,
]

const defaultTheme = generateUITheme(defaultThemes[0], 'light')
export const themeCssVars = defaultTheme.themeCssVars
export const theme = defaultTheme.theme


const defaultPaletteColors = {
  primary: '#ff0000',
  secondary: '#ffff00',

  background: '#000000',
  surface: '#222',
  text: '#ffffff',
}

type PaletteColors = typeof defaultPaletteColors

export const defaultThemePalette = {
  base: {
    border: {
      radius: '0.2rem',
    },
    font: {
      family: 'Inter, sans-serif',
      size: fontSizes,
    },
  },

  vars: {
    light: {
      primary: '#6E49F2',
      secondary: '#b55089',

      background: '#d7d7ea',
      surface: '#9797dd2e',
      text: '#2d3a60',
    },
    dark: {
      primary: '#ff5370',
      secondary: '#ffff00',

      background: '#0f111a',
      surface: '#1e2139a0',
      text: '#919DCF',
    }
  }
}

const generateModeVarsFromPaletteColors = (palette: PaletteColors): ThemeVars => {
  return {
    primary: {
      color: palette.primary,
      contrast: tinycolor(palette.primary).isDark() ? '#ffffff' : '#000000',
    },
    secondary: {
      color: palette.secondary,
    },
    colors: {
      purple: palette.primary,
      dev: tinycolor(palette.primary).spin(60).toString(),
      design: tinycolor(palette.primary).spin(120).toString(),
      literature: tinycolor(palette.primary).spin(180).toString(),
    },
    background: palette.background,
    surface: palette.surface,
    border: {
      style: 'solid',
      // Border color is between text and surface
      color: tinycolor.mix(palette.text, palette.surface, 80).toString()
    },
    heading: palette.text,
    text: palette.text,
    fadeText: tinycolor.mix(palette.text, palette.surface, 40).toString(),
    cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.25)',

    card: {
      border: '2px dashed var(--border-color)',
      background: 'linear-gradient(-45deg, var(--background), var(--background), var(--surface))',
      backgroundPosition: '90% 0',
      backgroundSize: '200%',
      borderHover: '2px solid var(--border-color)',
      backgroundPositionHover: '10% 20%',
    },

    bold: palette.primary,
    italic: palette.primary,
    strikethrough: palette.primary,

    gradient: {
      'color-1': 'var(--primary-color)',
      'color-2': 'var(--colors-purple)',
    },

    'animated-gradient': 'linear-gradient(-60deg,  var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1), var(--secondary-color), var(--gradient-color-1), var(--gradient-color-2))'
  }
}

type ThemePalette = typeof defaultThemePalette

export const generateThemeFromPalette = (name: string, id: string, palette: ThemePalette): UITheme => {
  const theme: UITheme = {
    id,
    name,
    base: {
      layout,
      ...palette.base,
    },
    vars: {
      light: generateModeVarsFromPaletteColors(palette.vars.light),
      dark: generateModeVarsFromPaletteColors(palette.vars.dark),
    }
  }

  return theme
}
