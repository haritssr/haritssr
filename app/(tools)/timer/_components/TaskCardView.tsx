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
      className={`group/task min-w-0 flex-1 ${TASK_LAYOUT.surface} ${TASK_LAYOUT.item} ${appearance.surface} ${className}`}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <p
          className="text-foreground min-w-0 truncate text-lg font-medium"
          title={task.activity}
        >
          {task.activity}
        </p>
        <div className="flex shrink-0 items-center gap-2">{headerActions}</div>
      </div>
      {children}
      <div
        className={`group-data-completed/task:*:opacity-60 ${TASK_LAYOUT.controls}`}
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
