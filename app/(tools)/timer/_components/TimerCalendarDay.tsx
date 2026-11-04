import type { TimerDay } from "../utils/timer";
import { formatTimerTime, taskSpent } from "../utils/timer";
import { scheduledCalendarTasks } from "../utils/timerCalendar";
import { TASK_LAYOUT } from "./taskPresentation";
import TaskTimeline from "./TaskTimeline";

export default function TimerCalendarDay({
  day,
  now,
}: {
  day: TimerDay;
  now: number;
}) {
  const scheduled = scheduledCalendarTasks(day);
  const unscheduled = day.tasks.filter(
    (task) =>
      task.availabilityWindow === null || task.availabilityWindow === undefined
  );
  return (
    <div className="space-y-4">
      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-3">
          {day.tasks.length === 0 ? (
            <p className="text-muted text-sm">No activities for this day.</p>
          ) : null}
          {unscheduled.length > 0 ? (
            <ul
              className={TASK_LAYOUT.collection}
              aria-label="Unscheduled activities for selected day"
            >
              {unscheduled.map((task) => (
                <li
                  key={task.id}
                  className={`${TASK_LAYOUT.surface} flex min-w-0 items-center justify-between gap-3`}
                >
                  <div className="min-w-0">
                    <p className="text-foreground text-sm font-medium">
                      {task.activity}
                    </p>
                    {task.description ? (
                      <p className="text-foreground/50 text-xs">
                        {task.description}
                      </p>
                    ) : null}
                  </div>
                  <span className="text-muted shrink-0 text-xs tabular-nums">
                    {formatTimerTime(taskSpent(task, day.date, now))} /{" "}
                    {formatTimerTime(task.duration)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <TaskTimeline
          tasks={scheduled}
          date={day.date}
          now={now}
          editable={false}
        />
      </div>
    </div>
  );
}
