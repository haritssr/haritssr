import { useState } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";

import CompletedTasksTable from "./CompletedTasksTable";
import TaskCard from "./TaskCard";
import { TASK_LAYOUT } from "./taskPresentation";
import { getTaskCollection, reconcileTaskOrder } from "./taskState";

export default function TaskList() {
  const [ordering, setOrdering] = useState<{
    date: string;
    ids: string[];
  } | null>(null);
  const { snapshot, clockOffset, error, desktopListView } = useTimer(
    "snapshot",
    "clockOffset",
    "error",
    "desktopListView"
  );
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
  const { visible, completed } = getTaskCollection(
    snapshot.day.tasks,
    snapshot.today,
    timestamp
  );
  const previousOrder = ordering?.date === snapshot.today ? ordering.ids : [];
  const nextOrder = reconcileTaskOrder(
    previousOrder,
    visible.map(({ task }) => task.id)
  );
  if (ordering?.date !== snapshot.today || nextOrder !== ordering.ids) {
    setOrdering({ date: snapshot.today, ids: nextOrder });
  }
  const visibleById = new Map(visible.map((entry) => [entry.task.id, entry]));
  const orderedVisible = nextOrder.flatMap((id) => {
    const entry = visibleById.get(id);
    return entry === undefined ? [] : [entry];
  });
  return (
    <div
      data-desktop-list-view={desktopListView || undefined}
      className={`group/task-layout relative min-w-0 space-y-10 data-desktop-list-view:lg:grid data-desktop-list-view:lg:grid-cols-4 data-desktop-list-view:lg:items-start data-desktop-list-view:lg:gap-8 data-desktop-list-view:lg:space-y-0 ${visible.length > 0 && completed.length > 0 ? "data-desktop-list-view:lg:after:border-border data-desktop-list-view:lg:after:pointer-events-none data-desktop-list-view:lg:after:absolute data-desktop-list-view:lg:after:inset-y-0 data-desktop-list-view:lg:after:left-1/2 data-desktop-list-view:lg:after:border-l data-desktop-list-view:lg:after:border-dashed data-desktop-list-view:lg:after:content-['']" : ""}`}
    >
      {visible.length > 0 && (
        <ul
          aria-label="Today's activities"
          data-desktop-list-view={desktopListView || undefined}
          className={`group/task-list @container/task-list min-w-0 ${TASK_LAYOUT.collection} data-desktop-list-view:sm:grid-cols-1 data-desktop-list-view:sm:gap-3 data-desktop-list-view:lg:col-span-2 data-desktop-list-view:lg:grid-cols-1`}
        >
          {orderedVisible.map(({ task, state }) => (
            <li className="flex min-w-0" key={task.id}>
              <TaskCard date={snapshot.today} task={task} state={state} />
            </li>
          ))}
        </ul>
      )}
      {completed.length > 0 && (
        <div className="min-w-0 lg:group-data-desktop-list-view/task-layout:col-span-2 lg:group-data-desktop-list-view/task-layout:col-start-3">
          <CompletedTasksTable
            tasks={completed}
            date={snapshot.today}
            now={timestamp}
          />
        </div>
      )}
    </div>
  );
}
