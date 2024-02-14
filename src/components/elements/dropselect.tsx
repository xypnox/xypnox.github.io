import { For, createSignal, onMount, type JSX, Show } from "solid-js";
import { styled } from "solid-styled-components";
import { theme } from "../../theme";
import { Button, Input } from "./atoms";

interface DropSelectOption {
  label: string;
  value: string;
}

interface DropSelectProps {
  label: string;
  options: DropSelectOption[];
  value: string;
  onlyFromOptions?: boolean
  onChange: (value: string) => void;
  Footer?: () => JSX.Element;
}

const Label = styled('label')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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

  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 0.25rem;
   
  &.hidden {
    display: none;
  }

  a {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`

const SelectOptions = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.25rem;
`

export const DropSelect = (props: DropSelectProps) => {
  const [focused, setFocused] = createSignal(false);
  let dropdown: HTMLDivElement;

  const onClickOutside = (e: MouseEvent) => {
    if (dropdown && !dropdown.contains(e.target as Node)) {
      setFocused(false)
    }
  }

  const onFocusOutside = (e: FocusEvent) => {
    if (dropdown && !dropdown.contains(e.target as Node)) {
      setFocused(false)
    }
  }

  onMount(() => {
    document.addEventListener('click', onClickOutside)
    document.addEventListener('focusin', onFocusOutside)
    return () => {
      document.removeEventListener('click', onClickOutside)
      document.removeEventListener('focusin', onFocusOutside)
    }
  })

  const onChange = (value: string) => {
    if (props.onlyFromOptions) {
      const option = props.options.find((o) => o.value == value)
      if (option) props.onChange(option.value)
    } else props.onChange(value)
  }

  return (
    <Dropdown
      ref={dropdown!}
    >
      <Label>{props.label}</Label>
      <Input
        type="text"
        value={props.value}
        onFocus={() => setFocused(true)}
        onInput={(e) => onChange(e.currentTarget.value)}
      />
      <DropdownContent classList={{ hidden: !focused() }}>
        <SelectOptions>
          <For each={props.options}>
            {option => (
              <Button
                class="small"
                classList={{ selected: option.value === props.value }}
                onClick={() => {
                  setFocused(false)
                  props.onChange(option.value)
                }}
              >{option.label}</Button>
            )}
          </For>
        </SelectOptions>
        <Show when={props.Footer}>
          {props.Footer!()}
        </Show>
      </DropdownContent>
    </Dropdown>
  )
}


