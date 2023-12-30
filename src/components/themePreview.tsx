import { For, Show, type ParentProps, } from "solid-js"
import { styled } from "solid-styled-components"
import { theme, } from "../theme"
import { flattenObject } from "../lib/objects"


interface UIElement {
  type: string
  text: string
}

interface ThemePreviewProps extends ParentProps {
  initialElements: UIElement[]
  vars?: Themevars
}


interface Themevars {
  txt: string
  bg: string
  primary?: string
  surface?: string
  border?: string
  shadow?: string
}

const lightMode: Themevars = {
  txt: "#333",
  bg: "#fff",
  primary: "#000",
  surface: "#f0f0f0",
  border: "#333",
  shadow: "#000",
}

const blackModeVars: Themevars = {
  txt: "#fff",
  bg: "#000",
  primary: "#fff",
  surface: "#222",
  border: "#fff",
}

const lightModeColorVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#1A1E27",
  primary: "#2A5EC3",
  surface: "#303748",
  border: "#fff",
}

export const themePreviewConfigVars = {
  lightMode,
  blackModeVars,
  lightModeColorVars,
}

const minimalElements = [
  {
    type: "h1",
    text: "Black & White",
  },
  {
    type: "text",
    text: "Black and white are the colors of the zen. The white is the light and the black is the darkness, forever entangled in a dance of duality."
  },
]

const complexElements = [
  {
    type: "h2",
    text: "The complexities of life",
  },
  {
    type: "text",
    text: "While it is indeed true that life is hard as evidenced by punching the ground, although it is not recommeded to do so yourself, the happiness gained with living continues to write this...."
  },
  {
    type: "card",
    text: "There are various uses of a card component. It can be used to display a product, a blog post, a comment, a tweet, a profile, or anything that you can think of."
  },
  {
    type: "button",
    text: "Hello World",
  }
]

export const themePreviewElementConfigs = {
  minimal: {
    initialElements: minimalElements,
  },
  converted: {
    initialElements: minimalElements,
    vars: themePreviewConfigVars.blackModeVars,
  },
  complex: {
    initialElements: complexElements,
    vars: themePreviewConfigVars.lightModeColorVars,
  }
}

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Column = styled("div")`
  width: 100%;
  border-radius: 0.25rem;
  background-color: var(--bg);
  border-radius: 0.5rem;
  color: var(--txt);
  font-family: ${theme.font.family};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
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
  color: var(--txt);
  border-radius: 0.5rem;
`

const H1 = styled("div")`
  width: 100%;
  color: var(--txt);
  border-radius: 0.5rem;
  font-size: 2rem;
  margin: 0.5rem 0 0;
`

const H2 = styled("div")`
  width: 100%;
  color: var(--txt);
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
  color: var(--bg);
  background-color: var(--primary);
  border: none;
  cursor: pointer;
`

const Card = styled("div")`
  margin: 1rem 0;
  border-radius: 0.5rem;
  background-color: var(--surface);
  color: var(--txt);
  padding: 1rem;
`

export const ThemePreview = (props: ThemePreviewProps) => {
  const themeCssVars = flattenObject(props.vars ?? lightMode, (keys, value) => [
    `--${keys.join("-")}`,
    value,
  ]);

  console.log({ themeCssVars, initialVars: lightMode })

  return (
    <Container>
      <Column style={{ ...themeCssVars }}>
        <For each={props.initialElements ?? themePreviewElementConfigs.minimal}>
          {(element) => (
            <GridItem>
              <Show when={element.type === "text"}>
                <Text>{element.text}</Text>
              </Show>
              <Show when={element.type === "button"}>
                <Button>{element.text}</Button>
              </Show>
              <Show when={element.type === "h1"}>
                <H1>{element.text}</H1>
              </Show>
              <Show when={element.type === "h2"}>
                <H2>{element.text}</H2>
              </Show>
              <Show when={element.type === "card"}>
                <Card>{element.text}</Card>
              </Show>
            </GridItem>
          )}
        </For>
      </Column>
      {props.children}
    </Container>
  )
}

