"use client";

import { useState } from "react";
import useSWR from "swr";

import Button from "@/components/Button";
import Section from "@/components/Section";
import { fetchTimer, useTimer } from "@/components/TimerProvider";
import { formatTimerTime, timerDate, validTimerDate } from "@/utils/timer";
import type { TimerHistory, TimerTask } from "@/utils/timer";

async function fetchHistory(url: string) {
  const { historySchema } = await import("@/utils/timerValidation");
  return historySchema.parse(await fetchTimer(url));
}

function taskStatus(task: TimerTask) {
  if (task.spent >= task.duration) {
    return "Reached";
  }
  if (task.startedAt !== null) {
    return "Running";
  }
  return task.spent > 0 ? "Paused" : "Not started";
}

export default function Statistics() {
  const { snapshot } = useTimer();
  const [date, setDate] = useState(() => timerDate());
  const today = snapshot?.today ?? timerDate();
  const { data, error, mutate } = useSWR<TimerHistory, Error>(
    validTimerDate(date) && date <= today ? `/api/timer?date=${date}` : null,
    fetchHistory,
    { refreshInterval: date === today ? 15_000 : 0, shouldRetryOnError: false }
  );

  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <label className="flex flex-wrap items-center gap-3 text-sm">
          <span>
            Date <span className="text-muted">(Jakarta time)</span>
          </span>
          <input
            className="form-control border-border bg-background focus-visible:outline-action min-w-0 rounded-lg border px-3 py-2 focus-visible:outline-2"
            max={today}
            onChange={(event) => {
              setDate(event.target.value);
            }}
            type="date"
            value={date}
          />
        </label>
        {data?.mode === "demo" ? (
          <p className="text-muted text-sm">
            Sample preview. Personal timer history is available only when
            running locally.
          </p>
        ) : null}
        {error === undefined ? null : (
          <div
            className="text-danger flex flex-wrap items-center gap-3"
            role="alert"
          >
            <p>
              {error instanceof Error
                ? error.message
                : "History could not be loaded."}
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                void mutate();
              }}
            >
              Try again
            </Button>
          </div>
        )}
        {date.length > 0 && (!validTimerDate(date) || date > today) ? (
          <p className="text-danger text-sm" role="alert">
            Choose today or an earlier valid date.
          </p>
        ) : null}
      </div>
      {data === undefined ? (
        <output className="text-muted block">
          {date.length === 0
            ? "Choose a date to view its activities."
            : "Loading activities…"}
        </output>
      ) : (
        <>
          <Section
            title="Time spent"
            description="Daily totals across all activities for the 30 days ending on your selected date."
          >
            <TimeChart totals={data.totals} />
          </Section>
          <Section
            title="Activities"
            description={`${data.day.date} · All time values are hours:minutes:seconds.`}
          >
            {data.day.tasks.length === 0 ? (
              <p className="text-muted">
                No activities were recorded on this day.
              </p>
            ) : (
              <ul className="border-border divide-border divide-y rounded-xl border px-4">
                {data.day.tasks.map((task) => (
                  <li
                    className="flex flex-wrap items-start justify-between gap-5 py-5"
                    key={task.id}
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-medium wrap-anywhere">
                        {task.activity}
                      </p>
                      <p className="text-muted text-sm wrap-anywhere whitespace-pre-wrap">
                        {task.description || "No description."}
                      </p>
                    </div>
                    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm tabular-nums">
                      <div>
                        <dt className="text-muted">Duration</dt>
                        <dd>{formatTimerTime(task.duration)}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Spent</dt>
                        <dd>{formatTimerTime(task.spent)}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Status</dt>
                        <dd>{taskStatus(task)}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </>
      )}
    </div>
  );
}

function TimeChart({ totals }: { totals: TimerHistory["totals"] }) {
  const width = 960;
  const height = 300;
  const left = 60;
  const right = width - 20;
  const top = 20;
  const bottom = height - 60;
  const step = (right - left) / 30;
  const maximum = Math.max(
    1,
    Math.ceil(Math.max(...totals.map((day) => day.spent / 3600)))
  );
  const y = (hours: number) => bottom - (hours / maximum) * (bottom - top);
  const total = totals.reduce((sum, day) => sum + day.spent, 0);

  return (
    <figure className="border-border space-y-4 rounded-xl border p-4">
      <figcaption className="flex flex-wrap justify-between gap-2 text-sm">
        <span>
          {totals[0].date} – {totals.at(-1)?.date}
        </span>
        <span className="text-muted">Total: {formatTimerTime(total)}</span>
      </figcaption>
      <div
        className="overflow-x-auto"
        aria-label="Time spent chart; scroll horizontally on smaller screens"
      >
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- SVG needs image semantics for its axes and bars. */}
        <svg
          aria-label="Daily time spent over 30 days"
          className="w-full min-w-160 font-sans text-xs tabular-nums"
          role="img"
          viewBox={`0 0 ${width} ${height}`}
        >
          <title>Daily time spent over 30 days</title>
          <desc>
            {totals
              .map((day) => `${day.date}: ${formatTimerTime(day.spent)}`)
              .join("; ")}
          </desc>
          {Array.from({ length: 5 }, (_, index) => {
            const hours = (maximum * index) / 4;
            return (
              <g key={index}>
                <line
                  className="stroke-border"
                  x1={left}
                  x2={right}
                  y1={y(hours)}
                  y2={y(hours)}
                />
                <text
                  className="text-muted fill-current"
                  dominantBaseline="middle"
                  textAnchor="end"
                  x={left - 10}
                  y={y(hours)}
                >
                  {Number(hours.toFixed(2))}h
                </text>
              </g>
            );
          })}
          {totals.map((day, index) => (
            <g key={day.date}>
              <rect
                className="fill-action"
                height={Math.max(0, bottom - y(day.spent / 3600))}
                rx={3}
                width={step * 0.65}
                x={left + index * step + step * 0.175}
                y={y(day.spent / 3600)}
              >
                <title>
                  {day.date}: {formatTimerTime(day.spent)}
                </title>
              </rect>
              <text
                className="text-muted fill-current"
                textAnchor="middle"
                x={left + index * step + step / 2}
                y={bottom + 22}
              >
                {Number(day.date.slice(-2))}
              </text>
            </g>
          ))}
          <text
            className="text-muted fill-current"
            textAnchor="middle"
            x={(left + right) / 2}
            y={height - 8}
          >
            Day of month · Jakarta time (WIB)
          </text>
        </svg>
        {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
      </div>
    </figure>
  );
}
