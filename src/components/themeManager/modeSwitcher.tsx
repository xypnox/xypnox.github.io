import { For, Show } from "solid-js"
import { Button, ButtonGroup, GroupSeparator } from "../elements/atoms"
import { capitalize } from "../../lib/text"
import { themeState } from "./themeState"
import { icons } from "../icons"
import { styled } from "solid-styled-components"
import { theme } from "../../theme"

const Wrapper = styled(ButtonGroup)`
  position: relative;
  width: max-content;
  overflow: hidden;
`

const SwitcherButton = styled(Button)`
  z-index: 2;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  align-items: center;
  color: ${theme.fadeText};
  iconify-icon {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem;
  }
  span {
    font-size: 1rem;
  }
  &.selected {
    background: ${theme.surface};
  }
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    iconify-icon {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.5rem;
    }
    span {
      display: none;
    }
  }
`

const modeIcons = {
  light: icons.light,
  dark: icons.dark,
  auto: icons.auto
}

const ModeSwitcher = () => {
  const modes = ['light', 'dark', 'auto'] as const

  return (
    <Wrapper>
      <For each={modes}>
        {(mode, i) => (
          <>
            <SwitcherButton
              classList={{ selected: themeState.themeConfig.get().mode === mode }}
              onClick={() => themeState.changeMode(mode)}>
              <iconify-icon icon={modeIcons[mode]} />
              <span>{capitalize(mode)}</span>
            </SwitcherButton>
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
