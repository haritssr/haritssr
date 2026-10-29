import { taskCompletionTime, taskTiming } from "./timer";
import type { TimerDayBounds, TimerTask } from "./timer";

const REMINDER_BUFFER = 10 * 60_000;
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatDeadlineTime(timestamp: number) {
  return timeFormatter
    .format(timestamp)
    .replace(":00", "")
    .replaceAll(/\s/gu, "")
    .toLowerCase();
}

export function taskDeadline(
  task: TimerTask,
  bounds: TimerDayBounds,
  now: number
) {
  const timing = taskTiming(task, bounds, now);
  const remaining = task.duration - timing.spent;
  const latestStartAt = timing.closesAt - remaining * 1000;
  const remindAt = Math.max(timing.opensAt, latestStartAt - REMINDER_BUFFER);
  let warning: "soon" | "late" | null = null;
  let nextAt = Infinity;
  if (
    (task.availabilityWindow ?? null) !== null &&
    task.reachedAt === null &&
    remaining > 0 &&
    now < timing.closesAt
  ) {
    const running = task.startedAt !== null;
    const late = running
      ? taskCompletionTime(task) > timing.closesAt
      : now > latestStartAt;
    if (timing.available && late) {
      warning = "late";
    } else if (timing.available && !running && now >= remindAt) {
      warning = "soon";
    }
    if (now < timing.opensAt) {
      nextAt = timing.opensAt;
    } else if (running) {
      nextAt = timing.closesAt;
    } else {
      nextAt = Math.min(
        timing.closesAt,
        remindAt > now ? remindAt : Infinity,
        latestStartAt >= now ? latestStartAt + 1 : Infinity
      );
    }
  }
  return { warning, nextAt, latestStartAt, closesAt: timing.closesAt };
}
