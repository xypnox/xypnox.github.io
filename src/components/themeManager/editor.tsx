import { Show, createSignal, type ParentProps, createEffect, For, on, type Accessor, onMount, onCleanup, createMemo } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { theme, type CardType, type ThemePalette, CardTypes } from "../../theme";
import { icons } from "../icons";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import debounce from "lodash.debounce";
import { capitalize } from "../../lib/text";
import { Button, ButtonGroup, GroupSeparator, Input, baseElementStyles } from "../elements/atoms";
import { CopyButton } from "../elements/atoms/copyButton";
import { DeleteButton } from "../elements/atoms/deleteButton";
import { DropSelect } from "../elements/dropselect";

const Label = styled('label')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ColorLabel = styled(Label)`
  position: relative;
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

  &:focus-within {
    outline: 2px solid var(--primary-color);
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
  &:hover button {
    color: ${theme.primary.color};
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

const ToggleButton = styled(Button)`
  ${baseElementStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.fadeText};
  background: transparent;
`

const ToggleSection = (props: ParentProps & {
  title: string,
  icon?: string,
  open: boolean,
  toggleSection?: () => void,
  small?: boolean,
}) => {
  return <EditorSectionWrapper>
    <EditorSectionTitle
      classList={{
        small: props.small
      }}
      onClick={() => props.toggleSection && props.toggleSection()}
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
      <Show when={props.toggleSection !== undefined}>
        <ToggleButton>
          <iconify-icon icon={props.open ? icons.expand : icons.collapse} />
        </ToggleButton>
      </Show>
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
        <ColorLabel
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.currentTarget.click()
            }
          }}
        >
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

export const ThemeEditor = (props: { closeEditor: () => void }) => {
  const [themePalette, setThemePalette] = createSignal(themeState.themePalette())

  const [sectionCollapses, setSectionCollapses] = createSignal({
    colors: true,
    typography: true,
    layout: true,
    export: true,
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

  return (
    <EditorWrapper>
      <Row>
        <div class="edit-icon">
          <iconify-icon icon={icons.edit} />
        </div>
        <Input
          type="text"
          value={themePalette().name}
          onInput={(e) =>
            setThemePalette({
              ...themePalette(),
              name: e.currentTarget.value
            })
          }
        />
        <ButtonGroup>
          <Show when={!themeState.theme().id.startsWith('default')}>
            <DeleteButton
              icon={icons.delete}
              onConfirm={() => {
                themeState.deleteTheme(themeState.theme().id)
                props.closeEditor()
              }}
            />
          </Show>
          <GroupSeparator />
          <CopyButton icon={icons.copy} copyText={() => JSON.stringify(themePalette(), null, 2)} />
        </ButtonGroup>
        <ButtonGroup>
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
        <DropSelect
          label="Font Family"
          value={themePalette().base.font.family}
          options={SelectedFamilies.map((family: string) => ({ label: family, value: family }))}
          onChange={(value) => {
            if (!value) { return }
            // console.log('Font Select onchange', { value })
            updateFontLink(value)
          }}
          Footer={() => (
            <Row>
              <a href="https://fonts.google.com/" target="_blank">
                Browse All
                <iconify-icon icon={icons.external} />
              </a>
            </Row>
          )}
        />
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

        <DropSelect
          label="Card Type"
          value={themePalette().card as string}
          onlyFromOptions
          options={CardTypes.map((type: CardType) => ({ label: capitalize(type), value: type }))}
          onChange={(value) => {
            setThemePalette({
              ...themePalette(),
              card: value as CardType
            })
          }}
        />
      </ToggleSection>

      <ToggleSection
        title="Export"
        icon={icons.copy}
        open={sectionCollapses().export}
        toggleSection={() => toggleSection('export')}
      >
        <ButtonGroup>
          <CopyButton label="Palette" copyText={() => JSON.stringify(themePalette(), null, 2)} />
          <GroupSeparator />
          <CopyButton label="CSS" copyText={() => themeState.cssTheme()} />
          <GroupSeparator />
          <CopyButton label="Vars" copyText={() => JSON.stringify(theme, null, 2)} />
        </ButtonGroup>
      </ToggleSection>
    </EditorWrapper>
  )
}
