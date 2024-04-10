import { For, Match, Show, Switch, createMemo, createSignal, onMount } from "solid-js";
import { Button, ButtonGroup, Label, baseElementStyles } from "../../components/elements/atoms";
import { styled } from "solid-styled-components";
import { theme } from "../../theme";
import { Tag } from 'en-pos';
import { SampleText } from "./sample";
import { Tooltip } from "../../components/elements/tooltip";
import { RangeInput } from "../../components/elements/range";

const [rawText, setRawText] = createSignal(SampleText);

const Textarea = styled("textarea")`
  ${baseElementStyles}
  font-size: 0.8em;
  padding: 0.5rem;
  min-height: 10rem;
  background-color: ${theme.surface};
  width: 100%;
  color: ${theme.fadeText};
`

const splitParagraphs = (text: string) => text.split("\n").map((p) => p.trim()).filter((p) => p.length > 0);

const generatedTags = (text: string): TagName[] => {
  const words = text.split(" ");
  const tags = new Tag(words).initial().smooth().tags;
  return tags as TagName[];
};

const dictionary = {
  NN: {
    name: "Noun",
    example: ["dog", "man"]
  },
  NNS: {
    name: "Plural noun",
    example: ["dogs", "men"]
  },
  NNP: {
    name: "Proper noun",
    example: ["London", "Alex"]
  },
  NNPS: {
    name: "Plural proper noun",
    example: ["Smiths"]
  },
  VB: {
    name: "Base form verb",
    example: ["be"]
  },
  VBP: {
    name: "Present form verb",
    example: ["throw"]
  },
  VBZ: {
    name: "Present form (3rd person)",
    example: ["throws"]
  },
  VBG: {
    name: "Gerund form verb",
    example: ["throwing"]
  },
  VBD: {
    name: "Past tense verb",
    example: ["threw"]
  },
  VBN: {
    name: "Past participle verb",
    example: ["thrown"]
  },
  MD: {
    name: "Modal verb",
    example: ["can", "shall", "will", "may", "must", "ought"]
  },
  JJ: {
    name: "Adjective",
    example: ["big", "fast"]
  },
  JJR: {
    name: "Comparative adjective",
    example: ["bigger"]
  },
  JJS: {
    name: "Superlative adjective",
    example: ["biggest"]
  },
  RB: {
    name: "Adverb",
    example: ["not", "quickly", "closely"]
  },
  RBR: {
    name: "Comparative adverb",
    example: ["less-closely", "faster"]
  },
  RBS: {
    name: "Superlative adverb",
    example: ["fastest"]
  },
  DT: {
    name: "Determiner",
    example: ["the", "a", "some", "both"]
  },
  PDT: {
    name: "Predeterminer",
    example: ["all", "quite"]
  },
  PRP: {
    name: "Personal Pronoun",
    example: ["I", "you", "he", "she"]
  },
  PRP$: {
    name: "Possessive Pronoun",
    example: ["I", "you", "he", "she"]
  },
  POS: {
    name: "Possessive ending",
    example: ["'s"]
  },
  IN: {
    name: "Preposition",
    example: ["of", "by", "in"]
  },
  PR: {
    name: "Particle",
    example: ["up", "off"]
  },
  TO: {
    name: "to",
    example: ["to"]
  },
  WDT: {
    name: "Wh-determiner",
    example: ["which", "that", "whatever", "whichever"]
  },
  WP: {
    name: "Wh-pronoun",
    example: ["who", "whoever", "whom", "what"]
  },
  WP$: {
    name: "Wh-possessive",
    example: ["whose"]
  },
  WRB: {
    name: "Wh-adverb",
    example: ["how", "where"]
  },
  EX: {
    name: "Expletive there",
    example: ["there"]
  },
  CC: {
    name: "Coordinating conjugation",
    example: ["&", "and", "nor", "or"]
  },
  CD: {
    name: "Cardinal Numbers",
    example: ["1", "7", "77", "one"]
  },
  LS: {
    name: "List item marker",
    example: ["1", "B", "C", "One"]
  },
  UH: {
    name: "Interjection",
    example: ["ah", "oh", "oops"]
  },
  FW: {
    name: "Foreign Words",
    example: ["viva", "mon", "toujours"]
  },
  ",": {
    name: "Comma",
    example: [","]
  },
  ":": {
    name: "Mid-sent punct",
    example: [":", ";", "..."]
  },
  ".": {
    name: "Sent-final punct.",
    example: [".", "!", "?"]
  },
  "(": {
    name: "Left parenthesis",
    example: [")", "}", "]"]
  },
  ")": {
    name: "Right parenthesis",
    example: ["(", "{", "["]
  },
  "#": {
    name: "Pound sign",
    example: ["#"]
  },
  "$": {
    name: "Currency symbols",
    example: ["$", "€", "£", "¥"]
  },
  SYM: {
    name: "Other symbols",
    example: ["+", "*", "/", "<", ">"]
  },
  EM: {
    name: "Emojis & emoticons",
    example: [":)", "❤"]
  },
}

type TagName = keyof typeof dictionary;
type ColorKey = "secondary" | "primary" | "heading" | "fade";

const colortagGroups: Record<ColorKey, TagName[]> = {
  "secondary": ["NN", "NNS", "NNP", "NNPS", "PRP", "PRP$", "WDT", "WP", "WP$", "WRB", "EX", "CD", "FW"],
  "primary": ["VB", "VBP", "VBZ", "VBG", "VBD", "VBN", "MD"],
  "heading": ["JJ", "JJR", "JJS", "RB", "RBR", "RBS", "DT", "PDT"],
  "fade": ["POS", "IN", "PR", "TO", "CC", "LS", ",", ":", ".", "(", ")", "#", "$", "SYM", "EM"]
}

const colortags: Record<ColorKey, string> = {
  "secondary": theme.secondary.color,
  "primary": theme.primary.color,
  "heading": theme.heading,
  "fade": theme.fadeText
}


const WordColor = styled("span")`
  color: var(--word-color);
  padding: 0.1rem;
`

const Processed = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2em 0.25em;
  margin-top: 1rem;
  padding: 0.5rem;
`

const TagTooltip = styled("div")`
  font-size: ${theme.font.size.base};
  && ul {
    font-size: ${theme.font.size.sm};
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    li {
      padding: 0.1rem;
      margin: 0;
    }
  }
`

const Word = (props: { text: string, tag: TagName }) => {
  const wordColor = createMemo(() => {
    const key = Object.keys(colortagGroups).find((group) => colortagGroups[group as ColorKey].includes(props.tag))
    if (key) {
      return colortags[key as ColorKey];
    }
    return colortags.fade;
  });
  const tag = createMemo(() => dictionary[props.tag]);
  return (
    <Tooltip id="tag" placement="top"
      tooltip={<TagTooltip>
        <WordColor style={{ "--word-color": wordColor() }}>
          {tag().name}
        </WordColor>
        <ul>
          <For each={tag().example}>
            {(ex) => <li>{ex}</li>}
          </For>
        </ul>

      </TagTooltip>}
    >
      <WordColor
        style={{ "--word-color": wordColor() }}
      >
        {props.text}
      </WordColor>
    </Tooltip>
  )
}

const PartOfSpeech = (props: { text: string }) => {
  const tags = generatedTags(props.text);
  const words = createMemo(() => props.text.split(" "));
  return (
    <Processed>
      <For each={tags}>
        {(tag, i) =>
          <Word text={words()[i()]} tag={tag} />
        }
      </For>
    </Processed>
  )
}

const [startOpacity, setStartOpacity] = createSignal(1);
const [midOpacity, setMidOpacity] = createSignal(0.5);
const [endOpacity, setEndOpacity] = createSignal(1);

const opacityCalc = (i: number, length: number) => {
  const mid = Math.floor(length / 2);
  if (i < mid) {
    return startOpacity() + (midOpacity() - startOpacity()) * (i / mid);
  }
  return midOpacity() + (endOpacity() - midOpacity()) * ((i - mid) / mid);
}

const Sentence = (props: { text: string }) => {
  return (
    <Processed>
      <For each={(props.text).split(". ")} fallback={<div></div>}>
        {(s, p) =>
          <For each={(s.split(" ")).filter((w) => w.length > 0)}>
            {(w, i) =>
              <div
                style={{ opacity: opacityCalc(i(), s.split(" ").length) }}
              >{w}
                <Show when={i() == s.split(" ").length - 1 && !w.endsWith(".")}>
                  <span>.</span>
                </Show>
              </div>
            }
          </For>
        }
      </For>
    </Processed>
  )
}
const Paragraph = (props: { text: string }) => {
  return (
    <Processed>
      <For each={(props.text).split(" ")} fallback={<div></div>}>
        {(s, p) =>
          <div
            style={{ opacity: opacityCalc(p(), props.text.split(" ").length) }}
          >{s}
          </div>
        }
      </For>
    </Processed>
  )
}

const highlightModes = ["sentence", "paragraph", "part-of-speech"];

type HighlightMode = typeof highlightModes[number];

const Toolbar = styled("div")`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  justify-content: space-around;
  flex-wrap: wrap;
  background: ${theme.surface};
  border: 1px solid ${theme.border.color};
  border-radius: ${theme.border.radius};
  & > * {
    min-width: 8rem;
    max-width: 12rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    & > * {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
`

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

type InputEv = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
}

export const EnHigh = (props: { defaultText: string }) => {
  onMount(() => {
    if (props.defaultText) {
      setRawText(props.defaultText);
    }
  })
  const [mode, setMode] = createSignal<HighlightMode>("sentence");
  const [size, setSize] = createSignal(1);
  return (
    <Wrapper>
      <Textarea
        placeholder="Enter text to highlight"
        value={rawText()} onInput={(e) => setRawText(e.currentTarget.value)} />

      <ButtonGroup>
        <For each={highlightModes}>
          {(m) => <Button
            classList={{ selected: mode() === m }}
            onClick={() => setMode(m)}>{m}</Button>}
        </For>
      </ButtonGroup>

      <Toolbar>
        <Show when={mode() === "sentence" || mode() === "paragraph"}>
          <For each={[
            {
              label: "Start opacity",
              value: startOpacity,
              onChange: (e: InputEv) => setStartOpacity(parseFloat(e.currentTarget?.value))
            },
            {
              label: "Mid opacity",
              value: midOpacity,
              onChange: (e: InputEv) => setMidOpacity(parseFloat(e.currentTarget?.value))
            },
            {
              label: "End opacity",
              value: endOpacity,
              onChange: (e: InputEv) => setEndOpacity(parseFloat(e.currentTarget?.value))
            }
          ]}>
            {(tool) =>
              <RangeInput showValue min={0} max={1} step={0.01}
                label={tool.label}
                value={tool.value()}
                onChange={tool.onChange}
              />}
          </For>
        </Show>
        <RangeInput
          label="Size"
          value={size()}
          showValue
          min={0.5} max={2} step={0.01}
          onChange={(e) => setSize(e.currentTarget.valueAsNumber)}
        />
      </Toolbar>
      <div
        style={{ "font-size": `calc(${size()} * ${theme.font.size.md})` }}
      >
        <For each={(splitParagraphs(rawText()))} fallback={<div></div>}>
          {(p) =>
            <Switch>
              <Match when={mode() === "sentence"}>
                <Sentence text={p} />
              </Match>

              <Match when={mode() === "part-of-speech"}>
                <PartOfSpeech text={p} />
              </Match>

              <Match when={mode() === "paragraph"}>
                <Paragraph text={p} />
              </Match>
            </Switch>
          }
        </For>

      </div>
    </Wrapper>
  )
}




