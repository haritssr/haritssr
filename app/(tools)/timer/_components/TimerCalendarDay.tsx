import { Suspense, lazy } from "react";

import type { TimerDay } from "../utils/timer";
import { canUseTimer, formatTimerTime, taskSpent } from "../utils/timer";
import { scheduledCalendarTasks } from "../utils/timerCalendar";
import { EditTask } from "./TaskDialog";
import { useTaskEditing } from "./TaskEditing";
import { TASK_LAYOUT } from "./taskPresentation";
import TaskTimeline from "./TaskTimeline";

const EditableTaskTimeline = lazy(
  async () => await import("./EditableTaskTimeline")
);

export default function TimerCalendarDay({
  day: selectedDay,
  now,
}: {
  day: TimerDay;
  now: number;
}) {
  const editing = useTaskEditing();
  const editable =
    canUseTimer(editing.snapshot) &&
    editing.snapshot.day.date === selectedDay.date &&
    selectedDay.date > editing.snapshot.today;
  const day = editable ? (editing.snapshot?.day ?? selectedDay) : selectedDay;
  const scheduled = scheduledCalendarTasks(day);
  const timeline = { tasks: scheduled, date: day.date, now };

  const unscheduled = day.tasks.filter(
    (task) => task.period === null || task.period === undefined
  );
  return (
    <div className="space-y-4">
      {editable && editing.error !== null ? (
        <p role="alert" className="text-danger text-sm">
          {editing.error}
        </p>
      ) : null}
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
                    <div className="flex items-center gap-1">
                      <p className="text-foreground text-sm font-medium">
                        {task.activity}
                      </p>
                      {editable ? (
                        <EditTask task={task} date={day.date} reached={false} />
                      ) : null}
                    </div>
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
        {editable ? (
          <Suspense fallback={<TaskTimeline {...timeline} editable />}>
            <EditableTaskTimeline {...timeline} />
          </Suspense>
        ) : (
          <TaskTimeline {...timeline} editable={false} />
        )}
      </div>
    </div>
  );
}
