import type { TimerTask } from "@/utils/timer";

import TaskActions from "./TaskActions";
import TaskDescription from "./TaskDescription";
import { EditTask } from "./TaskDialog";
import { TASK_VIEW_LAYOUT, taskAppearance } from "./taskPresentation";
import type { TaskView } from "./taskPresentation";
import TaskProgress from "./TaskProgress";
import useTaskState from "./useTaskState";

export default function TaskCard({
  task,
  date,
  view,
}: {
  task: TimerTask;
  date: string;
  view: TaskView;
}) {
  const { spent, reached, running, paused, label } = useTaskState(task, date);
  const appearance = taskAppearance(view, running, paused, reached);

  if (reached) {
    return null;
  }

  return (
    <div
      data-completed={reached || undefined}
      className={`group/task min-w-0 flex-1 ${TASK_VIEW_LAYOUT[view].surface} ${TASK_VIEW_LAYOUT[view].item} ${appearance.surface}`}
    >
      <TaskHeader task={task} date={date} view={view} reached={reached} />
      <div
        className={`group-data-completed/task:*:opacity-60 ${TASK_VIEW_LAYOUT[view].controls} ${view === "list" && (running || paused) ? "grid-cols-[minmax(0,1fr)_11rem]" : ""}`}
      >
        <TaskProgress
          task={task}
          spent={spent}
          running={running}
          view={view}
          appearance={appearance}
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

function TaskHeader({
  task,
  date,
  view,
  reached,
}: {
  task: TimerTask;
  date: string;
  view: TaskView;
  reached: boolean;
}) {
  return (
    <div className={view === "list" ? "space-y-0.5" : "space-y-1.5"}>
      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-foreground min-w-0 truncate text-lg font-medium ${view === "list" ? "sm:text-sm" : "sm:text-base"}`}
          title={task.activity}
        >
          {task.activity}
        </p>
        <EditTask task={task} date={date} reached={reached} />
      </div>
      <TaskDescription task={task} />
    </div>
  );
}
