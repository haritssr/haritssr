import { Toast } from "@base-ui/react/toast";
import { useEffect, useRef } from "react";

import { canUseTimer, timerDayBounds } from "../utils/timer";
import type { TimerTask } from "../utils/timer";
import { sendTimerAction } from "../utils/timerClient";
import type { ReceivedTimerSnapshot } from "../utils/timerClient";
import type { TimerController } from "../utils/timerController";
import { formatDeadlineTime, taskDeadline } from "../utils/timerDeadline";

function deadlineToast(task: TimerTask, date: string, now: number) {
  const deadline = taskDeadline(task, timerDayBounds(date), now);
  return {
    id: `timer-deadline:${date}/${task.id}`,
    type: "timer-deadline",
    title: deadline.warning === "late" ? "Not enough time" : "Start soon",
    description: `${task.activity} · closes at ${formatDeadlineTime(deadline.closesAt)}.`,
  };
}

export default function useTimerDeadlineReminders({
  snapshot,
  pending,
  controller,
}: {
  snapshot: ReceivedTimerSnapshot | undefined;
  pending: boolean;
  controller: TimerController;
}) {
  const { add, update, close } = Toast.useToastManager();
  const attempted = useRef(new Map<string, number>());
  const open = useRef(new Map<string, { date: string; taskId: string }>());

  useEffect(() => {
    const visibleToasts = open.current;
    if (!canUseTimer(snapshot)) {
      for (const id of visibleToasts.keys()) {
        close(id);
      }
      visibleToasts.clear();
      return () => {
        /* No personal reminder scheduling in preview. */
      };
    }
    const active = snapshot;
    const bounds = timerDayBounds(active.today);
    let timeout = 0;
    let disposed = false;

    async function claim(taskId: string) {
      try {
        const result = await sendTimerAction({
          action: "claim-deadline-reminder",
          date: active.today,
          taskId,
        });
        const current = controller.mutations.getSnapshot();
        if (!canUseTimer(current.snapshot)) {
          return;
        }
        controller.mutations.receive(result.snapshot);
        const returned = result.snapshot.day.tasks.find(
          (entry) => entry.id === taskId
        );
        if (
          result.deadlineReminder === null &&
          (returned?.deadlineReminderAt ?? null) === null
        ) {
          // A definite ineligible response can be reconsidered after clock reconciliation.
          attempted.current.set(`${active.today}/${taskId}`, Date.now() + 1000);
        }
        const projected = controller.mutations.getSnapshot();
        const latest = projected.snapshot;
        if (
          result.deadlineReminder === null ||
          latest === undefined ||
          latest.today !== active.today ||
          projected.pendingCount > 0
        ) {
          return;
        }
        const task = latest.day.tasks.find((entry) => entry.id === taskId);
        const now = Date.now() + latest.clockOffset;
        if (
          task === undefined ||
          taskDeadline(task, bounds, now).warning === null
        ) {
          return;
        }
        const toast = deadlineToast(task, latest.today, now);
        visibleToasts.set(toast.id, { date: latest.today, taskId });
        add({
          ...toast,
          onClose: () => {
            visibleToasts.delete(toast.id);
          },
        });
      } catch {
        // A lost response may have committed. Reconcile without resending it.
        await controller.mutations.refresh();
      }
    }

    function syncToasts(now: number) {
      for (const [id, notice] of visibleToasts) {
        const task = active.day.tasks.find(
          (entry) => entry.id === notice.taskId
        );
        if (
          notice.date !== active.today ||
          task === undefined ||
          taskDeadline(task, bounds, now).warning === null
        ) {
          close(id);
          visibleToasts.delete(id);
        } else {
          const toast = deadlineToast(task, active.today, now);
          update(id, { title: toast.title, description: toast.description });
        }
      }
    }

    function scan() {
      window.clearTimeout(timeout);
      if (disposed || document.hidden || pending) {
        return;
      }
      const now = Date.now() + active.clockOffset;
      let next = bounds.end > now ? bounds.end : Infinity;
      syncToasts(now);
      for (const task of active.day.tasks) {
        const deadline = taskDeadline(task, bounds, now);
        next = Math.min(next, deadline.nextAt);
        const key = `${active.today}/${task.id}`;
        const retryAt = attempted.current.get(key) ?? -Infinity;
        if (
          deadline.warning !== null &&
          (task.deadlineReminderAt ?? null) === null &&
          Number.isFinite(retryAt) &&
          retryAt > Date.now()
        ) {
          next = Math.min(next, retryAt + active.clockOffset);
        }
        if (
          deadline.warning !== null &&
          (task.deadlineReminderAt ?? null) === null &&
          retryAt <= Date.now()
        ) {
          attempted.current.set(key, Infinity);
          void claim(task.id);
        }
      }
      if (Number.isFinite(next)) {
        timeout = window.setTimeout(scan, Math.max(100, next - now + 50));
      }
    }
    scan();
    document.addEventListener("visibilitychange", scan);
    window.addEventListener("focus", scan);
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", scan);
      window.removeEventListener("focus", scan);
    };
  }, [snapshot, pending, controller, add, update, close]);
}
