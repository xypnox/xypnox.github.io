import { styled } from "solid-styled-components"
import { theme } from "../../theme"

export const baseElementStyles = `
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: ${theme.border.radius};
  font-size: ${theme.font.size.base};
  border: 1px solid transparent;
  iconify-icon {
    font-size: 1.25rem;
  }
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
  border: 1px solid transparent;
  background: ${theme.surface};
  color: ${theme.text};
  transition: all 0.2s ease;

  &.small {
    flex-grow: 1;
    flex-shrink: 0;
    line-height: 1;
    max-width: max-content;
    min-height: 2rem;
    padding: 0.25rem 0.5rem;
    font-size: ${theme.font.size.sm};
  }

  &.selected {
    border: 1px solid ${theme.primary.color};
    color: ${theme.primary.color};
  }

  &&:hover {
    color: var(--primary-contrast);
    background: var(--primary-color);
  }
`

export const Text = styled('div')`
  ${baseElementStyles}
  flex: 0 !important;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  border: 1px solid transparent;
  background: ${theme.surface};
  color: ${theme.text};
  transition: all 0.2s ease;
  padding: 0.3rem 1rem;
`

// A horizontal group of buttons, with separator borders, and outside border radius
export const ButtonGroup = styled('div')`
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: stretch;
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.border.color};
  background: ${theme.surface};
  transition: all 0.2s ease;
  ${Button.class}, ${Text.class} {
    background: transparent;
    border-radius: 0;
    border: 0px solid transparent;
    border-right: 1px solid ${theme.border.color};
    flex: 1;
    &:first-child {
      border-radius: ${theme.border.radius} 0 0 ${theme.border.radius};
    }
    &:last-child {
      border-radius: 0 ${theme.border.radius} ${theme.border.radius} 0;
      border-right: none;
    }
    &:only-child {
      border-radius: ${theme.border.radius};
    }
  }
`
