"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getFloatingTasks } from "@/app/timer/components/floatingTaskState";
import TaskActions from "@/app/timer/components/TaskActions";
import { taskAppearance } from "@/app/timer/components/taskPresentation";
import TaskProgress from "@/app/timer/components/TaskProgress";
import TaskSpeedControl from "@/app/timer/components/TaskSpeedControl";
import { canUseTimer } from "@/utils/timer";

import Button from "./Button";
import InternalLink from "./InternalLink";
import { useTimer } from "./TimerProvider";
import useTimerClock from "./useTimerClock";
import useTimerDockPosition from "./useTimerDockPosition";

export default function FloatingTimerDock() {
  const pathname = usePathname();
  const {
    snapshot,
    clockOffset,
    error,
    completion,
    dismissCompletion,
    refresh,
  } = useTimer();
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
  const visible = selected !== undefined || completion !== null || showError;
  const dockRef = useTimerDockPosition(visible, pathname);

  if (!visible) {
    return null;
  }

  function selectNextTask() {
    const next = tasks.at((selectedIndex + 1) % tasks.length);
    if (next) {
      setSelection((current) => ({ ...current, taskId: next.task.id }));
    }
  }

  const appearance = selected
    ? taskAppearance(
        "cards",
        selected.state.running,
        selected.state.paused,
        selected.state.reached
      )
    : null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[var(--timer-dock-bottom,max(0.75rem,env(safe-area-inset-bottom)))] z-50 mx-auto flex w-full max-w-5xl flex-col items-end gap-3 px-3.5 [--timer-safe-bottom:env(safe-area-inset-bottom,0px)] sm:bottom-[var(--timer-dock-bottom,1.5rem)] sm:px-4 xl:px-0"
      ref={dockRef}
    >
      {completion === null ? null : (
        <div className="border-border bg-background/70 shadow-floating pointer-events-auto flex w-full items-center justify-between gap-3 rounded-xl border py-2 pr-3 pl-4 backdrop-blur-md sm:w-fit">
          <output>
            <strong className="text-secondary-accent font-medium">
              {completion}
            </strong>{" "}
            is done!
          </output>
          <div className="flex shrink-0 items-center gap-3">
            {pathname === "/timer" ? null : (
              <InternalLink className="text-sm" href="/timer" variant="inline">
                Visit
              </InternalLink>
            )}
            <Button
              aria-label="Dismiss completion message"
              onClick={dismissCompletion}
              size="icon-circle"
              title="Dismiss"
              variant="outline"
            >
              <XMarkIcon aria-hidden="true" className="size-4 stroke-2" />
            </Button>
          </div>
        </div>
      )}
      {showError ? (
        <div
          className="border-border bg-background/70 pointer-events-auto flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-sm backdrop-blur-md sm:w-[28rem]"
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
      ) : null}
      {selected && appearance ? (
        <section
          aria-label="Floating task"
          className="pointer-events-auto w-full space-y-2 sm:w-[28rem]"
        >
          <div className="border-border bg-background/70 shadow-floating flex min-h-[var(--timer-tabbar-height,3.3125rem)] items-center gap-2 rounded-xl border p-2 backdrop-blur-md">
            <div className="w-20 min-w-0 shrink text-sm leading-4 sm:w-24">
              <InternalLink
                className="text-foreground! hover:text-foreground! block max-w-full truncate font-medium underline-offset-2"
                href="/timer"
                variant="inline"
              >
                {selected.task.activity}
              </InternalLink>
            </div>
            <div className="min-w-24 flex-1">
              <TaskProgress
                task={selected.task}
                spent={selected.state.spent}
                running={selected.state.running}
                view="cards"
                appearance={appearance}
                compact
              />
            </div>
            {tasks.length > 1 ? (
              <Button
                aria-label={`Switch task: ${selectedIndex + 1} of ${tasks.length}. Next task`}
                onClick={selectNextTask}
                size="icon-circle"
                title={`Next task (${selectedIndex + 1}/${tasks.length})`}
                variant="outline"
              >
                <span className="min-w-0 truncate text-xs tabular-nums">
                  {selectedIndex + 1}/{tasks.length}
                </span>
              </Button>
            ) : null}
            <TaskSpeedControl
              task={selected.task}
              date={date}
              showIcon={false}
            />
            <TaskActions
              date={date}
              task={selected.task}
              running={selected.state.running}
              label={selected.state.label}
              variant={appearance.button}
              view="cards"
              presentation="icons"
              onPause={() => {
                setSelection({
                  date,
                  taskId: selected.task.id,
                  retainedTaskId: selected.task.id,
                });
              }}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
