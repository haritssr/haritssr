import type { ComponentProps, ReactNode } from "react";

import type { TimerTask } from "@/app/(tools)/timer/utils/timer";

import { TASK_LAYOUT, taskAppearance } from "./taskPresentation";
import TaskProgress from "./TaskProgress";
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
      <div className="flex min-w-0 items-center justify-between gap-3 sm:flex-1">
        <div className="min-w-0">
          <p
            className="text-foreground truncate text-base font-medium"
            title={task.activity}
          >
            {task.activity}
          </p>
          {task.description.trim() !== "" && (
            <p
              className="text-foreground/50 hidden truncate text-xs font-normal sm:block"
              title={task.description}
            >
              {task.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">{headerActions}</div>
      </div>
      {children}
      <div
        className={`min-w-0 group-data-completed/task:*:opacity-60 sm:mt-0 sm:w-1/2 ${TASK_LAYOUT.controls}`}
      >
        <div className="min-w-0">
          <TaskProgress
            task={task}
            spent={spent}
            running={running}
            appearance={appearance}
            timeDisplay={timeDisplay}
            timeNote={timeNote}
          />
        </div>
        {actions}
      </div>
    </div>
  );
}
