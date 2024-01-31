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
        "size": {
          "sm": "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
          "base": "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
          "md": "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
          "lg": "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
          "xl": "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
          "xxl": "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
          "xxxl": "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)"
        }
      }
    },
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
    "name": "Royal Decree",
    "id": "showcase-royal-decree",
    "base": {
      "border": {
        "radius": "0.25rem"
      },
      "font": {
        "family": "Vollkorn",
        "size": {
          "sm": "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
          "base": "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
          "md": "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
          "lg": "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
          "xl": "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
          "xxl": "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
          "xxxl": "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)"
        }
      }
    },
    "vars": {
      "light": {
        "primary": "#ba621e",
        "secondary": "#c26125",
        "background": "#d9cfc4",
        "surface": "#c7b9a244",
        "text": "#453b31"
      },
      "dark": {
        "primary": "#cf833c",
        "secondary": "#ff5370",
        "background": "#0d0b14",
        "surface": "#6b52473f",
        "text": "#ab9b8a"
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
        "size": {
          "sm": "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
          "base": "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
          "md": "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
          "lg": "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
          "xl": "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
          "xxl": "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
          "xxxl": "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)"
        }
      }
    },
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
        "size": {
          "sm": "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
          "base": "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
          "md": "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
          "lg": "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
          "xl": "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
          "xxl": "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
          "xxxl": "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)"
        }
      }
    },
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
        "size": {
          "sm": "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
          "base": "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
          "md": "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
          "lg": "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
          "xl": "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
          "xxl": "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
          "xxxl": "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)"
        }
      }
    },
    "vars": {
      "light": {
        "primary": "#6e6154",
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
        "size": {
          "sm": "clamp(0.8rem, 0.21vw + 0.75rem, 0.94rem)",
          "base": "clamp(1rem, 0.38vw + 0.9rem, 1.25rem)",
          "md": "clamp(1.25rem, 0.64vw + 1.09rem, 1.67rem)",
          "lg": "clamp(1.56rem, 1.01vw + 1.31rem, 2.22rem)",
          "xl": "clamp(1.95rem, 1.55vw + 1.57rem, 2.96rem)",
          "xxl": "clamp(2.44rem, 2.32vw + 1.86rem, 3.95rem)",
          "xxxl": "clamp(3.05rem, 3.4vw + 2.2rem, 5.26rem)"
        }
      }
    },
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

export const ThemeShowcase = () => {
  const addThemeAndSet = (palette: ThemePalette) => {
    if (!themeState.themeExists(palette.id)) {
      themeState.addTheme(palette)
    }
    themeState.changeTheme(palette.id)
  }

  return (
    <ShowcaseGrid>
      <For each={showcaseThemes}>
        {(theme) => (
          <ShowcaseItem onClick={
            () => {
              addThemeAndSet(JSON.parse(JSON.stringify(theme)))
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
