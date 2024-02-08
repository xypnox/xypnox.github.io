import { styled } from "solid-styled-components"
import type { ThemePalette } from "../../theme"
import { For } from "solid-js"
import { themeState } from "./themeState"

const showcaseThemes: ThemePalette[] = [
  {
    "name": "Mellowed",
    "id": "showcase-mellowed",
    "base": {
      "border": {
        "radius": "6px"
      },
      "font": {
        "family": "Nunito",
      },
    },
    card: 'gradient',
    "vars": {
      "light": {
        "primary": "#b03d84",
        "secondary": "#7c77e0",
        "background": "#f0deee",
        "surface": "#b883ae44",
        "text": "#694e66"
      },
      "dark": {
        "primary": "#cf3b3b",
        "secondary": "#ff5370",
        "background": "#140b13",
        "surface": "#6b474747",
        "text": "#b06161"
      }
    }
  },
  {
    "name": "Glitch Pop",
    "id": "kAwip9ICnYYva5ZJwoABC",
    "base": {
      "border": {
        "radius": "0"
      },
      "font": {
        "family": "Rubik Glitch",
      },
    },
    card: 'transparent',
    "vars": {
      "light": {
        "primary": "#ff0000",
        "secondary": "#ff5370",
        "background": "#ffea00",
        "surface": "#d9b73170",
        "text": "#000000"
      },
      "dark": {
        "primary": "#00eaff",
        "secondary": "#ff5370",
        "background": "#000000",
        "surface": "#30303080",
        "text": "#fffb00"
      }
    }
  },
  {
    "name": "Gitpup",
    "id": "y7c6gC-IAkDd2GBtbhZSR",
    "base": {
      "border": {
        "radius": "6px"
      },
      "font": {
        "family": "Lato",
      },
    },
    card: 'solid',
    "vars": {
      "light": {
        "primary": "#1971d6",
        "secondary": "#18d9b9",
        "background": "#ffffff",
        "surface": "#f6f8fa",
        "text": "#27292b"
      },
      "dark": {
        "primary": "#f78166",
        "secondary": "#ff5370",
        "background": "#0d1218",
        "surface": "#2b323b4c",
        "text": "#aec3d4"
      }
    }
  },
  {
    "name": "PrePub",
    "id": "2CsLmbibySLs",
    "base": {
      "border": {
        "radius": "0.4rem"
      },
      "font": {
        "family": "Cardo",
      },
    },
    card: 'solid',
    "vars": {
      "light": {
        "primary": "#575244",
        "secondary": "#aba290",
        "background": "#e6e1df",
        "surface": "#b0a3802d",
        "text": "#87806b"
      },
      "dark": {
        "primary": "#d4b9b9",
        "secondary": "#7a6e6e",
        "background": "#1a1919",
        "surface": "#303030a0",
        "text": "#8f8181"
      }
    }
  },
  {
    "name": "Solarized",
    "id": "k7KaNNhEe3jP",
    "base": {
      "border": {
        "radius": "4px"
      },
      "font": {
        "family": "JetBrains Mono",
      },
    },
    card: 'solid',
    "vars": {
      "light": {
        "primary": "#a8810c",
        "secondary": "#cb4b16",
        "background": "#f0f0f0",
        "surface": "#ccc4ab3d",
        "text": "#596e75"
      },
      "dark": {
        "primary": "#31c2b6",
        "secondary": "#b58900",
        "background": "#002b36",
        "surface": "#657b834f",
        "text": "#93a1a1"
      }
    }
  },
  {
    "name": "Clayprint",
    "id": "rOCyT2dTMWk4F",
    "base": {
      "border": {
        "radius": "0.75rem"
      },
      "font": {
        "family": "Bungee Inline",
      },
    },
    card: 'solid',
    "vars": {
      "light": {
        "primary": "#129e89",
        "secondary": "#18acd9",
        "background": "#e1e8e5",
        "surface": "#53967b19",
        "text": "#276163"
      },
      "dark": {
        "primary": "#65f7c9",
        "secondary": "#54ccff",
        "background": "#0a1a19",
        "surface": "#1f45374c",
        "text": "#4c8f8f"
      }
    }
  },
  {
    "name": "Crayons on Walls",
    "id": "E5eHa56DSllcLDk62R-UV",
    "base": {
      "border": {
        "radius": "0.5rem"
      },
      "font": {
        "family": "Gaegu",
      },
    },
    card: 'solid',
    "vars": {
      "light": {
        "primary": "#ff3838",
        "secondary": "#ff5370",
        "background": "#eec9ff",
        "surface": "#b2b5ed5b",
        "text": "#0b5978"
      },
      "dark": {
        "primary": "#f2e89b",
        "secondary": "#e892a2",
        "background": "#542e51",
        "surface": "#78407d3a",
        "text": "#81d6d3"
      }
    }
  },
  {
    "name": "Stein",
    "id": "BXvlN4dkUnadh9IqIXbm5",
    "base": {
      "border": {
        "radius": "4px"
      },
      "font": {
        "family": "Space Mono"
      }
    },
    "card": "gradient",
    "vars": {
      "light": {
        "primary": "#705c13",
        "secondary": "#8abf76",
        "background": "#e4edec",
        "surface": "#c4c2af3f",
        "text": "#5e5a4e"
      },
      "dark": {
        "primary": "#ebc987",
        "secondary": "#40a37c",
        "background": "#14151f",
        "surface": "#80726519",
        "text": "#918087"
      }
    }
  },
  {
    "name": "Delta Synchronotron",
    "id": "nrRaOTz8IODCbFuapWC2y",
    "base": {
      "border": {
        "radius": "0rem"
      },
      "font": {
        "family": "VT323"
      }
    },
    "card": "transparent",
    "vars": {
      "light": {
        "primary": "#008a0e",
        "secondary": "#50b575",
        "background": "#d8ebcb",
        "surface": "#338f523a",
        "text": "#005906"
      },
      "dark": {
        "primary": "#87ff54",
        "secondary": "#00ffd9",
        "background": "#080d08",
        "surface": "#1e3823a0",
        "text": "#50c710"
      }
    }
  }
]

const ShowcaseGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ShowcaseItem = styled('div')`
  width: 100%;
  background: var(--background);
  color: var(--text);
  cursor: pointer;
  padding: 1rem;
  border-radius: calc(4 * var(--border-radius));
  border: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;

  h2 {
    margin: 0;
  }

  &:hover {
    border-color: var(--primary-color);
  }


  .swatch {
    flex-grow: 1;
    height: 2rem;
    border-radius: calc(2 * var(--border-radius));
    background: var(--color);
  }

  .colors {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    background: var(--back);
    border-radius: calc(4 * var(--border-radius));
  }
`

const ColorSwatches = () =>
  <>
    <div class="swatch" style={`--color: var(--primary-color)`} />
    <div class="swatch" style="--color: var(--secondary-color)" />
    <div class="swatch" style="--color: var(--surface)" />
    <div class="swatch" style="--color: var(--text)" />
  </>

const addThemeAndSet = (palette: ThemePalette) => {
  if (!themeState.themeExists(palette.id)) {
    themeState.addTheme(palette)
  }
  themeState.changeTheme(palette.id)
}

export const ThemeShowcase = () => {
  return (
    <>
      <Showcase themes={showcaseThemes} clickAct='import' />
      <hr />
      <h2 id="current-themes">Current Themes</h2>
      <Showcase themes={themeState.themes()} clickAct='apply' />
    </>
  )
}

export const Showcase = (props: { themes: ThemePalette[], clickAct: 'import' | 'apply' }) => {
  return (
    <ShowcaseGrid>
      <For each={props.themes}>
        {(theme) => (
          <ShowcaseItem onClick={
            () => {
              if (props.clickAct === 'import') {
                addThemeAndSet(JSON.parse(JSON.stringify(theme)))
              } else {
                themeState.changeTheme(theme.id)
              }
            }
          }>
            <h2>{theme.name}</h2>
            <div class="colors"
              style={`--back: ${theme.vars.light.background}; --text: ${theme.vars.light.text}; --primary-color: ${theme.vars.light.primary}; --secondary-color: ${theme.vars.light.secondary}; --surface: ${theme.vars.light.surface};`}
            >
              <ColorSwatches />
            </div>
            <div class="colors"
              style={`--back: ${theme.vars.dark.background}; --text: ${theme.vars.dark.text}; --primary-color: ${theme.vars.dark.primary}; --secondary-color: ${theme.vars.dark.secondary}; --surface: ${theme.vars.dark.surface};`}
            >
              <ColorSwatches />
            </div>
          </ShowcaseItem>
        )}
      </For>
    </ShowcaseGrid>
  )
}
