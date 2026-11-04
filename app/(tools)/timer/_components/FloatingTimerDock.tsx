"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getFloatingTasks } from "@/app/(tools)/timer/_components/floatingTaskState";
import TaskActions from "@/app/(tools)/timer/_components/TaskActions";
import { taskAppearance } from "@/app/(tools)/timer/_components/taskPresentation";
import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import useTimerPlaybackShortcut from "@/app/(tools)/timer/hooks/useTimerPlaybackShortcut";
import { canUseTimer, formatTimerTime } from "@/app/(tools)/timer/utils/timer";
import Button from "@/components/Button";
import { FloatingDockSlot } from "@/components/floating/FloatingDock";
import FloatingPlayer from "@/components/floating/FloatingPlayer";
import FloatingRetryNotification from "@/components/floating/FloatingRetryNotification";
import { formatRemainingTime } from "@/components/floating/formatRemainingTime";
import InternalLink from "@/components/InternalLink";

export default function FloatingTimerDock() {
  const pathname = usePathname();
  const { snapshot, clockOffset, error, reconnecting, refresh } = useTimer(
    "snapshot",
    "clockOffset",
    "error",
    "reconnecting",
    "refresh"
  );
  const showTasks = pathname !== "/timer" && canUseTimer(snapshot);
  const now = useTimerClock(snapshot, clockOffset, showTasks);
  const date = snapshot?.today ?? "";
  const [selection, setSelection] = useState({
    date,
    taskId: null as string | null,
    retainedTaskId: null as string | null,
  });
  if (selection.date !== date) {
    setSelection({ date, taskId: null, retainedTaskId: null });
  }
  const tasks = canUseTimer(snapshot)
    ? getFloatingTasks(
        snapshot.day.tasks,
        date,
        now,
        selection.date === date ? selection.retainedTaskId : null
      )
    : [];
  const selectedIndex = Math.max(
    0,
    tasks.findIndex(({ task }) => task.id === selection.taskId)
  );
  const selected = showTasks ? tasks.at(selectedIndex) : undefined;
  const showError =
    error !== null && (pathname === "/timer" || canUseTimer(snapshot));
  const visible = selected !== undefined || showError;

  const retainPausedTask = (taskId: string) => {
    setSelection({ date, taskId, retainedTaskId: taskId });
  };
  useTimerPlaybackShortcut({
    retainedTaskId: selection.date === date ? selection.retainedTaskId : null,
    onToggle: retainPausedTask,
  });

  if (!visible) {
    return null;
  }

  function selectNextTask() {
    const next = tasks.at((selectedIndex + 1) % tasks.length);
    if (next) {
      setSelection((current) => ({ ...current, taskId: next.task.id }));
    }
  }

  return (
    <>
      {showError ? (
        <FloatingRetryNotification
          reconnecting={reconnecting}
          message={error}
          onRetry={() => {
            void refresh();
          }}
        />
      ) : null}
      {selected ? (
        <FloatingTimerPlayer
          date={date}
          selected={selected}
          selectedIndex={selectedIndex}
          taskCount={tasks.length}
          onSelectNext={selectNextTask}
          onPause={() => {
            retainPausedTask(selected.task.id);
          }}
        />
      ) : null}
    </>
  );
}

function FloatingTimerPlayer({
  date,
  selected,
  selectedIndex,
  taskCount,
  onSelectNext,
  onPause,
}: {
  date: string;
  selected: ReturnType<typeof getFloatingTasks>[number];
  selectedIndex: number;
  taskCount: number;
  onSelectNext: () => void;
  onPause: () => void;
}) {
  const appearance = taskAppearance(
    selected.state.running,
    selected.state.paused,
    selected.state.reached
  );
  const fullPlayer = (
    <FloatingPlayer>
      <InternalLink
        className="relative mr-1 min-w-0 flex-1 before:absolute before:inset-x-0 before:-inset-y-3.5"
        href="/timer"
        variant="floating"
      >
        <span className="flex min-w-0 items-center justify-between gap-2 text-sm leading-4">
          <span className="flex min-w-0 flex-1 items-center gap-1 font-medium">
            <ClockIcon
              aria-hidden="true"
              className="size-4.25 shrink-0 group-data-[collapsed=true]/floating:size-4.5"
            />
            <span className="truncate">{selected.task.activity}</span>
            {selected.task.description.trim() === "" ? null : (
              <span
                className="text-foreground/50 max-w-1/2 min-w-0 truncate font-normal"
                data-floating-details=""
                title={selected.task.description}
              >
                {selected.task.description}
              </span>
            )}
          </span>
          <span
            data-floating-details=""
            className="text-success shrink-0 whitespace-nowrap tabular-nums"
          >
            <span className="sr-only">
              {formatRemainingTime(
                selected.task.duration - selected.state.spent
              )}
            </span>
            <span aria-hidden="true">
              -
              {formatTimerTime(
                Math.max(0, selected.task.duration - selected.state.spent)
              )}
            </span>
          </span>
        </span>
      </InternalLink>
      <TaskActions
        date={date}
        task={selected.task}
        state={selected.state}
        variant={appearance.button}
        presentation="icons"
        onPause={onPause}
      >
        {taskCount > 1 ? (
          <Button
            data-floating-details=""
            aria-label={`Switch task: ${selectedIndex + 1} of ${taskCount}. Next task`}
            onClick={onSelectNext}
            size="floating-control"
            title={`Next task (${selectedIndex + 1}/${taskCount})`}
            variant="floating-control"
          >
            <span className="text-xs whitespace-nowrap tabular-nums">
              {selectedIndex + 1}/{taskCount}
            </span>
          </Button>
        ) : null}
      </TaskActions>
    </FloatingPlayer>
  );

  return (
    <FloatingDockSlot position="timer">
      <section
        aria-label="Floating task"
        className="pointer-events-auto w-full max-w-full min-w-0 sm:w-80"
      >
        {fullPlayer}
      </section>
    </FloatingDockSlot>
  );
}
