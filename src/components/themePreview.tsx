import { For, Show, type ParentProps, createSignal, type Accessor } from "solid-js"
import { styled } from "solid-styled-components"
import { theme, } from "../theme"
import { flattenObject } from "../lib/objects"
import { Tabs } from "./tabs"

interface UIElement {
  type: string
  text: string
  elements?: UIElement[]
}

interface Themevars {
  txt: string
  bg: string
  primary?: {
    color: string
    over: string
  }
  surface?: string
  cardBorder?: string
  cardShadow?: string
}

interface Preview {
  elements: UIElement[]
  vars: Themevars
}

interface ThemePreviewProps extends ParentProps {
  preview: Preview
  /** Needed if you want to show the info tab and are not using the ThemePreviewSplits component */
  showInfo?: boolean
}

const lightMode: Themevars = {
  txt: "#000",
  bg: "#fff",
  surface: "#f0f0f0",
}

const blackModeVars: Themevars = {
  txt: "#fff",
  bg: "#000",
  surface: "#222",
}

const darkModeColorVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#1A1E27",
  surface: "#303748",
}

const darkModeShadeColorVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#303748",
  surface: "#1A1E27",
}

const lightModeCardVars: Themevars = {
  txt: "#000",
  bg: "#f0f0f0",
  surface: "#fff",
}

const lightModeCardFlippedVars: Themevars = {
  txt: "#000",
  bg: "#fff",
  surface: "#f0f0f0",
}
const lightModeShadowCardVars: Themevars = {
  txt: "#000",
  bg: "#f0f0f0",
  surface: "#fff",
  cardShadow: "0px 8px 16px -8px rgba(0,0,0,0.2)",
}

const darkModeShadowCardVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#1A1E27",
  surface: "#303748",
  cardShadow: "0px 8px 16px -8px rgba(0,0,0,0.2)",
}
const darkModeSharpShadowCardVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#1A1E27",
  surface: "#303748",
  cardShadow: "0px 8px 16px -8px rgba(0,0,0,0.4)",
}
const darkModeGlowCardVars: Themevars = {
  txt: "#1A1E27",
  bg: "#1A1E27",
  surface: "rgb(45,255,196)",
  cardShadow: "0px 16px 32px 4px rgba(45,255,196,0.5)",
}

const shinyCardVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#0f111a",
  surface: "linear-gradient(180deg, #1A1E27 0%, #303748 100%)",
  cardBorder: "1px solid #ffffff20",
  cardShadow: "0px 16px 32px 4px rgba(45,255,196,0.5)",
  primary: {
    color: "#2DFFC4",
    over: "#1A1E27",
  }
}

const lightModeCardBorderVars: Themevars = {
  txt: "#000",
  bg: "#f0f0f0",
  surface: "#fff",
  cardBorder: "1px solid #ccc",
}

export const themePreviewConfigVars = {
  lightMode,
  blackModeVars,
  darkModeColorVars,
  darkModeShadeColorVars,
  lightModeCardVars,
  lightModeCardFlippedVars,
  lightModeShadowCardVars,
  lightModeCardBorderVars,
  darkModeShadowCardVars,
  darkModeSharpShadowCardVars,
  darkModeGlowCardVars,
  shinyCardVars,
}

const minimalElements: UIElement[] = [
  {
    type: "h1",
    text: "Black & White",
  },
  {
    type: "text",
    text: "Black and white are the colors of the zen. The white is the light and the black is the darkness, forever entangled in a dance of duality."
  },
]

const cardElements: UIElement[] = [
  {
    type: "card",
    text: "While it is indeed true that life is hard as evidenced by punching the ground ...."
  },
]

export const themePreviewElementConfigs: Record<string, ThemePreviewProps> = {
  minimal: {
    preview: { elements: minimalElements, vars: themePreviewConfigVars.lightMode, }
  },
  converted: {
    preview: { elements: minimalElements, vars: themePreviewConfigVars.blackModeVars, }
  },
  complex: {
    preview: { elements: cardElements, vars: themePreviewConfigVars.darkModeColorVars, }
  },
}

export const themePreviewSplitsConfigs: Record<string, ThemePreviewSplitsProps> = {
  bnw: {
    previews: [
      { elements: minimalElements, vars: themePreviewConfigVars.lightMode, },
      { elements: minimalElements, vars: themePreviewConfigVars.blackModeVars, },
    ]
  },
  card: {
    previews: [
      { elements: cardElements, vars: themePreviewConfigVars.darkModeColorVars, },
      { elements: cardElements, vars: themePreviewConfigVars.darkModeShadeColorVars, },
    ],
  },
  lightCard: {
    previews: [
      { elements: cardElements, vars: themePreviewConfigVars.lightModeShadowCardVars, },
      { elements: cardElements, vars: themePreviewConfigVars.lightModeCardVars, },
      { elements: cardElements, vars: themePreviewConfigVars.lightModeCardFlippedVars, },
      { elements: cardElements, vars: themePreviewConfigVars.lightModeCardBorderVars, },
    ]
  }
}


const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: ${theme.font.size.sm};
`

const Column = styled("div")`
  width: 100%;
  border-radius: 0.25rem;
  background-color: var(--preview-bg);
  border-radius: 0.5rem;
  color: var(--preview-txt);
  font-family: ${theme.font.family};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  width: 100%;

  * {
    transition: all 0.3s ease-in-out;
  }
`

const GridItem = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Text = styled("div")`
  width: 100%;
  color: var(--preview-txt);
  border-radius: 0.5rem;
`

const H1 = styled("div")`
  width: 100%;
  color: var(--preview-txt);
  border-radius: 0.5rem;
  font-size: 2rem;
  margin: 0.5rem 0 0;
`

const H2 = styled("div")`
  width: 100%;
  color: var(--preview-txt);
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin: 0.5rem 0 0;
`

const Button = styled("button")`
  max-width: max-content;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-family: ${theme.font.family};
  color: var(--preview-primary-over);
  background-color: var(--preview-primary-color);
  border: none;
  cursor: pointer;
`

const Card = styled("div")`
  margin: 1rem 0;
  border-radius: 0.5rem;
  background: var(--preview-surface);
  color: var(--txt);
  padding: 1rem;
  box-shadow: var(--preview-cardShadow);
  border: var(--preview-cardBorder, 1px solid transparent);
`

const ShinyCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: var(--preview-cardBorder, 1px solid transparent);
`

const ThemeInfoWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: ${theme.font.family};
  button {
    font-family: ${theme.font.family};
  }
`

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`


const ColorSwatch = styled("div")`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${theme.surface};
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: ${theme.font.size.sm};

  span:nth-child(3) {
    color: ${theme.fadeText};
  }
`

const ColorPreview = styled("div")`
  width: 1rem;
  height: 1rem;
  border-radius: 0.33rem;
  background-color: var(--color);
`

const ColorSwatches = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const InfoHeaderWrapper = styled("div")`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  /* justify-content: center; */
`

const InfoButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: ${theme.surface};
  color: ${theme.fadeText};
  font-size: ${theme.font.size.sm};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${theme.primary.color};
  }
`

const ThemeInfoContent = (props: {
  currentTab: Accessor<number>
} & ThemePreviewProps) => {
  const flattenedVars = () => flattenObject(props.preview.vars, (keys, value) => [
    keys.join("-"),
    value,
  ]);
  return (
    <Content>
      <Show when={props.currentTab() === 0}>
        <ColorSwatches>
          <For each={Object.entries(flattenedVars())}>
            {(entry) => (
              <ColorSwatch>
                <ColorPreview style={{ "--color": entry[1] }} />
                <span>{entry[1]}</span>
                <span>{entry[0]}</span>
              </ColorSwatch>
            )}
          </For>
        </ColorSwatches>
      </Show>

      <Show when={props.currentTab() === 1}>
        <ColorSwatches>
          <For each={props.preview.elements}>
            {(entry) => (
              <ColorSwatch>
                <span>{entry.type}</span>
              </ColorSwatch>
            )}
          </For>
        </ColorSwatches>
      </Show>

      <Show when={props.currentTab() === 2}>
        <p>Typography</p>
        <div>WIP</div>
      </Show>
    </Content>
  )
}

/**
 * Shows the theme info for a single theme preview,
 * ideal to show beside a single theme preview
 * can be hidden by clicking the info button
 */
const ThemeInfo = (props: ThemePreviewProps) => {
  const [showInfo, setShowInfo] = createSignal(false);
  const [currentTab, setCurrentTab] = createSignal(0);

  return (
    <ThemeInfoWrapper>
      <InfoHeaderWrapper>
        <InfoButton onClick={() => setShowInfo(!showInfo())}>
          <iconify-icon icon="ph:palette" />
          Info
        </InfoButton>
        <Show when={showInfo()}>
          <Tabs
            tabs={[
              { name: "Colors", },
              { name: "Components", },
            ]}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Show>
      </InfoHeaderWrapper>

      <Show when={showInfo()}>
        <ThemeInfoContent currentTab={currentTab} {...props} />
      </Show>

    </ThemeInfoWrapper>
  )
}

const RenderElement = (props: { element: UIElement }) => {

  return <GridItem>
    <Show when={props.element.type === "text"}>
      <Text>{props.element.text}</Text>
    </Show>
    <Show when={props.element.type === "button"}>
      <Button>{props.element.text}</Button>
    </Show>
    <Show when={props.element.type === "h1"}>
      <H1>{props.element.text}</H1>
    </Show>
    <Show when={props.element.type === "h2"}>
      <H2>{props.element.text}</H2>
    </Show>
    <Show when={props.element.type === "card"}>
      <Card>{props.element.text}</Card>
    </Show>
    <Show when={props.element.type === "shinycard"}>
      <ShinyCard>
        <For each={props.element.elements ?? themePreviewElementConfigs.minimal.preview.elements}>
          {(element) => (
            <RenderElement element={element} />
          )}
        </For>
      </ShinyCard>
    </Show>
  </GridItem>
}

// Add type reference in comments
/**
 * Shows a single theme preview
 * Requires theme vars: `Themevars`
 */
export const ThemePreview = (props: ThemePreviewProps) => {
  const themeCssVars = flattenObject(props.preview.vars ?? lightMode, (keys, value) => [
    `--preview-${keys.join("-")}`,
    value,
  ]);

  // console.log({ themeCssVars, initialVars: lightMode })

  return (
    <Container>
      <Column style={{ ...themeCssVars }}>
        <For each={props.preview.elements ?? themePreviewElementConfigs.minimal.preview.elements}>
          {(element) => (
            <RenderElement element={element} />
          )}
        </For>
      </Column>
      <Show when={props.showInfo === undefined || props.showInfo}>
        <ThemeInfo {...props} />
      </Show>
      {props.children}
    </Container>
  )
}

const SplitContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`

const SplitContent = styled("div")`
  @media (min-width: 600px) {
    max-width: 50%;
  }
  min-width: min(50%, 300px);
  height: fit-content;
  flex-grow: 1;
  flex-basis: 0;
  outline-offset: 4px;

  &:hover {
    outline: 2px solid ${theme.fadeText};
  }

  border-radius: 0.5rem;

  &.active {
    outline: 2px solid ${theme.primary.color};
  }
`

interface ThemePreviewSplitsProps extends ParentProps {
  previews: Preview[]
}

export const ThemePreviewSplits = (props: ThemePreviewSplitsProps) => {
  const [currentTab, setCurrentTab] = createSignal(0);
  const [currentPreview, setCurrentPreview] = createSignal(0);
  const [showInfo, setShowInfo] = createSignal(false);

  return (
    <Container style={{
      margin: "1rem 0",
    }}>
      <SplitContainer>
        <For each={props.previews}>
          {(preview, index) => (
            <SplitContent
              classList={{
                active: showInfo() && currentPreview() === index(),
              }}
              tabIndex={0}
              role="button"
              onClick={() => {
                setShowInfo(true);
                setCurrentPreview(index());
              }}
            >
              <ThemePreview
                preview={preview}
                showInfo={false}
              />
            </SplitContent>
          )}
        </For>
      </SplitContainer>

      <Show when={props.previews.length > 1}>
        <ThemeInfoWrapper>
          <InfoHeaderWrapper>
            <InfoButton onClick={() => setShowInfo(!showInfo())}>
              <iconify-icon icon="ph:cursor-click" />
              Inspect
            </InfoButton>
            <Show when={showInfo()}>
              <Tabs
                tabs={[
                  { name: "Variables", },
                  { name: "Components", },
                ]}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </Show>
          </InfoHeaderWrapper>

          <Show when={showInfo()}>
            <ThemeInfoContent currentTab={currentTab}
              preview={props.previews[currentPreview()]}
            />
          </Show>

        </ThemeInfoWrapper>
      </Show>

    </Container>
  )
}

