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
  astro?: { code?: Record<string, any> }
  colors?: Record<string, string>
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

/***
border: 2px solid #2C3046; background: linear-gradient(155deg, #1A1D2C -3.43%, #131621 65.81%);
 */
const shinyCardVars: Themevars = {
  txt: "#B5C0DB",
  bg: "#0f111a",
  surface: "linear-gradient(155deg, #1A1D2C -3.43%, #131621 65.81%)",
  cardBorder: "linear-gradient(155deg, #2C3046, #0f111a)",
  cardShadow: "0px 8px 32px -4px rgba(45,255,196,0.05)",
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

const codeVars: Themevars = {
  txt: "#c0caf5",
  bg: "#101010",

  astro: {
    code: {
      color: {
        text: "#c0caf5", // fg
        background: "#1A1E27", // bg
      },
      token: {
        constant: "#89DDFF", // blue
        comment: "#565f89", // comment
        keyword: "#BB9AF7", // purple
        function: "#82AAFF", // blue
        punctuation: "#82AAFF", // blue
      }
    }
  }
}

const themeCodeVars: Themevars = {
  txt: "#EC9BC2",
  bg: "#2C3359",

  astro: {
    code: {
      color: {
        text: "#EC9BC2", // fg
        background: "#222640", // bg
      },
      token: {
        constant: "#89DDFF", // blue
        comment: "#565f89", // comment
        keyword: "#BB9AF7", // purple
        function: "#82AAFF", // blue
        punctuation: "#82AAFF", // blue
      }
    }
  }
}

const lightThemeCodeVars: Themevars = {
  txt: "#222640",
  bg: "#efc3de",

  astro: {
    code: {
      color: {
        text: "#81475f", // fg
        background: "#FFE4F8", // bg
      },
      token: {
        constant: "#3594BA", // blue
        comment: "#b495ae", // comment
        keyword: "#6A45AB", // purple
        function: "#B53985", // blue
        punctuation: "#083CAB", // blue
      }
    }
  }
}

const lightColorsVars: Themevars = {
  txt: "#222640",
  // light gray
  bg: "#f0f0f0",

  surface: "#fff",

  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    warning: "#ffc107",
    danger: "#dc3545",
    success: "#198754",
    info: "#0dcaf0",
  }
}

const darkColorsVars: Themevars = {
  txt: "#B5C0DB",
  // light gray
  bg: "#1A1E27",

  surface: "#303748",

  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    warning: "#ffc107",
    danger: "#dc3545",
    success: "#198754",
    info: "#0dcaf0",
  }
}

const xypColorsVars: Themevars = {
  txt: "#919DCF",
  // light gray
  bg: "#0f111a",

  surface: "#1e213980",

  colors: {
    primary: "#ff5370",
    secondary: "#6b5eff",
    heading: "#CCA685",
    italic: "#CC64AD",
    fadeText: "#919DCF80",
    text: "#919DCF",
  }
}

const gruvColorsVars: Themevars = {
  txt: "#AEA398",
  // light gray
  bg: "#252525",

  surface: "#3C3836",

  colors: {
    primary: "#FBA359",
    secondary: "#B8BB26",
    heading: "#88B877",
    italic: "#F47F71",
    fadeText: "#897969",
    text: "#AEA398",
  }
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
  codeVars,
  themeCodeVars,
  lightThemeCodeVars,
  lightColorsVars,
  darkColorsVars,
  xypColorsVars,
  gruvColorsVars,
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

const iconElements = [

  { type: "icon", text: "ph:user-switch-duotone", },
  { type: "icon", text: "ph:gear-fine-duotone", },
  { type: "icon", text: "ph:paint-brush-broad-duotone", },

  { type: "icon", text: "pixelarticons:reciept", },
  { type: "icon", text: "pixelarticons:home", },
  { type: "icon", text: "pixelarticons:cloud", },

  { type: "icon", text: "ph:heart", },
  { type: "icon", text: "ph:heart-fill", },
  { type: "icon", text: "ph:heart-straight-break-duotone", },

  { type: "icon", text: "line-md:downloading-loop", },
  { type: "icon", text: "line-md:coffee-half-empty-twotone-loop", },
  { type: "icon", text: "line-md:sun-rising-twotone-loop", },
]

const moonIconElements = [
  { type: "icon", text: "wi:moon-alt-full", },
  { type: "icon", text: "wi:moon-alt-waning-gibbous-2", },
  { type: "icon", text: "wi:moon-alt-waning-gibbous-4", },

  { type: "icon", text: "wi:moon-alt-third-quarter", },
  { type: "icon", text: "wi:moon-alt-waning-crescent-2", },
  { type: "icon", text: "wi:moon-alt-waning-crescent-4", },

  { type: "icon", text: "wi:moon-alt-new", },
  { type: "icon", text: "wi:moon-alt-waxing-crescent-2", },
  { type: "icon", text: "wi:moon-alt-waxing-crescent-4", },


  { type: "icon", text: "wi:moon-alt-first-quarter", },
  { type: "icon", text: "wi:moon-alt-waxing-gibbous-2", },
  { type: "icon", text: "wi:moon-alt-waxing-gibbous-4", },
]

// Shift the moonIconElements array by half

const moonIconElementsCorrected = [
  ...moonIconElements.slice(6),
  ...moonIconElements.slice(0, 6),
]

const iconsElements = [{
  type: "icons",
  text: "Icons",
  elements: iconElements,
}]

const moonIconsElements = [{
  type: "icons",
  text: "Moon Icons",
  elements: moonIconElements,
}]

const reversedMoonIconsElements = [{
  type: "icons",
  text: "Moon Icons",
  elements: moonIconElementsCorrected,
}]

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
  },
  icons: {
    previews: [
      { elements: iconsElements, vars: themePreviewConfigVars.lightMode, },
      { elements: iconsElements, vars: themePreviewConfigVars.blackModeVars, },
    ]
  },
  moonIcons: {
    previews: [
      { elements: moonIconsElements, vars: themePreviewConfigVars.lightMode, },
      { elements: moonIconsElements, vars: themePreviewConfigVars.blackModeVars, },
      { elements: reversedMoonIconsElements, vars: themePreviewConfigVars.blackModeVars, },
    ]
  },

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

const ShinyCardWrapper = styled("div")`
  border-radius: calc(0.5rem + 2px);
  background: var(--preview-cardBorder);
  padding: 2px;
  height: 100%;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: var(--preview-cardShadow);
`

const ShinyCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: none;
  margin: 0;
  ${H1.class} {
    color: var(--preview-primary-color);
  }
`

const IconGrid = styled("div")`
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(4, 1fr);
  grid-auto-rows: 2rem;
  gap: 2rem;
  width: 100%;
  min-height: 6rem;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;

  & > div {
    width: max-content;
  }

  iconify-icon {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    color: var(--preview-txt);
  }
`

const CodeBlock = styled("pre")`
  width: 100%;
  x-overflow: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--preview-astro-code-color-background);
`

const Code = () => {
  const code = `<span class="line"><span style="color:var(--preview-astro-code-token-comment)">/** A function to end all functions */</span></span>
<span class="line"><span style="color:var(--preview-astro-code-token-keyword)">function</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">showcaseSyntaxHighlighting</span><span style="color:var(--preview-astro-code-color-text)">&lt;</span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-keyword)">extends</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">string</span><span style="color:var(--preview-astro-code-color-text)">&gt;(</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  name</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-token-punctuation)">,</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">)</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">void</span><span style="color:var(--preview-astro-code-color-text)"> {</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-comment)">// Use a for loop to log the age multiple times</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-keyword)">for</span><span style="color:var(--preview-astro-code-color-text)"> (</span><span style="color:var(--preview-astro-code-token-keyword)">let</span><span style="color:var(--preview-astro-code-color-text)"> i </span><span style="color:var(--preview-astro-code-token-keyword)">=</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">0</span><span style="color:var(--preview-astro-code-color-text)">; i </span><span style="color:var(--preview-astro-code-token-keyword)">&lt;</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">18</span><span style="color:var(--preview-astro-code-color-text)">; i</span><span style="color:var(--preview-astro-code-token-keyword)">++</span><span style="color:var(--preview-astro-code-color-text)">) { </span><span style="color:var(--preview-astro-code-token-constant)">console</span><span style="color:var(--preview-astro-code-token-function)">.log</span><span style="color:var(--preview-astro-code-color-text)">(</span><span style="color:var(--preview-astro-code-token-string-expression)">\`Age marker: </span><span style="color:var(--preview-astro-code-token-keyword)">\${</span><span style="color:var(--preview-astro-code-color-text)">i</span><span style="color:var(--preview-astro-code-token-keyword)">}</span><span style="color:var(--preview-astro-code-token-string-expression)">\`</span><span style="color:var(--preview-astro-code-color-text)">); }</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-keyword)">interface</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">User</span><span style="color:var(--preview-astro-code-color-text)">&lt;</span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-color-text)">&gt; {</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">    name</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">T</span><span style="color:var(--preview-astro-code-color-text)">;</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">    age</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">number</span><span style="color:var(--preview-astro-code-color-text)">;</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">    isDeveloper</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">boolean</span><span style="color:var(--preview-astro-code-color-text)">;</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  }</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-keyword)">const</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">user</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-function)">User</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-keyword)">=</span><span style="color:var(--preview-astro-code-color-text)"> { name</span><span style="color:var(--preview-astro-code-token-punctuation)">,</span><span style="color:var(--preview-astro-code-color-text)"> age</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">18</span><span style="color:var(--preview-astro-code-token-punctuation)">,</span><span style="color:var(--preview-astro-code-color-text)"> isDeveloper</span><span style="color:var(--preview-astro-code-token-keyword)">:</span><span style="color:var(--preview-astro-code-color-text)"> </span><span style="color:var(--preview-astro-code-token-constant)">false</span><span style="color:var(--preview-astro-code-color-text)"> };</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">  </span><span style="color:var(--preview-astro-code-token-function)">showcaseSyntaxHighlighting</span><span style="color:var(--preview-astro-code-color-text)">(</span><span style="color:var(--preview-astro-code-token-string-expression)">'Alice'</span><span style="color:var(--preview-astro-code-color-text)">);</span></span>
<span class="line"><span style="color:var(--preview-astro-code-color-text)">}</span></span>`

  return <CodeBlock class="css-variables" style="background-color:var(--preview-astro-code-color-background);overflow-x:auto" tabindex="0" innerHTML={code} />
}

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

const ColorPreviewLarge = styled("div")`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--color);
`

const ColorSwatches = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ColorInfo = styled("div")`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`

const ColorCard = styled(Card)`
  padding: 0.5rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  font-size: ${theme.font.size.sm};
  border-radius: 0.75rem;
`

const ColorsPreview = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14ch, 1fr));
  width: 100%;
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

const RenderElement = (props: {
  element: UIElement,
  vars: Themevars,
}) => {

  const logVars = () => { console.log(props.vars); return null }

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
      <ShinyCardWrapper>
        <ShinyCard>
          <For each={props.element.elements ?? themePreviewElementConfigs.minimal.preview.elements}>
            {(element) => (
              <RenderElement vars={props.vars} element={element} />
            )}
          </For>
        </ShinyCard>
      </ShinyCardWrapper>
    </Show>
    <Show when={props.element.type === "code"}>
      <Code />
    </Show>
    <Show when={props.element.type === "colors"}>
      <ColorsPreview>
        <For each={Object.entries(props.vars.colors ?? {})}>
          {(entry) => (
            <ColorCard>
              <ColorPreviewLarge style={{ "--color": entry[1] }} />
              <ColorInfo>
                <div>{entry[1]}</div>
                <div>{entry[0]}</div>
              </ColorInfo>
            </ColorCard>
          )}
        </For>
      </ColorsPreview>
    </Show>
    <Show when={props.element.type === "icons"}>
      <IconGrid>
        <For each={props.element.elements ?? [{ type: 'icon', text: 'ph:heart' }]}>
          {(element) => (
            <RenderElement vars={props.vars} element={element} />
          )}
        </For>
      </IconGrid>
    </Show>
    <Show when={props.element.type === "icon"}>
      <iconify-icon icon={props.element.text} />
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
            <RenderElement
              vars={props.preview.vars ?? lightMode}
              element={element} />
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

