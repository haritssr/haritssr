import { useEffect, useState } from "react";

import { useTimer } from "@/components/TimerProvider";
import { taskSpent } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

import CompletedTasksTable from "./CompletedTasksTable";
import TaskCard from "./TaskCard";
import { TASK_VIEW_LAYOUT } from "./taskPresentation";
import type { TaskView } from "./taskPresentation";

function taskOrder(task: TimerTask) {
  if (task.reachedAt !== null || task.spent >= task.duration) {
    return 3;
  }
  if (task.startedAt !== null) {
    return 0;
  }
  return task.spent > 0 ? 1 : 2;
}

export default function TaskList({ view }: { view: TaskView }) {
  const { snapshot, clockOffset } = useTimer();
  const [now, setNow] = useState(() => Date.now());
  const ticking =
    snapshot?.day.tasks.some((task) => task.startedAt !== null) ?? false;
  useEffect(() => {
    if (!ticking) {
      return () => {
        /* No running task needs a clock. */
      };
    }
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [ticking]);
  if (snapshot === undefined) {
    return (
      <output className="text-muted block">Loading today’s activities…</output>
    );
  }
  const timestamp = Math.max(now + clockOffset, Date.parse(snapshot.now));
  const tasks = snapshot.day.tasks.toSorted((first, second) => {
    const stateOrder = taskOrder(first) - taskOrder(second);
    if (stateOrder !== 0) {
      return stateOrder;
    }
    const firstProgress =
      taskSpent(first, snapshot.today, timestamp) / first.duration;
    const secondProgress =
      taskSpent(second, snapshot.today, timestamp) / second.duration;
    return secondProgress - firstProgress;
  });
  const completed = tasks.filter(
    (task) =>
      task.reachedAt !== null ||
      taskSpent(task, snapshot.today, timestamp) >= task.duration
  );
  const completedIds = new Set(completed.map((task) => task.id));
  const active = tasks.filter((task) => !completedIds.has(task.id));
  return (
    <div className="min-w-0 space-y-16">
      {active.length > 0 && (
        <ul
          aria-label="Today's activities"
          className={TASK_VIEW_LAYOUT[view].collection}
        >
          {active.map((task) => (
            <li className="flex min-w-0" key={task.id}>
              <TaskCard date={snapshot.today} task={task} view={view} />
            </li>
          ))}
        </ul>
      )}
      {completed.length > 0 && (
        <CompletedTasksTable
          tasks={completed}
          date={snapshot.today}
          now={timestamp}
        />
      )}
    </div>
  );
}
