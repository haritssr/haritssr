import { Collapsible } from "@base-ui/react/collapsible";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  canUseTimer,
  formatTimerTime,
  taskCompletionTime,
  taskSpent,
  taskWindowEnd,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import { SectionHeading } from "@/components/Section";
import { SelectField } from "@/components/SelectField";
import Table from "@/components/Table";

import { useTimer } from "./TimerProvider";

const SORT_OPTIONS = [
  { value: "reached", label: "Date" },
  { value: "percentage", label: "Percentage" },
  { value: "status", label: "Status" },
  { value: "spent", label: "Spent" },
];

const ORDER_OPTIONS = {
  reached: [
    { value: "desc", label: "Newest" },
    { value: "asc", label: "Oldest" },
  ],
  percentage: [
    { value: "desc", label: "Highest first" },
    { value: "asc", label: "Lowest first" },
  ],
  status: [
    { value: "desc", label: "Met first" },
    { value: "asc", label: "Missed first" },
  ],
  spent: [
    { value: "desc", label: "Longest first" },
    { value: "asc", label: "Shortest first" },
  ],
};

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
  const [showHistory, setShowHistory] = useState(false);
  const [sort, setSort] = useState<keyof typeof ORDER_OPTIONS>("reached");
  const [order, setOrder] = useState("desc");
  const orderOptions = ORDER_OPTIONS[sort];
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
        statusOrder: reached ? 2 : Number(!missed),
        reachedTime,
      };
    })
    .toSorted((first, second) => {
      const timeOrder = second.reachedTime - first.reachedTime;
      const direction = order === "desc" ? 1 : -1;
      if (sort === "percentage") {
        return (second.percentage - first.percentage) * direction || timeOrder;
      }
      if (sort === "spent") {
        return (second.spent - first.spent) * direction || timeOrder;
      }
      if (sort === "status") {
        return (
          (second.statusOrder - first.statusOrder) * direction || timeOrder
        );
      }
      return timeOrder * direction;
    });
  return (
    <Collapsible.Root
      open={showHistory}
      onOpenChange={setShowHistory}
      render={<section aria-label="History" />}
      className="space-y-3 lg:group-data-desktop-list-view/task-layout:space-y-1.5"
    >
      <div className="flex flex-wrap items-start gap-1.5">
        <SectionHeading as="h3" variant="toolbar">
          History
        </SectionHeading>
        <Collapsible.Trigger className="text-muted hover:text-foreground focus-visible:outline-action cursor-pointer rounded-sm text-base underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2">
          {showHistory ? "Hide" : "Show"}
        </Collapsible.Trigger>
        <span className="text-muted tabular-nums">
          ({rows.length})<span className="sr-only"> tasks in history</span>
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-4">
          {showHistory ? (
            <>
              <div className="[&>div>label]:sr-only">
                <SelectField
                  label="Sort by"
                  options={SORT_OPTIONS}
                  variant="plain"
                  value={sort}
                  onValueChange={(value) => {
                    if (
                      value === "reached" ||
                      value === "percentage" ||
                      value === "status" ||
                      value === "spent"
                    ) {
                      setSort(value);
                    }
                  }}
                />
              </div>
              <div className="[&>div>label]:sr-only">
                <SelectField
                  label="Order"
                  options={orderOptions}
                  variant="plain"
                  value={order}
                  onValueChange={setOrder}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Collapsible.Panel>
        <Table className="min-w-190 lg:group-data-desktop-list-view/task-layout:w-max lg:group-data-desktop-list-view/task-layout:min-w-full">
          <caption className="sr-only">
            Completed and missed tasks with descriptions, time spent, total
            duration, progress, and status
          </caption>
          <thead>
            <tr className="divide-border bg-foreground/5 text-muted divide-x [&>th]:px-3 [&>th]:text-left [&>th]:font-medium lg:group-data-desktop-list-view/task-layout:[&>th]:px-2 lg:group-data-desktop-list-view/task-layout:[&>th]:py-1.75">
              <th
                scope="col"
                className="w-10 text-center lg:group-data-desktop-list-view/task-layout:w-auto"
              >
                No
              </th>
              <th scope="col">Name</th>
              <th scope="col" aria-label="Description">
                <span className="lg:group-data-desktop-list-view/task-layout:hidden">
                  Description
                </span>
                <span className="hidden lg:group-data-desktop-list-view/task-layout:inline">
                  Desc
                </span>
              </th>
              <th scope="col">Spent</th>
              <th scope="col">Duration</th>
              <th scope="col">%</th>
              <th scope="col">Status</th>
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
                  className="divide-border text-muted divide-x align-top [&>td]:px-3 [&>td]:py-2 lg:group-data-desktop-list-view/task-layout:[&>td]:px-2 lg:group-data-desktop-list-view/task-layout:[&>td]:py-1.75"
                >
                  <td className="text-center tabular-nums">{index + 1}</td>
                  <th
                    scope="row"
                    className="max-w-64 min-w-40 px-3 py-2 text-left font-normal wrap-anywhere lg:group-data-desktop-list-view/task-layout:min-w-0 lg:group-data-desktop-list-view/task-layout:px-2 lg:group-data-desktop-list-view/task-layout:py-1.75"
                  >
                    {task.activity}
                  </th>
                  <td className="max-w-80 min-w-48 wrap-anywhere whitespace-pre-wrap lg:group-data-desktop-list-view/task-layout:min-w-0">
                    <div className="scrollbar-subtle lg:group-data-desktop-list-view/task-layout:max-w-48 lg:group-data-desktop-list-view/task-layout:overflow-x-auto lg:group-data-desktop-list-view/task-layout:whitespace-pre">
                      {task.description.trim() ? (
                        task.description
                      ) : (
                        <span>—</span>
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
                    <span className="lg:group-data-desktop-list-view/task-layout:sr-only">
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
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
