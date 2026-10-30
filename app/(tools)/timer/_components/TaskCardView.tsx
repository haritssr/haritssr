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
      className={`group/task text-foreground min-w-0 flex-1 sm:group-data-list-view/task-list:py-2 sm:group-data-list-view/task-list:pr-2 sm:@md/task-list:group-data-list-view/task-list:grid sm:@md/task-list:group-data-list-view/task-list:grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)] sm:@md/task-list:group-data-list-view/task-list:items-center sm:@md/task-list:group-data-list-view/task-list:gap-6 lg:@md/task-list:group-data-list-view/task-list:grid-cols-2 ${TASK_LAYOUT.surface} ${TASK_LAYOUT.item} ${className}`}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <p
          className="text-foreground min-w-0 truncate text-lg font-medium sm:group-data-list-view/task-list:text-base"
          title={task.activity}
        >
          {task.activity}
        </p>
        <div className="flex shrink-0 items-center gap-2 sm:group-data-list-view/task-list:gap-3">
          {headerActions}
        </div>
      </div>
      {children}
      <div
        className={`min-w-0 group-data-completed/task:*:opacity-60 sm:group-data-list-view/task-list:mt-0 lg:group-data-list-view/task-list:gap-4 ${TASK_LAYOUT.controls}`}
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
