import {
  canUseTimer,
  scheduledPeriod,
  taskTiming,
  timerDayBounds,
} from "./timer";
import type { TimerTask } from "./timer";
import { subscribeWake } from "./timerClock";
import type { TimerController } from "./timerController";

function isUnstartedScheduledTask(task: TimerTask) {
  return (
    scheduledPeriod(task) !== null &&
    task.lastStartedAt === undefined &&
    task.startedAt === null &&
    task.spent === 0 &&
    task.reachedAt === null
  );
}

// Eligibility lives only for this mounted runtime. Failed writes are never retried.
export function subscribeScheduledTaskStarts(controller: TimerController) {
  const attempted = new Set<string>();
  let date = "";
  let saving = false;

  async function start(taskIds: string[], today: string) {
    saving = true;
    for (const id of taskIds) {
      attempted.add(id);
    }
    await controller.mutations.act({
      action: "start-scheduled",
      date: today,
      taskIds,
    });
    saving = false;
    scheduler.wake();
  }

  function scan() {
    const {
      confirmed: snapshot,
      pendingCount,
      loadFailure,
    } = controller.mutations.getSnapshot();
    if (!canUseTimer(snapshot)) {
      return null;
    }
    if (date !== snapshot.today) {
      date = snapshot.today;
      attempted.clear();
    }
    const now = Math.max(
      Date.now() + snapshot.clockOffset,
      Date.parse(snapshot.now)
    );
    const bounds = timerDayBounds(date);
    let next = bounds.end > now ? bounds.end : Infinity;
    const due: string[] = [];
    for (const task of snapshot.day.tasks) {
      const timing = taskTiming(task, bounds, now);
      if (!isUnstartedScheduledTask(task)) {
        continue;
      }
      if (timing.opensAt > now) {
        next = Math.min(next, timing.opensAt);
      } else if (timing.available && !attempted.has(task.id)) {
        due.push(task.id);
        next = Math.min(next, timing.closesAt);
      }
    }
    if (
      due.length > 0 &&
      !saving &&
      pendingCount === 0 &&
      loadFailure === null
    ) {
      void start(due, date);
    }
    return Number.isFinite(next) ? Math.max(100, next - now + 50) : null;
  }
  // Scheduled starts must fire even while the tab is hidden.
  const scheduler = subscribeWake(scan, { whenHidden: true });
  const unsubscribe = controller.mutations.subscribe(scheduler.wake);
  return () => {
    unsubscribe();
    scheduler.stop();
  };
}
