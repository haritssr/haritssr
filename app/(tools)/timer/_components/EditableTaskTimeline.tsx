import useTimelineCreation from "../hooks/useTimelineCreation";
import useTimelineResize from "../hooks/useTimelineResize";
import type { TimerTask } from "../utils/timer";
import TaskTimeline from "./TaskTimeline";

/** Editable today/future timelines with creation, resize, and move gestures. */
export default function EditableTaskTimeline({
  tasks,
  date,
  now,
}: {
  tasks: TimerTask[];
  date: string;
  now: number;
}) {
  const { surface, selection, message } = useTimelineCreation(date, true);
  const {
    root,
    preview,
    message: resizeMessage,
  } = useTimelineResize(date, true);
  return (
    <TaskTimeline
      tasks={tasks}
      date={date}
      now={now}
      editable
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
