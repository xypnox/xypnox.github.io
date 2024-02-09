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
  background: ${theme.background};
  padding: 0.5rem;
  border-radius: ${theme.border.radius};
  text-align: center;
  iconify-icon {
    color: ${theme.primary.color};
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem;
  }
`

export const EntryTopTooltip = styled(Tooltip)`
  top: 0;
  right: 0;
  left: 50%;
  transform: translateY(-100%);
  animation: ${tooltipAnim} 1s ease-out forwards;
`
