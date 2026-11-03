import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";

import TaskCard from "./TaskCard";
import { TASK_LAYOUT } from "./taskPresentation";
import { getTaskCollection, reconcileTaskOrder } from "./taskState";

import styles from "./taskPulse.module.css";

export default function TaskList() {
  const [newTaskId, setNewTaskId] = useState<string | null>(null);
  const [upcoming, setUpcoming] = useState<{
    date: string;
    open: boolean;
  } | null>(null);
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
  const { snapshot, clockOffset, error } = useTimer(
    "snapshot",
    "clockOffset",
    "error"
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
  const { visible } = getTaskCollection(
    snapshot.day.tasks,
    snapshot.today,
    timestamp
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
  const upcomingTasks = orderedVisible.filter(({ state }) => !state.available);
  const upcomingOpen = upcoming?.date === snapshot.today && upcoming.open;
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
    <div className="min-w-0 space-y-3 lg:w-1/2">
      {available.length > 0 && (
        <ul
          aria-label="Today's activities"
          className={`min-w-0 ${TASK_LAYOUT.collection}`}
        >
          {available.map(renderTask)}
        </ul>
      )}
      {upcomingTasks.length > 0 && (
        <Collapsible.Root
          open={upcomingOpen}
          onOpenChange={(open) => {
            setUpcoming({ date: snapshot.today, open });
          }}
        >
          <Collapsible.Trigger className="text-foreground/50 focus-visible:outline-action inline-flex cursor-pointer items-center gap-1 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2">
            Upcoming ({upcomingTasks.length})
            <ChevronDownIcon
              aria-hidden="true"
              className={`size-4 shrink-0 ${upcomingOpen ? "rotate-180" : ""}`}
            />
          </Collapsible.Trigger>
          <Collapsible.Panel className="pt-2">
            <ul
              aria-label="Upcoming tasks"
              className={`min-w-0 ${TASK_LAYOUT.collection}`}
            >
              {upcomingTasks.map(renderTask)}
            </ul>
          </Collapsible.Panel>
        </Collapsible.Root>
      )}
    </div>
  );
}
