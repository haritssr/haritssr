import useTimelineCreation from "../hooks/useTimelineCreation";
import useTimelineResize from "../hooks/useTimelineResize";
import type { TimelinePagerState } from "../hooks/useTimelineWindow";
import type { Period, TimerTask } from "../utils/timer";
import TaskTimeline from "./TaskTimeline";

/** Editable today/future timelines with creation, resize, and move gestures. */
export default function EditableTaskTimeline({
  tasks,
  date,
  now,
  view,
  pager,
}: {
  tasks: TimerTask[];
  date: string;
  now: number;
  view: Period;
  pager: TimelinePagerState | null;
}) {
  const { surface, selection, message } = useTimelineCreation(date, true, view);
  const {
    root,
    preview,
    message: resizeMessage,
  } = useTimelineResize(date, true, view);
  return (
    <TaskTimeline
      tasks={tasks}
      date={date}
      now={now}
      editable
      view={view}
      pager={pager}
      interaction={{
        root,
        surface,
        selection,
        resizePreview: preview,
        message,
        resizeMessage,
      }}
    />
  );
}
