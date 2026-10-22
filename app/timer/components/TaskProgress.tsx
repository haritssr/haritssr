import type { CSSProperties, ReactNode } from "react";

import { formatTimerTime } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

import { TASK_LAYOUT } from "./taskPresentation";
import type { TaskAppearance } from "./taskPresentation";

export default function TaskProgress({
  task,
  spent,
  running,
  appearance,
  compact = false,
  speedControl,
}: {
  task: TimerTask;
  spent: number;
  running: boolean;
  appearance: TaskAppearance;
  compact?: boolean;
  speedControl?: ReactNode;
}) {
  const percentage = Math.min(100, (spent / task.duration) * 100);
  const percentageLabel = percentage.toFixed(0);
  const progressStyle: CSSProperties & { "--timer-progress-fill": string } = {
    "--timer-progress-fill": appearance.progress,
  };
  return (
    <div className={compact ? "@container space-y-1" : "space-y-2"}>
      <div
        className={`tabular-nums ${compact ? "flex min-w-0 items-baseline justify-between gap-2 text-sm leading-4" : TASK_LAYOUT.time}`}
      >
        <span className="flex min-w-0 items-baseline gap-0.5">
          <span className={`shrink-0 ${appearance.elapsed}`}>
            {formatTimerTime(spent)}
          </span>
          <span className="text-muted shrink-0 font-normal">/</span>
          <span className={`text-muted ${compact ? "truncate" : ""}`}>
            {formatTimerTime(task.duration)}
          </span>
          {speedControl}
        </span>
        <span
          className={`shrink-0 ${compact ? "hidden @min-[9rem]:inline" : TASK_LAYOUT.percentage} ${appearance.elapsed}`}
        >
          {percentageLabel}%
        </span>
      </div>
      <progress
        aria-label={`${task.activity}: time spent`}
        aria-valuetext={`${formatTimerTime(spent)} of ${formatTimerTime(task.duration)}`}
        className={`bg-border [&::-webkit-progress-bar]:bg-border block w-full appearance-none overflow-hidden rounded-full border-0 text-inherit [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-(--timer-progress-fill) [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-(--timer-progress-fill) ${compact ? "h-1" : TASK_LAYOUT.progress}`}
        key={running ? "running" : "idle"}
        max={task.duration}
        style={progressStyle}
        value={spent}
      />
    </div>
  );
}
