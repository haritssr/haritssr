"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getFloatingTasks } from "@/app/timer/_components/floatingTaskState";
import TaskActions from "@/app/timer/_components/TaskActions";
import { taskAppearance } from "@/app/timer/_components/taskPresentation";
import TaskProgress from "@/app/timer/_components/TaskProgress";
import { useTimer } from "@/app/timer/_components/TimerProvider";
import useTimerClock from "@/app/timer/hooks/useTimerClock";
import useTimerDockPosition from "@/app/timer/hooks/useTimerDockPosition";
import { canUseTimer } from "@/app/timer/utils/timer";
import Button from "@/components/Button";
import InternalLink from "@/components/InternalLink";

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
        selected.state.running,
        selected.state.paused,
        selected.state.reached
      )
    : null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[var(--timer-dock-bottom,max(0.75rem,env(safe-area-inset-bottom)))] z-50 mx-auto flex w-full max-w-5xl flex-col items-end gap-3 px-3.5 [--timer-safe-bottom:env(safe-area-inset-bottom,0px)] sm:bottom-[var(--timer-dock-bottom,1.5rem)] sm:items-center sm:px-4 xl:px-0"
      ref={dockRef}
    >
      {completion === null ? null : (
        <div className="border-border bg-background/70 shadow-foreground/15 pointer-events-auto flex w-full items-center justify-between gap-3 rounded-xl border py-2 pr-3 pl-4 shadow-lg backdrop-blur-md sm:w-fit">
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
          className="pointer-events-auto w-full space-y-2 sm:w-[22.4rem]"
        >
          <div className="border-border bg-background/70 shadow-foreground/15 flex min-h-[var(--timer-tabbar-height,3.3125rem)] items-center gap-2 rounded-xl border p-2 shadow-lg backdrop-blur-md">
            <InternalLink
              className="text-foreground! hover:text-foreground! focus-visible:outline-action mr-auto min-w-0 flex-1 rounded-sm py-1 pl-2 hover:no-underline! focus-visible:outline-2 focus-visible:outline-offset-2 [&_progress]:h-2 sm:[&_progress]:h-1.5"
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
            {tasks.length > 1 ? (
              <Button
                aria-label={`Switch task: ${selectedIndex + 1} of ${tasks.length}. Next task`}
                className="w-auto! min-w-10 px-1.5! sm:min-w-8"
                onClick={selectNextTask}
                size="icon-circle"
                title={`Next task (${selectedIndex + 1}/${tasks.length})`}
                variant="outline"
              >
                <span className="text-xs whitespace-nowrap tabular-nums">
                  {selectedIndex + 1}/{tasks.length}
                </span>
              </Button>
            ) : null}
            <TaskActions
              date={date}
              task={selected.task}
              running={selected.state.running}
              label={selected.state.label}
              variant={appearance.button}
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
