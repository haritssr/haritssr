import { useTimer } from "@/app/timer/_components/TimerProvider";
import useTimerClock from "@/app/timer/hooks/useTimerClock";

import CompletedTasksTable from "./CompletedTasksTable";
import TaskCard from "./TaskCard";
import { TASK_LAYOUT } from "./taskPresentation";
import { getTaskCollection } from "./taskState";

export default function TaskList() {
  const { snapshot, clockOffset, error } = useTimer();
  const timestamp = useTimerClock(snapshot, clockOffset);
  if (snapshot === undefined) {
    return error === null ? (
      <output className="text-muted block">Loading today’s activities…</output>
    ) : null;
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
    <div className="min-w-0 space-y-5">
      {active.length > 0 && (
        <ul aria-label="Today's activities" className={TASK_LAYOUT.collection}>
          {active.map(({ task, state }) => (
            <li className="flex min-w-0" key={task.id}>
              <TaskCard date={snapshot.today} task={task} state={state} />
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
