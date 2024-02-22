import { flattenObject } from "../lib/objects"

interface MiragePalette {
  id: string
  name: string

  vars: {
    light: Vars
    dark: Vars
  }
}

// We want custom themes to be added to the default themes

const miragePalette: MiragePalette = {
  name: 'Mirage',
  id: 'default_mirage',
  // base: {
  //   border: {
  //     radius: '0.2rem',
  //   },
  //   font: {
  //     family: 'Jost',
  //   },
  // },
  // card: 'gradient',

  vars: {
    light: {
      primary: "#613de3",
      secondary: "#b55089",
      background: "#00000000",
      surface: "#9f9fe02d",
      surfaceDown: "#acacac70",
      surfaceUp: "#5e5e5e40",
      text: "#343654"
    },
    dark: {
      primary: '#ff5370',
      secondary: '#ffff00',

      background: "#00000000",
      surface: '#88888810',
      surfaceDown: "#88888810",
      surfaceUp: "#ffffff10",
      text: '#FFFFFFc0',
    }
  }
}

export const defaultPalettes: MiragePalette[] = [
  miragePalette,
]

const lightVars = {
  primary: '#613de3',
  secondary: '#b55089',
  background: '#dfdfed',
  surface: '#9f9fe02d',
  surfaceDown: '#9f9fe0',
  surfaceUp: '#9f9fe0',
  text: '#343654'
}

type Vars = typeof lightVars

const fontSizes = {
  sm: "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
  base: "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
  md: "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
  lg: "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
  xl: "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
  xxl: "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
  xxxl: "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)",
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
  blur: {
    lg: 'blur(100px)',
  },
  font: {
    family: 'Outfit',
    size: fontSizes,
  },
  border: {
    radius: '0.5rem',
  }
}

export const generateThemeFromPalette = (palette: MiragePalette) => {
  return {
    id: palette.id,
    name: palette.name,
    base: baseVars,
    vars: {
      light: {
        ...palette.vars.light,
      },
      dark: {
        ...palette.vars.dark,
      },
    }
  } as const
}

type MirageTheme = ReturnType<typeof generateThemeFromPalette>


const newKey = (keys: string[], value: any) =>
  [`--${keys.join("-")}`, value] as [string, any];

const joinVariables = (vars: Record<string, any>) =>
  Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join('\n')

export const cssConverter = (theme: MirageTheme): string => {
  const baseCssVars = flattenObject(theme.base, newKey);
  const modeVars = {
    dark: flattenObject(theme.vars.dark, newKey),
    light: flattenObject(theme.vars.light, newKey),
  }

  const baseStyles = `:root { ${joinVariables(baseCssVars)} }`

  const modeVarsStyles = ['dark', 'light'].map(key => {
    const value = modeVars[key as keyof typeof modeVars]
    return ` .${key}-mode { ${joinVariables(value)} } `
  }).join('\n')

  const mediaVarsStyles = ['dark', 'light'].map(key => {
    const value = modeVars[key as keyof typeof modeVars]
    return `
      @media (prefers-color-scheme: ${key}) { :root { ${joinVariables(value)} } }
    `
  }).join('\n')

  return `${baseStyles} ${mediaVarsStyles} ${modeVarsStyles}`
}

export const defaultCss = cssConverter(generateThemeFromPalette(miragePalette))
