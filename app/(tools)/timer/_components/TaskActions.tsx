import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import type { ComponentProps, ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import {
  isDailyTask,
  formatAvailabilityWindow,
} from "@/app/(tools)/timer/utils/dailyTasks";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import {
  playTaskSound,
  prepareTaskSound,
} from "@/app/(tools)/timer/utils/timerSound";
import Button from "@/components/Button";

import DeleteTaskButton from "./DeleteTaskButton";
import type { TaskState } from "./taskState";

function controlPresentation(
  task: TimerTask,
  state: TaskState,
  unavailable: boolean
) {
  const { running, label, reached, available } = state;
  const locked = !available || reached;
  const window = formatAvailabilityWindow(task.availabilityWindow);
  let ToggleIcon = running ? PauseIcon : PlayIcon;
  let toggleLabel: string = label;
  let toggleTitle: string = label;
  if (locked) {
    ToggleIcon = LockClosedIcon;
    toggleLabel = "Locked";
    toggleTitle = window === undefined ? "Locked" : `Locked · ${window} WIB`;
  }
  return {
    showDone: isDailyTask(task) || running || task.spent > 0,
    disabled: unavailable || locked,
    doneDisabled: unavailable || reached || (!running && state.spent === 0),
    ToggleIcon,
    toggleLabel,
    toggleTitle,
  };
}

function TaskToggleIcon({
  Icon,
  running,
}: {
  Icon: typeof PlayIcon | typeof PauseIcon | typeof LockClosedIcon;
  running: boolean;
}) {
  return (
    <Icon
      aria-hidden="true"
      data-running={running}
      className={`${running ? "size-6 sm:group-data-desktop-list-view/task-list:size-5" : "size-5 sm:group-data-desktop-list-view/task-list:size-4"} ${Icon === PlayIcon ? "translate-x-px" : ""}`}
    />
  );
}

export default function TaskActions({
  date,
  task,
  state,
  variant,
  presentation = "text",
  onPause,
  children,
}: {
  date: string;
  task: TimerTask;
  state: TaskState;
  variant: ComponentProps<typeof Button>["variant"];
  presentation?: "text" | "icons";
  onPause?: () => void;
  children?: ReactNode;
}) {
  const { act, snapshot } = useTimer("act", "snapshot");
  const { running, label } = state;
  const unavailable = !canUseTimer(snapshot);
  const {
    showDone,
    disabled,
    doneDisabled,
    toggleLabel,
    toggleTitle,
    ToggleIcon,
  } = controlPresentation(task, state, unavailable);
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

  return (
    <div className="flex min-w-0 items-center justify-end gap-2">
      {showDone ? null : (
        <DeleteTaskButton
          data-timer-secondary=""
          title="Delete"
          dimWhenDisabled={unavailable}
          size="timer-card"
          disabled={disabled}
          onDelete={async () =>
            await act({ action: "delete", date, taskId: task.id })
          }
          variant="secondary"
          aria-label={`Delete ${task.activity}`}
        />
      )}
      <Button
        className={showDone ? "disabled:cursor-default" : "select-none"}
        data-timer-play={showDone ? undefined : ""}
        data-timer-secondary={showDone ? "" : undefined}
        dimWhenDisabled={showDone || unavailable}
        size="timer-card"
        disabled={showDone ? doneDisabled : disabled}
        aria-label={`${showDone ? "Done" : label}: ${task.activity}`}
        title={showDone && doneDisabled ? undefined : actionTitle}
        onClick={showDone ? finishTask : toggleRunning}
        variant={showDone ? "timer-secondary" : variant}
      >
        {showDone ? (
          <CheckIcon
            strokeWidth={3.5}
            aria-hidden="true"
            className="size-5 sm:group-data-desktop-list-view/task-list:size-3.5"
          />
        ) : (
          <TaskToggleIcon Icon={ToggleIcon} running={running} />
        )}
      </Button>
      {showDone ? (
        <Button
          className="select-none"
          data-timer-play=""
          dimWhenDisabled={unavailable}
          size="timer-card"
          disabled={disabled}
          aria-label={`${toggleLabel}: ${task.activity}`}
          title={toggleTitle}
          onClick={toggleRunning}
          variant={variant}
        >
          <TaskToggleIcon Icon={ToggleIcon} running={running} />
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
  const ToggleIcon = running ? PauseIcon : PlayIcon;
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {children}
      <Button
        aria-label={`Done: ${activity}`}
        data-timer-secondary=""
        dimWhenDisabled={dimWhenDisabled}
        disabled={disabled}
        onClick={onDone}
        size="icon-circle"
        title="Done"
        variant="floating-secondary"
      >
        <CheckIcon strokeWidth={2.5} aria-hidden="true" className="size-4.5" />
      </Button>
      <Button
        aria-label={`${label}: ${activity}`}
        data-timer-play=""
        dimWhenDisabled={dimWhenDisabled}
        disabled={disabled}
        onClick={onToggle}
        size="icon-circle"
        title={label}
        variant={running ? "timer-running" : "timer-paused"}
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
