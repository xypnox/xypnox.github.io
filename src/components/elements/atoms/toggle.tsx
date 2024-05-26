import { For, Show } from "solid-js"
import { Button, ButtonGroup, GroupSeparator, Text } from "../atoms"

interface ToggleProps<T extends string> {
  label?: string
  options: T[]
  selected?: T
  getValue: (selected: T) => string
  onChange: (selected: T) => void
}

export const Toggle = <T extends string,>(props: ToggleProps<T>) => {
  return (
    <ButtonGroup style={{ "flex-wrap": 'wrap', "align-self": "auto" }}>
      <Show when={props.label}>
        <Text >{props.label}</Text>
        <GroupSeparator />
      </Show>
      <For each={props.options}>
        {(option, index) => (
          <>
            <Button
              classList={{
                'selected': props.selected === option,
              }}
              onClick={() => props.onChange(option)}
              disabled={props.selected === option}
            >
              {props.getValue(option)}
            </Button>
            <Show when={index() < props.options.length - 1}>
              <GroupSeparator />
            </Show>
          </>
        )}
      </For>
    </ButtonGroup>
  )
}
