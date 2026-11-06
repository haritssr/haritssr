/* oxlint-disable shadcn/no-inline-styles -- Minute and lane geometry is expressed only through CSS custom properties. */
import type { CSSProperties } from "react";

import { taskKind, timerDayBounds } from "../utils/timer";
import type { TimerDay } from "../utils/timer";
import {
  calendarDateLabel,
  scheduledCalendarTasks,
  weekDates,
} from "../utils/timerCalendar";
import { cardTimeRange, timelineTime } from "../utils/timerTime";
import ScrollMirror from "./ScrollMirror";
import { timelineCardState } from "./TaskTimeline";
import { layoutTimelineTasks } from "./timelineLayout";

import styles from "./TaskTimeline.module.css";

const hours = Array.from({ length: 25 }, (_, hour) => hour);

type TimelineStyle = CSSProperties & {
  "--timeline-position": string;
  "--timeline-left"?: string;
  "--timeline-width"?: string;
  "--timeline-height"?: string;
};

function positionStyle(minute: number): TimelineStyle {
  return { "--timeline-position": `${(minute / 1440) * 100}%` };
}

/** Read-only Monday-to-Sunday schedule; selecting a date opens Day. */
export default function TimerWeek({
  date,
  today,
  days,
  now,
  onSelect,
}: {
  date: string;
  today: string;
  days: TimerDay[];
  now: number;
  onSelect: (date: string) => void;
}) {
  const byDate = new Map(days.map((day) => [day.date, day]));
  const dates = weekDates(date);
  return (
    <ScrollMirror>
      <div className="isolate min-w-2xl">
        <div className="border-border grid grid-cols-[3rem_repeat(7,minmax(0,1fr))] border-b pb-2">
          <span aria-hidden="true" />
          {dates.map((entry) => (
            <WeekDayHeader
              key={entry}
              date={entry}
              today={today}
              count={scheduledCalendarTasks(byDate.get(entry)).length}
              onSelect={onSelect}
            />
          ))}
        </div>
        <div className="relative mt-3 mb-4 grid h-360 grid-cols-[3rem_repeat(7,minmax(0,1fr))]">
          <div aria-hidden="true" className="relative">
            {hours.map((hour) => (
              <span
                key={hour}
                className={`${styles.hour} text-muted absolute left-0 -translate-y-1/2 text-xs tabular-nums`}
                style={positionStyle(hour * 60)}
              >
                {timelineTime(hour * 60)}
              </span>
            ))}
          </div>
          {dates.map((entry) => (
            <WeekDayColumn
              key={entry}
              date={entry}
              day={byDate.get(entry)}
              now={now}
            />
          ))}
        </div>
      </div>
    </ScrollMirror>
  );
}

function WeekDayHeader({
  date,
  today,
  count,
  onSelect,
}: {
  date: string;
  today: string;
  count: number;
  onSelect: (date: string) => void;
}) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
  }).format(new Date(`${date}T00:00:00Z`));
  return (
    <button
      type="button"
      aria-label={`${calendarDateLabel(date)}, ${count} scheduled tasks${date > today ? ", future day" : ""}`}
      aria-current={date === today ? "date" : undefined}
      onClick={() => {
        onSelect(date);
      }}
      className="focus-visible:outline-action hover:bg-interface-hover flex cursor-pointer flex-col items-center gap-0.5 rounded-md py-1 outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
    >
      <span className="text-muted text-xs">{weekday}</span>
      <span
        className={`flex size-7 items-center justify-center rounded-full text-sm tabular-nums ${date === today ? "bg-danger text-white" : "text-foreground"}`}
      >
        {Number(date.slice(8))}
      </span>
    </button>
  );
}

function WeekDayColumn({
  date,
  day,
  now,
}: {
  date: string;
  day: TimerDay | undefined;
  now: number;
}) {
  const bounds = timerDayBounds(date);
  const minute = Math.max(0, Math.min(1440, (now - bounds.start) / 60_000));
  const entries = layoutTimelineTasks(scheduledCalendarTasks(day));
  return (
    <section
      aria-label={`Schedule for ${calendarDateLabel(date)}`}
      className="border-border relative border-l"
    >
      {hours.map((hour) => (
        <div
          key={hour}
          aria-hidden="true"
          className={`${styles.hour} border-border pointer-events-none absolute inset-x-0 border-t`}
          style={positionStyle(hour * 60)}
        />
      ))}
      {entries.length === 0 ? null : (
        <ul className="contents">
          {entries.map(({ task, from, until, lane, lanes }) => {
            const { reached, missed, running, progress } = timelineCardState(
              task,
              date,
              now,
              false,
              false
            );
            const geometry: TimelineStyle = {
              "--timeline-position": `${(from / 1440) * 100}%`,
              "--timeline-height": `${((until - from) / 1440) * 100}%`,
              "--timeline-left": `${(lane / lanes) * 100}%`,
              "--timeline-width": `${100 / lanes}%`,
            };
            return (
              <li
                key={task.id}
                data-kind={taskKind(task)}
                data-running={running || undefined}
                data-completed={reached || undefined}
                data-missed={missed || undefined}
                className={`${styles.event} ${styles.kind} absolute flex gap-0.5 px-0.5 py-0.5`}
                style={geometry}
                title={`${task.activity}, ${cardTimeRange(from, until)}${progress === null ? "" : `, ${progress}`}`}
              >
                <span
                  aria-hidden="true"
                  className="bg-schedule-accent h-full w-0.5 shrink-0 rounded-full"
                />
                <span className="corner-squircle bg-schedule-surface text-schedule-foreground flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xs px-1 py-0.5 text-xs supports-[corner-shape:squircle]:rounded-md">
                  <span className="text-schedule-title truncate leading-4 font-medium">
                    {task.activity}
                  </span>
                  {until - from >= 45 ? (
                    <span className="text-schedule-foreground/60 truncate tabular-nums">
                      {cardTimeRange(from, until)}
                    </span>
                  ) : (
                    <span className="sr-only">
                      {cardTimeRange(from, until)}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {now >= bounds.start && now < bounds.end ? (
        <div
          aria-label={`Current time ${timelineTime(Math.floor(minute))} WIB`}
          className={`${styles.hour} bg-danger pointer-events-none absolute inset-x-0 z-30 h-0.5 rounded-full`}
          style={positionStyle(minute)}
        />
      ) : null}
    </section>
  );
}
