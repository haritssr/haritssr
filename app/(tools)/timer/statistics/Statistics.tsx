"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import {
  DEFAULT_HISTORY_RANGE,
  TIMER_HISTORY_RANGES,
  formatTimerTime,
  historyRange,
  shiftTimerDate,
  timerDate,
  validTimerDate,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerHistory, TimerTask } from "@/app/(tools)/timer/utils/timer";
import {
  fetchTimerHistory,
  subscribeTimerChanges,
  timerHistoryKey,
} from "@/app/(tools)/timer/utils/timerClient";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Table from "@/components/Table";

import RangeSelect from "./RangeSelect";
import TimeChart from "./TimeChart";
import WeekdayHeatmap from "./WeekdayHeatmap";

const rangeParser = parseAsStringLiteral(
  TIMER_HISTORY_RANGES.map(String)
).withDefault(String(DEFAULT_HISTORY_RANGE));

function taskStatus(task: TimerTask) {
  if (task.spent >= task.duration) {
    return "Met";
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
  const { snapshot } = useTimer("snapshot");
  const [date, setDate] = useState(() => timerDate());
  const today = snapshot?.today ?? timerDate();
  const [rangeValue, setRangeValue] = useQueryState("range", rangeParser);
  const days = historyRange(rangeValue) ?? DEFAULT_HISTORY_RANGE;
  const validDate = validTimerDate(date) && date <= today;
  const { data, error, mutate } = useSWR<TimerHistory, Error>(
    validDate ? timerHistoryKey(date, days) : null,
    async () => await fetchTimerHistory(date, days),
    {
      keepPreviousData: true,
      refreshInterval: (history) => (history?.mode === "demo" ? 0 : 60_000),
      shouldRetryOnError: false,
    }
  );

  const lastBroadcast = useRef<
    { revision: string; mode: TimerHistory["mode"] } | undefined
  >(undefined);
  useEffect(() => {
    lastBroadcast.current = undefined;
    if (!validDate) {
      return () => {
        /* No history subscription for an invalid selection. */
      };
    }
    const firstDate = shiftTimerDate(date, -(days - 1));
    try {
      return subscribeTimerChanges((next) => {
        if (next !== undefined) {
          const revision = JSON.stringify([
            date,
            next.day.date,
            next.day.revision,
            next.notifications,
            next.mode,
          ]);
          if (lastBroadcast.current?.revision === revision) {
            return;
          }
          const modeChanged = lastBroadcast.current?.mode !== next.mode;
          lastBroadcast.current = { revision, mode: next.mode };
          const affectsHistory = next.notifications.some(
            (notice) => notice.date >= firstDate && notice.date <= date
          );
          if (!modeChanged && date < next.today && !affectsHistory) {
            return;
          }
        }
        void mutate();
      });
    } catch {
      return () => {
        // Focus refresh and polling remain available if messaging fails.
      };
    }
  }, [date, days, mutate, validDate]);

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="sr-only">Review a day</span>
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
            <div className="flex flex-wrap items-center gap-3">
              <RangeSelect
                onChange={(range) => {
                  void setRangeValue(String(range));
                }}
                value={days}
              />
              <span className="text-muted text-sm">UTC+7</span>
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
          <DailySummary tasks={data.day.tasks} />
        ) : null}
      </div>
      {validDate && data !== undefined ? (
        <HistorySections history={data} loading={data.totals.length !== days} />
      ) : null}
    </div>
  );
}

function HistorySections({
  history,
  loading,
}: {
  history: TimerHistory;
  loading: boolean;
}) {
  return (
    <div className="space-y-16">
      <Section title={`Last ${history.totals.length} days`}>
        <div
          aria-busy={loading}
          className={`space-y-6 transition-opacity ${loading ? "opacity-60" : ""}`}
        >
          <TimeChart totals={history.totals} />
          {history.totals.length >= 30 ? (
            <WeekdayHeatmap totals={history.totals} />
          ) : null}
        </div>
      </Section>
      <Section
        title="Activities"
        description="Your activities for the selected day."
      >
        <ActivitiesTable tasks={history.day.tasks} />
      </Section>
    </div>
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
      <td className="px-3 py-3 align-top whitespace-nowrap">{status}</td>
    </tr>
  );
}
