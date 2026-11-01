import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import {
  canUseTimer,
  formatTimerTime,
  taskCompletionTime,
  taskSpent,
  taskWindowEnd,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import Table from "@/components/Table";

import { useTimer } from "./TimerProvider";

export default function CompletedTasksTable({
  tasks,
  date,
  now,
}: {
  tasks: TimerTask[];
  date: string;
  now: number;
}) {
  const { act, snapshot } = useTimer("act", "snapshot");
  const rows = tasks
    .map((task) => {
      const spent = taskSpent(task, date, now);
      let reachedTime = task.startedAt === null ? 0 : taskCompletionTime(task);
      if (task.reachedAt !== null) {
        reachedTime = Date.parse(task.reachedAt);
      }
      const reached = spent >= task.duration;
      const closed =
        (task.availabilityWindow ?? null) !== null &&
        now >= taskWindowEnd(task, date);
      const missed = !reached && task.reachedAt === null && closed;
      let status = "Done";
      if (reached) {
        status = "Met";
      } else if (missed) {
        status = "Missed";
      }
      if (missed) {
        reachedTime = taskWindowEnd(task, date);
      }
      return {
        task,
        spent,
        percentage: Math.min(100, (spent / task.duration) * 100),
        reached,
        missed,
        closed,
        status,
        reachedTime,
      };
    })
    .toSorted((first, second) => second.reachedTime - first.reachedTime);
  return (
    <div className="min-w-0 space-y-3">
      <ul
        className="space-y-3 lg:hidden"
        aria-label="Completed and missed tasks"
      >
        {rows.map(
          ({ task, spent, percentage, reached, missed, closed, status }) => (
            <li key={task.id} className="border-border rounded-xl border p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium wrap-anywhere">{task.activity}</p>
                {!reached && !missed && !closed && (
                  <button
                    type="button"
                    aria-label={`Restore ${task.activity} to active tasks`}
                    title="Restore task"
                    disabled={!canUseTimer(snapshot)}
                    className="text-muted hover:text-foreground focus-visible:outline-action inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 disabled:opacity-50"
                    onClick={() => {
                      void act({ action: "restore", date, taskId: task.id });
                    }}
                  >
                    <ArrowUturnLeftIcon aria-hidden="true" className="size-4" />
                  </button>
                )}
              </div>
              <p className="text-muted mt-1 text-sm wrap-anywhere whitespace-pre-wrap">
                {task.description.trim() ? task.description : "-"}
              </p>
              <dl className="text-muted mt-3 grid grid-cols-2 gap-2 text-sm tabular-nums">
                <div>
                  <dt>Spent</dt>
                  <dd className="text-foreground">{formatTimerTime(spent)}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd className="text-foreground">
                    {formatTimerTime(task.duration)}
                  </dd>
                </div>
                <div>
                  <dt>Progress</dt>
                  <dd className="text-foreground">
                    {percentage >= 100 ? "100" : percentage.toFixed(0)}%
                  </dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd className="text-foreground">{status}</dd>
                </div>
              </dl>
            </li>
          )
        )}
      </ul>
      <div className="hidden lg:block">
        <Table>
          <caption className="sr-only">
            Completed and missed tasks with descriptions, time spent, total
            duration, progress, and status
          </caption>
          <thead>
            <tr className="divide-border bg-foreground/5 text-muted divide-x [&>th]:px-3 [&>th]:text-left [&>th]:font-medium lg:group-data-list-view/task-layout:[&>th]:px-2 lg:group-data-list-view/task-layout:[&>th]:py-1.75">
              <th
                scope="col"
                className="w-10 text-center lg:group-data-list-view/task-layout:w-auto"
              >
                No
              </th>
              <th scope="col" className="w-px whitespace-nowrap">
                Name
              </th>
              <th scope="col" aria-label="Description">
                <span className="lg:group-data-list-view/task-layout:hidden">
                  Description
                </span>
                <span className="hidden lg:group-data-list-view/task-layout:inline">
                  Desc
                </span>
              </th>
              <th scope="col" className="w-px whitespace-nowrap">
                Spent
              </th>
              <th
                scope="col"
                aria-label="Duration"
                className="w-px whitespace-nowrap"
              >
                <span className="lg:group-data-list-view/task-layout:hidden">
                  Duration
                </span>
                <span className="hidden lg:group-data-list-view/task-layout:inline">
                  Dur
                </span>
              </th>
              <th scope="col" className="w-px whitespace-nowrap">
                %
              </th>
              <th scope="col" className="w-px whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {rows.map(
              (
                { task, spent, percentage, reached, missed, closed, status },
                index
              ) => (
                <tr
                  key={task.id}
                  className="divide-border text-muted divide-x align-top [&>td]:px-3 [&>td]:py-2 lg:group-data-list-view/task-layout:[&>td]:px-2 lg:group-data-list-view/task-layout:[&>td]:py-1.75"
                >
                  <td className="text-center tabular-nums">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-3 py-2 text-left font-normal whitespace-nowrap"
                  >
                    {task.activity}
                  </th>
                  <td className="wrap-anywhere whitespace-pre-wrap">
                    <div>
                      {task.description.trim() ? (
                        task.description
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap tabular-nums">
                    {formatTimerTime(spent)}
                  </td>
                  <td className="whitespace-nowrap tabular-nums">
                    {formatTimerTime(task.duration)}
                  </td>
                  <td className="tabular-nums">
                    {percentage >= 100 ? "100" : percentage.toFixed(0)}
                    <span className="lg:group-data-list-view/task-layout:sr-only">
                      %
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center justify-between gap-2">
                      <span>{status}</span>
                      {!reached && !missed && !closed && (
                        <button
                          aria-label={`Restore ${task.activity} to active tasks`}
                          className="text-muted hover:text-foreground focus-visible:outline-action inline-flex size-5 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={!canUseTimer(snapshot)}
                          onClick={() => {
                            void act({
                              action: "restore",
                              date,
                              taskId: task.id,
                            });
                          }}
                          title="Restore task"
                          type="button"
                        >
                          <ArrowUturnLeftIcon
                            aria-hidden="true"
                            className="size-4"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
