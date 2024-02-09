import { For } from "solid-js"
import { Button, ButtonGroup } from "../elements/atoms"
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

const ModeSwitcher = () => {
  return (
    <Wrapper>
      <For each={['light', 'dark', 'auto'] as const}>
        {mode => (
          <Button onClick={() => themeState.changeMode(mode)}>
            <iconify-icon icon={mode === 'light' ? icons.light : icons.dark} />
            {capitalize(mode)}
          </Button>
        )}
      </For>
    </Wrapper>
  )
}

export default ModeSwitcher;
