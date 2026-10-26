"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { getFloatingTasks } from "@/app/(tools)/timer/_components/floatingTaskState";
import TaskActions from "@/app/(tools)/timer/_components/TaskActions";
import { taskAppearance } from "@/app/(tools)/timer/_components/taskPresentation";
import TaskProgress from "@/app/(tools)/timer/_components/TaskProgress";
import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import Button from "@/components/Button";
import {
  FloatingDockNotice,
  FloatingDockSlot,
} from "@/components/floating/FloatingDock";
import InternalLink from "@/components/InternalLink";

export default function FloatingTimerDock() {
  const pathname = usePathname();
  const { snapshot, clockOffset, error, refresh } = useTimer(
    "snapshot",
    "clockOffset",
    "error",
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
    pathname !== "/timer" && error !== null && canUseTimer(snapshot);
  const visible = selected !== undefined || showError;

  if (!visible) {
    return null;
  }

  function selectNextTask() {
    const next = tasks.at((selectedIndex + 1) % tasks.length);
    if (next) {
      setSelection((current) => ({ ...current, taskId: next.task.id }));
    }
  }

  const retainPausedTask = (taskId: string) => {
    setSelection({ date, taskId, retainedTaskId: taskId });
  };

  return (
    <>
      {showError ? (
        <FloatingDockNotice>
          <div
            className="border-border bg-background/70 pointer-events-auto flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-sm backdrop-blur-md sm:w-md"
            role="alert"
          >
            <p className="text-danger flex-1">{error}</p>
            <Button
              variant="outline"
              onClick={() => {
                void refresh();
              }}
            >
              Retry
            </Button>
          </div>
        </FloatingDockNotice>
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
    <div className="border-border bg-background/70 shadow-foreground/10 flex min-h-(--floating-tabbar-height,3.3125rem) items-center gap-1.5 rounded-full border py-2 pr-2 pl-4 shadow-lg backdrop-blur-md [corner-shape:round]">
      <InternalLink
        className="text-foreground! hover:text-foreground! focus-visible:outline-action mr-auto min-w-0 flex-1 rounded-sm py-1 hover:no-underline! focus-visible:outline-2 focus-visible:outline-offset-2 [&_progress]:h-1.5"
        href="/timer"
        variant="inline"
      >
        <TaskProgress
          task={selected.task}
          spent={selected.state.spent}
          running={selected.state.running}
          appearance={appearance}
          compact
          title={selected.task.activity}
        />
      </InternalLink>
      <TaskActions
        date={date}
        task={selected.task}
        running={selected.state.running}
        label={selected.state.label}
        variant={appearance.button}
        presentation="icons"
        onPause={onPause}
      >
        {taskCount > 1 ? (
          <Button
            aria-label={`Switch task: ${selectedIndex + 1} of ${taskCount}. Next task`}
            onClick={onSelectNext}
            size="icon-circle"
            title={`Next task (${selectedIndex + 1}/${taskCount})`}
            variant="floating-outline"
          >
            <span className="text-xs whitespace-nowrap tabular-nums">
              {selectedIndex + 1}/{taskCount}
            </span>
          </Button>
        ) : null}
      </TaskActions>
    </div>
  );

  return (
    <FloatingDockSlot position="timer">
      <section
        aria-label="Floating task"
        className="pointer-events-auto w-full sm:w-[22.4rem]"
      >
        {fullPlayer}
      </section>
    </FloatingDockSlot>
  );
}
