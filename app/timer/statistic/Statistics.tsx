"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { useTimer } from "@/app/timer/_components/TimerProvider";
import {
  formatTimerTime,
  timerDate,
  validTimerDate,
} from "@/app/timer/utils/timer";
import type { TimerHistory, TimerTask } from "@/app/timer/utils/timer";
import {
  fetchTimerHistory,
  subscribeTimerChanges,
  timerHistoryKey,
} from "@/app/timer/utils/timerClient";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Table from "@/components/Table";

function taskStatus(task: TimerTask) {
  if (task.spent >= task.duration) {
    return "Reached";
  }
  if (task.reachedAt !== null) {
    return "Done";
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
  const validDate = validTimerDate(date) && date <= today;
  const { data, error, mutate } = useSWR<TimerHistory, Error>(
    validDate ? timerHistoryKey(date) : null,
    async () => await fetchTimerHistory(date),
    {
      refreshInterval: (history) => (history?.mode === "demo" ? 0 : 60_000),
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    try {
      return subscribeTimerChanges(() => {
        void mutate();
      });
    } catch {
      return () => {
        // Focus refresh and polling remain available if messaging fails.
      };
    }
  }, [mutate]);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="border-border flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <label className="flex flex-col gap-2 text-sm">
            <span>Review a day</span>
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
          <div className="flex items-center gap-3">
            <span className="text-muted text-sm">Jakarta time · WIB</span>
            <Button
              variant="secondary"
              disabled={date === today}
              onClick={() => {
                setDate(today);
              }}
            >
              Today
            </Button>
          </div>
        </div>
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
        {date.length > 0 && !validDate ? (
          <p className="text-danger text-sm" role="alert">
            Choose today or an earlier valid date.
          </p>
        ) : null}
      </div>
      {validDate && error === undefined && data === undefined ? (
        <output className="text-muted block">Loading activities…</output>
      ) : null}
      {date.length === 0 ? (
        <output className="text-muted block">
          Choose a date to view its activities.
        </output>
      ) : null}
      {validDate && data !== undefined ? (
        <HistorySections history={data} />
      ) : null}
    </div>
  );
}

function HistorySections({ history }: { history: TimerHistory }) {
  return (
    <>
      <DailySummary tasks={history.day.tasks} />
      <Section
        title="Last 30 days"
        description="Daily totals across all activities for the 30 days ending on your selected date."
      >
        <TimeChart totals={history.totals} />
      </Section>
      <Section
        title="Activities"
        description="Your activities for the selected day. Times are hours:minutes:seconds."
      >
        <ActivitiesTable tasks={history.day.tasks} />
      </Section>
    </>
  );
}

function DailySummary({ tasks }: { tasks: TimerTask[] }) {
  const spent = tasks.reduce((sum, task) => sum + task.spent, 0);
  const budget = tasks.reduce((sum, task) => sum + task.duration, 0);
  const reached = tasks.filter(
    (task) => task.reachedAt !== null || task.spent >= task.duration
  ).length;
  const metrics = [
    { label: "Time spent", value: formatTimerTime(spent) },
    { label: "Time budget", value: formatTimerTime(budget) },
    { label: "Activities", value: String(tasks.length) },
    { label: "Completed", value: `${reached} of ${tasks.length}` },
  ];
  return (
    <dl
      aria-label="Selected day summary"
      className="border-border grid grid-cols-2 gap-x-6 gap-y-6 rounded-xl border p-5 sm:grid-cols-4 sm:p-6"
    >
      {metrics.map(({ label, value }) => (
        <div key={label} className="space-y-2">
          <dt className="text-muted text-sm">{label}</dt>
          <dd className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ActivitiesTable({ tasks }: { tasks: TimerTask[] }) {
  if (tasks.length === 0) {
    return (
      <p className="text-muted">No activities were recorded on this day.</p>
    );
  }

  return (
    <Table className="min-w-160 whitespace-nowrap">
      <caption className="sr-only">Activities for the selected day</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          {[
            "No.",
            "Activity",
            "Description",
            "Duration",
            "Spent",
            "Status",
          ].map((heading) => (
            <th
              className="px-3 text-left font-medium whitespace-nowrap"
              key={heading}
              scope="col"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {tasks.map((task, index) => (
          <ActivityRow key={task.id} task={task} number={index + 1} />
        ))}
      </tbody>
    </Table>
  );
}

function ActivityRow({ task, number }: { task: TimerTask; number: number }) {
  const status = taskStatus(task);
  const statusColor = {
    Running: "text-danger",
    Paused: "text-attention",
    "Not started": "text-success",
    Reached: "text-muted",
    Done: "text-muted",
  }[status];

  return (
    <tr className="divide-border divide-x">
      <td className="text-muted w-12 px-3 py-3 align-top tabular-nums">
        {number}
      </td>
      <th className="px-3 py-3 text-left align-top font-medium" scope="row">
        {task.activity}
      </th>
      <td className="text-muted min-w-56 px-3 py-3 align-top">
        {task.description || "No description."}
      </td>
      <td className="px-3 py-3 align-top whitespace-nowrap tabular-nums">
        {formatTimerTime(task.duration)}
      </td>
      <td className="px-3 py-3 align-top whitespace-nowrap tabular-nums">
        {formatTimerTime(task.spent)}
      </td>
      <td className={`px-3 py-3 align-top whitespace-nowrap ${statusColor}`}>
        <span className="bg-foreground/5 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-current"
          />
          {status}
        </span>
      </td>
    </tr>
  );
}

function TimeChart({ totals }: { totals: TimerHistory["totals"] }) {
  const width = 960;
  const height = 300;
  const left = 60;
  const right = width - 20;
  const top = 20;
  const bottom = height - 60;
  const step = (right - left) / Math.max(1, totals.length);
  const maximum = Math.max(
    1,
    Math.ceil(Math.max(...totals.map((day) => day.spent / 3600)))
  );
  const y = (hours: number) => bottom - (hours / maximum) * (bottom - top);
  const total = totals.reduce((sum, day) => sum + day.spent, 0);

  return (
    <figure className="border-border space-y-4 rounded-xl border p-4 sm:p-6">
      <figcaption className="flex flex-wrap justify-between gap-2 text-sm">
        <span>
          {totals[0]?.date} – {totals.at(-1)?.date}
        </span>
        <span className="text-muted">
          30-day total{" "}
          <span className="text-foreground ml-2 font-medium tabular-nums">
            {formatTimerTime(total)}
          </span>
        </span>
      </figcaption>
      <div
        className="scrollbar-subtle overflow-x-auto"
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
                  strokeDasharray="3 5"
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
                className={
                  index === totals.length - 1
                    ? "fill-action"
                    : "fill-foreground/20 hover:fill-foreground/40"
                }
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
