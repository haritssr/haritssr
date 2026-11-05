import { useEffect, useEffectEvent, useRef, useState } from "react";

import { useTaskEditing } from "../_components/TaskEditing";
import {
  firstFutureSlot,
  resizedWindow,
} from "../_components/timelineSelection";
import type { ResizeEdge } from "../_components/timelineSelection";
import { canUseTimer, scheduledPeriod, timerDayBounds } from "../utils/timer";
import type { Period, TimerTask } from "../utils/timer";
import { timelineTime } from "../utils/timerTime";
import { trackTimelineDrag } from "./timelineDrag";

interface ResizePreview {
  taskId: string;
  window: Period;
}
interface ResizeGesture {
  mode: "pointer" | "touch" | "keyboard";
  task: TimerTask;
  original: Period;
  candidate: Period;
  fingerprint: string;
  edge: ResizeEdge | "move";
  handle: HTMLButtonElement;
  /** Keyboard gestures save only after an arrow-key step. */
  moved: boolean;
}

export default function useTimelineResize(
  date: string,
  editable: boolean,
  view: Period
) {
  const { act, snapshot, clockOffset } = useTaskEditing();
  const root = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<ResizePreview | null>(null);
  const [message, setMessage] = useState("");
  const context = useEffectEvent((taskId: string) => {
    const now = Date.now() + clockOffset;
    const bounds = timerDayBounds(date);
    if (
      !editable ||
      !canUseTimer(snapshot) ||
      snapshot.day.date !== date ||
      date < snapshot.today ||
      now >= bounds.end
    ) {
      return null;
    }
    const task = snapshot.day.tasks.find((entry) => entry.id === taskId);
    if (
      !task ||
      scheduledPeriod(task) === null ||
      task.startedAt !== null ||
      task.reachedAt !== null ||
      task.spent >= task.duration ||
      bounds.start + task.period.from * 60_000 <= now
    ) {
      return null;
    }
    return { task, first: firstFutureSlot((now - bounds.start) / 60_000) };
  });
  const save = useEffectEvent((gesture: ResizeGesture, gestureDate: string) => {
    const latest = context(gesture.task.id);
    if (
      gestureDate !== date ||
      latest === null ||
      JSON.stringify(latest.task) !== gesture.fingerprint ||
      gesture.candidate.from < latest.first * 15
    ) {
      setMessage("Task changed or its window opened. Resize canceled.");
      return;
    }
    if (
      gesture.candidate.from === gesture.original.from &&
      gesture.candidate.until === gesture.original.until
    ) {
      return;
    }
    setMessage("Saving period.");
    void act({
      action: "resize-scheduled",
      date,
      taskId: gesture.task.id,
      period: gesture.candidate,
    }).then((saved) => {
      setMessage(
        saved
          ? "Period and duration updated."
          : "Resize could not be saved. Open the task editor to recover your changes."
      );
    });
  });

  useEffect(() => {
    const element = root.current;
    if (!element || !editable) {
      return () => {
        setPreview(null);
      };
    }
    let gesture: ResizeGesture | null = null;
    let watchdog = 0;
    let suppressedClick: HTMLButtonElement | null = null;
    const cancel = () => {
      tracker.reset();
      window.clearInterval(watchdog);
      gesture = null;
      setPreview(null);
    };
    const check = () => {
      if (gesture === null) {
        return null;
      }
      const latest = context(gesture.task.id);
      if (
        latest === null ||
        JSON.stringify(latest.task) !== gesture.fingerprint ||
        gesture.candidate.from < latest.first * 15
      ) {
        cancel();
        setMessage("Task changed or its window opened. Resize canceled.");
        return null;
      }
      return latest;
    };
    const announce = () => {
      if (gesture === null) {
        return;
      }
      setPreview({ taskId: gesture.task.id, window: gesture.candidate });
      setMessage(
        `${gesture.task.activity}, ${timelineTime(gesture.candidate.from)} to ${timelineTime(gesture.candidate.until)}. Press Enter to save or Escape to cancel.`
      );
    };
    const handleAt = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return null;
      }
      const handle = target.closest<HTMLButtonElement>(
        "button[data-resize-task], button[data-move-task]"
      );
      return handle !== null && element.contains(handle) ? handle : null;
    };
    const begin = (handle: HTMLButtonElement, mode: ResizeGesture["mode"]) => {
      cancel();
      const taskId = handle.dataset.resizeTask ?? handle.dataset.moveTask;
      const edge =
        handle.dataset.moveTask === undefined
          ? handle.dataset.resizeEdge
          : "move";
      if (
        taskId === undefined ||
        (edge !== "from" && edge !== "until" && edge !== "move")
      ) {
        return false;
      }
      const latest = context(taskId);
      const original = latest === null ? null : scheduledPeriod(latest.task);
      if (latest === null || original === null) {
        return false;
      }
      gesture = {
        mode,
        task: latest.task,
        original: { ...original },
        candidate: { ...original },
        fingerprint: JSON.stringify(latest.task),
        edge,
        handle,
        moved: false,
      };
      if (mode === "pointer") {
        announce();
      }
      watchdog = window.setInterval(() => {
        check();
      }, 1000);
      return true;
    };
    const update = (boundary: number) => {
      const latest = check();
      if (latest === null || gesture === null) {
        return;
      }
      const duration = gesture.original.until - gesture.original.from;
      const from = Math.max(
        latest.first * 15,
        Math.min(1440 - duration, Math.round(boundary / 15) * 15)
      );
      const window =
        gesture.edge === "move"
          ? { from, until: from + duration }
          : resizedWindow(
              gesture.original,
              gesture.edge,
              boundary,
              latest.first,
              latest.task.spent
            );
      if (window === null) {
        cancel();
        return;
      }
      gesture.candidate = window;
      announce();
    };
    const end = (committed: boolean) => {
      const finished = gesture;
      cancel();
      if (committed && finished !== null) {
        save(finished, date);
      }
    };
    const tracker = trackTimelineDrag(element, {
      owns: (target) => handleAt(target) !== null,
      start(target, mode) {
        const handle = handleAt(target);
        if (handle === null) {
          return false;
        }
        suppressedClick = null;
        if (mode === "pointer") {
          handle.focus({ preventScroll: true });
        }
        return begin(handle, mode);
      },
      activate() {
        if (check() === null || gesture === null) {
          return false;
        }
        announce();
        return true;
      },
      moved() {
        suppressedClick = gesture?.handle ?? null;
      },
      drag(y, originY) {
        if (gesture === null) {
          return;
        }
        update(
          gesture.original[gesture.edge === "move" ? "from" : gesture.edge] +
            ((y - originY) / element.getBoundingClientRect().height) *
              (view.until - view.from)
        );
      },
      end,
      cancel,
    });
    const keyDown = (event: KeyboardEvent) => {
      const handle = handleAt(event.target);
      if (
        handle === null ||
        !["ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(event.key)
      ) {
        return;
      }
      if (
        handle.dataset.moveTask !== undefined &&
        (event.key === "Enter" || event.key === " ") &&
        gesture === null
      ) {
        return;
      }
      event.preventDefault();
      if (event.key === "Escape") {
        cancel();
        setMessage("Resize canceled.");
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        if (!event.repeat) {
          if (gesture?.mode === "keyboard") {
            end(gesture.moved);
          } else {
            tracker.finish();
          }
        }
        return;
      }
      if (gesture?.mode !== "keyboard" || gesture.handle !== handle) {
        begin(handle, "keyboard");
      }
      if (gesture === null) {
        return;
      }
      gesture.moved = true;
      update(
        gesture.candidate[gesture.edge === "move" ? "from" : gesture.edge] +
          (event.key === "ArrowUp" ? -15 : 15)
      );
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && gesture !== null) {
        cancel();
        setMessage("Resize canceled.");
      }
    };
    const focusOut = (event: FocusEvent) => {
      if (gesture !== null && gesture.handle === event.target) {
        cancel();
      }
    };
    const click = (event: MouseEvent) => {
      if (
        event.detail > 0 &&
        handleAt(event.target) === suppressedClick &&
        suppressedClick !== null
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressedClick = null;
      }
    };
    const contextMenu = (event: Event) => {
      if (handleAt(event.target) !== null) {
        event.preventDefault();
      }
    };
    element.addEventListener("click", click, true);
    element.addEventListener("keydown", keyDown);
    element.addEventListener("focusout", focusOut);
    element.addEventListener("contextmenu", contextMenu);
    window.addEventListener("keydown", escape);
    return () => {
      cancel();
      tracker.destroy();
      element.removeEventListener("click", click, true);
      element.removeEventListener("keydown", keyDown);
      element.removeEventListener("focusout", focusOut);
      element.removeEventListener("contextmenu", contextMenu);
      window.removeEventListener("keydown", escape);
    };
  }, [date, editable, view]);
  return { root, preview, message };
}
