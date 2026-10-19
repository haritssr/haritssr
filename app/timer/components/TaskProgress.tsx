import type { CSSProperties } from "react";

import { formatTimerTime } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

import { TASK_VIEW_LAYOUT } from "./taskPresentation";
import type { TaskAppearance, TaskView } from "./taskPresentation";

export default function TaskProgress({
  task,
  spent,
  running,
  view,
  appearance,
}: {
  task: TimerTask;
  spent: number;
  running: boolean;
  view: TaskView;
  appearance: TaskAppearance;
}) {
  const percentage = Math.min(100, (spent / task.duration) * 100);
  const percentageLabel = percentage.toFixed(0);
  const progressStyle: CSSProperties & { "--timer-progress-fill": string } = {
    "--timer-progress-fill": appearance.progress,
  };
  return (
    <div className="space-y-2">
      <div
        aria-hidden="true"
        className={`tabular-nums ${TASK_VIEW_LAYOUT[view].time}`}
      >
        <span className="flex min-w-0 items-baseline gap-0.5">
          <span className={appearance.elapsed}>{formatTimerTime(spent)}</span>
          <span className="text-muted font-normal">/</span>
          <span className="text-muted">{formatTimerTime(task.duration)}</span>
        </span>
        <span
          className={`shrink-0 ${TASK_VIEW_LAYOUT[view].percentage} ${appearance.elapsed}`}
        >
          {percentageLabel}%
        </span>
      </div>
      <progress
        aria-label={`${task.activity}: time spent`}
        aria-valuetext={`${formatTimerTime(spent)} of ${formatTimerTime(task.duration)}`}
        className={`bg-border [&::-webkit-progress-bar]:bg-border block w-full appearance-none overflow-hidden rounded-full border-0 text-inherit [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-(--timer-progress-fill) [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-(--timer-progress-fill) ${TASK_VIEW_LAYOUT[view].progress}`}
        key={running ? "running" : "idle"}
        max={task.duration}
        style={progressStyle}
        value={spent}
      />
    </div>
  );
}
