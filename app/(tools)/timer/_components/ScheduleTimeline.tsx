import { Suspense, lazy } from "react";

import useTimelineWindow from "../hooks/useTimelineWindow";
import type { TimerTask } from "../utils/timer";
import TaskTimeline from "./TaskTimeline";

// Gesture code loads after first paint; the static timeline renders meanwhile.
const EditableTaskTimeline = lazy(
  async () => await import("./EditableTaskTimeline")
);

/** A day's schedule, paged by 6 hours when that setting is on. */
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
  const { view, pager } = useTimelineWindow(tasks, date, now);
  const timeline = { tasks, date, now, view, pager };
  return editable ? (
    <Suspense fallback={<TaskTimeline {...timeline} editable />}>
      <EditableTaskTimeline {...timeline} />
    </Suspense>
  ) : (
    <TaskTimeline {...timeline} editable={false} />
  );
}
