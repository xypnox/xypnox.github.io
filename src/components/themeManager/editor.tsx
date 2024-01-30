import { Show, createSignal, type ParentProps, createEffect, For, on, type Accessor, onMount } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { theme, type ThemePalette } from "../../theme";
import { icons } from "../icons";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import debounce from "lodash.debounce";

const Label = styled('label')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ColorLabel = styled(Label)`
  gap: 0.5rem;
  align-items: center;
  flex-direction: row;
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

  &.small {
    flex-grow: 1;
    flex-shrink: 0;
    line-height: 1;
    max-width: max-content;
    min-height: 2rem;
    padding: 0.25rem 0.5rem;
    font-size: ${theme.font.size.sm};
  }

  &.selected {
    border: 1px solid ${theme.primary.color};
    color: ${theme.primary.color};
  }

  &:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }

`

// A horizontal group of buttons, with separator borders, and outside border radius
const ButtonGroup = styled('div')`
  align-self: stretch;
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
    flex: 1;
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
  display: flex;
  align-items: center;
  padding-right: 0.25rem;
  h3 {
    padding: 0.5rem 0.5rem;
    margin: 0;
    flex: 1;
    font-size: ${theme.font.size.base};
    font-weight: 500;
    color: ${theme.heading};
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
      <h3>{props.title}</h3>
      <Button>
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
    return setFamilies(SelectedFamilies.filter(family => family.toLowerCase().includes(inpVal().toLowerCase())));
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
    const getFirstFont = (style: string) => {
      const font = style.split(',')[0];
      return font.replace(/"/g, '');
    }

    const existingLink = document.getElementById('_fontFamily');
    if (existingLink) {
      existingLink.remove();
    }
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${getFirstFont(style)}:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap`;
    link.rel = 'stylesheet';
    link.id = '_fontFamily';
    document.head.appendChild(link);
  }, 200)

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
            ...themeState.themePalette(),
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
        <Button onClick={() => props.closeEditor()}>
          <iconify-icon icon={icons.close} />
        </Button>
      </ButtonGroup>
    </Row>

    <ToggleSection
      title="Colors"
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
  border-radius: 50%;
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
          {color[0]}
        </ColorLabel>
      )}
    </For>
  </Colors>)
}

