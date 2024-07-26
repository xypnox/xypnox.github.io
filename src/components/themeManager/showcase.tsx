import { styled } from "solid-styled-components"
import type { ThemePalette } from "../../theme"
import { For } from "solid-js"
import { themeState } from "./themeState"
import { showcaseThemes } from "./showcaseThemes"

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
