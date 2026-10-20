import { Button as BaseButton } from "@base-ui/react/button";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

import { useTimer } from "@/components/TimerProvider";
import { TIMER_SPEEDS } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

import TaskActions from "./TaskActions";
import TaskDescription from "./TaskDescription";
import { EditTask } from "./TaskDialog";
import { TASK_VIEW_LAYOUT, taskAppearance } from "./taskPresentation";
import type { TaskView } from "./taskPresentation";
import TaskProgress from "./TaskProgress";
import useTaskState from "./useTaskState";

export default function TaskCard({
  task,
  date,
  view,
}: {
  task: TimerTask;
  date: string;
  view: TaskView;
}) {
  const { spent, reached, running, paused, label } = useTaskState(task, date);
  const appearance = taskAppearance(view, running, paused, reached);

  if (reached) {
    return null;
  }

  return (
    <div
      data-completed={reached || undefined}
      className={`group/task min-w-0 flex-1 ${TASK_VIEW_LAYOUT[view].surface} ${TASK_VIEW_LAYOUT[view].item} ${appearance.surface}`}
    >
      <TaskHeader task={task} date={date} view={view} reached={reached} />
      <div
        className={`group-data-completed/task:*:opacity-60 ${TASK_VIEW_LAYOUT[view].controls} ${view === "list" && (running || paused) ? "grid-cols-[minmax(0,1fr)_11rem]" : ""}`}
      >
        <TaskProgress
          task={task}
          spent={spent}
          running={running}
          view={view}
          appearance={appearance}
        />
        <TaskActions
          date={date}
          task={task}
          running={running}
          label={label}
          variant={appearance.button}
          view={view}
        />
      </div>
    </div>
  );
}

function TaskHeader({
  task,
  date,
  view,
  reached,
}: {
  task: TimerTask;
  date: string;
  view: TaskView;
  reached: boolean;
}) {
  const anchor = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`min-w-0 space-y-1.5 ${view === "list" ? "sm:space-y-0.5" : "sm:space-y-1.5"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-foreground min-w-0 truncate font-medium ${view === "list" ? "text-lg sm:text-sm" : "text-xl sm:text-lg"}`}
          title={task.activity}
        >
          {task.activity}
        </p>
        <div className="shrink-0">
          <EditTask task={task} date={date} reached={reached} />
        </div>
      </div>
      <div className="flex items-center justify-between" ref={anchor}>
        <TaskDescription task={task} anchor={anchor} />
        <TaskSpeedControl task={task} date={date} />
      </div>
    </div>
  );
}

function TaskSpeedControl({ task, date }: { task: TimerTask; date: string }) {
  const { act, snapshot, busy } = useTimer();
  const speed = task.speed ?? 1;
  const nextSpeed =
    TIMER_SPEEDS[(TIMER_SPEEDS.indexOf(speed) + 1) % TIMER_SPEEDS.length] ?? 1;
  return (
    <BaseButton
      aria-label={`Speed for ${task.activity}: ${speed}x. Change to ${nextSpeed}x`}
      className={`text-muted hover:text-foreground focus-visible:outline-action inline-flex h-5 shrink-0 cursor-pointer items-center gap-0 rounded text-base leading-5 select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed sm:text-sm ${snapshot?.mode === "local" ? "disabled:opacity-100" : "disabled:opacity-50"}`}
      disabled={busy || snapshot?.mode !== "local"}
      onClick={() => {
        void act({ action: "speed", date, taskId: task.id, speed: nextSpeed });
      }}
      title={`Timer speed: ${speed}x. Click for ${nextSpeed}x`}
      type="button"
    >
      <ClockIcon aria-hidden="true" className="size-4 shrink-0" />
      <span className="inline-block text-right tabular-nums underline-offset-2 hover:underline">
        {speed}x
      </span>
    </BaseButton>
  );
}
