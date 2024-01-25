import { themeVars, type ThemeVars } from "../../theme";

export type ThemeMode = 'light' | 'dark'

export interface UITheme {
  name: string;
  vars: Record<ThemeMode, ThemeVars>;
}

const lightTheme: ThemeVars = {
  ...themeVars,
  card: {
    ...themeVars.card,
    background: '#ffffff50',
    border: '2px solid #999',
    borderHover: '2px solid #666'
  },
  primary: {
    color: '#4e6bdc',
    contrast: '#ffffff',
  },

  secondary: {
    color: '#ff5370',
  },

  colors: {
    purple: '#569867',
  },

  background: '#f0f0f8',
  surface: '#e5e5f0',

  border: '#00000020',

  heading: '#000000',
  text: '#333333',
  fadeText: '#666666',

  cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.25)',
}

export const defaultThemes: UITheme[] = [
  {
    name: 'Studio',
    vars: {
      light: lightTheme,
      dark: {
        ...themeVars,
      }
    }
  },
  {
    name: 'Brutalist',
    vars: {
      light: {
        ...themeVars,
        card: {
          ...themeVars.card,
          background: '#ffffff50',
          border: '2px solid #999',
          borderHover: '2px solid #666'
        },
        font: {
          family: 'Iosevka Term, sans-serif',
          size: themeVars.font.size
        },
        primary: {
          color: '#222',
          contrast: '#fff',
        },

        secondary: {
          color: '#ff5370',
        },

        colors: {
          purple: '#569867',
        },

        background: '#f0f0f0',
        surface: '#e0e0e0',

        border: '#00000020',

        heading: '#000000',
        text: '#333333',
        fadeText: '#666666',

        cardShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.25)',
      },
      dark: {
        ...themeVars,
      }
    }
  }
]

