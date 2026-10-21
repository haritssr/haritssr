import { useTimer } from "@/components/TimerProvider";
import useTimerClock from "@/components/useTimerClock";

import CompletedTasksTable from "./CompletedTasksTable";
import TaskCard from "./TaskCard";
import { TASK_VIEW_LAYOUT } from "./taskPresentation";
import type { TaskView } from "./taskPresentation";
import { getTaskCollection } from "./taskState";

export default function TaskList({ view }: { view: TaskView }) {
  const { snapshot, clockOffset } = useTimer();
  const timestamp = useTimerClock(snapshot, clockOffset);
  if (snapshot === undefined) {
    return (
      <output className="text-muted block">Loading today’s activities…</output>
    );
  }
  if (snapshot.mode === "turso" && snapshot.day.tasks.length === 0) {
    return (
      <output className="text-muted block">
        No tasks yet. Add a task to get started.
      </output>
    );
  }
  const { active, completed } = getTaskCollection(
    snapshot.day.tasks,
    snapshot.today,
    timestamp
  );
  return (
    <div className="min-w-0 space-y-16">
      {active.length > 0 && (
        <ul
          aria-label="Today's activities"
          className={TASK_VIEW_LAYOUT[view].collection}
        >
          {active.map(({ task, state }) => (
            <li className="flex min-w-0" key={task.id}>
              <TaskCard
                date={snapshot.today}
                task={task}
                state={state}
                view={view}
              />
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
