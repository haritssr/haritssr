import { useEffect, useEffectEvent, useRef, useState } from "react";

import {
  firstFutureSlot,
  selectedWindow,
  timelineSlot,
} from "../_components/timelineSelection";
import { useTimer } from "../_components/TimerProvider";
import { canUseTimer, timerDayBounds } from "../utils/timer";
import type { AvailabilityWindow } from "../utils/timer";
import { timelineTime } from "../utils/timerTime";
import { trackTimelineDrag } from "./timelineDrag";

interface Gesture {
  mode: "pointer" | "touch" | "keyboard";
  anchor: number;
  slot: number;
}

export default function useTimelineCreation(date: string, editable: boolean) {
  const { act, snapshot, clockOffset } = useTimer(
    "act",
    "snapshot",
    "clockOffset"
  );
  const surface = useRef<HTMLButtonElement>(null);
  const [selection, setSelection] = useState<AvailabilityWindow | null>(null);
  const [message, setMessage] = useState("");
  const eligibility = useEffectEvent(() => {
    const now = Date.now() + clockOffset;
    const bounds = timerDayBounds(date);
    return editable &&
      canUseTimer(snapshot) &&
      snapshot.today === date &&
      now >= bounds.start &&
      now < bounds.end
      ? firstFutureSlot((now - bounds.start) / 60_000)
      : 96;
  });
  const save = useEffectEvent(
    (window: AvailabilityWindow, creationDate: string) => {
      if (creationDate !== date || window.from < eligibility() * 15) {
        setMessage("Choose a future time. Selection canceled.");
        return;
      }
      const taskId = crypto.randomUUID();
      setMessage("Saving New Task.");
      void act({
        action: "add",
        date,
        taskId,
        activity: "New Task",
        description: "",
        duration: (window.until - window.from) * 60,
        availabilityWindow: window,
      }).then((saved) => {
        setMessage(
          saved
            ? "New Task created."
            : "Task could not be saved. Open Add Task to recover your draft."
        );
      });
    }
  );

  useEffect(() => {
    const element = surface.current;
    if (!element || !editable) {
      return () => {
        setSelection(null);
      };
    }
    let gesture: Gesture | null = null;
    let cursor = 0;
    const cancel = () => {
      tracker.reset();
      gesture = null;
      setSelection(null);
    };
    const announce = (window: AvailabilityWindow) => {
      setSelection(window);
      setMessage(
        `New Task, ${timelineTime(window.from)} to ${timelineTime(window.until)}.`
      );
    };
    const tracker = trackTimelineDrag(element, {
      start(_target, mode, y) {
        if (mode === "pointer") {
          element.blur();
        }
        cancel();
        if (eligibility() >= 96) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        const anchor = timelineSlot(y, rect.top, rect.height, 0);
        if (anchor < eligibility()) {
          setMessage("Choose a future time.");
          return false;
        }
        gesture = { mode, anchor, slot: anchor };
        return true;
      },
      activate() {
        if (gesture === null) {
          return false;
        }
        announce(selectedWindow(gesture.anchor, gesture.slot));
        return true;
      },
      drag(y) {
        if (gesture === null) {
          return;
        }
        if (eligibility() >= 96) {
          cancel();
          return;
        }
        const rect = element.getBoundingClientRect();
        gesture.slot = timelineSlot(y, rect.top, rect.height, eligibility());
        announce(selectedWindow(gesture.anchor, gesture.slot));
      },
      end(committed) {
        const finished = gesture;
        cancel();
        if (committed && finished !== null) {
          save(selectedWindow(finished.anchor, finished.slot), date);
        }
      },
      cancel,
    });
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancel();
        setMessage("Selection canceled.");
        return;
      }
      if (!["ArrowUp", "ArrowDown", "Enter", " "].includes(event.key)) {
        return;
      }
      event.preventDefault();
      const first = eligibility();
      if (first >= 96) {
        cancel();
        setMessage("No future time is available today.");
        return;
      }
      cursor = Math.max(first, Math.min(95, cursor));
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        cursor = Math.max(
          first,
          Math.min(95, cursor + (event.key === "ArrowDown" ? 1 : -1))
        );
        if (gesture?.mode === "keyboard") {
          gesture.slot = cursor;
          announce(selectedWindow(gesture.anchor, cursor));
        } else {
          setMessage(
            `${timelineTime(cursor * 15)}. Press Enter to start selecting.`
          );
        }
      } else if (!event.repeat) {
        if (gesture?.mode === "keyboard") {
          const window = selectedWindow(gesture.anchor, gesture.slot);
          cancel();
          save(window, date);
        } else {
          tracker.reset();
          gesture = { mode: "keyboard", anchor: cursor, slot: cursor };
          announce(selectedWindow(cursor, cursor));
        }
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && gesture) {
        cancel();
      }
    };
    const contextMenu = (event: Event) => {
      if (gesture?.mode === "touch") {
        event.preventDefault();
      }
    };
    element.addEventListener("keydown", keyDown);
    element.addEventListener("contextmenu", contextMenu);
    element.addEventListener("blur", cancel);
    window.addEventListener("keydown", escape);
    return () => {
      cancel();
      tracker.destroy();
      element.removeEventListener("keydown", keyDown);
      element.removeEventListener("contextmenu", contextMenu);
      element.removeEventListener("blur", cancel);
      window.removeEventListener("keydown", escape);
    };
  }, [date, editable]);
  return { surface, selection, message };
}
