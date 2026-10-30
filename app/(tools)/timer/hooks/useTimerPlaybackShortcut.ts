import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

import { getFloatingTasks } from "../_components/floatingTaskState";
import { useTimer } from "../_components/TimerProvider";
import { canUseTimer } from "../utils/timer";
import { playTaskSound, prepareTaskSound } from "../utils/timerSound";

function isUnmodifiedSpace(event: KeyboardEvent) {
  return (
    event.code === "Space" &&
    !event.defaultPrevented &&
    !event.repeat &&
    !event.isComposing &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  );
}

export default function useTimerPlaybackShortcut({
  retainedTaskId,
  onToggle,
}: {
  retainedTaskId: string | null;
  onToggle: (taskId: string) => void;
}) {
  const pathname = usePathname();
  const { snapshot, clockOffset, act } = useTimer(
    "snapshot",
    "clockOffset",
    "act"
  );
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (
      !isUnmodifiedSpace(event) ||
      pathname !== "/timer" ||
      !canUseTimer(snapshot)
    ) {
      return;
    }
    const { target } = event;
    if (
      (target instanceof HTMLElement && target.isContentEditable) ||
      (target instanceof Element &&
        target.closest(
          "input, textarea, select, button, a, summary, [role='button'], [role='textbox'], [role='slider'], [role='menuitem'], [role='dialog'], [role='alertdialog']"
        ) !== null) ||
      document.querySelector("[role='dialog'], [role='alertdialog']") !== null
    ) {
      return;
    }
    const selected = getFloatingTasks(
      snapshot.day.tasks,
      snapshot.today,
      Date.now() + clockOffset,
      retainedTaskId
    ).at(0);
    if (selected === undefined) {
      return;
    }
    event.preventDefault();
    const action = selected.state.running ? "pause" : "start";
    onToggle(selected.task.id);
    playTaskSound(prepareTaskSound(), action);
    void act({ action, date: snapshot.today, taskId: selected.task.id });
  });
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
