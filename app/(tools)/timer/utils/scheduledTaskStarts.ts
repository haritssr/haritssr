import {
  canUseTimer,
  scheduledPeriod,
  taskTiming,
  timerDayBounds,
} from "./timer";
import type { TimerTask } from "./timer";
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
  let timeout = 0;
  let disposed = false;
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
    scan();
  }

  function scan() {
    window.clearTimeout(timeout);
    if (disposed) {
      return;
    }
    const {
      confirmed: snapshot,
      pendingCount,
      loadFailure,
    } = controller.mutations.getSnapshot();
    if (!canUseTimer(snapshot)) {
      return;
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
    if (Number.isFinite(next)) {
      timeout = window.setTimeout(scan, Math.max(100, next - now + 50));
    }
    if (
      due.length > 0 &&
      !saving &&
      pendingCount === 0 &&
      loadFailure === null
    ) {
      void start(due, date);
    }
  }
  const unsubscribe = controller.mutations.subscribe(scan);
  window.addEventListener("focus", scan);
  document.addEventListener("visibilitychange", scan);
  scan();
  return () => {
    disposed = true;
    window.clearTimeout(timeout);
    unsubscribe();
    window.removeEventListener("focus", scan);
    document.removeEventListener("visibilitychange", scan);
  };
}
