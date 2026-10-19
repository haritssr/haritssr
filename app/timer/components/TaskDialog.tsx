import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";
import type { SubmitEvent } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";
import { taskSpent } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

import TaskFormDialog from "./TaskFormDialog";

const TASK_NAME_SUGGESTIONS = [
  "Read a chapter",
  "Take a short walk",
  "Practice a skill",
  "Tidy the desk",
  "Plan tomorrow",
  "Stretch",
  "Review notes",
  "Work on a project",
  "Get some fresh air",
  "Do a quick workout",
  "Rest your eyes",
  "Take a screen break",
  "Breathe slowly",
  "Make a cup of tea",
  "Water the plants",
  "Prepare a meal",
  "Fold the laundry",
  "Clear the inbox",
  "Write a journal",
  "Sketch an idea",
  "Practice guitar",
  "Learn new words",
  "Solve a puzzle",
  "Review flashcards",
  "Draft an outline",
  "Fix a small bug",
  "Organize files",
  "Plan the week",
  "Call a friend",
  "Listen to music",
  "Read a poem",
  "Reflect on today",
];

function readTaskForm(element: HTMLFormElement) {
  const form = new FormData(element);
  const hours = Number(form.get("hours"));
  const minutes = Number(form.get("minutes"));
  const seconds = Number(form.get("seconds"));
  const duration = hours * 3600 + minutes * 60 + seconds;
  if (
    ![hours, minutes, seconds].every(Number.isInteger) ||
    duration < 1 ||
    duration > 86_400
  ) {
    return "Choose a duration from one second to 24 hours.";
  }
  const activityValue = form.get("activity");
  const activity =
    typeof activityValue === "string" ? activityValue.trim() : "";
  if (activity.length === 0) {
    return "Enter an activity name.";
  }
  if (activity.length > 20) {
    return "Use 20 characters or fewer for the activity name.";
  }
  const description = form.get("description");
  return {
    activity,
    description: typeof description === "string" ? description.trim() : "",
    duration,
  };
}

export function EditTask({
  task,
  date,
  reached,
}: {
  task: TimerTask;
  date: string;
  reached: boolean;
}) {
  const { act, snapshot, busy, clockOffset } = useTimer();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readTaskForm(event.currentTarget);
    if (typeof values === "string") {
      setFormError(values);
      return;
    }
    if (values.duration <= taskSpent(task, date, Date.now() + clockOffset)) {
      setFormError("Choose a duration longer than the time already spent.");
      return;
    }
    setFormError(null);
    if (await act({ action: "edit", date, taskId: task.id, ...values })) {
      setOpen(false);
    } else {
      setFormError(
        "The task could not be saved. It may have finished. Please try again."
      );
    }
  }
  async function deleteTask() {
    setFormError(null);
    if (await act({ action: "delete", date, taskId: task.id })) {
      setOpen(false);
    } else {
      setFormError("The task could not be deleted. Please try again.");
    }
  }
  if (reached || snapshot?.mode !== "local") {
    return null;
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!busy) {
          setOpen(value);
          setFormError(null);
        }
      }}
    >
      <Dialog.Trigger
        className="text-muted hover:text-foreground focus-visible:outline-action cursor-pointer rounded text-base underline-offset-4 hover:underline focus-visible:outline-2 sm:text-sm"
        disabled={busy}
        aria-label={`Edit ${task.activity}`}
      >
        Edit
      </Dialog.Trigger>
      <TaskFormDialog
        title="Edit Task"
        defaultActivity={task.activity}
        defaultDescription={task.description}
        defaultDuration={task.duration}
        busy={busy}
        error={formError}
        onSubmit={submit}
        onDelete={deleteTask}
      />
    </Dialog.Root>
  );
}

export function AddTask({ disabled }: { disabled: boolean }) {
  const { act, snapshot, busy } = useTimer();
  const [open, setOpen] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (snapshot === undefined) {
      return;
    }
    const values = readTaskForm(event.currentTarget);
    if (typeof values === "string") {
      setFormError(values);
      return;
    }
    setFormError(null);
    if (await act({ action: "add", date: snapshot.today, ...values })) {
      setOpen(false);
    } else {
      setFormError("The activity could not be saved. Please try again.");
    }
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!busy) {
          if (value) {
            setActivityName(
              TASK_NAME_SUGGESTIONS[
                Math.floor(Math.random() * TASK_NAME_SUGGESTIONS.length)
              ] ?? "New task"
            );
          }
          setOpen(value);
          setFormError(null);
        }
      }}
    >
      <Dialog.Trigger
        aria-disabled={busy || undefined}
        disabled={disabled}
        render={<Button variant="primary-subtle" />}
      >
        <span>New Task</span>
      </Dialog.Trigger>
      <TaskFormDialog
        title="New Task"
        submitLabel="Add"
        defaultActivity={activityName}
        busy={busy}
        error={formError}
        onSubmit={submit}
      />
    </Dialog.Root>
  );
}
