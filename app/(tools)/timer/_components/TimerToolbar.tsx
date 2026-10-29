import { Tooltip } from "@base-ui/react/tooltip";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";

import { AddTask } from "./TaskDialog";
import { getTaskCounts } from "./taskState";
import { TimerSettingsTrigger } from "./TimerSettings";

const TASK_COUNT_STATES = [
  {
    key: "running",
    label: "Running",
    color: "bg-timer-running",
    textColor: "text-timer-running",
  },
  {
    key: "notRunning",
    label: "Not running",
    color: "bg-foreground",
    textColor: "text-foreground",
  },
] as const;

type TaskCountKey = (typeof TASK_COUNT_STATES)[number]["key"];

export default function TimerToolbar({
  backupActions,
}: {
  backupActions: ReactNode;
}) {
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const timestamp = useTimerClock(snapshot, clockOffset);
  const counts =
    snapshot === undefined
      ? { running: 0, paused: 0, ready: 0 }
      : getTaskCounts(snapshot.day.tasks, snapshot.today, timestamp);
  const taskCounts = {
    running: counts.running,
    notRunning: counts.paused + counts.ready,
  };
  return (
    <div className="border-border flex w-full flex-wrap items-end gap-2 border-b border-dashed pb-4 sm:gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-3">
        <AddTask disabled={!canUseTimer(snapshot)} />
        {backupActions}
        <TimerSettingsTrigger
          aria-label="Settings"
          size="icon-toolbar"
          variant="outline"
        >
          <Cog6ToothIcon aria-hidden="true" className="size-4.5 stroke-2" />
          <span className="hidden lg:inline">Settings</span>
        </TimerSettingsTrigger>
      </div>
      {snapshot === undefined ? null : <TaskCounts counts={taskCounts} />}
    </div>
  );
}

function TaskCounts({ counts }: { counts: Record<TaskCountKey, number> }) {
  const id = useId();
  const [active, setActive] = useState<TaskCountKey | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    },
    []
  );

  function showCount(key: TaskCountKey) {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
    setActive(key);
    timeout.current = setTimeout(() => {
      setActive(null);
      timeout.current = null;
    }, 2000);
  }

  return (
    <ul
      aria-label="Task counts"
      className="border-border bg-interface-hover text-muted max-sm:corner-squircle ml-auto flex h-8.5 shrink-0 items-center rounded-md border px-1 text-sm tabular-nums max-sm:supports-[corner-shape:squircle]:rounded-xl sm:h-auto sm:gap-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-base"
    >
      {TASK_COUNT_STATES.map(({ key, label, color, textColor }, index) => (
        <li key={key} className="flex items-center">
          {index === 0 ? null : (
            <span aria-hidden="true" className="px-0.5 sm:hidden">
              ·
            </span>
          )}
          <Tooltip.Root open={active === key} triggerId={`${id}-${key}`}>
            <Tooltip.Trigger
              id={`${id}-${key}`}
              aria-label={`${label}: ${counts[key]}`}
              closeOnClick={false}
              onClick={() => {
                showCount(key);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setActive(null);
                }
              }}
              className={`${textColor} focus-visible:outline-action min-h-8 min-w-4 cursor-pointer rounded-sm px-0.5 font-medium outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 sm:hidden`}
            >
              {counts[key]}
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner
                side="top"
                align="center"
                sideOffset={8}
                positionMethod="fixed"
                className="pointer-events-none z-100 sm:hidden"
              >
                <Tooltip.Popup className="bg-foreground text-background rounded-md px-2.5 py-1.5 text-sm shadow-xl">
                  {label}: {counts[key]}
                  <Tooltip.Arrow className="data-[side=bottom]:bottom-full data-[side=bottom]:rotate-180 data-[side=top]:top-full">
                    <svg
                      aria-hidden="true"
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      className="fill-foreground"
                    >
                      <path d="M0 0h10L5 5Z" />
                    </svg>
                  </Tooltip.Arrow>
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <span title={label} className="hidden items-center gap-1.5 sm:flex">
            <span
              aria-hidden="true"
              className={`${color} size-2 shrink-0 rounded-full`}
            />
            <span>
              <span className="sr-only">{label}: </span>
              {counts[key]}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
