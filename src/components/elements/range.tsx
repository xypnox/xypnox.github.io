import { styled } from "solid-styled-components";
import { Label } from "./atoms";
import { type JSX } from "solid-js";
import { theme } from "../../theme";

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  showValue?: boolean;
  onChange: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
}

const Input = styled("input")`
  -webkit-appearance: none;  
  appearance: none;
  width: 100%; 
  height: 1em; 
  margin: 0; 
  background: transparent;
  outline: none; 
  z-index: 4;

  &::-webkit-slider-thumb,
  &::-moz-range-thumb {
    position: relative;
    -webkit-appearance: none; 
    appearance: none;
    height: 0.8em; 
    width: 0.8em; 
    background: ${theme.text}; 
    border-radius: 50%;
    border: 0.2em solid ${theme.background};
    cursor: pointer; 
    transition: all ease-in-out .2s;
    outline: 0.1em solid transparent;
  }

  &:hover {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
      background: ${theme.primary.color};
    }
  }
  &:active {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
      outline: 0.1em solid ${theme.primary.color};
    }
  }
`

const LabelRow = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`

const Value = styled("div")`
  font-weight: bold;
  color: ${theme.fadeText};
  transition: color 0.2s ease;
`

const SliderBar = styled("div")`
  position: absolute;
  width: 100%;
  height: 0.6em;
  background: ${theme.surface2};
  bottom: 0.2em;
  transition: width 0s ease, background 0.2s ease;
  pointer-events: none;
  border-radius: 0.5em;
  z-index: 1;
`

const ValueBar = styled("div")`
  position: absolute;
  width: calc(var(--width, 0%) - 0.4em);
  height: 0.2em;
  background: ${theme.text};
  bottom: 0.4em;
  left: 0.2em;
  transition: width 0s ease, background 0.2s ease;
  pointer-events: none;
  border-radius: 0.25em;
  z-index: 2;
`

const InputWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &:hover {
    ${Value.class} {
      color: ${theme.primary.color};
    }
  }
  &:has(${Input.class}:hover) {
    ${ValueBar.class} {
      background: ${theme.primary.color};
    }
  }
`

export const RangeInput = (props: RangeInputProps) => {
  return (
    <InputWrapper>
      <LabelRow>
        <Label>{props.label}</Label>
        {props.showValue && (
          <Value>{props.value}</Value>
        )}
      </LabelRow>
      <SliderBar />
      <ValueBar
        style={{
          "--width": `${((props.value - props.min) / (props.max - props.min)) * 100}%`,
        }}
      />
      <Input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onInput={props.onChange}
      />
    </InputWrapper>
  );
}
