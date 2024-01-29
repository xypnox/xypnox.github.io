import { For, Show, createSignal, type ParentProps } from "solid-js";
import { themeState } from "./themeState";
import { styled } from "solid-styled-components";
import { theme } from "../../theme";
import { icons } from "../icons";

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

export const ThemeEditor = (props: { closeEditor: () => void }) => {
  const [sectionCollapses, setSectionCollapses] = createSignal({
    colors: false,
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


  return <EditorWrapper>
    <Row>
      <Input type="text" value={themeState.theme().name} />
      <ButtonGroup>
        {/* <Button onClick={() => themeState.changeTheme(themeState.theme().name)}>Save</Button> */}
        <Button onClick={() => themeState.deleteTheme(themeState.theme().name)}>
          <iconify-icon icon={icons.delete} />
        </Button>
        <Button onClick={() => props.closeEditor()}>Close</Button>
      </ButtonGroup>
    </Row>

    <EditorSection
      title="Colors"
      open={sectionCollapses().colors}
      toggleSection={() => toggleSection('colors')}
    >
      <Colors>
        {/* <For each={Object.entries(palette)}> */}
        {/*   {color => ( */}
        {/*     <ColorLabel> */}
        {/*       {color[0]} */}
        {/*       <input type="color" value={color[1]} /> */}
        {/*     </ColorLabel> */}
        {/*   )} */}
        {/* </For> */}
      </Colors>
    </EditorSection>

    <EditorSection
      title="Typography"
      open={sectionCollapses().typography}
      toggleSection={() => toggleSection('typography')}
    >
      <Label>
        Font Family
        <Input type="text" value={theme.font.family} />
      </Label>
      <Label>
        Font Size
        <Input type="text" value={theme.font.family} />
      </Label>
    </EditorSection>
  </EditorWrapper>
}
