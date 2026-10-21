import type { TimerTask } from "@/utils/timer";

import TaskActions from "./TaskActions";
import TaskDescription from "./TaskDescription";
import { TASK_VIEW_LAYOUT, taskAppearance } from "./taskPresentation";
import type { TaskView } from "./taskPresentation";
import TaskProgress from "./TaskProgress";
import TaskSpeedControl from "./TaskSpeedControl";
import type { TaskState } from "./taskState";

export default function TaskCard({
  task,
  date,
  view,
  state,
}: {
  task: TimerTask;
  date: string;
  view: TaskView;
  state: TaskState;
}) {
  const { spent, reached, running, paused, label } = state;
  const appearance = taskAppearance(view, running, paused, reached);

  if (reached) {
    return null;
  }

  return (
    <div
      data-completed={reached || undefined}
      className={`group/task min-w-0 flex-1 ${TASK_VIEW_LAYOUT[view].surface} ${TASK_VIEW_LAYOUT[view].item} ${appearance.surface}`}
    >
      <TaskHeader task={task} />
      <div
        className={`group-data-completed/task:*:opacity-60 ${TASK_VIEW_LAYOUT[view].controls} ${view === "list" && (running || paused) ? "grid-cols-[minmax(0,1fr)_11rem]" : ""}`}
      >
        <TaskProgress
          task={task}
          spent={spent}
          running={running}
          view={view}
          appearance={appearance}
          speedControl={
            <span className="ml-2 inline-flex items-center [&>button]:min-h-5 [&>button]:min-w-0">
              <TaskSpeedControl task={task} date={date} showIcon={false} />
            </span>
          }
        />
        <TaskActions
          date={date}
          task={task}
          running={running}
          label={label}
          variant={appearance.button}
          view={view}
        />
      </div>
    </div>
  );
}

function TaskHeader({ task }: { task: TimerTask }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <p
        className="text-foreground min-w-0 truncate text-lg font-medium sm:text-base"
        title={task.activity}
      >
        {task.activity}
      </p>
      <TaskDescription task={task} />
    </div>
  );
}
