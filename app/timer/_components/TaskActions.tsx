import { CheckIcon } from "@heroicons/react/24/outline";
import { ForwardIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import type { ComponentProps } from "react";

import { useTimer } from "@/app/timer/_components/TimerProvider";
import { canUseTimer } from "@/app/timer/utils/timer";
import type { TimerTask } from "@/app/timer/utils/timer";
import { playTaskSound, prepareTaskSound } from "@/app/timer/utils/timerSound";
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
}: {
  date: string;
  task: TimerTask;
  running: boolean;
  label: string;
  variant: ComponentProps<typeof Button>["variant"];
  presentation?: "text" | "icons";
  onPause?: () => void;
}) {
  const { act, snapshot } = useTimer();
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
      />
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
          className="w-fit shrink-0"
          title="Delete"
          dimWhenDisabled={unavailable}
          iconOnly
          disabled={disabled}
          onDelete={async () =>
            await act({ action: "delete", date, taskId: task.id })
          }
          variant="secondary-strong"
          aria-label={`Delete ${task.activity}`}
        />
      )}
      <Button
        className={`w-fit shrink-0 ${showDone ? "" : "select-none"}`}
        dimWhenDisabled={unavailable}
        iconOnly
        disabled={disabled}
        aria-label={`${showDone ? "Done" : label}: ${task.activity}`}
        title={showDone ? "Done" : label}
        onClick={showDone ? finishTask : toggleRunning}
        variant={showDone ? "secondary-strong" : variant}
      >
        {showDone ? (
          <CheckIcon strokeWidth={2.5} aria-hidden="true" className="size-5" />
        ) : (
          <ToggleIcon aria-hidden="true" className="size-5" />
        )}
      </Button>
      {showDone ? (
        <Button
          className="w-fit shrink-0 select-none"
          dimWhenDisabled={unavailable}
          iconOnly
          disabled={disabled}
          aria-label={`${label}: ${task.activity}`}
          title={label}
          onClick={toggleRunning}
          variant={running ? "danger-subtle" : "attention-subtle"}
        >
          <ToggleIcon aria-hidden="true" className="size-5" />
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
}: {
  activity: string;
  running: boolean;
  label: string;
  disabled: boolean;
  dimWhenDisabled: boolean;
  onDone: () => void;
  onToggle: () => void;
}) {
  let ToggleIcon = PlayIcon;
  if (running) {
    ToggleIcon = PauseIcon;
  } else if (label === "Continue") {
    ToggleIcon = ForwardIcon;
  }
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button
        aria-label={`Done: ${activity}`}
        dimWhenDisabled={dimWhenDisabled}
        disabled={disabled}
        onClick={onDone}
        size="icon-circle"
        title="Done"
        variant="secondary-strong"
      >
        <CheckIcon
          strokeWidth={2.5}
          aria-hidden="true"
          className="size-5 sm:size-4"
        />
      </Button>
      <Button
        aria-label={`${label}: ${activity}`}
        dimWhenDisabled={dimWhenDisabled}
        disabled={disabled}
        onClick={onToggle}
        size="icon-circle"
        title={label}
        variant={running ? "danger-subtle" : "attention-subtle"}
      >
        <ToggleIcon aria-hidden="true" className="size-5 sm:size-4" />
      </Button>
    </div>
  );
}
