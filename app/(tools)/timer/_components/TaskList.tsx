import { useEffect, useState } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";

import { canUseTimer } from "../utils/timer";
import { scheduledCalendarTasks } from "../utils/timerCalendar";
import ScheduleTimeline from "./ScheduleTimeline";
import TaskCard from "./TaskCard";
import { TASK_LAYOUT } from "./taskPresentation";
import { getTaskCollection, reconcileTaskOrder } from "./taskState";

import styles from "./taskPulse.module.css";

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
    <div className="grid min-w-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-5">
      <div className="lg:corner-squircle lg:border-border min-w-0 space-y-3 lg:space-y-2.5 lg:rounded-2xl lg:border lg:border-dashed lg:p-2.5 lg:supports-[corner-shape:squircle]:rounded-4xl">
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
      <ScheduleTimeline
        tasks={scheduledCalendarTasks(snapshot.day)}
        date={snapshot.today}
        now={now}
        editable={canUseTimer(snapshot)}
      />
    </div>
  );
}
