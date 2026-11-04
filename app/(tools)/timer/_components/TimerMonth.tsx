import type { TimerDay } from "../utils/timer";
import {
  calendarDateLabel,
  monthCells,
  scheduledCalendarTasks,
} from "../utils/timerCalendar";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TimerMonth({
  month,
  today,
  selectedDate,
  days,
  onSelect,
}: {
  month: string;
  today: string;
  selectedDate: string;
  days: TimerDay[];
  onSelect: (date: string) => void;
}) {
  const byDate = new Map(days.map((day) => [day.date, day]));
  return (
    <div className="min-w-0 select-none">
      <div className="border-border text-muted grid grid-cols-7 border-b pb-2 text-center text-xs">
        {weekdays.map((day) => (
          <span key={day} aria-label={day}>
            {day.slice(0, 1)}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {monthCells(month).map((date, index) =>
          date === null ? (
            <div
              key={`empty-${index}`}
              aria-hidden="true"
              className="border-border border-b"
            />
          ) : (
            <MonthDay
              key={date}
              date={date}
              today={today}
              selected={date === selectedDate}
              day={byDate.get(date)}
              onSelect={onSelect}
            />
          )
        )}
      </div>
    </div>
  );
}

function MonthDay({
  date,
  today,
  selected,
  day,
  onSelect,
}: {
  date: string;
  today: string;
  selected: boolean;
  day: TimerDay | undefined;
  onSelect: (date: string) => void;
}) {
  const tasks = scheduledCalendarTasks(day);
  return (
    <button
      type="button"
      aria-label={`${calendarDateLabel(date)}, ${tasks.length} scheduled tasks${date > today ? ", preview" : ""}`}
      aria-current={date === today ? "date" : undefined}
      onClick={() => {
        onSelect(date);
      }}
      className={`focus-visible:outline-action hover:bg-interface-hover border-border relative flex min-h-28 min-w-0 cursor-pointer flex-col gap-1 border-b px-0.5 py-2 text-left outline-hidden focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:min-h-40 sm:gap-1.5 sm:px-1 ${selected ? "bg-interface-hover/50" : ""}`}
    >
      <span
        className={`mx-auto flex size-7 shrink-0 items-center justify-center rounded-full text-sm tabular-nums ${date === today ? "bg-danger text-white" : "text-foreground"}`}
      >
        {Number(date.slice(8))}
      </span>
      <span aria-hidden="true" className="flex w-full min-w-0 flex-col gap-0.5">
        {tasks.slice(0, 3).map((task, index) => (
          <span
            key={task.id}
            className={`bg-schedule-surface text-schedule-accent text-timer-progress block truncate rounded-xs px-0.5 leading-4 sm:px-1 sm:text-xs ${index === 2 ? "hidden sm:block" : ""}`}
            title={task.activity}
          >
            {task.activity}
          </span>
        ))}
        {tasks.length > 2 ? (
          <span className="text-muted text-timer-progress text-center sm:hidden">
            +{tasks.length - 2}
          </span>
        ) : null}
        {tasks.length > 3 ? (
          <span className="text-muted hidden text-center text-xs sm:block">
            +{tasks.length - 3}
          </span>
        ) : null}
      </span>
    </button>
  );
}
