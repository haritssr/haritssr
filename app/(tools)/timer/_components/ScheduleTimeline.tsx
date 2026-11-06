import { Suspense, lazy } from "react";

import useTimelineWindow from "../hooks/useTimelineWindow";
import type { TimerTask } from "../utils/timer";
import TaskTimeline from "./TaskTimeline";

// Gesture code loads after first paint; the static timeline renders meanwhile.
const EditableTaskTimeline = lazy(
  async () => await import("./EditableTaskTimeline")
);

/** A day's schedule: the whole day, 6-hour pages, or the full day scrolled to the current time. */
export default function ScheduleTimeline({
  tasks,
  date,
  now,
  editable,
}: {
  tasks: TimerTask[];
  date: string;
  now: number;
  editable: boolean;
}) {
  const { view, pager, ref, scroll } = useTimelineWindow(tasks, date, now);
  const timeline = { tasks, date, now, view, pager, scroll };
  return (
    <div
      ref={ref}
      className="lg:corner-squircle lg:border-border min-w-0 lg:rounded-xl lg:border lg:border-dashed lg:py-3 lg:pr-1 lg:pl-2 lg:supports-[corner-shape:squircle]:rounded-3xl"
    >
      {editable ? (
        <Suspense fallback={<TaskTimeline {...timeline} editable />}>
          <EditableTaskTimeline {...timeline} />
        </Suspense>
      ) : (
        <TaskTimeline {...timeline} editable={false} />
      )}
    </div>
  );
}
