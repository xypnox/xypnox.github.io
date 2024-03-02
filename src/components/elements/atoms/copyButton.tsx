import { styled } from "solid-styled-components"
import { Button } from "../atoms"
import { For, Show, createSignal } from "solid-js"
import { icons } from "../../icons"
import { EntryTopTooltip } from "./tooltip"


const CopyButtonEl = styled(Button)`
  position: relative;
`

interface CopyButtonProps {
  icon?: string
  label?: string
  tooltip?: string
  copyText: () => string
}

export const CopyButton = (props: CopyButtonProps) => {
  // We want to track each copy event so that we can reanimate the tooltip
  const [copyState, setCopyState] = createSignal<number[]>([])

  const onCopy = () => {
    const nowTime = Date.now() // in milliseconds
    // console.log('copying', nowTime)
    setCopyState([...copyState(), nowTime])
    navigator.clipboard.writeText(props.copyText())
    setTimeout(() => {
      // setCopyState((s) => s.filter(time => (time + 1100) > Date.now()))
    }, 1100)
  }

  return (
    <CopyButtonEl onClick={onCopy}>
      <Show when={props.icon}>
        <iconify-icon icon={props.icon!} />
      </Show>
      <div>
        {props.label ?? "Copy"}
      </div>
      <For each={copyState()}>
        {(st) => <EntryTopTooltip id={`tooltip_${st}`}>
          <iconify-icon icon={icons.done} />
          {props.tooltip || "Copied"}
        </EntryTopTooltip>}
      </For>
    </CopyButtonEl>
  )
}

