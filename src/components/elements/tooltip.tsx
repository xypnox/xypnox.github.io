import { Show, createEffect, createRenderEffect, createSignal, onMount } from "solid-js";
import type { ParentProps, JSX } from "solid-js";
import { Tooltip as TooltipWrapperBase } from "./atoms/tooltip";
import { styled } from "solid-styled-components";
import { computePosition, flip, shift, type Placement, offset } from "@floating-ui/dom";
import { theme } from "../../theme";
import { fadeIn } from "../../styles/transitions";
import { nanoid } from "nanoid";

export const createTooltipState = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return {
    isOpen,
    setIsOpen,
  };
};

interface TooltipProps extends ParentProps {
  tooltip?: JSX.Element;
  id?: string;
  placement?: Placement;
  class?: string;
  icon?: string;
  // Return type of createTooltipState
  state?: ReturnType<typeof createTooltipState>;
}

const TooltipWrapper = styled(TooltipWrapperBase)`
  width: max-content;
  position: absolute;
  display: none;
  z-index: 2009;
  padding: 0.25rem 0.5rem;
  box-shadow: ${theme.shadow.small};
  animation: ${fadeIn} 0.5s ease-out forwards;

  &.visible {
    z-index: 2009;
    display: flex;
    gap: 0.5rem;
  }
`;

const TargetWrapper = styled("div")`
  position: relative;
  width: max-content;
  pointer-events: all;
`

export function Tooltip(props: TooltipProps) {
  let tooltipRef: HTMLDivElement | null;
  let targetRef: HTMLDivElement | null;
  const state = props.state ?? createTooltipState();
  const id = props.id ?? 'Tooltip' + nanoid();
  const update = () => {
    computePosition(targetRef!, tooltipRef!, {
      placement: props.placement,
      middleware: [
        offset(8),
        flip(),
        shift({
          padding: 16,
        }),
      ],
    }).then(({ x, y }) => {
      Object.assign(tooltipRef!.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  };

  createEffect(() => {
    if (state.isOpen()) {
      update();
    }
  })

  onMount(() => {
    ([
      ['mouseenter', () => state.setIsOpen(true)],
      ['mouseleave', () => state.setIsOpen(false)],
      ['focusin', () => state.setIsOpen(true)],
      ['focusout', () => state.setIsOpen(false)],
    ] as const).forEach(([event, listener]) => {
      targetRef!.addEventListener(event, listener);
    });
  })

  return (
    <TargetWrapper ref={targetRef!} class="wrapper" aria-describedby={id}>
      {props.children}
      <TooltipWrapper
        role="tooltip"
        ref={tooltipRef!}
        id={id}
        classList={{
          visible: state.isOpen(),
        }}
      >
        <Show when={props.icon}>
          <iconify-icon icon={props.icon!} />
        </Show>
        {props.tooltip}
      </TooltipWrapper>
    </TargetWrapper>
  );
}

interface TooltipElementProps<T> extends TooltipProps {
  // The element to wrap
  element: (props: T) => JSX.Element;
  props: T;
}

export function TooltipElement<T>(props: TooltipElementProps<T>) {
  let tooltipRef: HTMLDivElement | null;
  let targetRef: JSX.IntrinsicAttributes['ref'];
  const state = props.state ?? createTooltipState();
  const id = props.id ?? 'Tooltip' + nanoid();
  const update = () => {
    computePosition(targetRef as any, tooltipRef!, {
      placement: props.placement,
      middleware: [
        offset(8),
        flip(),
        shift({
          padding: 16,
        }),
      ],
    }).then(({ x, y }) => {
      Object.assign(tooltipRef!.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  };

  createRenderEffect(() => {
    if (state.isOpen()) {
      update();
    }
  })

  onMount(() => {
    ([
      ['mouseenter', () => state.setIsOpen(true)],
      ['mouseleave', () => state.setIsOpen(false)],
      ['focus', () => state.setIsOpen(true)],
      ['blur', () => state.setIsOpen(false)],
    ] as const).forEach(([event, listener]) => {
      (targetRef as HTMLElement).addEventListener(event, listener);
    });
  })

  return (
    <props.element ref={targetRef!} aria-describedby={id} {...props.props}>
      <>
        {props.children}
        <TooltipWrapper
          role="tooltip"
          ref={tooltipRef!}
          id={id}
          classList={{
            visible: state.isOpen(),
          }}
        >
          <Show when={props.icon}>
            <iconify-icon icon={props.icon!} />
          </Show>
          {props.tooltip}
        </TooltipWrapper>
      </>
    </props.element>
  );
}
