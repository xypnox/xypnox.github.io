import { For, createSignal } from "solid-js"
import { Button, Text, ButtonGroup, GroupSeparator, IconInput, Input, Label } from "../elements/atoms"
import { Col, Row, } from "../elements/atoms/layout"
import { RangeInput } from "../elements/range"
import { CopyButton } from "../elements/atoms/copyButton"
import { icons } from "../icons"
import { DropSelect } from "../elements/dropselect"
import { DeleteButton } from "../elements/atoms/deleteButton"
import { styled } from "solid-styled-components"
import { Tooltip } from "../elements/tooltip"
import { theme } from "../../theme"
import { Heading, hg } from "./headings"
import { RelativeTime } from "../elements/relativeTime"

export const ElementsPageStructure = [
  { title: "Atoms", level: 1 },
  { title: "Icons", level: 2 },
  { title: "Buttons", level: 2 },
  { title: "Inputs", level: 2 },
  { title: "Tooltip", level: 2 },
  { title: "Layout", level: 1 },
] as const

// Filter out the heading in ElementsPageStructure
const h = hg(ElementsPageStructure)

const Box = styled('div')`
  background-color: ${theme.surface};
  border-radius: calc(4 * ${theme.border.radius});
  width: 5rem;
  height: 5rem;
  padding: 1rem;
`

const IconGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  gap: 1rem;
  background-color: ${theme.surface};
  padding: 2rem;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    font-size: 3rem;
  }
  .icon-name {
    font-size: 1rem;
  }
  .icon-value {
    font-size: 0.7rem;
  }
`


export const Elements = () => {
  const [value, setValue] = createSignal(0.24)

  const now = new Date().getTime()

  const onChange = (e: Event) => {
    setValue((e.target as HTMLInputElement).valueAsNumber)
  }
  const options = [...Array(9)].map((_, i) => ({ label: `I am the Option ${i}`, value: `${i}` }))

  // console.log({ options });
  return (
    <Col>
      <Heading h={h("Atoms")} />

      <Heading h={h("Icons")} />
      <IconGrid>
        <For each={Object.entries(icons)}>
          {
            ([name, icon]) => (
              <div class="icon-item">
                <iconify-icon icon={icon} class="icon" />
                <span class="icon-name">{name}</span> <span class="icon-value">{icon}</span>
              </div>
            )
          }
        </For>
      </IconGrid>


      <Heading h={h("Buttons")} />
      <Col>
        <Row>
          <Button>Button</Button>
          <Button class="small">Small Button</Button>
          <Button class="selected">Selected Button</Button>
        </Row>
        <Row>
          <Button class="selected">Plugs</Button>
          <Button>Plugs</Button>
          <Button class="small">Plugs</Button>
        </Row>
        <ButtonGroup>
          <Button>Button</Button>
          <GroupSeparator />
          <Button class="selected">Selected Button</Button>
          <GroupSeparator />
          <Text>Text</Text>
        </ButtonGroup>
        <Row class="wrap">
          <CopyButton copyText={() => "Copied Text"} />
          <CopyButton class="small" copyText={() => "Copied Text"} />
          <CopyButton label="Copy This Text" copyText={() => "Copied Text"} />
          <CopyButton icon={icons.copy} class="small" copyText={() => "Copied Text"} />
          <CopyButton icon={icons.copy} copyText={() => "Copied Text"} />
          <DeleteButton
            icon={icons.delete}
            onConfirm={() => {
              console.log("Delete")
            }}
          />
          <DeleteButton
            label="Delete Button"
            icon={icons.delete}
            onConfirm={() => {
              console.log("Delete")
            }}
          />
          <DeleteButton
            label="Delete Button"
            warn="This should be a custom warning"
            icon={icons.delete}
            onConfirm={() => {
              console.log("Delete")
            }}
          />
        </Row>
      </Col>

      <Col>

        <Heading h={h("Inputs")} />

        <Col>
          <Input placeholder="Input" onInput={(e) => console.log((e.target as HTMLInputElement).value)} />
          <IconInput>
            <iconify-icon icon={icons.search} />
            <Input placeholder="Filter" onInput={(e) => console.log((e.target as HTMLInputElement).value)} />
          </IconInput>
          <IconInput class="active">
            <iconify-icon icon={icons.search} />
            <Input placeholder="Filter" onInput={(e) => console.log((e.target as HTMLInputElement).value)} />
          </IconInput>

          <Label> Label
            <Input type="text" placeholder="Placeholder" onInput={(e) => console.log((e.target as HTMLInputElement).value)} />
          </Label>

          <DropSelect
            label="Card Type"
            value="1"
            onlyFromOptions
            options={options}
            onChange={(value) => {
              console.log(value)
            }}
          />
        </Col>

        <Row class="wrap">
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
              style={{ 'font-size': `calc(0.6rem + ${item} * 0.4rem)` }}
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

        <RangeInput
          label="Range Input"
          value={value()}
          min={0} max={1} step={0.01}
          onChange={onChange}
        />
      </Col>

      <Col>
        <Heading h={h("Tooltip")} />
        <Row>
          <Tooltip id="Hello" tooltip={<div>world</div>}>
            Hello
          </Tooltip>
          <Tooltip id="Hello" placement="right" tooltip={<div>world</div>}>
            <div>DivHello</div>
          </Tooltip>
          <Tooltip id="Hello" placement="right" tooltip={<div>world</div>}>
            <Button>DivHello</Button>
          </Tooltip>
        </Row>
        <p>Relative Time</p>
        <Row class="wrap">
          <p><RelativeTime date={now} /></p>
          <p><RelativeTime date={now - 20 * 60 * 1000} /></p>
          <p><RelativeTime date={now - 1 * 60 * 60 * 1000} /></p>
          <p><RelativeTime date={now - 24 * 60 * 60 * 1000} /></p>
          <p><RelativeTime date={now - 8 * 24 * 60 * 60 * 1000} /></p>
          <p><RelativeTime date={now - 66 * 24 * 60 * 60 * 1000} /></p>
          <p><RelativeTime date={now - 666 * 24 * 60 * 60 * 1000} /></p>
        </Row>
      </Col>
      <Col>
        <Heading h={h("Layout")} />
        <Col>
          <Box>Column</Box>
          <For each={[1, 2, 3, 4]}>
            {(i) => <Box>{i}</Box>}
          </For>
        </Col>
        <Row>
          <Box>Row</Box>
          <For each={[1, 2, 3, 4]}>
            {(i) => <Box>{i}</Box>}
          </For>
        </Row>
      </Col>
    </Col>
  )
}
