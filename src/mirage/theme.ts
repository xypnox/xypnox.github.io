interface MiragePalette {
  id: string
  name: string

  vars: {
    light: Vars
    dark: Vars
  }
}

interface MirageTheme {
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
    "light": {
      "primary": "#613de3",
      "secondary": "#b55089",
      "background": "#dfdfed",
      "surface": "#9f9fe02d",
      "text": "#343654"
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

export const defaultPalettes: MiragePalette[] = [
  miragePalette,
]

const lightVars = {
  primary: '#613de3',
  secondary: '#b55089',
  background: '#dfdfed',
  surface: '#9f9fe02d',
  text: '#343654'
}

type Vars = typeof lightVars

export const generateThemeFromPalette = (palette: MiragePalette): MirageTheme => {
  return {
    ...palette,
    // vars: {
    //   light: {
    //     primary: '#613de3',
    //   },
    //   dark: {
    //     primary: '#ff5370',
    //   },
    // }
  }
}

export const cssConverter = (theme: MirageTheme): string => {
  return theme.id
}

const defaultCss = cssConverter(miragePalette)
