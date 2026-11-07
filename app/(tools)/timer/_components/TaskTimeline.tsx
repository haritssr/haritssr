/* oxlint-disable shadcn/no-inline-styles -- Minute and lane geometry is expressed only through CSS custom properties. */
import { useId } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";

import type {
  TimelinePagerState,
  TimelineScroll,
} from "../hooks/useTimelineWindow";
import { HOUR_REM, overlapsView } from "../utils/timelineWindow";
import {
  formatTimerTime,
  taskKind,
  taskTiming,
  timerDayBounds,
} from "../utils/timer";
import type { Period, TimerTask } from "../utils/timer";
import { cardTimeRange, timelineTime } from "../utils/timerTime";
import PastTimeShade from "./PastTimeShade";
import { EditTask } from "./TaskDialog";
import { layoutTimelineTasks } from "./timelineLayout";
import TimelinePager from "./TimelinePager";

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
  view,
  pager = null,
  scroll = null,
  interaction,
}: {
  tasks: TimerTask[];
  date: string;
  now: number;
  editable: boolean;
  /** Minutes shown: the whole day. */
  view: Period;
  pager?: TimelinePagerState | null;
  /** Scrolls the full day inside the available screen height. */
  scroll?: TimelineScroll | null;
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
  const span = view.until - view.from;
  const percent = (value: number) => ((value - view.from) / span) * 100;
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
        className="lg:corner-squircle relative isolate flow-root lg:rounded-2xl"
      >
        {pager === null ? null : <TimelinePager {...pager} />}
        <ScrollFrame scroll={scroll}>
          <div
            ref={interaction?.root}
            className="relative mt-3 mb-4 ml-12"
            style={{ height: `${(span / 60) * HOUR_REM}rem` }}
          >
            {editable ? (
              <button
                ref={interaction?.surface}
                type="button"
                aria-label="Create a scheduled task"
                aria-describedby={instructionsId}
                className="focus-visible:outline-action absolute inset-0 h-full w-full cursor-crosshair select-none focus-visible:outline-2 focus-visible:outline-offset-2"
              />
            ) : null}
            <PastTimeShade
              editable={editable}
              now={now}
              bounds={bounds}
              view={view}
            />
            {hours
              .filter(
                (hour) => hour * 60 >= view.from && hour * 60 <= view.until
              )
              .map((hour) => (
                <div
                  key={hour}
                  className={`${styles.hour} border-border pointer-events-none absolute inset-x-0 -translate-y-1/2 border-t`}
                  style={positionStyle(percent(hour * 60))}
                >
                  <span className="text-muted absolute top-1/2 -left-10 -translate-y-1/2 text-xs leading-none tabular-nums">
                    {timelineTime(hour * 60)}
                  </span>
                </div>
              ))}
            {layoutTimelineTasks(previewTasks)
              .filter((entry) => overlapsView(entry.from, entry.until, view))
              .map((entry) => (
                <TimelineCard
                  key={entry.task.id}
                  entry={entry}
                  view={view}
                  originalTask={originalTasks.get(entry.task.id) ?? entry.task}
                  date={date}
                  now={now}
                  editable={editable}
                  preview={entry.task.id === previewId}
                  resizing={resizePreview?.taskId === entry.task.id}
                  instructionsId={resizeInstructionsId}
                />
              ))}
            <NowLine
              visible={now >= bounds.start && now < bounds.end}
              minute={minute}
              view={view}
            />
          </div>
        </ScrollFrame>
      </section>
    </section>
  );
}

/** The red current-time line and its pill, when the time is inside `view`. */
function NowLine({
  visible,
  minute,
  view,
}: {
  visible: boolean;
  minute: number;
  view: Period;
}) {
  if (!visible || minute < view.from || minute > view.until) {
    return null;
  }
  const percent = ((minute - view.from) / (view.until - view.from)) * 100;
  return (
    <div
      aria-label={`Current time ${timelineTime(Math.floor(minute))} WIB`}
      className={`${styles.hour} bg-danger pointer-events-none absolute right-0 -left-12 z-30 h-0.5 rounded-full`}
      style={positionStyle(percent)}
    >
      <span className="bg-danger absolute top-1/2 left-0 inline-flex h-4 -translate-y-1/2 items-center rounded-full px-1 pt-px text-xs leading-none text-white tabular-nums">
        {timelineTime(Math.floor(minute))}
      </span>
    </div>
  );
}

/** Scrolls the full-day timeline inside the available height in follow-now mode. */
function ScrollFrame({
  scroll,
  children,
}: {
  scroll: TimelineScroll | null;
  children: ReactNode;
}) {
  const attach = scroll?.attach;
  return (
    <div
      ref={attach}
      data-timeline-frame={scroll === null ? undefined : ""}
      className={
        scroll === null
          ? "contents"
          : "lg:corner-squircle overflow-y-auto overscroll-contain pr-1 lg:rounded-r-lg lg:supports-[corner-shape:squircle]:rounded-r-2xl"
      }
      style={scroll === null ? undefined : { maxHeight: scroll.height }}
    >
      {children}
    </div>
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
  view,
  originalTask,
  date,
  now,
  editable,
  preview,
  resizing,
  instructionsId,
}: {
  entry: ReturnType<typeof layoutTimelineTasks>[number];
  view: Period;
  originalTask: TimerTask;
  date: string;
  now: number;
  editable: boolean;
  preview: boolean;
  resizing: boolean;
  instructionsId: string;
}) {
  const { task, lane, lanes } = entry;
  // A card crossing a page edge shows only the part inside the view.
  const clippedStart = entry.from < view.from;
  const clippedEnd = entry.until > view.until;
  const from = Math.max(entry.from, view.from);
  const until = Math.min(entry.until, view.until);
  const span = view.until - view.from;
  const { reached, missed, running, canEdit, canMove, progress } =
    timelineCardState(task, date, now, editable, preview);
  const geometry: TimelineStyle = {
    "--timeline-position": `${((from - view.from) / span) * 100}%`,
    "--timeline-height": `${((until - from) / span) * 100}%`,
    "--timeline-left": `${(lane / lanes) * 100}%`,
    "--timeline-width": `${100 / lanes}%`,
  };
  return (
    <div
      data-kind={taskKind(task)}
      data-running={running || undefined}
      data-completed={reached || undefined}
      data-missed={missed || undefined}
      className={`${styles.event} ${styles.kind} py-timeline-card lg:py-timeline-card-lg absolute flex gap-0.5 ${preview ? "pointer-events-none z-20" : "z-10"}`}
      style={geometry}
      title={progress !== null && until - from < 30 ? progress : undefined}
    >
      <div className="relative h-full min-w-0 flex-1">
        <div
          className={`corner-squircle bg-schedule-surface text-schedule-foreground relative flex h-full gap-1.5 overflow-hidden rounded-xs px-1 py-1 text-sm supports-[corner-shape:squircle]:rounded-md ${clippedStart ? "rounded-t-none supports-[corner-shape:squircle]:rounded-t-none" : ""} ${clippedEnd ? "rounded-b-none supports-[corner-shape:squircle]:rounded-b-none" : ""} ${resizing ? "ring-schedule-accent ring-1 ring-inset" : ""}`}
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
          <span
            aria-hidden="true"
            className="bg-schedule-accent pointer-events-none w-0.75 shrink-0 self-stretch rounded-full [corner-shape:round]"
          />
          <div
            className={`pointer-events-none relative flex min-w-0 flex-1 flex-col select-none ${until - from === 15 ? "self-center" : "self-start"}`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-schedule-title truncate leading-4 font-medium">
                {task.activity}
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <span className="text-schedule-foreground/60 text-xs whitespace-nowrap tabular-nums">
                  {cardTimeRange(entry.from, entry.until)}
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
          ? (["from", "until"] as const)
              .filter((edge) => !(edge === "from" ? clippedStart : clippedEnd))
              .map((edge) => (
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
