import { flattenObject, forObjectReplace } from "./lib/objects";

interface GeneratedTheme<T> {
  themeCssVars: Record<string, string>;
  theme: T;
}

const generateTheme = <T extends Record<string, any>>(vars: T, prefix = '') => {
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

type Obj = Record<string, any>

export default function mergeDeep
  <T extends Obj,
    U extends Obj,
    Y extends T & U>
  (target: T, source: U): Y {
  let output: Y = Object.assign({}, target) as Y;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key as keyof Y] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// Create function where theme is a combo of T and U
const mergeThemes = <T extends Record<string, any>, U extends Record<string, any>>(theme1: GeneratedTheme<T>, theme2: GeneratedTheme<U>):
  GeneratedTheme<T & U> => {
  // Deep merge as deep object
  const mergedTheme = mergeDeep(theme1.theme, theme2.theme)
  const mergedThemeCssVars = {
    ...theme1.themeCssVars,
    ...theme2.themeCssVars,
  }

  return {
    themeCssVars: mergedThemeCssVars,
    theme: mergedTheme,
  }
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
  border: '2px dashed var(--border)',
  background: 'linear-gradient(-45deg, var(--surface), var(--background), var(--background))',
  backgroundSize: '200%',
  borderHover: '2px solid var(--border)',
  backgroundPositionHover: '-100% 0',
}

const card = {
  border: '2px dashed var(--border)',
  background: 'linear-gradient(-45deg, var(--background), var(--background), var(--surface))',
  backgroundPosition: '90% 0',
  backgroundSize: '200%',
  borderHover: '2px solid var(--border)',
  backgroundPositionHover: '10% 20%',
}

const layout = {
  content: {
    wide: '1200px',
    main: '800px',
  },
}

export const themeVars = {
  layout,
  font: {
    family: 'Jost, sans-serif',
    size: fontSizes,
  },

  primary: {
    color: '#ff5370',
    contrast: '#0f111a',
  },

  secondary: {
    color: '#CCA685',
  },

  colors: {
    purple: '#6b5eff',
  },

  background: '#0f111a',
  surface: '#1e2139a0',

  border: '#ffffff10',

  heading: '#CCA685',
  text: '#919DCF',
  fadeText: '#919DCF80',

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

export type ThemeVars = typeof themeVars

const defaultTheme = generateTheme(themeVars)
export const themeCssVars = defaultTheme.themeCssVars
export const theme = defaultTheme.theme

export const poemThemeVars = {
  fontFamily: 'EB Garamond, serif',
  headingFont: '"Cormorant Garamond", serif',
  background: '#ffffff',

  heading: '#222',
  text: '#444',
  fadeText: '#666666',
  surface: '#f5f5f5',
  border: '#aaa',
}

const poemThemeGen = mergeThemes(
  // We add a custom prefix to the theme variables
  generateTheme(poemThemeVars, "poems-"),
  // We want the font sizes to be the same
  generateTheme({ font: { size: fontSizes } })
)

/** Use for setting css variables in the parent
 * Ex: { 'poems-text' : '#444' } */
export const poemThemeCssVars = poemThemeGen.themeCssVars

/** Use for declaring css styles in css-in-js
 * Ex: { 'text': 'var(--poems-text)' } */
export const poemTheme = poemThemeGen.theme

// const lightThemeVars = {
//   background: '#ffffff',
//   surface: '#f5f5f5',

//   border: '#aaa',

//   text: '#444',
//   fadeText: '#666666',
//   heading: '#222',

//   primary: {
//     surface: '#ff5370',
//     over: '#0f111a',
//     text: '#ff5370',
//   }
// }

// const lightThemeGen = mergeThemes(
//   generateTheme(lightThemeVars, "light-"),
//   generateTheme({
//     font: {
//       size: {
//         sm: "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
//         base: "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
//         md: "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
//         lg: "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
//         xl: "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
//         xxl: "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
//         xxxl: "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)",
//       }
//     }
//   })
// )

// /** Use for setting css variables in the parent
//  * Ex: { 'light-text' : '#444' } */
// export const lightThemeCssVars = lightThemeGen.themeCssVars

// /** Use for declaring css styles in css-in-js
//  * Ex: { 'primary': { 'color': 'var(--light-primary-color)' } } */
// export const lightTheme = lightThemeGen.theme
