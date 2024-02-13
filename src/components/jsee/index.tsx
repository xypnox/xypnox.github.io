import { For, Match, Show, Switch, createMemo, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { theme } from "../../theme";
import { Button, ButtonGroup, GroupSeparator, Text, baseElementStyles } from "../elements/atoms";
import { icons } from "../icons";
import { CopyButton } from "../elements/atoms/copyButton";

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue } | undefined

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
    arr: [1, 2, 3, 4],
    obj: {
      key: "value",
      key3: 124,
      key4: true,
      key5: null,
      key6: {
        key: "value",
        key3: 124,
        key4: true,
        key5: null,
      },
    },
    defined: {
      isDefined: true,
      isNotDefined: undefined,
    }
  }
}


const [indent, setIndent] = createSignal<number | undefined>(2);
const [jsonObject, setJsonObject] = createSignal(defaultValue);
const jsonString = createMemo(() => JSON.stringify(jsonObject(), null, indent()));


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
  font-size: 0.8em;
  padding: 0.05rem 0.25rem;
  background-color: ${theme.surface};
  color: ${theme.fadeText};
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
  font-size: ${theme.font.size.sm};

  &:hover {
    border-left: 1px solid ${theme.primary.color};
  }
`

// Key title should be sticky to the top of the element
const KeyTitle = styled("div")`
  position: sticky;
  top: 0;
  padding: 0rem 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: ${theme.border.radius};
  user-select: none;

  iconify-icon {
    color: ${theme.fadeText};
    opacity: 0.5;
  }

  &:hover {
    background-color: ${theme.surface};
    color: ${theme.primary.color};
    padding: 0rem 0.25rem 0rem 0.25rem;
    iconify-icon {
      opacity: 1;
    }
  }
`

const ElValue = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ValueType = styled("div")`
  font-size: 0.8em;
  color: ${theme.fadeText};
`

const JSeeElement = (props: { keys: string[], json: JSONValue }) => {
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


  return (
    <ElStyle ref={ref!}>
      <div onClick={onWrapperClick}>
        <KeyTitle onClick={onClick}>
          <Show when={props.keys.length > 0}>
            {props.keys[props.keys.length - 1]}
          </Show>
          <Show when={props.keys.length === 0}>
            Root
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
                    keys={[...props.keys, index().toString()]}
                    json={value} />
                }}
              </For>
            </Match>
            <Match when={valueType() === "object"}>
              <For each={Object.entries(props.json as { [key: string]: JSONValue })}>
                {([key, value]) => {
                  return <JSeeElement
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
  overflow-x: auto;
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
  return (
    <Wrapper>
      <Textarea
        value={jsonString()}
        onInput={(e) => {
          parseJson(e.currentTarget.value);
        }}
      />
      <Toolbar>
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
        <JSeeElement keys={[]} json={jsonObject()} />
      </JSeeRender>
    </Wrapper>
  );
}
