import { For, createSignal } from "solid-js"
import { RangeInput } from "../elements/range"
import { styled } from "solid-styled-components"

const Row = styled("div")`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`

const Col = styled("div")`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`

export const WarehouseSolidJS = () => {

  const [value, setValue] = createSignal(0.24)

  const onChange = (e: Event) => {
    setValue((e.target as HTMLInputElement).valueAsNumber)
  }

  return (
    <Col>
      <RangeInput
        label="Range Input"
        value={value()}
        min={0} max={1} step={0.01}
        onChange={onChange}
      />
      <RangeInput
        label="Range Input"
        value={value()}
        showValue
        min={0}
        max={1}
        step={0.01}
        onChange={onChange}
      />
      <Row>
        <RangeInput
          label="Range Input"
          value={value()}
          min={0} max={1} step={0.01}
          onChange={onChange}
        />
        <RangeInput
          label="Range Input"
          value={value()}
          showValue
          min={0} max={1} step={0.01}
          onChange={onChange}
        />
        <RangeInput
          label="Range Input"
          value={value()}
          min={0} max={1} step={0.01}
          onChange={onChange}
        />

      </Row>

      <Col>
        <For each={[1, 2, 4, 6, 8]}>
          {(item) => (<Row
            style={{ 'font-size': `calc(${item} * 0.5rem)` }}
          >
            {item}
            <RangeInput
              label="Range Input"
              value={value()}
              showValue
              min={0} max={1} step={0.01}
              onChange={onChange}
            />
          </Row>)}
        </For>
      </Col>
    </Col>
  )
}
