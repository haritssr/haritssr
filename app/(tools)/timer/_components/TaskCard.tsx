import type { TimerTask } from "@/app/(tools)/timer/utils/timer";

import TaskActions from "./TaskActions";
import TaskDescription from "./TaskDescription";
import { EditTask } from "./TaskDialog";
import { TASK_LAYOUT, taskAppearance } from "./taskPresentation";
import TaskProgress from "./TaskProgress";
import TaskSpeedControl from "./TaskSpeedControl";
import type { TaskState } from "./taskState";

export default function TaskCard({
  task,
  date,
  state,
}: {
  task: TimerTask;
  date: string;
  state: TaskState;
}) {
  const { spent, reached, running, paused, label } = state;
  const appearance = taskAppearance(running, paused, reached);

  if (reached) {
    return null;
  }

  return (
    <div
      data-completed={reached || undefined}
      className={`group/task min-w-0 flex-1 ${TASK_LAYOUT.surface} ${TASK_LAYOUT.item} ${appearance.surface}`}
    >
      <TaskHeader task={task} date={date} />
      <div
        className={`group-data-completed/task:*:opacity-60 ${TASK_LAYOUT.controls}`}
      >
        <div className="min-w-0">
          <TaskProgress
            task={task}
            spent={spent}
            running={running}
            appearance={appearance}
          />
        </div>
        <TaskActions
          date={date}
          task={task}
          running={running}
          label={label}
          variant={appearance.button}
        />
      </div>
    </div>
  );
}

function TaskHeader({ task, date }: { task: TimerTask; date: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <p
        className="text-foreground min-w-0 truncate text-lg font-medium"
        title={task.activity}
      >
        {task.activity}
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <span className="inline-flex items-center [&>button]:min-h-5 [&>button]:min-w-0">
          <TaskSpeedControl task={task} date={date} showIcon={false} />
        </span>
        <EditTask task={task} date={date} reached={false} />
        <TaskDescription task={task} />
      </div>
    </div>
  );
}
