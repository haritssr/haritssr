import { Suspense, lazy, useEffect, useState } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";

import { canUseTimer } from "../utils/timer";
import { scheduledCalendarTasks } from "../utils/timerCalendar";
import TaskCard from "./TaskCard";
import { TASK_LAYOUT } from "./taskPresentation";
import { getTaskCollection, reconcileTaskOrder } from "./taskState";
import TaskTimeline from "./TaskTimeline";

import styles from "./taskPulse.module.css";

// Gesture code loads after first paint; the static timeline renders meanwhile.
const EditableTaskTimeline = lazy(
  async () => await import("./EditableTaskTimeline")
);

export default function TaskList({ now }: { now: number }) {
  const [newTaskId, setNewTaskId] = useState<string | null>(null);
  useEffect(() => {
    const onAdd = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === "string") {
        setNewTaskId(event.detail);
      }
    };
    window.addEventListener("timer-task-added", onAdd);
    return () => {
      window.removeEventListener("timer-task-added", onAdd);
    };
  }, []);
  const [ordering, setOrdering] = useState<{
    date: string;
    ids: string[];
  } | null>(null);
  const { snapshot, error } = useTimer("snapshot", "error");
  if (snapshot === undefined) {
    return error === null ? (
      <output className="text-muted block">Loading today’s activities…</output>
    ) : null;
  }
  const { visible } = getTaskCollection(
    snapshot.day.tasks,
    snapshot.today,
    now
  );
  const previousOrder = ordering?.date === snapshot.today ? ordering.ids : [];
  const nextOrder = reconcileTaskOrder(previousOrder, visible);
  if (ordering?.date !== snapshot.today || nextOrder !== ordering.ids) {
    setOrdering({ date: snapshot.today, ids: nextOrder });
  }
  const visibleById = new Map(visible.map((entry) => [entry.task.id, entry]));
  const orderedVisible = nextOrder.flatMap((id) => {
    const entry = visibleById.get(id);
    return entry === undefined ? [] : [entry];
  });
  const available = orderedVisible.filter(({ state }) => state.available);
  const timeline = {
    tasks: scheduledCalendarTasks(snapshot.day),
    date: snapshot.today,
    now,
  };
  const renderTask = ({ task, state }: (typeof orderedVisible)[number]) => (
    <li
      className={`flex min-w-0 ${task.id === newTaskId ? styles.pulse : ""}`}
      key={task.id}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          setNewTaskId(null);
        }
      }}
    >
      <TaskCard date={snapshot.today} task={task} state={state} />
    </li>
  );
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-2">
      <div className="min-w-0 space-y-3">
        {available.length === 0 ? (
          <p className="text-muted text-sm">
            No available tasks. Add a task or wait for a scheduled window to
            open.
          </p>
        ) : null}
        {available.length > 0 && (
          <ul
            aria-label="Today's activities"
            className={`min-w-0 ${TASK_LAYOUT.collection}`}
          >
            {available.map(renderTask)}
          </ul>
        )}
      </div>
      {canUseTimer(snapshot) ? (
        <Suspense fallback={<TaskTimeline {...timeline} editable />}>
          <EditableTaskTimeline {...timeline} />
        </Suspense>
      ) : (
        <TaskTimeline {...timeline} editable={false} />
      )}
    </div>
  );
}
