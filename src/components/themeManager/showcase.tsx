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
        "family": "\"Nunito\"",
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
        "family": "\"Rubik Glitch\"",
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
        "family": "\"Lato\"",
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
        "family": "\"Cardo\"",
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
        "family": "\"JetBrains Mono\"",
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
        "surface": "#657b8328",
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
        "family": "\"Bungee Inline\"",
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
        "family": "\"Gaegu\"",
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
        "family": "\"Space Mono\""
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
        "family": "\"VT323\""
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
  },
  {
    "name": "MinimalX",
    "id": "Uvkn1idMYppP3rFleE__u",
    "base": {
      "border": {
        "radius": "6px"
      },
      "font": {
        "family": "\"Inter\""
      }
    },
    "card": "transparent",
    "vars": {
      "light": {
        "primary": "#222",
        "secondary": "#6e6e6e",
        "background": "#dbdbdb",
        "surface": "#ffffff3d",
        "text": "#474747"
      },
      "dark": {
        "primary": "#ffffff",
        "secondary": "#999999",
        "background": "#1f1e1e",
        "surface": "#47474751",
        "text": "#cccccc"
      }
    }
  },
  {
    "name": "utopia-fyi",
    "id": "a9Vh89uIGdiRB_AXV5-4S",
    "base": {
      "border": {
        "radius": "0px"
      },
      "font": {
        "family": "\"EB Garamond\""
      }
    },
    "card": "border",
    "vars": {
      "light": {
        "primary": "#857047",
        "secondary": "#002b47",
        "background": "#ffffff",
        "surface": "#a9b6c435",
        "text": "#032b45"
      },
      "dark": {
        "primary": "#cca762",
        "secondary": "#e5e9eb",
        "background": "#001f35",
        "surface": "#ffffff14",
        "text": "#93a7b5"
      }
    }
  },
  {
    "name": "Faleded",
    "id": "s2Ge1q8g97SYUhZfZ8qI7",
    "base": {
      "border": {
        "radius": "6px"
      },
      "font": {
        "family": "\"Averia Sans Libre\""
      }
    },
    "card": "solid",
    "vars": {
      "light": {
        "primary": "#b55800",
        "secondary": "#c4632b",
        "background": "#d4d4d4",
        "surface": "#ffffff2b",
        "text": "#636363"
      },
      "dark": {
        "primary": "#ed834e",
        "secondary": "#eb6565",
        "background": "#1a1a1a",
        "surface": "#3b3b3b4c",
        "text": "#7d7d7d"
      }
    }
  },
  {
    "name": "Audiotronic",
    "id": "VSfIWJbTLjYs4CEjTQWeR",
    "base": {
      "border": {
        "radius": "6px"
      },
      "font": {
        "family": "\"Audiowide\""
      }
    },
    "card": "gradient",
    "vars": {
      "light": {
        "primary": "#d90b31",
        "secondary": "#7c77e0",
        "background": "#f0deee",
        "surface": "#defdc8",
        "text": "#4805a6"
      },
      "dark": {
        "primary": "#ff0033",
        "secondary": "#ff5370",
        "background": "#0b0326",
        "surface": "#9900ff1c",
        "text": "#b095d4"
      }
    }
  },
  {
    "name": "Aesthetics",
    "id": "mEcmdGSc0aWVV5u_qBniU",
    "base": {
      "border": {
        "radius": "0.2rem"
      },
      "font": {
        "family": "\"Questrial\""
      }
    },
    "card": "solid",
    "vars": {
      "light": {
        "primary": "#4957f2",
        "secondary": "#b5507d",
        "background": "#d7d7ea",
        "surface": "#b5b5d92d",
        "text": "#3a4359"
      },
      "dark": {
        "primary": "#c46bff",
        "secondary": "#ff00ae",
        "background": "#0f111a",
        "surface": "#1e2139a0",
        "text": "#919DCF"
      }
    }
  },
  {
    "name": "Old Newspaper",
    "id": "showcase_newspaper-LDA0PW-vjyepZ",
    "base": {
      "border": {
        "radius": "0.2rem"
      },
      "font": {
        "family": "\"Crimson Text\""
      }
    },
    "card": "solid-border",
    "vars": {
      "light": {
        "primary": "#d16c00",
        "secondary": "#b88d00",
        "background": "#ede5d2",
        "surface": "#b0a88f2d",
        "text": "#544c34"
      },
      "dark": {
        "primary": "#f29500",
        "secondary": "#ffec5c",
        "background": "#171306",
        "surface": "#4a3d282d",
        "text": "#cfc591"
      }
    }
  }
]

const ShowcaseGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const ShowcaseItem = styled('div')`
  width: 100%;
  background: var(--background);
  color: var(--text);
  cursor: pointer;
  padding: 1rem;
  border-radius: calc(2 * var(--border-radius));
  border: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;

  h2 {
    font-size: var(--font-size-base);
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

export const DefaultShowcase = () => <Showcase themes={showcaseThemes.slice(0, 9)} clickAct='import' />

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
