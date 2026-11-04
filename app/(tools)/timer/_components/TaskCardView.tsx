import type { ComponentProps, ReactNode } from "react";

import type { TimerTask } from "@/app/(tools)/timer/utils/timer";

import { TASK_LAYOUT, taskAppearance } from "./taskPresentation";
import TaskProgress, { MobileTaskProgress } from "./TaskProgress";
import type { TaskState } from "./taskState";

export default function TaskCardView({
  task,
  state,
  headerActions,
  actions,
  timeDisplay,
  timeNote,
  children,
  className = "",
}: {
  task: TimerTask;
  state: TaskState;
  headerActions: ReactNode;
  actions: ReactNode;
  timeDisplay?: ComponentProps<typeof TaskProgress>["timeDisplay"];
  timeNote?: ComponentProps<typeof TaskProgress>["timeNote"];
  children?: ReactNode;
  className?: string;
}) {
  const { spent, reached, running, paused } = state;
  const appearance = taskAppearance(
    running,
    paused && state.available,
    reached
  );

  return (
    <div
      data-completed={reached || undefined}
      data-late={state.deadlineWarning === "late" || undefined}
      className={`group/task text-foreground min-w-0 flex-1 select-none ${TASK_LAYOUT.surface} ${TASK_LAYOUT.item} ${className}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:block">
        <div className="flex h-4 min-w-0 items-center gap-1 sm:h-auto">
          <p
            className="text-foreground min-w-0 truncate text-sm leading-4 font-medium sm:text-base sm:leading-normal"
            title={task.activity}
          >
            {task.activity}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            {headerActions}
          </div>
          <span
            aria-hidden="true"
            className={`shrink-0 text-sm leading-4 tabular-nums sm:hidden ${appearance.elapsed}`}
          >
            {Math.max(0, Math.min(100, (spent / task.duration) * 100)).toFixed(
              0
            )}
            %
          </span>
        </div>
        <div
          className={`flex h-4 min-w-0 items-center gap-1 text-sm leading-4 sm:text-xs ${task.description.trim() === "" ? "sm:hidden" : ""}`}
        >
          {task.description.trim() !== "" && (
            <p
              className="text-foreground/50 min-w-0 truncate font-normal"
              title={task.description}
            >
              {task.description}
            </p>
          )}
          {timeNote !== undefined && (
            <span className="text-foreground/50 shrink-0 sm:hidden">
              {timeNote}
            </span>
          )}
        </div>
      </div>
      {children}
      <div
        className={`shrink-0 group-data-completed/task:*:opacity-60 ${TASK_LAYOUT.controls}`}
      >
        <div className="min-w-0">
          <MobileTaskProgress
            task={task}
            spent={spent}
            appearance={appearance}
          />
          <div className="hidden sm:block sm:min-w-40">
            <TaskProgress
              task={task}
              spent={spent}
              running={running}
              appearance={appearance}
              timeDisplay={timeDisplay}
              timeNote={timeNote}
            />
          </div>
        </div>
        {actions}
      </div>
    </div>
  );
}
