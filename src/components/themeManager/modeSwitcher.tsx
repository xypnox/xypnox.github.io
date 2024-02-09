import { For, Show } from "solid-js"
import { Button, ButtonGroup, GroupSeparator } from "../elements/atoms"
import { capitalize } from "../../lib/text"
import { themeState } from "./themeState"
import { icons } from "../icons"
import { styled } from "solid-styled-components"

const Wrapper = styled(ButtonGroup)`
  width: max-content;
  button {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const modeIcons = {
  light: icons.light,
  dark: icons.dark,
  auto: icons.auto
}

const ModeSwitcher = () => {
  return (
    <Wrapper>
      <For each={['light', 'dark', 'auto'] as const}>
        {(mode, i) => (
          <>
            <Button
              classList={{ selected: themeState.themeConfig.get().mode === mode }}
              onClick={() => themeState.changeMode(mode)}>
              <iconify-icon icon={modeIcons[mode]} />
              {capitalize(mode)}
            </Button>
            <Show when={i() !== 2}>
              <GroupSeparator />
            </Show>
          </>
        )}
      </For>
    </Wrapper>
  )
}

export default ModeSwitcher;
