import {
  scheduledPeriod,
  taskTiming,
  timerDayBounds,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import { taskDeadline } from "@/app/(tools)/timer/utils/timerDeadline";

type TaskPhase =
  | "upcoming"
  | "ready"
  | "running"
  | "paused"
  | "reached"
  | "missed";

/** Every task is in exactly one phase; the checks run in this precedence. */
function taskPhase(flags: {
  reached: boolean;
  missed: boolean;
  running: boolean;
  available: boolean;
  spent: number;
}): TaskPhase {
  if (flags.reached) {
    return "reached";
  }
  if (flags.missed) {
    return "missed";
  }
  if (flags.running) {
    return "running";
  }
  if (!flags.available) {
    return "upcoming";
  }
  return flags.spent > 0 ? "paused" : "ready";
}

export const PHASE_ORDER: Record<TaskPhase, number> = {
  running: 0,
  paused: 1,
  ready: 2,
  upcoming: 3,
  reached: 4,
  missed: 4,
};

export function getTaskState(
  task: TimerTask,
  date: string,
  now: number,
  bounds = timerDayBounds(date)
) {
  const { spent, available, closesAt } = taskTiming(task, bounds, now);
  const reached = task.reachedAt !== null || spent >= task.duration;
  const missed = !reached && scheduledPeriod(task) !== null && now >= closesAt;
  const running = task.startedAt !== null && !reached && available;
  const phase = taskPhase({ reached, missed, running, available, spent });
  let label: "Start" | "Pause" | "Continue" =
    task.spent === 0 ? "Start" : "Continue";
  if (running) {
    label = "Pause";
  }
  const deadline = taskDeadline(task, bounds, now);
  return {
    phase,
    spent,
    reached: phase === "reached",
    missed: phase === "missed",
    running: phase === "running",
    paused: phase === "paused",
    label,
    available,
    deadlineWarning: deadline.warning,
    latestStartAt: deadline.latestStartAt,
    closesAt: deadline.closesAt,
  };
}

export type TaskState = ReturnType<typeof getTaskState>;
