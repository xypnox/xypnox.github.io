import { Show, createSignal, type ParentProps, createEffect, For, on, type Accessor, onMount } from "solid-js";
import { themeState } from "./themeState";
import { keyframes, styled } from "solid-styled-components";
import { theme, type ThemePalette } from "../../theme";
import { icons } from "../icons";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import debounce from "lodash.debounce";
import { capitalize } from "../../lib/text";
import { Button, ButtonGroup, Input, baseElementStyles } from "../elements/atoms";

const Label = styled('label')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ColorLabel = styled(Label)`
  position: relative;
  cursor: pointer;
  max-width: max-content;
  gap: 0.5rem;
  align-items: center;
  flex-direction: row;

  ${baseElementStyles}

  background: ${theme.surface};
  color: ${theme.text};
  border-color: ${theme.border.color};
  border-radius: ${theme.border.radius};

  input[data-coloris] {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }
`

const Colors = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`


const EditorWrapper = styled('div')`
  width: 100%;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  font-size: ${theme.font.size.sm};
  gap: 2rem;

  .edit-icon {
    ${baseElementStyles}
    border: 1px solid ${theme.border.color};
    border-radius: ${theme.border.radius};
    color: ${theme.fadeText};
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
  }
`

const Dropdown = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const DropdownContent = styled('div')`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: ${theme.surface};
  border: 1px solid ${theme.border.color};
  border-radius: ${theme.border.radius};
  z-index: 200;
  padding: 0.5rem;
  box-shadow: ${theme.cardShadow};
  backdrop-filter: blur(10px);
   
  &.hidden {
    display: none;
  }

  a {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: ${theme.text};
  }
`

const SelectOptions = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.25rem;
`

const EditorSectionWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.border.color};
  border-radius: ${theme.border.radius};
`

const EditorSectionTitle = styled('div')`
  user-select: none;
  display: flex;
  align-items: center;
  padding-right: 0.25rem;
  h3 {
    padding: 0.5rem 0.5rem;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${theme.font.size.base};
    font-weight: 500;
    color: ${theme.heading};
  }

  h3 > iconify-icon {
    color: ${theme.fadeText};
    font-size: 1.25rem;
    &.open {
      color: ${theme.primary.color};
    }
  }

  &.small {
    h3 {
      font-size: ${theme.font.size.sm};
    }
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

const ToggleSection = (props: ParentProps & {
  title: string,
  icon?: string,
  open: boolean,
  toggleSection: () => void,
  small?: boolean,
}) => {
  return <EditorSectionWrapper>
    <EditorSectionTitle
      classList={{
        small: props.small
      }}
      onClick={() => props.toggleSection()}
    >
      <h3>
        {props.title}
        <Show when={props.icon}>
          <iconify-icon
            classList={{
              'open': props.open
            }}
            icon={props.icon!} />
        </Show>
      </h3>
      <Button>
        <iconify-icon icon={props.open ? icons.expand : icons.collapse} />
      </Button>
    </EditorSectionTitle>
    <Show when={props.open}>
      <EditorSectionContent>
        {props.children}
      </EditorSectionContent>
    </Show>
  </EditorSectionWrapper >
}

const SelectedFamilies = [
  'Inter',
  'Jost',
  'Outfit',
  'Poppins',
  'Roboto',
  'Nunito',
  'Acme',
  'Barlow',
  'Merriweather',
  'Fraunces',
  'Space Grotesk',
  'Kalam',
  'Patrick Hand',
  'Crimson Text',
  'VT323',
  'Vollkorn',
]

const FontSelect = (props: {
  value: string,
  onChange: (value: string) => void,
}) => {
  const [focused, setFocused] = createSignal(false);
  const [inpVal, setInpVal] = createSignal(props.value);
  let input: HTMLInputElement;
  const [families, setFamilies] = createSignal([...SelectedFamilies]);

  createEffect(() => {
    // console.log('Filter Families', { inpVal: inpVal(), value: props.value })
    if (!inpVal()) {
      setFamilies(SelectedFamilies)
      return
    }
    if (!inpVal().length) {
      setFamilies(SelectedFamilies)
      return
    }
    if (SelectedFamilies.includes(inpVal())) {
      setFamilies(SelectedFamilies)
      return
    }
    const filtered = SelectedFamilies.filter(family => family.toLowerCase().includes(inpVal().toLowerCase()))
    if (filtered.length) {
      setFamilies(filtered)
      return
    }
  })

  const onClickOutside = (e: MouseEvent) => {
    if (input && !input.contains(e.target as Node)) {
      setFocused(false)
    }
  }

  onMount(() => {
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  })

  return <Dropdown>
    <Input
      ref={input!}
      type="text"
      value={inpVal()}
      onFocus={() => setFocused(true)}
      onInput={(e) => {
        setInpVal(e.currentTarget.value)
        props.onChange(e.currentTarget.value)
      }}
    />
    <DropdownContent
      classList={{
        hidden: !focused(),
      }}
    >
      <SelectOptions>
        <For each={families()}>
          {family => (
            <Button
              class="small"
              classList={{
                selected: family === props.value
              }}
              onClick={() => {
                setInpVal(family)
                setFocused(false)
                props.onChange(family)
              }
              }
            >{family}</Button>
          )}
        </For>
        <Row>
          <a href="https://fonts.google.com/" target="_blank">
            Browse All
            <iconify-icon icon={icons.external} />
          </a>
        </Row>
      </SelectOptions>
    </DropdownContent>
  </Dropdown>
}

export const ThemeEditor = (props: { closeEditor: () => void }) => {
  const [themePalette, setThemePalette] = createSignal(themeState.themePalette())

  const [sectionCollapses, setSectionCollapses] = createSignal({
    colors: true,
    typography: true,
    typography_family: false,
    layout: true,
  })

  const toggleSection = (section: string) => {
    if (sectionCollapses()[section as keyof typeof sectionCollapses] === undefined) {
      return
    }
    const sectionKey = section as keyof typeof sectionCollapses

    setSectionCollapses({ ...sectionCollapses(), [sectionKey]: !sectionCollapses()[sectionKey] })
  }

  createEffect(on(themePalette, () => {
    // console.log('Theme Palette', { themePalette: themePalette() })
    const themeId = themeState.theme().id
    themeState.modifyTheme(themeId, themePalette())
  }))

  // Copy palette as json to clipboard
  const onCopyPalette = () => {
    const palette = themePalette()
    const paletteJson = JSON.stringify(palette, null, 2)
    navigator.clipboard.writeText(paletteJson)
  }

  const onCopyCss = () => {
    const css = themeState.cssTheme()
    navigator.clipboard.writeText(css)
  }

  const onCopyVars = () => {
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
  }

  const updateFontLink = debounce((style: string) => {
    console.log('Update Font Link', { style })
    if (!style) {
      return
    }
    setThemePalette({
      ...themePalette(),
      base: {
        ...themePalette().base,
        font: {
          ...themePalette().base.font,
          family: style,
        }
      }
    })
  }, 200)

  return <EditorWrapper>
    {/* <code> */}
    {/*   {JSON.stringify(themePalette(), null, 2)} */}
    {/* </code> */}
    <Row>
      <div class="edit-icon">
        <iconify-icon icon={icons.edit} />
      </div>
      <Input
        type="text"
        value={themeState.theme().name}
        disabled={themeState.theme().id.startsWith('default')}
        onInput={(e) =>
          themeState.modifyTheme(themeState.theme().id, {
            ...themeState.themePalette(),
            name: e.currentTarget.value
          })
        }
      />
      <ButtonGroup>
        <Show when={!themeState.theme().id.startsWith('default')}>
          <Button onClick={() => {
            themeState.deleteTheme(themeState.theme().id)
            props.closeEditor()
          }}>
            <iconify-icon icon={icons.delete} />
          </Button>
        </Show>
        <Button onClick={() => props.closeEditor()}>
          <iconify-icon icon={icons.close} />
        </Button>
      </ButtonGroup>
    </Row>

    <ToggleSection
      title="Colors"
      icon={icons.colors}
      open={sectionCollapses().colors}
      toggleSection={() => toggleSection('colors')}
    >
      <Pickers
        colors={themePalette().vars[themeState.themeConfig.get().mode]}
        themePalette={themePalette}
        setThemePalette={setThemePalette}
      />
    </ToggleSection>


    <ToggleSection
      title="Typography"
      icon={icons.typography}
      open={sectionCollapses().typography}
      toggleSection={() => toggleSection('typography')}
    >
      <Label>
        <Row>
          Font Family<a href="https://fonts.google.com/" target="_blank"> Browse All <iconify-icon icon={icons.external} /></a>
        </Row>
        <FontSelect
          value={themePalette().base.font.family}
          onChange={(value) => {
            if (!value) { return }
            // console.log('Font Select onchange', { value })
            updateFontLink(value)
          }}
        />
      </Label>
    </ToggleSection>

    <ToggleSection
      title="Layout"
      icon={icons.layout}
      open={sectionCollapses().layout}
      toggleSection={() => toggleSection('layout')}
    >
      <Label>
        Border Radius
        <Input type="text" value={themePalette().base.border.radius}
          onInput={(e) => setThemePalette({
            ...themePalette(),
            base: {
              ...themePalette().base,
              border: {
                ...themePalette().base.border,
                radius: e.currentTarget.value
              }
            }
          })}
        />
      </Label>
    </ToggleSection>

    <ButtonGroup>
      <Button onClick={() => onCopyPalette()}>Copy Palette</Button>
      <Button onClick={() => onCopyCss()}>Copy CSS</Button>
      <Button onClick={() => onCopyVars()}>Copy Vars</Button>
    </ButtonGroup>
  </EditorWrapper>
}

const Swatch = styled('div')`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--border-radius);
  background: ${props => props.color};
`

const ColorInput = styled(Input)`
  flex: 0;
  padding: 0.25rem 0.5rem;
  min-width: 10ch;
  font-size: ${theme.font.size.base};
`

const Pickers = (props: {
  colors: Record<string, string>,
  themePalette: Accessor<ThemePalette>,
  setThemePalette: (themePalette: ThemePalette) => void
}) => {

  const changeColor = (colorKey: string, color: string) => {
    const themePalette = props.themePalette()
    props.setThemePalette({
      ...themePalette,
      vars: {
        ...themePalette.vars,
        [themeState.themeConfig.get().mode]: {
          ...themePalette.vars[themeState.themeConfig.get().mode],
          [colorKey]: color
        }
      }
    })
  }

  // console.log('Coloris', { props })
  Coloris.init()
  Object.entries(props.colors).forEach(([colorKey, _color]) => {
    Coloris.setInstance(
      `#coloris-picker-${colorKey}`,
      {
        onChange: (color: string) => {
          // console.log('Coloris', { colorKey, color, el: `#coloris-picker-${colorKey}` })
          changeColor(colorKey, color)
        },
        themeMode: themeState.themeConfig.get().mode,
      })
  })

  createEffect(() => {
    console.log('Coloris', { themeMode: themeState.themeConfig.get().mode })
    Coloris.setInstance(
      `.coloris`,
      {
        themeMode: themeState.themeConfig.get().mode,
      }
    )
  })

  return (<Colors>
    <For each={Object.entries(props.colors)}>
      {color => (
        <ColorLabel>
          <Swatch color={color[1]} />
          <ColorInput
            data-coloris
            id={`coloris-picker-${color[0]}`}
            type="text" value={color[1]} />
          {capitalize(color[0])}
        </ColorLabel>
      )}
    </For>
  </Colors>)
}
