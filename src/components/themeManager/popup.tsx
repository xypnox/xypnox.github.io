import { Show, createSignal, lazy } from 'solid-js';
import { keyframes, styled } from 'solid-styled-components';
import { theme } from '../../theme';
import { icons } from '../icons';

export const LazyManagerComponent = lazy(() => import('./index'));
export const LazyModeSwitcherComponent = lazy(() => import('./modeSwitcher'));

export const ThemePopup = () => {
  const [show, setShow] = createSignal(false);
  const [hiding, setHiding] = createSignal(false);
  // Delayed hide
  const hide = () => {
    setHiding(true);
    setTimeout(() => {
      setShow(false);
      setHiding(false);
    }, 300);
  }
  return (
    <PopupWrapper id="themeManagerPopup">
      <Show when={show()}>
        <PopupContent
          classList={{
            'hiding': hiding()
          }}
        >
          <ContentWrapper>
            <LazyManagerComponent
              isPopup={true}
            />
          </ContentWrapper>
          <PopupControls>
            <LazyModeSwitcherComponent />
          </PopupControls>
        </PopupContent>
      </Show>
      <PopupButton
        class="navButton"
        aria-label={show() ? 'Close Theme Manager' : 'Open Theme Manager'}
        onClick={
          () => {
            if (show()) {
              hide();
            } else {
              setShow(true);
            }
          }
        }>
        <iconify-icon icon={icons.customize} />
      </PopupButton>
    </PopupWrapper>
  )
}

const restState = 'transform: scale(1); opacity: 1;'
const hiddenState = 'transform: scale(0.9); opacity: 0;'

const zoomFade = keyframes`
  0% {
    ${hiddenState}
  }
  100% {
    ${restState}
  }
`

const zoomFadeOut = keyframes`
  0% {
    ${restState}
  }
  100% {
    ${hiddenState}
  }
`

const PopupContent = styled('div')`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 600px;
  max-width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
  max-height: 800px;
  overflow: hidden;

  color: var(--text);
  background: var(--background);
  box-shadow: var(--cardShadow);
  border-radius: calc(${theme.border.radius} * 2);
  border: 2px solid var(--primary-color);

  display: flex;
  flex-direction: column;

  z-index: 100;

  animation: ${zoomFade} 0.2s ease-in forwards;
  transform-origin: bottom right;

  &.hiding {
    animation: ${zoomFadeOut} 0.2s ease-out forwards;
  }
`

const ContentWrapper = styled('div')`
  padding: 2rem 1rem;
  padding-bottom: calc(var(--layout-nav-height) + 2rem);
  background: var(--card-background);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const PopupWrapper = styled('div')`
  position: relative;
  pointer-events: all;
  display: flex;
  height: 100%;
  
  * {
    pointer-events: all;
  }
`

const PopupControls = styled('div')`
  position: fixed;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: calc(var(--layout-nav-height) + 1rem);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  border-top: 1px solid var(--border-color);
  background: var(--card-background);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`

const PopupButton = styled('button')`
  padding: 0.5rem;
  width: 4rem;
  border-radius: calc(${theme.border.radius} * 2);
  color: var(--primary-contrast);
  background: var(--primary-color);
  border: none;
  position: relative;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  iconify-icon {
    font-size: 2rem;
  }
`
