import { Show, createSignal, lazy } from 'solid-js';
import { keyframes, styled } from 'solid-styled-components';

const LazyComponent = lazy(() => import('./index'));

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
        <iconify-icon icon="mdi:palette" />
      </PopupButton>
      <Show when={show()}>
        <PopupContent
          classList={{
            'hiding': hiding()
          }}
        >
          <ContentWrapper>
            <LazyComponent />
          </ContentWrapper>
          <PopupControls>
            <div>Customize the look</div>
            <div>Suit your preferences</div>
          </PopupControls>
        </PopupContent>
      </Show>
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
  width: 400px;
  max-width: calc(100vw - 1rem);
  height: max-content;
  max-height: 50vh;

  color: var(--text);
  background: var(--background);
  box-shadow: var(--cardShadow);
  border-radius: 1rem;
  border: 2px solid var(--primary-color);

  display: flex;
  flex-direction: column;

  z-index: 100;
  overflow: auto;

  animation: ${zoomFade} 0.2s ease-in forwards;
  transform-origin: bottom right;

  &.hiding {
    animation: ${zoomFadeOut} 0.2s ease-out forwards;
  }
`

const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
  flex-grow: 1;
  background: var(--card-background);
`

const PopupWrapper = styled('div')`
  position: relative;
  pointer-events: all;
  display: flex;
  height: 100%;
`

const PopupControls = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: calc(var(--layout-nav-height) + 1rem);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  border-top: 1px solid var(--border);
`

const PopupButton = styled('button')`
  padding: 0.5rem;
  width: 4rem;
  border-radius: 1rem;
  color: var(--primary-contrast);
  font-size: var(--font-size-md);
  background: var(--primary-color);
  border: none;
  position: relative;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
`
