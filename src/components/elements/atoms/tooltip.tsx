import { keyframes, styled } from "solid-styled-components"
import { theme } from "../../../theme"

export const tooltipAnim = keyframes`
  0% {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
  15% {
    transform: translateY(calc(-100% - 0.5rem)) translateX(-50%);
    opacity: 1;
  }
  75% {
    transform: translateY(calc(-100% - 0.5rem)) translateX(-50%);
    opacity: 1;
  }
  100% {
    transform: translateY(-150%) translateX(-50%);
    opacity: 0;
  }
`


export const Tooltip = styled.div`
  position: absolute;
  width: max-content;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${theme.font.size.sm};
  color: ${theme.text};
  background: ${theme.tooltip};
  padding: 0.5em;
  border-radius: ${theme.border.radius};
  text-align: center;
  z-index: 10;
  && iconify-icon {
    color: ${theme.primary.color};
    font-size: 1.2em;
  }
`

export const EntryTopTooltip = styled(Tooltip)`
  top: 0;
  right: 0;
  left: 50%;
  transform: translateY(-100%);
  animation: ${tooltipAnim} 1s ease-out forwards;
`
