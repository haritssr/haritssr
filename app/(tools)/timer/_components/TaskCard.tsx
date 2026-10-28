import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

import {
  isDailyTask,
  formatAvailabilityWindow,
} from "@/app/(tools)/timer/utils/dailyTasks";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";

import TaskActions from "./TaskActions";
import TaskCardView from "./TaskCardView";
import TaskDescription from "./TaskDescription";
import { EditTask } from "./TaskDialog";
import { taskAppearance } from "./taskPresentation";
import TaskSpeedControl from "./TaskSpeedControl";
import type { TaskState } from "./taskState";
import { TimerSettingsTrigger } from "./TimerSettings";

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
        timeDisplay={daily ? "spent" : "spent-and-duration"}
        timeNote={formatAvailabilityWindow(task.availabilityWindow)}
        className={daily && (!state.available || reached) ? "opacity-50" : ""}
        headerActions={
          <>
            <span className="inline-flex items-center [&>button]:min-h-5 [&>button]:min-w-0">
              <TaskSpeedControl task={task} date={date} showIcon={false} />
            </span>
            {daily ? (
              <TimerSettingsTrigger
                section="daily"
                size="text"
                variant="icon"
                aria-label={`Daily settings for ${task.activity}`}
                title="Daily Tasks"
              >
                <AdjustmentsHorizontalIcon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              </TimerSettingsTrigger>
            ) : (
              <EditTask task={task} date={date} reached={false} />
            )}
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
    previous.state.label === next.state.label
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
