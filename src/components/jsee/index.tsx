import { For, Match, Show, Switch, createMemo, createSignal, onMount } from "solid-js";
import { extractCss, styled } from "solid-styled-components";
import { theme } from "../../theme";
import { Button, ButtonGroup, GroupSeparator, IconInput, Input, Text, baseElementStyles } from "../elements/atoms";
import { icons } from "../icons";
import { CopyButton } from "../elements/atoms/copyButton";
import debounce from "lodash.debounce";

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

const defaultValue = {
  app: "JSee",
  version: "0.1.1",
  about: "A Json Seer with magical powers",
  powers: [
    "It can show JSON in a pretty way",
    "Can show type hints",
    "Key Labels are sticky"
  ],

  // sample: {
  //   ohMyColorsAreInArray: ['red', 'green', 'blue'],
  //   whatever: {
  //     key: "value",
  //     key3: 124,
  //     key4: true,
  //     key5: null,
  //     key6: {
  //       key4: true,
  //       key5: null,
  //       key6: {
  //         key4: true,
  //         key5: null,
  //       },
  //       key7: {
  //         key4: true,
  //         key5: null,
  //       },
  //     },
  //   },
  //   defined: {
  //     isDefined: true,
  //   }
  // },

  // sizeDoesntMatter: "Curabitizzle et go to hizzle daahng dawg nisi the bizzle mollizzle. Stuff gizzle. Morbi odio. Vivamus neque. Crizzle orci. Cras maurizzle i'm in the shizzle, interdizzle fo shizzle, hizzle shizzlin dizzle amizzle, ma nizzle izzle, pede. Pellentesque shizzlin dizzle. Boofron fo shizzle mi, sheezy cool, ma nizzle sizzle, izzle fo shizzle, sizzle. Mofo in its fo rizzle.",

  // noteAboutNext: "Now lets see a sample JSON Response",

  // response: {
  //   "page": 1,
  //   "per_page": 6,
  //   "total": 12,
  //   "total_pages": 2,
  //   "data": [
  //     {
  //       "id": 1,
  //       "name": "cerulean",
  //       "year": 2000,
  //       "color": "#98B2D1",
  //       "pantone_value": "15-4020"
  //     },
  //     {
  //       "id": 2,
  //       "name": "fuchsia rose",
  //       "year": 2001,
  //       "color": "#C74375",
  //       "pantone_value": "17-2031"
  //     },
  //     {
  //       "id": 3,
  //       "name": "true red",
  //       "year": 2002,
  //       "color": "#BF1932",
  //       "pantone_value": "19-1664"
  //     },
  //     {
  //       "id": 4,
  //       "name": "aqua sky",
  //       "year": 2003,
  //       "color": "#7BC4C4",
  //       "pantone_value": "14-4811"
  //     },
  //     {
  //       "id": 5,
  //       "name": "tigerlily",
  //       "year": 2004,
  //       "color": "#E2583E",
  //       "pantone_value": "17-1456"
  //     },
  //     {
  //       "id": 6,
  //       "name": "blue turquoise",
  //       "year": 2005,
  //       "color": "#53B0AE",
  //       "pantone_value": "15-5217"
  //     }
  //   ],
  //   "support": {
  //     "url": "https://reqres.in/#support-heading",
  //     "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
  //   }
  // }
}


const [indent, setIndent] = createSignal<number | undefined>(2);
const [jsonObject, setJsonObject] = createSignal(defaultValue);
const jsonString = createMemo(() => JSON.stringify(jsonObject(), null, indent()));


const [filter, setFilter] = createSignal({
  query: "",
});
const [showTypes, setShowTypes] = createSignal(true);
const [showValues, setShowValues] = createSignal(true);

interface JSONError {
  error: string;
  code?: { line: string, highlight: boolean }[];
}

const [errorMessage, setErrorMessage] = createSignal<JSONError | undefined>(undefined);

const getHighlightCode = (json: string, line: number) => {
  // We want a max window of 5 lines
  const windowStart = (line - 2) > 0 ? line - 2 : 0;
  const windowEnd = Math.min(json.split("\n").length, line + 3);

  return json.split("\n").slice(windowStart, windowEnd);
}

const getHighlightLine = (json: string, line: number) => {
  return json.split("\n")[line];
}

const parseJson = (json: string) => {
  try {
    const parsed = JSON.parse(json);
    setJsonObject(parsed);
    setErrorMessage(undefined);
  } catch (e) {
    console.error(e);
    if (e instanceof SyntaxError) {
      // console.log("Syntax Error", e);
      const error = e as SyntaxError;
      // `at line {N} column {N} of the JSON data`
      // extract line and column from message
      const match = String(error).match(/line \d+ column \d+/);
      // console.log("Match", match);
      if (match) {
        const [line, column] = match[0].split(" ").map(Number).filter(n => !isNaN(n));
        // Take the json string and find the line and surrounding 1 lines.
        const lineNum = line - 1
        const highlightLine = getHighlightLine(json, lineNum);
        const code = getHighlightCode(json, lineNum);
        const newError = { error: error.message, code: code.map((l, i) => ({ line: l, highlight: l === highlightLine })) }
        // console.log("code", line, column, code, newError, highlightLine);
        setErrorMessage(newError);
        return;
      }

      setErrorMessage({ error: error.message });
    }
  }
}

const ValueEl = styled("div")`
  ${baseElementStyles}
  flex-shrink: 0;
  font-size: calc(0.75 * ${theme.font.size.sm});
  padding: calc(0.1 * ${theme.font.size.sm}) calc(0.25 * ${theme.font.size.sm});
  background-color: ${theme.surface};
  color: ${theme.fadeText};
  max-width: 80ch;
  word-break: break-all;
`

const JSeeValue = (props: { keys: string[], value: JSONValue }) => {
  return (
    <ValueEl>
      {String(props.value)}
    </ValueEl>
  );
}

const ElStyle = styled("div")`
  position: relative;
  padding: 0rem 0.5rem;
  display: flex;
  gap: 0.25rem;
  border-left: 1px solid ${theme.border.color};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-left: 1px solid ${theme.primary.color};
  }
`

// Key title should be sticky to the top of the element
const KeyTitle = styled("button")`
  ${baseElementStyles}
  color: ${theme.text};
  background: transparent;
  font-size: ${theme.font.size.sm};
  position: sticky;
  top: 0;
  padding: 0 calc(0.25 * ${theme.font.size.sm});
  display: flex;
  align-items: center;
  gap: 0.25em;
  z-index: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: ${theme.border.radius};
  user-select: none;

  iconify-icon {
    font-size: 1em;
    color: ${theme.fadeText};
    opacity: 0.5;
  }

  &:hover {
    background-color: ${theme.surface};
    color: ${theme.primary.color};
    iconify-icon {
      opacity: 1;
    }
  }
`

const ElValue = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;
`

const ValueType = styled("div")`
  font-size: 0.8em;
  color: ${theme.fadeText};
`

// All keys in json, of obj and nested objects 
// in form of [
// "app"
//  "sample.whatever.key"
// ]
const jsonKeys = createMemo(() => {
  if (filter().query === "") {
    return [];
  }
  const getDeepKeys = (obj: JSONValue, path: string[] = []): string[] => {
    if (obj === null || obj === undefined) {
      return [];
    }
    if (typeof obj === "object") {
      return Object.entries(obj as Object).flatMap(([key, value]) => {
        return getDeepKeys(value, [...path, key]);
      });
    }
    if (Array.isArray(obj)) {
      return (obj as JSONValue[]).flatMap((value, index) => {
        return getDeepKeys(value, [...path, index.toString()]);
      });
    }
    return [path.join(".")];
  }
  return getDeepKeys(jsonObject());
});

const JSeeElement = (props: { keys: string[], json: JSONValue, root: boolean }) => {
  const valueType = createMemo(() => {
    if (props.json === null) {
      return "null";
    }
    if (props.json === undefined) {
      return "undefined";
    }
    if (typeof props.json === "boolean") {
      return "boolean";
    }
    if (Array.isArray(props.json)) {
      return "array";
    }
    if (typeof props.json === "object") {
      return "object";
    }
    if (typeof props.json === "number") {
      return "number";
    }
    return "string";
  });
  const [expanded, setExpanded] = createSignal(true/*valueType() === "object" || valueType() === "array"*/);

  let ref: HTMLDivElement;

  const onClick = () => {
    setExpanded(e => !e);
    if (ref && expanded()) {
      // Also only if not in view
      scrollToRef();
    }
    // 
  }

  // Check if ref is already in view
  const scrollToRef = () => {
    if (ref) {
      if (ref.getBoundingClientRect().top < 0 || ref.getBoundingClientRect().bottom > window.innerHeight) {
        ref.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const onWrapperClick = (e: MouseEvent) => {
    e.stopPropagation();
    // Ensure no interior element was clicked
    if (ref && expanded()) {
      scrollToRef();
    }
  }

  const showElement = createMemo(() => {
    if (filter().query === "") {
      return true;
    }
    if (props.root) {
      return true;
    }
    const query = filter().query;
    const keyMatch = jsonKeys().some(key => key.includes(query) && key.startsWith(props.keys.join(".")));
    // console.log("Key Matched", { keyMatch, key: props.keys.join("."), keys: jsonKeys() });
    if (keyMatch) {
      // console.log("Key Matched", props.keys);
      return true;
    }
    if (showValues()) {
      if (JSON.stringify(props.json).includes(query)) {
        // console.log("Value Matched", props.keys, props.json);
        return true;
      }
    }
    return false;
  })


  return (
    <Show when={showElement()}>
      <ElStyle ref={ref!}>
        <div onClick={onWrapperClick}>
          <KeyTitle onClick={onClick}>
            <Show when={props.keys.length > 0}>
              {props.keys[props.keys.length - 1]}
            </Show>
            <Show when={props.keys.length === 0}>
              <span>Root</span>
            </Show>
            <Show when={showTypes()}>
              <ValueType>:{valueType()}</ValueType>
            </Show>
            <Show when={!expanded()}>
              <iconify-icon icon={icons.collapse} />
            </Show>
          </KeyTitle>
        </div>
        <Show when={expanded()}>
          <ElValue>
            <Switch fallback={showValues() ? JSON.stringify(props.json) : ''}>
              <Match when={valueType() === "array"}>
                <For each={(props.json as Array<JSONValue>)}>
                  {(value, index) => {
                    return <JSeeElement
                      root={false}
                      keys={[...props.keys, index().toString()]}
                      json={value} />
                  }}
                </For>
              </Match>
              <Match when={valueType() === "object"}>
                <For each={Object.entries(props.json as { [key: string]: JSONValue })}>
                  {([key, value]) => {
                    return <JSeeElement
                      root={false}
                      keys={[...props.keys, key]}
                      json={value} />
                  }}
                </For>
              </Match>
              <Match when={
                showValues() &&
                (valueType() === "string" ||
                  valueType() === "boolean" ||
                  valueType() === "number" ||
                  valueType() === "null" ||
                  valueType() === "undefined")
              }>
                <JSeeValue
                  keys={props.keys} value={props.json} />
              </Match>
            </Switch>
          </ElValue>
        </Show>
      </ElStyle>
    </Show>
  );
}

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Textarea = styled("textarea")`
  ${baseElementStyles}
  font-size: 0.8em;
  padding: 0.5rem;
  min-height: 10rem;
  background-color: ${theme.surface};
  color: ${theme.fadeText};
`

const JSeeRender = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-bottom: 1rem;
`

const Toolbar = styled("div")`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  ${ButtonGroup.class} {
    flex-grow: 1;
    max-width: max-content;
  }

  ${Button.class}, ${Text.class} {
    max-width: max-content;
    flex-grow: 1;
    font-size: ${theme.font.size.sm};
    iconify-icon {
      font-size: 1.25em;
    }
  }
`

const ErrorMessage = styled(Text)`
  width: 100%;
  min-width: max-content;
  color: ${theme.primary.color};
  border: 1px solid ${theme.primary.color};
  font-size: ${theme.font.size.sm};
  border-radius: ${theme.border.radius};
  iconify-icon {
    color: ${theme.primary.color};
  }
`

const ErrorCode = styled("pre")`
  font-size: ${theme.font.size.sm};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${theme.surface};
  code.highlight {
    color: ${theme.primary.color};
    border: 1px dashed ${theme.primary.color};
  }
`

export const JSee = (props: { defaultValue?: string }) => {
  onMount(() => {
    if (props.defaultValue) {
      parseJson(props.defaultValue);
    }
  });
  const updateQuery = (e: InputEvent & {
    target: HTMLInputElement | null
  }) => {
    if (e.target !== null) setFilter(f => ({ ...f, query: e.target!.value }))
  }

  return (
    <>
      <style innerHTML={extractCss()} id="_goober" />
      <Wrapper>
        <Textarea
          onInput={(e) => {
            // console.log("Input", e.currentTarget.value);
            parseJson(e.currentTarget.value);
          }}
        >{jsonString()}</Textarea>
        <Show when={errorMessage()}>
          <div>
            <ErrorMessage>
              <iconify-icon icon={icons.error} />
              {errorMessage()!.error}
            </ErrorMessage>
            <Show when={errorMessage()!.code}>
              <ErrorCode>
                {errorMessage()!.code!.map((line, index) => (
                  <code class={line.highlight ? "highlight" : ""}>
                    {line.line}
                  </code>
                ))}
              </ErrorCode>
            </Show>
          </div>
        </Show>
        <Toolbar>
          <IconInput classList={{ active: filter().query !== "" }}>
            <iconify-icon icon={icons.filter} />
            <Input placeholder="Filter" onInput={debounce(updateQuery, 500)} />
          </IconInput>
          <ButtonGroup>
            <Button onClick={() => setShowTypes(e => !e)}>Toggle Types</Button>
            <GroupSeparator />
            <Button onClick={() => setShowValues(e => !e)}>Toggle Values</Button>
            <GroupSeparator />
            <CopyButton copyText={jsonString} icon={icons.copy} />
          </ButtonGroup>
          <ButtonGroup>
            <Text>Indent</Text>
            <GroupSeparator />
            <For each={[2, 4, 8, undefined]}>
              {(value, index) => {
                return (
                  <>
                    <Button
                      classList={{ selected: indent() === value }}
                      onClick={() => setIndent(value)}
                    >
                      {value ?? "None"}
                    </Button>
                    <Show when={index() < 3}>
                      <GroupSeparator />
                    </Show>
                  </>
                );
              }}
            </For>
          </ButtonGroup>
        </Toolbar>
        <JSeeRender>
          <JSeeElement keys={[]} json={jsonObject()} root />
        </JSeeRender>
      </Wrapper>
    </>
  );
}
