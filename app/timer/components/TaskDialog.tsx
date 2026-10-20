import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";
import { taskSpent } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

import TaskFormDialog from "./TaskFormDialog";

const TASK_SUGGESTIONS = [
  {
    activity: "Read a chapter",
    description: "Read one chapter and write down the main takeaway.",
  },
  {
    activity: "Take a short walk",
    description: "Step outside and walk at a comfortable pace.",
  },
  {
    activity: "Practice a skill",
    description: "Choose one technique and repeat it with focused attention.",
  },
  {
    activity: "Tidy the desk",
    description: "Clear the surface and put everything back in its place.",
  },
  {
    activity: "Plan tomorrow",
    description: "Choose three priorities and prepare what you need.",
  },
  {
    activity: "Stretch",
    description: "Gently stretch your shoulders, back, and legs.",
  },
  {
    activity: "Review notes",
    description: "Read through your notes and highlight anything to revisit.",
  },
  {
    activity: "Work on a project",
    description: "Pick one small milestone and work toward finishing it.",
  },
  {
    activity: "Get some fresh air",
    description: "Spend a few quiet minutes outside away from your screen.",
  },
  {
    activity: "Do a quick workout",
    description: "Warm up, move through a short routine, and cool down.",
  },
  {
    activity: "Rest your eyes",
    description:
      "Look away from the screen and focus on something in the distance.",
  },
  {
    activity: "Take a screen break",
    description: "Step away from your devices and give your attention a rest.",
  },
  {
    activity: "Breathe slowly",
    description: "Sit comfortably and take slow, steady breaths.",
  },
  {
    activity: "Make a cup of tea",
    description: "Prepare your favorite tea and enjoy it without distractions.",
  },
  {
    activity: "Water the plants",
    description: "Check the soil and water the plants that need it.",
  },
  {
    activity: "Prepare a meal",
    description: "Prepare the ingredients and make something nourishing.",
  },
  {
    activity: "Fold the laundry",
    description: "Fold clean clothes and put them away.",
  },
  {
    activity: "Clear the inbox",
    description:
      "Reply to urgent messages and archive what you no longer need.",
  },
  {
    activity: "Write a journal",
    description:
      "Write about your day, your thoughts, or something you noticed.",
  },
  {
    activity: "Sketch an idea",
    description: "Explore a rough idea on paper without worrying about polish.",
  },
  {
    activity: "Practice guitar",
    description: "Warm up your fingers and practice a short passage.",
  },
  {
    activity: "Learn new words",
    description: "Learn a few useful words and use each in a sentence.",
  },
  {
    activity: "Solve a puzzle",
    description: "Work through a puzzle and explain your reasoning.",
  },
  {
    activity: "Review flashcards",
    description: "Review a small set of cards and repeat the difficult ones.",
  },
  {
    activity: "Draft an outline",
    description: "List the key points and arrange them in a clear order.",
  },
  {
    activity: "Fix a small bug",
    description:
      "Reproduce the issue, make a focused fix, and review the result.",
  },
  {
    activity: "Organize files",
    description: "Group related files and remove unnecessary duplicates.",
  },
  {
    activity: "Plan the week",
    description: "Review upcoming commitments and choose your main priorities.",
  },
  {
    activity: "Call a friend",
    description:
      "Catch up with someone and give the conversation your full attention.",
  },
  {
    activity: "Listen to music",
    description:
      "Choose an album or playlist and enjoy a few uninterrupted songs.",
  },
  {
    activity: "Read a poem",
    description: "Read slowly and notice the images, rhythm, and meaning.",
  },
  {
    activity: "Reflect on today",
    description: "Note what went well and one thing to improve tomorrow.",
  },
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState({
    activity: "",
    description: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { target } = event;
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        !event.shiftKey ||
        event.key.toLowerCase() !== "n" ||
        (target instanceof HTMLElement &&
          (target.isContentEditable ||
            target.closest("input, textarea, select") !== null)) ||
        disabled ||
        busy ||
        open ||
        document.querySelector('[role="dialog"][data-open]') !== null
      ) {
        return;
      }
      event.preventDefault();
      triggerRef.current?.click();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, disabled, open]);

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
            setSuggestion(
              TASK_SUGGESTIONS[
                Math.floor(Math.random() * TASK_SUGGESTIONS.length)
              ] ?? { activity: "New task", description: "" }
            );
          }
          setOpen(value);
          setFormError(null);
        }
      }}
    >
      <Dialog.Trigger
        aria-keyshortcuts="Shift+N"
        aria-disabled={busy || undefined}
        disabled={disabled}
        ref={triggerRef}
        render={<Button variant="primary-subtle" />}
      >
        <span>New Task</span>
      </Dialog.Trigger>
      <TaskFormDialog
        title="New Task"
        submitLabel="Add"
        defaultActivity={suggestion.activity}
        defaultDescription={suggestion.description}
        busy={busy}
        error={formError}
        onSubmit={submit}
      />
    </Dialog.Root>
  );
}
