import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";

import { canUseTimer, isAllDay } from "../utils/timer";
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
  // Tasks in an open scheduled window are Now; the rest have no set time.
  const nowTasks = available.filter(({ task }) => !isAllDay(task.period));
  const allDayTasks = available.filter(({ task }) => isAllDay(task.period));
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
      <div className="min-w-0 space-y-3 lg:space-y-5">
        {available.length === 0 ? (
          <TaskArea>
            <p className="text-muted text-sm">
              No available tasks. Add a task or wait for a scheduled window to
              open.
            </p>
          </TaskArea>
        ) : null}
        {nowTasks.length > 0 ? (
          <TaskArea label="Now" framed={false}>
            {nowTasks.map(renderTask)}
          </TaskArea>
        ) : null}
        {allDayTasks.length > 0 ? (
          <TaskArea label="All day" framed={false}>
            {allDayTasks.map(renderTask)}
          </TaskArea>
        ) : null}
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

/** An area of task cards with its label above it, or a bare message. */
function TaskArea({
  label,
  framed = true,
  children,
}: {
  label?: string;
  /** Draws the dashed border and padding around the cards. */
  framed?: boolean;
  children: ReactNode;
}) {
  const area = (
    <section
      aria-label={label === undefined ? undefined : `${label} activities`}
      className={
        framed
          ? "corner-squircle border-border min-w-0 rounded-2xl border border-dashed p-2.5 supports-[corner-shape:squircle]:rounded-4xl"
          : "min-w-0"
      }
    >
      {label === undefined ? (
        children
      ) : (
        <ul className={`min-w-0 ${TASK_LAYOUT.collection}`}>{children}</ul>
      )}
    </section>
  );
  if (label === undefined) {
    return area;
  }
  return (
    <div className="min-w-0 space-y-1.5">
      <h3 className={`text-foreground/50 text-sm ${framed ? "px-2.5" : ""}`}>
        {label}
      </h3>
      {area}
    </div>
  );
}
