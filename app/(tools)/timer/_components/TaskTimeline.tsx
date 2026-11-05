/* oxlint-disable shadcn/no-inline-styles -- Minute and lane geometry is expressed only through CSS custom properties. */
import { useId } from "react";
import type { CSSProperties, RefObject } from "react";

import {
  formatTimerTime,
  taskKind,
  taskTiming,
  timerDayBounds,
} from "../utils/timer";
import type { Period, TimerTask } from "../utils/timer";
import { cardTimeRange, timelineTime } from "../utils/timerTime";
import { EditTask } from "./TaskDialog";
import { layoutTimelineTasks } from "./timelineLayout";

import styles from "./TaskTimeline.module.css";

const hours = Array.from({ length: 25 }, (_, hour) => hour);

type TimelineStyle = CSSProperties & {
  "--timeline-position": string;
  "--timeline-left"?: string;
  "--timeline-width"?: string;
  "--timeline-height"?: string;
};

function positionStyle(position: number): TimelineStyle {
  return { "--timeline-position": `${position}%` };
}
export interface TimelineInteraction {
  root: RefObject<HTMLDivElement | null>;
  surface: RefObject<HTMLButtonElement | null>;
  selection: Period | null;
  resizePreview: { taskId: string; window: Period } | null;
  message: string;
  resizeMessage: string;
}

/**
 * Renders the schedule. Gestures are attached by `EditableTaskTimeline`, which
 * loads separately so read-only days never download them.
 */
export default function TaskTimeline({
  tasks,
  date,
  now,
  editable,
  interaction,
}: {
  tasks: TimerTask[];
  date: string;
  now: number;
  editable: boolean;
  interaction?: TimelineInteraction;
}) {
  const selection = interaction?.selection ?? null;
  const resizePreview = interaction?.resizePreview ?? null;
  const originalTasks = new Map(tasks.map((task) => [task.id, task]));
  const instructionsId = useId();
  const resizeInstructionsId = useId();
  const resizedTasks =
    resizePreview === null
      ? tasks
      : tasks.map((task) =>
          task.id === resizePreview.taskId
            ? {
                ...task,
                period: resizePreview.window,
                duration:
                  (resizePreview.window.until - resizePreview.window.from) * 60,
              }
            : task
        );
  const previewId = "timeline-new-task-preview";
  const previewTasks: TimerTask[] = selection
    ? [
        ...resizedTasks,
        {
          id: previewId,
          activity: "New Task",
          description: "",
          duration: (selection.until - selection.from) * 60,
          spent: 0,
          startedAt: null,
          reachedAt: null,
          notifiedAt: null,
          period: selection,
        },
      ]
    : resizedTasks;
  const bounds = timerDayBounds(date);
  const minute = Math.max(0, Math.min(1440, (now - bounds.start) / 60_000));
  return (
    <section
      aria-label={`Schedule for ${date}`}
      className="min-w-0 select-none"
    >
      <p id={instructionsId} className="sr-only">
        Drag empty future time to create a task. On touchscreens, hold then
        drag. Use arrow keys for 15-minute steps, Enter to begin and save, and
        Escape to cancel.
      </p>
      <p id={resizeInstructionsId} className="sr-only">
        Drag the top or bottom edge to resize the period and timer duration.
        Drag a card to move its period while keeping its duration. Use the edit
        icon beside the title to edit a card. On touchscreens, hold before
        dragging. Use arrow keys for 15-minute steps, Enter to save, and Escape
        to cancel.
      </p>
      <output aria-live="polite" className="sr-only">
        {interaction?.resizeMessage}
      </output>
      <output aria-live="polite" className="sr-only">
        {interaction?.message}
      </output>
      <section
        aria-label="Hourly schedule"
        className="border-border lg:corner-squircle pl-1 lg:rounded-3xl lg:border lg:p-3"
      >
        <div ref={interaction?.root} className="relative mt-3 mb-4 ml-12 h-640">
          {editable ? (
            <button
              ref={interaction?.surface}
              type="button"
              aria-label="Create a scheduled task"
              aria-describedby={instructionsId}
              className="focus-visible:outline-action absolute inset-0 h-full w-full cursor-crosshair select-none focus-visible:outline-2 focus-visible:outline-offset-2"
            />
          ) : null}
          {hours.map((hour) => (
            <div
              key={hour}
              className={`${styles.hour} border-border pointer-events-none absolute inset-x-0 -translate-y-1/2 border-t`}
              style={positionStyle((hour / 24) * 100)}
            >
              <span className="text-muted absolute -top-2.5 -left-12 text-xs tabular-nums">
                {timelineTime(hour * 60)}
              </span>
            </div>
          ))}
          {layoutTimelineTasks(previewTasks).map((entry) => (
            <TimelineCard
              key={entry.task.id}
              entry={entry}
              originalTask={originalTasks.get(entry.task.id) ?? entry.task}
              date={date}
              now={now}
              editable={editable}
              preview={entry.task.id === previewId}
              resizing={resizePreview?.taskId === entry.task.id}
              instructionsId={resizeInstructionsId}
            />
          ))}
          {now >= bounds.start && now < bounds.end ? (
            <div
              aria-label={`Current time ${timelineTime(Math.floor(minute))} WIB`}
              className={`${styles.hour} bg-danger pointer-events-none absolute right-0 -left-12 z-30 h-0.5 rounded-full lg:-right-1.5`}
              style={positionStyle((minute / 1440) * 100)}
            >
              <span className="bg-danger absolute top-1/2 left-0 inline-flex h-4 -translate-y-1/2 items-center rounded-full px-1 pt-px text-xs leading-none text-white tabular-nums">
                {timelineTime(Math.floor(minute))}
              </span>
            </div>
          ) : null}
        </div>
      </section>
    </section>
  );
}

export function timelineCardState(
  task: TimerTask,
  date: string,
  now: number,
  editable: boolean,
  preview: boolean
) {
  const bounds = timerDayBounds(date);
  const timing = taskTiming(task, bounds, now);
  const reached = task.reachedAt !== null || timing.spent >= task.duration;
  const missed = !reached && now >= timing.closesAt;
  const running = !reached && timing.available && task.startedAt !== null;
  const canEdit = editable && !preview && !reached && !missed;
  const canMove = canEdit && task.startedAt === null && now < timing.opensAt;
  return {
    reached,
    missed,
    running,
    canEdit,
    canMove,
    // Past days show progress on the card because their list omits scheduled tasks.
    progress:
      now >= bounds.end
        ? `${formatTimerTime(timing.spent)} / ${formatTimerTime(task.duration)}`
        : null,
  };
}

function TimelineCard({
  entry,
  originalTask,
  date,
  now,
  editable,
  preview,
  resizing,
  instructionsId,
}: {
  entry: ReturnType<typeof layoutTimelineTasks>[number];
  originalTask: TimerTask;
  date: string;
  now: number;
  editable: boolean;
  preview: boolean;
  resizing: boolean;
  instructionsId: string;
}) {
  const { task, from, until, lane, lanes } = entry;
  const { reached, missed, running, canEdit, canMove, progress } =
    timelineCardState(task, date, now, editable, preview);
  const geometry: TimelineStyle = {
    "--timeline-position": `${(from / 1440) * 100}%`,
    "--timeline-height": `${((until - from) / 1440) * 100}%`,
    "--timeline-left": `${(lane / lanes) * 100}%`,
    "--timeline-width": `${100 / lanes}%`,
  };
  return (
    <div
      data-kind={taskKind(task)}
      data-running={running || undefined}
      data-completed={reached || undefined}
      data-missed={missed || undefined}
      className={`${styles.event} ${styles.kind} absolute flex gap-0.5 py-0.75 pr-0.5 ${preview ? "pointer-events-none z-20" : "z-10"}`}
      style={geometry}
      title={progress !== null && until - from < 30 ? progress : undefined}
    >
      <span
        aria-hidden="true"
        className="bg-schedule-accent pointer-events-none h-full w-0.75 shrink-0 rounded-full [corner-shape:round]"
      />
      <div className="relative h-full min-w-0 flex-1">
        <div
          className={`corner-squircle bg-schedule-surface text-schedule-foreground relative flex h-full flex-col items-start ${until - from === 15 ? "justify-center" : "justify-start"} overflow-hidden rounded-xs px-1.5 py-1 text-sm supports-[corner-shape:squircle]:rounded-md ${resizing ? "ring-schedule-accent ring-1 ring-inset" : ""}`}
        >
          {canMove ? (
            <button
              type="button"
              data-move-task={task.id}
              aria-label={`Move ${task.activity}`}
              aria-describedby={instructionsId}
              aria-keyshortcuts="ArrowUp ArrowDown Enter Escape"
              className={`focus-visible:outline-action absolute inset-0 select-none focus-visible:outline-2 focus-visible:-outline-offset-2 ${resizing ? "cursor-grabbing" : "cursor-grab"}`}
            />
          ) : null}
          <div className="pointer-events-none relative flex w-full min-w-0 flex-col select-none">
            <div className="flex items-center justify-between gap-1">
              <span className="text-schedule-title truncate leading-4 font-medium">
                {task.activity}
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <span className="text-schedule-foreground/60 text-xs whitespace-nowrap tabular-nums">
                  {cardTimeRange(from, until)}
                </span>
                {canEdit ? (
                  <span className="[&_button:hover]:text-schedule-foreground [&_button:focus-visible]:text-schedule-foreground [&_button]:text-schedule-foreground/50 pointer-events-auto relative z-20 shrink-0">
                    <EditTask task={originalTask} date={date} reached={false} />
                  </span>
                ) : null}
              </span>
            </div>
            {progress !== null && until - from >= 30 ? (
              <span className="text-schedule-foreground/60 text-xs tabular-nums">
                {progress}
              </span>
            ) : null}
            {until - from >= 30 && task.description ? (
              <span className="text-schedule-foreground/60 line-clamp-2 text-xs wrap-anywhere">
                {task.description}
              </span>
            ) : null}
          </div>
        </div>
        {canMove
          ? (["from", "until"] as const).map((edge) => (
              <button
                key={edge}
                type="button"
                data-resize-task={task.id}
                data-resize-edge={edge}
                aria-label={`Resize ${edge === "from" ? "start" : "end"} of ${task.activity}, ${timelineTime(edge === "from" ? from : until)}`}
                aria-describedby={instructionsId}
                aria-keyshortcuts="ArrowUp ArrowDown Enter Escape"
                title={`Resize ${edge === "from" ? "start" : "end"}`}
                className={`focus-visible:outline-action absolute inset-x-0 z-10 flex h-2 cursor-ns-resize items-center justify-center select-none focus-visible:outline-2 focus-visible:-outline-offset-2 ${edge === "from" ? "top-0" : "bottom-0"}`}
              />
            ))
          : null}
      </div>
    </div>
  );
}
