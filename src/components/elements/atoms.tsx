import { styled } from "solid-styled-components"
import { theme } from "../../theme"

export const baseElementStyles = `
  box-sizing: border-box;
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: ${theme.border.radius};
  font-size: ${theme.font.size.base};
  border: 1px solid transparent;
  iconify-icon {
    font-size: 1.25rem;
  }
`

export const cardStyles = `
  & {
    background: var(--card-background);
    border: var(--card-border);
    background-size: var(--card-backgroundSize);
    background-position: var(--card-backgroundPosition);
  }

  &:hover {
    background-position: var(--card-backgroundPositionHover);
    border: var(--card-borderHover);
  }
`

export const cardTransition = `
transition: background 0.2s ease, border 0.2s ease, background-size 0.2s ease, background-position 0.2s ease;
`
export const Label = styled('label')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Input = styled('input')`
  ${baseElementStyles}
  flex: 1;
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  color: ${theme.text};
  transition: all 0.2s ease;
  min-width: 10ch;
`

export const Button = styled('button')`
  ${baseElementStyles}
  flex: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  color: ${theme.text};
  white-space: nowrap;

  &.small {
    flex-grow: 1;
    flex-shrink: 0;
    line-height: 1;
    max-width: max-content;
    /* min-height: 2rem; */
    height: 100%;
    padding: 0.3rem 0.5rem;
    font-size: ${theme.font.size.sm};
    gap: 0.25rem;

    iconify-icon {
      font-size: ${theme.font.size.sm};
    }
  }

  &.selected {
    border: 1px solid ${theme.primary.color};
    color: ${theme.primary.color};
  }


  &&:focus-visible {
    outline: 2px solid var(--primary-color);
  }

  &&:hover {
    transform: scale(1.1);
    color: var(--primary-contrast);
    background: var(--primary-color);
    border-color: var(--primary-color);
  }
  &&:active {
    transform: scale(0.9);
    transition: all 0.2s ease-out;
  }

  transition: all 0.3s ease-in-out;
`

export const Text = styled('div')`
  ${baseElementStyles}
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border: 1px solid transparent;
  background: ${theme.surface};
  color: ${theme.text};
  transition: all 0.2s ease;
`

// A horizontal group of buttons, with separator borders, and outside border radius
export const ButtonGroup = styled('div')`
  position: relative;
  z-index: 2;
  align-self: stretch;
  display: flex;
  align-items: stretch;
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  transition: all 0.2s ease;
  & > ${Button.class} {
    background: transparent;
    border-radius: 0;
    border: none;
    flex: 1;
    z-index: 3;
  }
  & > ${Text.class} {
    background: transparent;
    flex-grow: 0;
    flex-shrink: 0;
  }
  & > ${Button.class}:hover {
    transform: scale(1);
  }
  & > ${Button.class}:active {
    transform: scale(0.9);
  }
`

export const GroupSeparator = styled('div')`
  position: relative;
  z-index: 1;
  width: 1px;
  min-height: 100%;
  min-width: 1px;
  flex-shrink: 0;
  background: ${theme.border.color};
`

export const IconInput = styled('div')`
  ${baseElementStyles}
  padding: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  transition: all 0.2s ease;

  iconify-icon {
    font-size: 1.25rem;
    padding-left: 0.5rem;
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${theme.primary.color};
  }

  &.active {
    iconify-icon {
      color: ${theme.primary.color};
    }
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    color: ${theme.text};

    &:focus-visible {
      outline: none;
    }
  }
`
