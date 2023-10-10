import { flattenObject, forObjectReplace } from "./lib/objects";

export const themeVars = {
  font: {
    family: 'Jost, sans-serif',
    size: {
      sm: "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
      base: "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
      md: "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
      lg: "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
      xl: "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
      xxl: "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
      xxxl: "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)",
    }
  },
  primary: {
    color: '#ff5370',
    contrast: '#0f111a',
  },

  secondary: {
    color: '#CCA685',
  },

  background: '#0f111a',
  surface: '#1e213980',

  border: '#ffffff10',

  heading: '#CCA685',
  text: '#919DCF',
  fadeText: '#919DCF80',

  bold: '#BB6170',
  italic: '#BB6170',
  strikethrough: '#ff5370',
}

export type ThemeVars = typeof themeVars

export const themeCssVars = flattenObject(themeVars, (keys, value) => [
  `${keys.join("-")}`,
  value,
]);

export const theme = forObjectReplace(themeVars, (keys) => `var(--${keys.join("-")})`)
