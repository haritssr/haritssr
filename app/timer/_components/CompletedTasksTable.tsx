import { Collapsible } from "@base-ui/react/collapsible";
import { useState } from "react";

import {
  formatTimerTime,
  taskCompletionTime,
  taskSpent,
} from "@/app/timer/utils/timer";
import type { TimerTask } from "@/app/timer/utils/timer";
import { SectionHeading } from "@/components/Section";
import { SelectField } from "@/components/SelectField";
import Table from "@/components/Table";

const SORT_OPTIONS = [
  { value: "reached", label: "Reached" },
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
    { value: "desc", label: "Reached first" },
    { value: "asc", label: "Done first" },
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
  const [open, setOpen] = useState(false);
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
      return {
        task,
        spent,
        percentage: Math.min(100, (spent / task.duration) * 100),
        reached: spent >= task.duration,
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
          (Number(second.reached) - Number(first.reached)) * direction ||
          timeOrder
        );
      }
      return timeOrder * direction;
    });
  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      render={<section aria-label="History" />}
      className="space-y-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        <SectionHeading as="h3" variant="toolbar">
          History
        </SectionHeading>
        <Collapsible.Trigger className="text-muted hover:text-foreground focus-visible:outline-action cursor-pointer rounded-sm text-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2">
          {open ? "Hide" : "View"}
        </Collapsible.Trigger>
        <div className="ml-auto flex flex-wrap items-center gap-4">
          {open ? (
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
        <Table className="min-w-190">
          <caption className="sr-only">
            Completed tasks with descriptions, time spent, total duration,
            progress, and status
          </caption>
          <thead>
            <tr className="divide-border bg-foreground/5 text-muted divide-x [&>th]:px-3 [&>th]:text-left [&>th]:font-medium">
              <th scope="col" className="w-12 text-center">
                No.
              </th>
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Spent</th>
              <th scope="col">Duration</th>
              <th scope="col">%</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {rows.map(({ task, spent, percentage, reached }, index) => (
              <tr
                key={task.id}
                className="divide-border text-muted divide-x align-top [&>td]:px-3 [&>td]:py-3"
              >
                <td className="text-center tabular-nums">{index + 1}</td>
                <th
                  scope="row"
                  className="text-foreground max-w-64 min-w-40 px-3 py-3 text-left font-medium wrap-anywhere"
                >
                  {task.activity}
                </th>
                <td className="max-w-80 min-w-48 wrap-anywhere whitespace-pre-wrap">
                  {task.description.trim() ? task.description : <span>—</span>}
                </td>
                <td className="whitespace-nowrap tabular-nums">
                  {formatTimerTime(spent)}
                </td>
                <td className="whitespace-nowrap tabular-nums">
                  {formatTimerTime(task.duration)}
                </td>
                <td className="tabular-nums">
                  {percentage >= 100 ? "100" : percentage.toFixed(0)}%
                </td>
                <td className="whitespace-nowrap">
                  {reached ? "Reached" : "Done"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
