import { connection } from "next/server";

import BackButton from "@/components/BackButton";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";
import { createPageMetadata } from "@/utils/pageMetadata";

import type { TaskHistoryEntry } from "../db";
import { getTaskHistory, getTasksForDate, getTodayTaskDate } from "../db";

export const metadata = createPageMetadata({
  title: "Task Statistics",
  description: "Daily task completion, time budgets, and activity trends.",
  path: "/experiments/ui-explorations/task/statistics",
});

export default async function TaskStatisticsPage() {
  await connection();
  const todayDate = getTodayTaskDate();
  getTasksForDate(todayDate);

  const history = getTaskHistory(90);
  const historyByDate = new Map(history.map((entry) => [entry.date, entry]));
  const todayHistory = historyByDate.get(todayDate);
  const recent7Days = Array.from({ length: 7 }, (_, index) => {
    const date = getDateWithOffset(todayDate, -index);
    return (
      historyByDate.get(date) ?? {
        date,
        doneCount: 0,
        totalCount: 0,
        tasks: [],
      }
    );
  });
  const recent30Days = history.slice(0, 30);

  const todayDoneCount = todayHistory?.doneCount ?? 0;
  const todayTotalCount = todayHistory?.totalCount ?? 0;
  const todayCompletionRate = getCompletionRate(
    todayDoneCount,
    todayTotalCount
  );

  const weekDoneCount = recent7Days.reduce(
    (total, day) => total + day.doneCount,
    0
  );
  const weekTotalCount = recent7Days.reduce(
    (total, day) => total + day.totalCount,
    0
  );
  const weekCompletionRate = getCompletionRate(weekDoneCount, weekTotalCount);

  const weekCompletedMinutes = recent7Days.reduce(
    (minutes, day) =>
      minutes +
      day.tasks.reduce(
        (taskMinutes, task) =>
          taskMinutes + (task.duration * task.progress) / 100,
        0
      ),
    0
  );

  const fullCompletionStreak = getCurrentFullCompletionStreak(
    history,
    todayDate
  );

  const doneCountByTaskTitle = new Map<string, number>();
  for (const day of recent30Days) {
    for (const task of day.tasks) {
      if (task.type !== "Done" && task.progress < 100) {
        continue;
      }

      const existing = doneCountByTaskTitle.get(task.title) ?? 0;
      doneCountByTaskTitle.set(task.title, existing + 1);
    }
  }

  const [mostCompletedTaskEntry] = [...doneCountByTaskTitle.entries()].toSorted(
    ([, firstTaskCount], [, secondTaskCount]) =>
      secondTaskCount - firstTaskCount
  );
  const [mostCompletedTaskTitle, mostCompletedTaskCount] =
    mostCompletedTaskEntry ?? [];

  const recent7DaysTrend = [...recent7Days].toReversed().map((day) => ({
    completionRate: getCompletionRate(day.doneCount, day.totalCount),
    date: day.date,
  }));

  const databaseTaskRows = history.flatMap((day) =>
    day.tasks.map((task, index) => ({
      ...task,
      position: index,
      taskDate: day.date,
    }))
  );
  const MAX_DATABASE_TABLE_ROWS = 200;
  const visibleDatabaseTaskRows = databaseTaskRows.slice(
    0,
    MAX_DATABASE_TABLE_ROWS
  );
  const hasHiddenDatabaseTaskRows =
    databaseTaskRows.length > visibleDatabaseTaskRows.length;

  return (
    <div className="pb-8">
      <BackButton href="/experiments/ui-explorations/task" name="Task" />
      <PageTitle>Statistic</PageTitle>
      <SubTitle>About the daily task.</SubTitle>

      <div className="space-y-20">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
          Ideas shown here: daily completion rate, 7-day completion rate,
          completed minutes, full-completion streak, top completed task, and a
          7-day trend.
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Today completion"
            subtitle={`${todayDoneCount}/${todayTotalCount} tasks done`}
            value={`${todayCompletionRate.toFixed(1)}%`}
          />
          <MetricCard
            label="7-day completion"
            subtitle={`${weekDoneCount}/${weekTotalCount} tasks done`}
            value={`${weekCompletionRate.toFixed(1)}%`}
          />
          <MetricCard
            label="7-day completed minutes"
            subtitle="Sum of duration × progress"
            value={`${weekCompletedMinutes.toFixed(1)}m`}
          />
          <MetricCard
            label="Full-completion streak"
            subtitle="Consecutive calendar days at 100%"
            value={`${fullCompletionStreak} day${fullCompletionStreak === 1 ? "" : "s"}`}
          />
          <MetricCard
            label="Top completed task (30 days)"
            subtitle={
              mostCompletedTaskCount
                ? `${mostCompletedTaskCount} completions`
                : "No completed tasks yet"
            }
            value={mostCompletedTaskTitle ?? "-"}
          />
        </div>

        <section className="rounded-xl border border-zinc-200 p-3">
          <h2 className="font-medium text-zinc-800">7-day completion trend</h2>
          {recent7DaysTrend.length === 0 ? (
            <div className="mt-2 text-sm text-zinc-500">No data yet.</div>
          ) : (
            <div className="mt-3 grid grid-cols-7 gap-2">
              {recent7DaysTrend.map((day) => {
                const barHeight =
                  day.completionRate <= 0 ? 0 : Math.max(day.completionRate, 4);

                return (
                  <div
                    className="flex flex-col items-center gap-1"
                    key={day.date}
                  >
                    <div className="relative h-24 w-6 rounded-full bg-zinc-100">
                      <div
                        className="absolute bottom-0 w-full rounded-full bg-blue-500"
                        style={{ height: `${barHeight}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-zinc-500">
                      {day.date.slice(5)}
                    </span>
                    <span className="text-[11px] text-zinc-600">
                      {day.completionRate.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-zinc-200 p-3">
          <h2 className="font-medium text-zinc-800">
            Database table: daily_tasks
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Uses the task shape from
            app/experiments/ui-explorations/task/data.ts: title, duration,
            progress, and type.
          </p>
          {visibleDatabaseTaskRows.length === 0 ? (
            <div className="mt-2 text-sm text-zinc-500">
              No database rows yet.
            </div>
          ) : (
            <div className="scrollbar-subtle mt-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 text-left text-sm text-zinc-700">
                <caption className="sr-only">Task database records</caption>
                <thead className="bg-zinc-50 text-xs text-zinc-500 uppercase">
                  <tr>
                    <th scope="col" className="px-2 py-1.5">
                      task_date
                    </th>
                    <th scope="col" className="px-2 py-1.5">
                      title
                    </th>
                    <th scope="col" className="px-2 py-1.5">
                      duration
                    </th>
                    <th scope="col" className="px-2 py-1.5">
                      progress
                    </th>
                    <th scope="col" className="px-2 py-1.5">
                      type
                    </th>
                    <th scope="col" className="px-2 py-1.5">
                      position
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {visibleDatabaseTaskRows.map((row) => (
                    <tr key={`${row.taskDate}-${row.title}-${row.position}`}>
                      <td className="px-2 py-1.5">{row.taskDate}</td>
                      <td className="px-2 py-1.5">{row.title}</td>
                      <td className="px-2 py-1.5">{row.duration}</td>
                      <td className="px-2 py-1.5">
                        {row.progress.toFixed(1)}%
                      </td>
                      <td className="px-2 py-1.5">{row.type}</td>
                      <td className="px-2 py-1.5">{row.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {hasHiddenDatabaseTaskRows ? (
            <div className="mt-2 text-xs text-zinc-500">
              Showing first {MAX_DATABASE_TABLE_ROWS} of{" "}
              {databaseTaskRows.length} rows.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function getCompletionRate(doneCount: number, totalCount: number) {
  if (totalCount === 0) {
    return 0;
  }

  return (doneCount / totalCount) * 100;
}

function getPreviousDate(dateString: string) {
  return getDateWithOffset(dateString, -1);
}

function getDateWithOffset(dateString: string, offsetDays: number) {
  const [year, month, day] = dateString.split("-").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  utcDate.setUTCDate(utcDate.getUTCDate() + offsetDays);

  const nextYear = utcDate.getUTCFullYear();
  const nextMonth = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(utcDate.getUTCDate()).padStart(2, "0");
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

function getCurrentFullCompletionStreak(
  history: TaskHistoryEntry[],
  todayDate: string
) {
  const historyByDate = new Map(history.map((entry) => [entry.date, entry]));
  let streak = 0;
  let cursorDate = todayDate;

  for (;;) {
    const day = historyByDate.get(cursorDate);
    if (!day || day.totalCount === 0 || day.doneCount < day.totalCount) {
      break;
    }

    streak += 1;
    cursorDate = getPreviousDate(cursorDate);
  }

  return streak;
}

function MetricCard(props: { label: string; subtitle: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 p-3">
      <div className="text-sm text-zinc-500">{props.label}</div>
      <div className="mt-1 text-2xl font-semibold text-zinc-800">
        {props.value}
      </div>
      <div className="mt-1 text-xs text-zinc-500">{props.subtitle}</div>
    </div>
  );
}
