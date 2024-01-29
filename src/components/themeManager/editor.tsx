import { Show, createSignal, type ParentProps, createEffect, onMount, For, createMemo, onCleanup, on } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { theme, defaultThemePalette, generateThemeFromPalette } from "../../theme";
import { icons } from "../icons";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import { nanoid } from "nanoid";


const Label = styled('label')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Colors = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const baseElementStyles = `
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: ${theme.border.radius};
  font-size: ${theme.font.size.base};
  border: 1px solid transparent;
  iconify-icon {
    font-size: 1.25rem;
  }
`

const Input = styled('input')`
  ${baseElementStyles}
  flex: 1;
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  color: ${theme.text};
  transition: all 0.2s ease;
  min-width: 10ch;
`

const Button = styled('button')`
  ${baseElementStyles}
  flex: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border: 1px solid transparent;
  background: ${theme.surface};
  color: ${theme.text};
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }

`

// A horizontal group of buttons, with separator borders, and outside border radius
const ButtonGroup = styled('div')`
  display: flex;
  align-items: stretch;
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  transition: all 0.2s ease;
  ${Button.class} {
    background: transparent;
    border-radius: 0;
    border: 0px solid transparent;
    border-right: 1px solid ${theme.border.color};
    &:hover {
      background: var(--primary-color);
      color: var(--primary-contrast);
    }
    &:first-child {
      border-radius: ${theme.border.radius} 0 0 ${theme.border.radius};
  }
    &:last-child {
      border-radius: 0 ${theme.border.radius} ${theme.border.radius} 0;
      border-right: none;
  }
  }

`

const EditorWrapper = styled('div')`
  width: 100%;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  font-size: ${theme.font.size.sm};
  gap: 2rem;
`

const EditorSectionWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.border.color};
  border-radius: ${theme.border.radius};
  overflow: hidden;
`

const EditorSectionTitle = styled('div')`
  display: flex;
  align-items: center;
  padding-right: 1px;
  h3 {
    padding: 0.25rem 0.5rem;
    margin: 0;
    flex: 1;
    font-size: ${theme.font.size.base};
  }

  button {
    background: transparent;
  }
`

const EditorSectionContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  border-top: 1px solid ${theme.border.color};
  h4 {
    margin: 0;
  }
`

const Row = styled('div')`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`

const EditorSection = (props: ParentProps & {
  title: string,
  open: boolean,
  toggleSection: () => void
}) => {
  return <EditorSectionWrapper>
    <EditorSectionTitle>
      <h3>{props.title}</h3>
      <Button onClick={() => props.toggleSection()}>
        <iconify-icon icon={props.open ? icons.expand : icons.collapse} />
      </Button>
    </EditorSectionTitle>
    <Show when={props.open}>
      <EditorSectionContent>
        {props.children}
      </EditorSectionContent>
    </Show>
  </EditorSectionWrapper>
}

const [themePalette, setThemePalette] = createSignal({ ...defaultThemePalette });
export const ThemeEditor = (props: { closeEditor: () => void }) => {

  const [sectionCollapses, setSectionCollapses] = createSignal({
    colors: true,
    typography: false,
    spacing: false,
    border: false,
    shadows: false,
    transitions: false,
  })

  const toggleSection = (section: string) => {
    if (sectionCollapses()[section as keyof typeof sectionCollapses] === undefined) {
      return
    }
    const sectionKey = section as keyof typeof sectionCollapses

    setSectionCollapses({ ...sectionCollapses(), [sectionKey]: !sectionCollapses()[sectionKey] })
  }

  createEffect(on(themePalette, () => {
    const themeId = themeState.theme().id
    const themeName = themeState.theme().name

    const theme = generateThemeFromPalette(themeName, themeId, themePalette())

    themeState.modifyTheme(themeId, theme)
  }))



  return <EditorWrapper>
    {/* <code> */}
    {/*   {JSON.stringify(themePalette(), null, 2)} */}
    {/* </code> */}
    <Row>
      <Input
        type="text"
        value={themeState.theme().name}
        disabled={themeState.theme().id.startsWith('default')}
        onInput={(e) =>
          themeState.modifyTheme(themeState.theme().id, {
            ...themeState.theme(),
            name: e.currentTarget.value
          })
        }
      />
      <ButtonGroup>
        <Show when={!themeState.theme().id.startsWith('default')}>
          <Button onClick={() => themeState.deleteTheme(themeState.theme().id)}>
            <iconify-icon icon={icons.delete} />
          </Button>
        </Show>
        <Button onClick={() => props.closeEditor()}>Close</Button>
      </ButtonGroup>
    </Row>

    <EditorSection
      title="Colors"
      open={sectionCollapses().colors}
      toggleSection={() => toggleSection('colors')}
    >
      <Pickers colors={themePalette().vars[themeState.themeConfig.get().mode]} />
    </EditorSection>


    {/* <EditorSection */}
    {/*   title="Typography" */}
    {/*   open={sectionCollapses().typography} */}
    {/*   toggleSection={() => toggleSection('typography')} */}
    {/* > */}
    {/* <Label> */}
    {/*   Font Family */}
    {/*   <Input type="text" value={theme.font.family} /> */}
    {/* </Label> */}
    {/* <Label> */}
    {/*   Font Size */}
    {/*   <Input type="text" value={theme.font.family} /> */}
    {/* </Label> */}
    {/* </EditorSection> */}
  </EditorWrapper>
}

const Swatch = styled('div')`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: ${props => props.color};
`

const ColorInput = styled(Input)`
  flex: 0;
  padding: 0.25rem 0.5rem;
  min-width: 10ch;
  font-size: ${theme.font.size.base};
`

const Pickers = (props: { colors: Record<string, string> }) => {

  const changeColor = (colorKey: string, color: string) => setThemePalette({
    ...themePalette(),
    vars: {
      ...themePalette().vars,
      [themeState.themeConfig.get().mode]: {
        ...themePalette().vars[themeState.themeConfig.get().mode],
        [colorKey]: color
      }
    }
  })

  // console.log('Coloris', { props })
  Coloris.init()
  Coloris({
    el: '.coloris',
  });
  Object.entries(props.colors).forEach(([colorKey, color]) => {
    Coloris.setInstance(
      `#coloris-picker-${colorKey}`,
      {
        onChange: (color: string) => {
          // console.log('Coloris', { colorKey, color, el: `#coloris-picker-${colorKey}` })
          changeColor(colorKey, color)
        }
      })
  })

  return (<Colors>
    <For each={Object.entries(props.colors)}>
      {color => (
        <Label>
          <Swatch color={color[1]} />
          <ColorInput
            class="coloris"
            id={`coloris-picker-${color[0]}`}
            type="text" value={color[1]} />
          {color[0]}
        </Label>
      )}
    </For>
  </Colors>)
}

