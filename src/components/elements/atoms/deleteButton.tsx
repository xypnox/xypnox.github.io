import { keyframes, styled } from "solid-styled-components"
import { Button } from "../atoms"
import { Show, createEffect, createSignal } from "solid-js"
import { EntryTopTooltip, Tooltip } from "./tooltip"
import { theme } from "../../../theme"
import { icons } from "../../icons"


const DeleteButtonEl = styled(Button)`
  position: relative;
  pointer-events: auto;
`

const DeleteButtonWrapper = styled('div')`
  position: relative;
  pointer-events: auto;
  width: max-content;
  display: flex;
`

const tooltipAnim = keyframes`
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`

const InteractiveTooltip = styled(Tooltip)`
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  height: max-content;
  gap: 0.5rem;
  top: 100%;
  left: 50%;
  z-index: 10;
  pointer-events: auto;
  padding: 0.75rem;
  max-width: 18ch;
  border-radius: calc(2 * ${theme.border.radius});
  font-size: ${theme.font.size.sm};
  transform: translateY(0.5rem) translateX(-50%);
  border: 1px solid ${theme.primary.color};
  animation: ${tooltipAnim} 0.5s ease-out forwards;

  ${Button.class} {
    width: 100%;
    font-size: ${theme.font.size.base};
  }
`

interface DeleteButtonProps {
  icon?: string
  label?: string
  warn?: string
  skipConfirm?: boolean
  onConfirm: () => void
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const [showConfirm, setShowConfirm] = createSignal(false)
  const [confirmed, setConfirmed] = createSignal(false)
  let popup: HTMLDivElement;

  const onConfirm = () => {
    props.onConfirm()
    setConfirmed(true)
    setShowConfirm(false)
    setTimeout(() => setConfirmed(false), 2000)
  }

  const onClickOutside = (e: MouseEvent) => {
    if (popup && !popup.contains(e.target as Node)) {
      setShowConfirm(false)
    }
  }

  createEffect(() => {
    if (showConfirm()) {
      document.addEventListener('click', onClickOutside)
    } else {
      document.removeEventListener('click', onClickOutside)
    }
  })


  return (
    <DeleteButtonWrapper>
      <DeleteButtonEl onClick={() => {
        if (props.skipConfirm) {
          props.onConfirm()
        }
        setShowConfirm(c => !c)
      }}>
        <Show when={props.icon}>
          <iconify-icon icon={props.icon!} />
        </Show>
        {props.label}
      </DeleteButtonEl>

      <Show when={confirmed()}>
        <EntryTopTooltip>
          <iconify-icon icon={icons.done} />
          Deleted
        </EntryTopTooltip>
      </Show>
      <Show when={showConfirm()}>
        <InteractiveTooltip ref={popup! as any}>
          {props.warn || "Are you sure you wanna delete?"}
          <Button onClick={() => setShowConfirm(false)}>No</Button>
          <Button onClick={onConfirm}>Yes</Button>
        </InteractiveTooltip>
      </Show>
    </DeleteButtonWrapper>
  )
}

