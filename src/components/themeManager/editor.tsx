import { Show, createSignal, type ParentProps, createEffect, For, on, type Accessor, onMount, onCleanup, createMemo } from "solid-js";
import { themeState } from "./themeState";
import { keyframes, styled } from "solid-styled-components";
import { theme, type CardType, type ThemePalette } from "../../theme";
import { icons } from "../icons";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import debounce from "lodash.debounce";
import { capitalize } from "../../lib/text";
import { Text, Button, ButtonGroup, Input, baseElementStyles } from "../elements/atoms";

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

const CardTypeOptions: CardType[] = ['gradient', 'solid', 'transparent']

const CardTypeSelect = (props: {
  value: CardType,
  onChange: (value: CardType) => void,
}) => {
  const [focused, setFocused] = createSignal(false);
  let input: HTMLInputElement;

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
      value={props.value}
      onFocus={() => setFocused(true)}
      onInput={(e) => {
        if (CardTypeOptions.includes(e.currentTarget.value as CardType)) {
          props.onChange(e.currentTarget.value as CardType)
        }
      }}
    />
    <DropdownContent
      classList={{
        hidden: !focused(),
      }}
    >
      <SelectOptions>
        <For each={CardTypeOptions}>
          {type => (
            <Button
              class="small"
              classList={{
                selected: type === props.value
              }}
              onClick={() => {
                setFocused(false)
                props.onChange(type)
              }
              }
            >{type}</Button>
          )}
        </For>
      </SelectOptions>
    </DropdownContent>
  </Dropdown>
}


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
        [themeState.themeMode()]: {
          ...themePalette.vars[themeState.themeMode()],
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
        themeMode: themeState.themeMode()
      })
  })

  createEffect(() => {
    // console.log('Coloris', { themeMode: themeState.themeConfig.get().mode })
    Coloris.setInstance(
      `.coloris`,
      { themeMode: themeState.themeMode() }
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

const tooltipAnim = keyframes`
  0% {
    transform: translateY(-90%);
    opacity: 0;
  }
  25% {
    transform: translateY(-110%);
    opacity: 1;
  }
  75% {
    transform: translateY(-110%);
    opacity: 0.75;
  }
  100% {
    transform: translateY(-120%);
    opacity: 0;
  }
`

const CopiedTooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: max-content;
  pointer-events: none;
  background: ${theme.primary.color};
  color: ${theme.primary.contrast};
  padding: 0.5rem;
  border-radius: ${theme.border.radius};
  text-align: center;
  transform: translateY(-100%);
  animation: ${tooltipAnim} 1s ease-out forwards;
`

export const ThemeEditor = (props: { closeEditor: () => void }) => {
  const [themePalette, setThemePalette] = createSignal(themeState.themePalette())
  const [copied, setCopied] = createSignal(false)

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

  const notifyCopied = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1100)
  }

  // Copy palette as json to clipboard
  const onCopyPalette = () => {
    const palette = themePalette()
    const paletteJson = JSON.stringify(palette, null, 2)
    navigator.clipboard.writeText(paletteJson)
    notifyCopied()
  }

  const onCopyCss = () => {
    const css = themeState.cssTheme()
    navigator.clipboard.writeText(css)
    notifyCopied()
  }

  const onCopyVars = () => {
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    notifyCopied()
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


  const colors = createMemo(() => {
    return themePalette().vars[themeState.themeMode()]
  })

  // Listener for updating colors
  // if mode is auto and user changes color preference 
  const colorPreferenceListener = (e: MediaQueryListEvent) => {
    if (themeState.themeConfig.get().mode === 'auto') {
      if (e.matches) {
        themeState.setThemeMode('dark')
      } else {
        themeState.setThemeMode('light')
      }
    }
  }

  onMount(() => window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', colorPreferenceListener))

  onCleanup(() => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', colorPreferenceListener))

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
        colors={colors()}
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

      <Label>
        Card Type
        <CardTypeSelect value={themePalette().card} onChange={(value) => {
          setThemePalette({
            ...themePalette(),
            card: value
          })
        }} />
      </Label>
    </ToggleSection>

    <ButtonGroup>
      <Text>
        <iconify-icon icon={icons.copy} />
      </Text>
      <Show when={copied()}>
        <CopiedTooltip>Copied</CopiedTooltip>
      </Show>
      <Button onClick={() => onCopyPalette()}>Palette</Button>
      <Button onClick={() => onCopyCss()}>CSS</Button>
      <Button onClick={() => onCopyVars()}>Vars</Button>
    </ButtonGroup>
  </EditorWrapper>
}
