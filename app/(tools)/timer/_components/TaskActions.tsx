import { CheckIcon } from "@heroicons/react/24/outline";
import { ForwardIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import type { ComponentProps, ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import {
  playTaskSound,
  prepareTaskSound,
} from "@/app/(tools)/timer/utils/timerSound";
import Button from "@/components/Button";

import DeleteTaskButton from "./DeleteTaskButton";

export default function TaskActions({
  date,
  task,
  running,
  label,
  variant,
  presentation = "text",
  onPause,
  children,
}: {
  date: string;
  task: TimerTask;
  running: boolean;
  label: string;
  variant: ComponentProps<typeof Button>["variant"];
  presentation?: "text" | "icons";
  onPause?: () => void;
  children?: ReactNode;
}) {
  const { act, snapshot } = useTimer("act", "snapshot");
  const showDone = running || task.spent > 0;
  const unavailable = !canUseTimer(snapshot);
  const disabled = unavailable;
  function toggleRunning() {
    if (running) {
      onPause?.();
    }
    const sound = prepareTaskSound();
    playTaskSound(sound, running ? "pause" : "start");
    void act({
      action: running ? "pause" : "start",
      date,
      taskId: task.id,
    });
  }

  function finishTask() {
    const sound = prepareTaskSound();
    playTaskSound(sound, "done");
    void act({ action: "done", date, taskId: task.id });
  }

  if (presentation === "icons") {
    return (
      <TaskIconActions
        activity={task.activity}
        running={running}
        label={label}
        disabled={disabled}
        dimWhenDisabled={unavailable}
        onDone={finishTask}
        onToggle={toggleRunning}
      >
        {children}
      </TaskIconActions>
    );
  }

  let ToggleIcon = PlayIcon;
  if (running) {
    ToggleIcon = PauseIcon;
  } else if (label === "Continue") {
    ToggleIcon = ForwardIcon;
  }
  return (
    <div className="flex min-w-0 items-center justify-end gap-2">
      {showDone ? null : (
        <DeleteTaskButton
          className="shrink-0"
          title="Delete"
          dimWhenDisabled={unavailable}
          size="icon-circle"
          disabled={disabled}
          onDelete={async () =>
            await act({ action: "delete", date, taskId: task.id })
          }
          variant="secondary-strong"
          aria-label={`Delete ${task.activity}`}
        />
      )}
      <Button
        className={`shrink-0 ${showDone ? "" : "select-none"}`}
        dimWhenDisabled={unavailable}
        size="icon-circle"
        disabled={disabled}
        aria-label={`${showDone ? "Done" : label}: ${task.activity}`}
        title={showDone ? "Done" : label}
        onClick={showDone ? finishTask : toggleRunning}
        variant={showDone ? "secondary-strong" : variant}
      >
        {showDone ? (
          <CheckIcon strokeWidth={2.5} aria-hidden="true" className="size-5" />
        ) : (
          <ToggleIcon
            aria-hidden="true"
            data-running={running}
            className="size-5 data-[running=false]:translate-x-px"
          />
        )}
      </Button>
      {showDone ? (
        <Button
          className="shrink-0 select-none"
          dimWhenDisabled={unavailable}
          size="icon-circle"
          disabled={disabled}
          aria-label={`${label}: ${task.activity}`}
          title={label}
          onClick={toggleRunning}
          variant={running ? "timer-running" : "neutral-subtle"}
        >
          <ToggleIcon
            aria-hidden="true"
            data-running={running}
            className="size-5 data-[running=false]:translate-x-px"
          />
        </Button>
      ) : null}
    </div>
  );
}

function TaskIconActions({
  activity,
  running,
  label,
  disabled,
  dimWhenDisabled,
  onDone,
  onToggle,
  children,
}: {
  activity: string;
  running: boolean;
  label: string;
  disabled: boolean;
  dimWhenDisabled: boolean;
  onDone: () => void;
  onToggle: () => void;
  children?: ReactNode;
}) {
  let ToggleIcon = PlayIcon;
  if (running) {
    ToggleIcon = PauseIcon;
  } else if (label === "Continue") {
    ToggleIcon = ForwardIcon;
  }
  return (
    <div className="flex shrink-0 items-center gap-2">
      {children}
      <Button
        aria-label={`Done: ${activity}`}
        dimWhenDisabled={dimWhenDisabled}
        disabled={disabled}
        onClick={onDone}
        size="icon-circle"
        title="Done"
        variant="secondary-strong"
      >
        <CheckIcon strokeWidth={2.5} aria-hidden="true" className="size-4.5" />
      </Button>
      <Button
        aria-label={`${label}: ${activity}`}
        dimWhenDisabled={dimWhenDisabled}
        disabled={disabled}
        onClick={onToggle}
        size="icon-circle"
        title={label}
        variant={running ? "timer-running" : "neutral-subtle"}
      >
        <ToggleIcon
          aria-hidden="true"
          data-running={running}
          className="size-4.5 data-[running=false]:translate-x-px"
        />
      </Button>
    </div>
  );
}
