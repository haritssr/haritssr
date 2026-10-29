import { memo } from "react";

import {
  isDailyTask,
  formatAvailabilityWindow,
} from "@/app/(tools)/timer/utils/dailyTasks";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";

import TaskActions from "./TaskActions";
import TaskCardView from "./TaskCardView";
import TaskDeadlineWarning from "./TaskDeadlineWarning";
import TaskDescription from "./TaskDescription";
import { EditTask } from "./TaskDialog";
import { taskAppearance } from "./taskPresentation";
import type { TaskState } from "./taskState";

interface TaskCardProps {
  task: TimerTask;
  date: string;
  state: TaskState;
}

const TaskCard = memo(
  ({ task, date, state }: TaskCardProps) => {
    const { reached, running, paused } = state;
    const appearance = taskAppearance(
      running,
      paused && state.available,
      reached
    );
    const daily = isDailyTask(task);

    if (reached && !daily) {
      return null;
    }

    return (
      <TaskCardView
        task={task}
        state={state}
        timeDisplay="spent"
        timeNote={formatAvailabilityWindow(task.availabilityWindow)}
        className={daily && (!state.available || reached) ? "opacity-35" : ""}
        headerActions={
          <>
            <TaskDeadlineWarning state={state} />
            <EditTask task={task} date={date} reached={reached} />
            <TaskDescription task={task} />
          </>
        }
        actions={
          <TaskActions
            date={date}
            task={task}
            state={state}
            variant={appearance.button}
          />
        }
      />
    );
  },
  (previous, next) =>
    previous.task === next.task &&
    previous.date === next.date &&
    previous.state.spent === next.state.spent &&
    previous.state.reached === next.state.reached &&
    previous.state.running === next.state.running &&
    previous.state.paused === next.state.paused &&
    previous.state.available === next.state.available &&
    previous.state.label === next.state.label &&
    previous.state.deadlineWarning === next.state.deadlineWarning &&
    previous.state.latestStartAt === next.state.latestStartAt &&
    previous.state.closesAt === next.state.closesAt
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
