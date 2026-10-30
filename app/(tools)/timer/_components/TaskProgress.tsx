import { ClockIcon } from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

import { formatTimerTime } from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import { formatRemainingTime } from "@/components/floating/formatRemainingTime";

import { TASK_LAYOUT } from "./taskPresentation";
import type { TaskAppearance } from "./taskPresentation";

export default function TaskProgress({
  task,
  spent,
  running,
  appearance,
  compact = false,
  showTitleIcon = true,
  timeDisplay = "spent-and-duration",
  timeNote,
  title,
}: {
  task: TimerTask;
  spent: number;
  running: boolean;
  appearance: TaskAppearance;
  compact?: boolean;
  showTitleIcon?: boolean;
  timeDisplay?: "spent-and-duration" | "spent";
  timeNote?: string;
  title?: string;
}) {
  const stackClass = compact
    ? "@container flex flex-col gap-1.5"
    : "flex flex-col gap-1 sm:group-data-list-view/task-list:timer-list-progress-gap";
  const percentage = Math.min(100, (spent / task.duration) * 100);
  const percentageLabel = percentage.toFixed(0);
  const progressStyle: CSSProperties & {
    "--timer-progress-fill": string;
    "--timer-progress-track": string;
  } = {
    "--timer-progress-fill": appearance.progress,
    "--timer-progress-track": "var(--color-slider-track-hover)",
  };
  return (
    <div className={stackClass}>
      <div
        className={`tabular-nums ${compact ? `flex min-w-0 items-center justify-between gap-2 text-sm leading-4` : `${TASK_LAYOUT.time} sm:group-data-list-view/task-list:text-xs`}`}
      >
        {title === undefined ? null : (
          <span className="flex min-w-0 flex-1 items-center gap-1 text-sm leading-4 font-medium normal-nums">
            {showTitleIcon ? (
              <ClockIcon aria-hidden="true" className="size-4 shrink-0" />
            ) : null}
            <span className="truncate">{title}</span>
          </span>
        )}
        <span className="flex shrink-0 items-baseline gap-0.5">
          <span
            className={`shrink-0 font-medium ${title === undefined ? appearance.elapsed : "text-muted"}`}
          >
            {title === undefined ? (
              formatTimerTime(spent)
            ) : (
              <>
                <span className="sr-only">
                  {formatRemainingTime(task.duration - spent)}
                </span>
                <span aria-hidden="true">
                  -{formatTimerTime(Math.max(0, task.duration - spent))}
                </span>
              </>
            )}
          </span>
          {title === undefined && timeDisplay === "spent-and-duration" ? (
            <>
              <span className="text-muted shrink-0 font-normal">/</span>
              <span className={`text-muted ${compact ? "truncate" : ""}`}>
                {formatTimerTime(task.duration)}
              </span>
            </>
          ) : null}
        </span>
        {timeNote === undefined ? null : (
          <span className="text-muted min-w-0 text-center whitespace-normal tabular-nums">
            {timeNote}
          </span>
        )}
        {title === undefined ? (
          <span
            className={`flex shrink-0 items-baseline gap-1 ${compact ? "hidden @min-[9rem]:inline" : TASK_LAYOUT.percentage} text-muted`}
          >
            {compact ? (
              <>
                <span className="text-muted">
                  -{formatTimerTime(Math.max(0, task.duration - spent))}
                </span>
                <span className={appearance.elapsed}>{percentageLabel}%</span>
              </>
            ) : (
              <>
                <span className="sr-only">
                  {formatRemainingTime(task.duration - spent)}
                </span>
                <span aria-hidden="true" className="text-muted">
                  -{formatTimerTime(Math.max(0, task.duration - spent))}
                </span>
              </>
            )}
          </span>
        ) : null}
      </div>
      <progress
        aria-label={`${task.activity}: time spent`}
        aria-valuetext={`${formatTimerTime(spent)} of ${formatTimerTime(task.duration)}`}
        data-floating-progress=""
        className={`block w-full min-w-0 appearance-none overflow-hidden rounded-full border-0 bg-(--timer-progress-track) text-inherit [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-(--timer-progress-fill) [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-(--timer-progress-track) [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-(--timer-progress-fill) ${compact ? "h-1" : TASK_LAYOUT.progress}`}
        key={running ? "running" : "idle"}
        max={task.duration}
        style={progressStyle}
        value={spent}
      />
    </div>
  );
}
