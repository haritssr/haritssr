"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { getTaskActionButtonClassName } from "./data";
import type {
  NowPrimaryAction,
  Task,
  TaskActionsProps,
  TaskItemProps,
} from "./type";

function getNowPrimaryAction(
  type: Task["type"],
  progress: number,
  isRunning: boolean,
  setIsRunning: (running: boolean) => void
): NowPrimaryAction {
  if (type !== "Now") {
    return { className: "", label: "" };
  }

  if (progress >= 100) {
    return { className: "text-green-600", label: "Done" };
  }

  if (isRunning) {
    return {
      action: () => setIsRunning(false),
      className: getTaskActionButtonClassName("rose"),
      label: "Stop",
    };
  }

  if (progress === 0) {
    return {
      action: () => setIsRunning(true),
      className: getTaskActionButtonClassName("blue"),
      label: "Start",
    };
  }

  return {
    action: () => setIsRunning(true),
    className: getTaskActionButtonClassName("blue"),
    label: "Resume",
  };
}

function TaskActions(props: TaskActionsProps) {
  return (
    <>
      {!!props.canDeleteTask && (
        <button
          className={getTaskActionButtonClassName("secondary")}
          onClick={props.onDelete}
          type="button"
        >
          Del
        </button>
      )}
      {!!props.canMoveNowTask && (
        <button
          className={getTaskActionButtonClassName("zinc")}
          onClick={props.onMoveToOther}
          type="button"
        >
          Other
        </button>
      )}
      {!!props.canResetNowTask && (
        <button
          className={getTaskActionButtonClassName("zinc")}
          onClick={props.onReset}
          type="button"
        >
          Reset
        </button>
      )}
      {!!props.isNowTask && (
        <button
          className={props.primaryNowAction.className}
          onClick={props.primaryNowAction.action}
          type="button"
        >
          {props.primaryNowAction.label}
        </button>
      )}
      {!!props.canDoNow && (
        <button
          className={getTaskActionButtonClassName("zinc")}
          onClick={props.onDoNow}
          type="button"
        >
          Now
        </button>
      )}
      {!!props.canResumeOtherTask && (
        <button
          className={getTaskActionButtonClassName("blue")}
          onClick={props.onResume}
          type="button"
        >
          Resume
        </button>
      )}
      {!!props.canMarkNowTaskDone && (
        <button
          className={getTaskActionButtonClassName("green")}
          onClick={props.onMarkDone}
          type="button"
        >
          Done
        </button>
      )}
    </>
  );
}

function DonutProgress({
  progress,
  isRunning,
}: {
  progress: number;
  isRunning: boolean;
}) {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const activeColor = isRunning ? "#3b82f6" : "#71717a";
  const trackColor = "#d4d4d8";

  return (
    <div
      className="relative h-4 w-4 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${activeColor} ${clampedProgress}%, ${trackColor} ${clampedProgress}% 100%)`,
      }}
    >
      <div className="absolute inset-0.75 rounded-full bg-white" />
    </div>
  );
}

export default function TaskItem(props: TaskItemProps) {
  // Clamp progress so UI and timer logic always use a safe 0..100 value.
  const progress = Math.max(0, Math.min(100, props.progress));
  // Treat a task as done if type is Done or progress reached 100.
  const taskIsDone = props.type === "Done" || progress >= 100;
  // Local running flag for the Now-task interval timer.
  const [isRunning, setIsRunning] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteDialogTitleId = useId();
  // Allow "Now" action only for non-done Other tasks at 0% progress.
  const canDoNow =
    props.type === "Other" &&
    progress === 0 &&
    !taskIsDone &&
    Boolean(props.onDoNow);
  // Show delete only when row is interactive and a delete handler exists.
  const canDeleteTask = props.readOnly !== true && Boolean(props.onDelete);
  // Allow "Resume" only for non-done Other tasks with existing progress.
  const canResumeOtherTask =
    props.type === "Other" &&
    progress > 0 &&
    !taskIsDone &&
    Boolean(props.onResumeNow);
  // Allow moving a Now task to Other when paused and in progress.
  const canMoveNowTask =
    props.type === "Now" &&
    !isRunning &&
    progress > 0 &&
    !taskIsDone &&
    Boolean(props.onMoveTask);
  // Allow resetting a Now task that has started.
  const canResetNowTask = props.type === "Now" && progress > 0 && !taskIsDone;
  // Allow quick "Done" while a Now task is actively running.
  const canMarkNowTaskDone = props.type === "Now" && isRunning && !taskIsDone;
  // Compute primary Now action label/style/callback based on task state.
  const primaryNowAction = getNowPrimaryAction(
    props.type,
    progress,
    isRunning,
    setIsRunning
  );

  const handleMoveToOther = () => {
    setIsRunning(false);
    props.onMoveTask?.(props.title, "Other");
  };

  const handleReset = () => {
    setIsRunning(false);
    props.onProgressChange?.(props.title, 0);
  };

  const handleDone = () => {
    setIsRunning(false);
    props.onMarkDone?.(props.title);
  };

  const handleResume = () => {
    setIsRunning(false);
    props.onResumeNow?.(props.title);
  };

  const handleDelete = () => {
    setIsRunning(false);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    props.onDelete?.(props.title);
  };

  const handleDoNow = useCallback(() => {
    props.onDoNow?.(props.title);
  }, [props.onDoNow, props.title]);

  // Auto-start timer after Resume->Now handoff when task already has progress.
  useEffect(() => {
    if (props.type !== "Now" || !props.autoStart || progress <= 0) {
      return;
    }

    setIsRunning(true);
    props.onAutoStartConsumed?.(props.title);
  }, [
    progress,
    props.autoStart,
    props.onAutoStartConsumed,
    props.title,
    props.type,
  ]);

  // Tick progress every second for running Now tasks.
  useEffect(() => {
    if (
      props.readOnly ||
      props.type !== "Now" ||
      taskIsDone ||
      !isRunning ||
      progress >= 100
    ) {
      return;
    }

    // Percentage increment per second for configured duration.
    const increment = 100 / (props.duration * 60);
    // Interval that advances progress and stops at completion.
    const timer = window.setInterval(() => {
      // Calculate next bounded progress for this tick.
      const nextProgress = Math.min(100, progress + increment);
      props.onProgressChange?.(props.title, nextProgress);
      if (nextProgress >= 100) {
        setIsRunning(false);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    isRunning,
    progress,
    props.duration,
    props.onProgressChange,
    props.readOnly,
    props.title,
    props.type,
    taskIsDone,
  ]);

  // Stop timer if external type/progress changes make task completed.
  useEffect(() => {
    if (taskIsDone && isRunning) {
      setIsRunning(false);
    }
  }, [isRunning, taskIsDone]);

  return (
    <>
      <div className="corner-squircle h-10 rounded-xl border border-zinc-300 pr-2.5 pl-2.5">
        <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-sm">
          <div className="scrollbar-hide min-w-0 overflow-x-auto overscroll-x-contain whitespace-nowrap text-zinc-700">
            {props.title}
          </div>

          <div className="flex shrink-0 items-center space-x-1.5 text-zinc-400">
            {props.readOnly !== true && (
              <TaskActions
                canDeleteTask={canDeleteTask}
                canDoNow={canDoNow}
                canMarkNowTaskDone={canMarkNowTaskDone}
                canMoveNowTask={canMoveNowTask}
                canResetNowTask={canResetNowTask}
                canResumeOtherTask={canResumeOtherTask}
                isNowTask={props.type === "Now" && !taskIsDone}
                onDelete={handleDelete}
                onDoNow={handleDoNow}
                onMarkDone={handleDone}
                onMoveToOther={handleMoveToOther}
                onReset={handleReset}
                onResume={handleResume}
                primaryNowAction={primaryNowAction}
              />
            )}
            <span>{props.duration}"</span>
            <span>{progress.toFixed(0)}%</span>
            <DonutProgress isRunning={isRunning} progress={progress} />
          </div>
        </div>
      </div>
      {isDeleteDialogOpen ? (
        <dialog
          aria-labelledby={deleteDialogTitleId}
          className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-zinc-200 bg-white p-0 text-zinc-800 shadow-xl"
          open
        >
          <div className="p-5">
            <h2 className="font-semibold text-lg" id={deleteDialogTitleId}>
              Delete task?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              This will permanently delete &ldquo;{props.title}&rdquo;.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100"
                onClick={() => setIsDeleteDialogOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                onClick={handleConfirmDelete}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
