type DragMode = "pointer" | "touch";

interface Drag {
  mode: DragMode;
  id: number;
  x: number;
  y: number;
  active: boolean;
  moved: boolean;
}

export interface TimelineDragHandlers {
  /** Limits pointer and touch starts to matching targets inside the element. */
  owns?: (target: EventTarget | null) => boolean;
  /** Starts a gesture; return false to ignore it. */
  start: (target: EventTarget | null, mode: DragMode, y: number) => boolean;
  /** Runs when a touch hold completes; return false to cancel. */
  activate: () => boolean;
  moved?: () => void;
  drag: (y: number, originY: number) => void;
  end: (committed: boolean) => void;
  cancel: () => void;
}

/**
 * Shared pointer and touch tracking for timeline gestures: mouse drags start
 * immediately, touch drags need a 400ms hold, and movement under 4px is a tap.
 */
export function trackTimelineDrag(
  element: HTMLElement,
  handlers: TimelineDragHandlers
) {
  let drag: Drag | null = null;
  let hold = 0;
  const reset = () => {
    window.clearTimeout(hold);
    drag = null;
  };
  const cancel = () => {
    reset();
    handlers.cancel();
  };
  const owns = (target: EventTarget | null) => handlers.owns?.(target) ?? true;
  const begin = (
    target: EventTarget | null,
    mode: DragMode,
    id: number,
    x: number,
    y: number
  ) => {
    reset();
    if (!handlers.start(target, mode, y)) {
      return;
    }
    const current: Drag = {
      mode,
      id,
      x,
      y,
      active: mode === "pointer",
      moved: false,
    };
    drag = current;
    if (mode === "touch") {
      hold = window.setTimeout(() => {
        if (drag === current && handlers.activate() && drag === current) {
          current.active = true;
        }
      }, 400);
    }
  };
  const move = (x: number, y: number) => {
    const current = drag;
    if (current === null) {
      return;
    }
    const distance = Math.hypot(x - current.x, y - current.y);
    if (!current.active) {
      if (distance > 8) {
        cancel();
      }
      return;
    }
    if (distance >= 4) {
      current.moved = true;
      handlers.moved?.();
    }
    if (current.moved) {
      handlers.drag(y, current.y);
    }
  };
  const finish = () => {
    const done = drag;
    reset();
    handlers.end(done !== null && done.active && done.moved);
  };
  const tracks = (mode: DragMode, id: number) =>
    drag?.mode === mode && drag.id === id;
  const pointerDown = (event: PointerEvent) => {
    if (
      !owns(event.target) ||
      event.pointerType === "touch" ||
      event.button !== 0 ||
      !event.isPrimary
    ) {
      return;
    }
    event.preventDefault();
    begin(
      event.target,
      "pointer",
      event.pointerId,
      event.clientX,
      event.clientY
    );
  };
  const pointerMove = (event: PointerEvent) => {
    if (tracks("pointer", event.pointerId)) {
      move(event.clientX, event.clientY);
    }
  };
  const pointerUp = (event: PointerEvent) => {
    if (tracks("pointer", event.pointerId)) {
      move(event.clientX, event.clientY);
      finish();
    }
  };
  const pointerCancel = (event: PointerEvent) => {
    if (tracks("pointer", event.pointerId)) {
      cancel();
    }
  };
  const touchStart = (event: TouchEvent) => {
    if (!owns(event.target)) {
      return;
    }
    if (event.touches.length !== 1) {
      cancel();
      return;
    }
    const [touch] = [...event.touches];
    if (touch !== undefined) {
      begin(
        event.target,
        "touch",
        touch.identifier,
        touch.clientX,
        touch.clientY
      );
    }
  };
  const touchMove = (event: TouchEvent) => {
    const current = drag;
    if (current?.mode !== "touch") {
      return;
    }
    if (event.touches.length !== 1) {
      cancel();
      return;
    }
    const touch = [...event.touches].find(
      (item) => item.identifier === current.id
    );
    if (!touch) {
      return;
    }
    if (current.active) {
      if (!event.cancelable) {
        cancel();
        return;
      }
      event.preventDefault();
    }
    move(touch.clientX, touch.clientY);
  };
  const touchEnd = (event: TouchEvent) => {
    const current = drag;
    if (current?.mode !== "touch") {
      return;
    }
    const touch = [...event.changedTouches].find(
      (item) => item.identifier === current.id
    );
    if (touch) {
      move(touch.clientX, touch.clientY);
      finish();
    }
  };
  element.addEventListener("pointerdown", pointerDown);
  element.addEventListener("touchstart", touchStart, { passive: true });
  window.addEventListener("pointermove", pointerMove);
  window.addEventListener("pointerup", pointerUp);
  window.addEventListener("pointercancel", pointerCancel);
  window.addEventListener("touchmove", touchMove, { passive: false });
  window.addEventListener("touchend", touchEnd);
  window.addEventListener("touchcancel", cancel);
  window.addEventListener("blur", cancel);
  return {
    reset,
    finish,
    destroy() {
      reset();
      element.removeEventListener("pointerdown", pointerDown);
      element.removeEventListener("touchstart", touchStart);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerCancel);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("touchcancel", cancel);
      window.removeEventListener("blur", cancel);
    },
  };
}
