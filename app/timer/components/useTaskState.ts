import { useEffect, useState } from "react";

import { useTimer } from "@/components/TimerProvider";
import { taskSpent } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

export default function useTaskState(task: TimerTask, date: string) {
  const { snapshot, clockOffset } = useTimer();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (task.startedAt === null) {
      return () => {
        /* Paused cards do not need a ticking clock. */
      };
    }
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [task.startedAt]);
  const spent = taskSpent(
    task,
    date,
    Math.max(
      now + clockOffset,
      Date.parse(snapshot?.now ?? task.startedAt ?? "1970-01-01")
    )
  );
  const reached = task.reachedAt !== null || spent >= task.duration;
  const running = task.startedAt !== null && !reached;
  const paused = !running && !reached && spent > 0;
  let label: "Start" | "Pause" | "Continue" =
    task.spent === 0 ? "Start" : "Continue";
  if (running) {
    label = "Pause";
  }

  return { spent, reached, running, paused, label };
}
