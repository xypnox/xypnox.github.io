import { For, Match, Show, Switch, createEffect, createMemo, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { theme } from "../../theme";
import { Button, ButtonGroup, GroupSeparator, IconInput, Input, Text, baseElementStyles } from "../elements/atoms";
import { icons } from "../icons";
import { CopyButton } from "../elements/atoms/copyButton";
import debounce from "lodash.debounce";
import type { JSX } from "solid-js/h/jsx-runtime";

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

const defaultValue = {
  app: "JSee",
  version: "0.1.0",
  about: "A Json Seer with magical powers",
  powers: [
    "It can show JSON in a pretty way",
    "Can show type hints",
    "Key Labels are sticky"
  ],

  sample: {
    ohMyColorsAreInArray: ['red', 'green', 'blue'],
    whatever: {
      key: "value",
      key3: 124,
      key4: true,
      key5: null,
      key6: {
        key4: true,
        key5: null,
        key6: {
          key4: true,
          key5: null,
        },
        key7: {
          key4: true,
          key5: null,
        },
      },
    },
    defined: {
      isDefined: true,
    }
  },

  sizeDoesntMatter: "Curabitizzle et go to hizzle daahng dawg nisi the bizzle mollizzle. Stuff gizzle. Morbi odio. Vivamus neque. Crizzle orci. Cras maurizzle i'm in the shizzle, interdizzle fo shizzle, hizzle shizzlin dizzle amizzle, ma nizzle izzle, pede. Pellentesque shizzlin dizzle. Boofron fo shizzle mi, sheezy cool, ma nizzle sizzle, izzle fo shizzle, sizzle. Mofo in its fo rizzle.",

  noteAboutNext: "Now lets see a sample JSON Response",

  response: {
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020"
      },
      {
        "id": 2,
        "name": "fuchsia rose",
        "year": 2001,
        "color": "#C74375",
        "pantone_value": "17-2031"
      },
      {
        "id": 3,
        "name": "true red",
        "year": 2002,
        "color": "#BF1932",
        "pantone_value": "19-1664"
      },
      {
        "id": 4,
        "name": "aqua sky",
        "year": 2003,
        "color": "#7BC4C4",
        "pantone_value": "14-4811"
      },
      {
        "id": 5,
        "name": "tigerlily",
        "year": 2004,
        "color": "#E2583E",
        "pantone_value": "17-1456"
      },
      {
        "id": 6,
        "name": "blue turquoise",
        "year": 2005,
        "color": "#53B0AE",
        "pantone_value": "15-5217"
      }
    ],
    "support": {
      "url": "https://reqres.in/#support-heading",
      "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
    }
  }

}


const [indent, setIndent] = createSignal<number | undefined>(2);
const [jsonObject, setJsonObject] = createSignal(defaultValue);
const jsonString = createMemo(() => JSON.stringify(jsonObject(), null, indent()));


const [filter, setFilter] = createSignal({
  query: "",
  matchKeys: true,
  matchValues: true
});
const [showTypes, setShowTypes] = createSignal(true);
const [showValues, setShowValues] = createSignal(true);

const [errorMessage, setErrorMessage] = createSignal<string | undefined>(undefined);

const parseJson = (json: string) => {
  try {
    const parsed = JSON.parse(json);
    setJsonObject(parsed);
    setErrorMessage(undefined);
  } catch (e) {
    // console.error(e);
    if (e instanceof SyntaxError) {
      setErrorMessage(String(e));
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
    const matchKeys = filter().matchKeys;
    const matchValues = filter().matchValues;
    if (matchKeys) {
      if (props.keys.some(key => key.includes(query))) {
        console.log("Key Matched", props.keys, props.json);
        return true;
      }
    }
    if (matchValues) {
      if (JSON.stringify(props.json).includes(query)) {
        console.log("Value Matched", props.keys, props.json);
        return true;
      }
    }
    return false;
  })


  return (
    <ElStyle ref={ref!}>
      <Show when={showElement()}>
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
                <JSeeValue keys={props.keys} value={props.json} />
              </Match>
            </Switch>
          </ElValue>
        </Show>
      </Show>
    </ElStyle>
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
`

export const JSee = () => {
  createEffect(() => {
    console.log("Filter", filter());
  })

  const updateQuery = (e: InputEvent & {
    target: HTMLInputElement | null
  }) => {
    if (e.target !== null) setFilter(f => ({ ...f, query: e.target!.value }))
  }

  return (
    <Wrapper>
      <Textarea
        value={jsonString()}
        onInput={(e) => {
          parseJson(e.currentTarget.value);
        }}
      />
      <Toolbar>
        <IconInput>
          <iconify-icon icon={icons.search} />
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
        <Show when={errorMessage()}>
          <ErrorMessage>
            <iconify-icon icon={icons.error} />
            {errorMessage()}
          </ErrorMessage>
        </Show>
      </Toolbar>
      <JSeeRender>
        <JSeeElement keys={[]} json={jsonObject()} root />
      </JSeeRender>
    </Wrapper>
  );
}
