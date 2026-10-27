import { Dialog } from "@base-ui/react/dialog";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { canUseTimer, taskSpent } from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import { readTaskForm } from "@/app/(tools)/timer/utils/timerInput";
import Button from "@/components/Button";

import TaskFormDialog from "./TaskFormDialog";

const TASK_SUGGESTIONS = [
  {
    activity: "Read a chapter",
    description: "Read and note the main takeaway.",
  },
  {
    activity: "Take a short walk",
    description: "Step outside for a gentle walk.",
  },
  {
    activity: "Practice a skill",
    description: "Repeat one technique with focus.",
  },
  {
    activity: "Tidy the desk",
    description: "Clear and organize the desk.",
  },
  {
    activity: "Plan tomorrow",
    description: "Pick priorities for tomorrow.",
  },
  {
    activity: "Stretch",
    description: "Stretch your back and shoulders.",
  },
  {
    activity: "Review notes",
    description: "Review notes and mark key ideas.",
  },
  {
    activity: "Work on a project",
    description: "Finish one small milestone.",
  },
  {
    activity: "Get some fresh air",
    description: "Enjoy a quiet moment outside.",
  },
  {
    activity: "Do a quick workout",
    description: "Warm up, exercise, and cool down.",
  },
  {
    activity: "Rest your eyes",
    description: "Look away and rest your eyes.",
  },
  {
    activity: "Take a screen break",
    description: "Step away from screens and rest.",
  },
  {
    activity: "Breathe slowly",
    description: "Take slow, steady breaths.",
  },
  {
    activity: "Make a cup of tea",
    description: "Enjoy tea without distractions.",
  },
  {
    activity: "Water the plants",
    description: "Check soil and water the plants.",
  },
  {
    activity: "Prepare a meal",
    description: "Prepare a nourishing meal.",
  },
  {
    activity: "Fold the laundry",
    description: "Fold clothes and put them away.",
  },
  {
    activity: "Clear the inbox",
    description: "Reply and archive old messages.",
  },
  {
    activity: "Write a journal",
    description: "Write about your day and thoughts.",
  },
  {
    activity: "Sketch an idea",
    description: "Explore a rough idea on paper.",
  },
  {
    activity: "Practice guitar",
    description: "Practice a short piece of music.",
  },
  {
    activity: "Learn new words",
    description: "Use new words in a sentence.",
  },
  {
    activity: "Solve a puzzle",
    description: "Solve and explain your reasoning.",
  },
  {
    activity: "Review flashcards",
    description: "Review cards and repeat hard ones.",
  },
  {
    activity: "Draft an outline",
    description: "List and arrange the key points.",
  },
  {
    activity: "Fix a small bug",
    description: "Reproduce, fix, and review a bug.",
  },
  {
    activity: "Organize files",
    description: "Group files and remove duplicates.",
  },
  {
    activity: "Plan the week",
    description: "Review plans and pick priorities.",
  },
  {
    activity: "Call a friend",
    description: "Catch up and give your attention.",
  },
  {
    activity: "Listen to music",
    description: "Enjoy a few uninterrupted songs.",
  },
  {
    activity: "Read a poem",
    description: "Notice imagery and rhythm.",
  },
  {
    activity: "Reflect on today",
    description: "Note wins and one improvement.",
  },
];

export function EditTask({
  task,
  date,
  reached,
}: {
  task: TimerTask;
  date: string;
  reached: boolean;
}) {
  const { act, snapshot, drafts, clockOffset } = useTimer(
    "act",
    "snapshot",
    "drafts",
    "clockOffset"
  );
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readTaskForm(new FormData(event.currentTarget));
    if (typeof values === "string") {
      setFormError(values);
      return;
    }
    if (values.duration <= taskSpent(task, date, Date.now() + clockOffset)) {
      setFormError("Choose a duration longer than the time already spent.");
      return;
    }
    setFormError(null);
    const saving = act({ action: "edit", date, taskId: task.id, ...values });
    setOpen(false);
    if (!(await saving)) {
      setFormError(
        "The task could not be saved. It may have finished. Please try again."
      );
    }
  }
  async function deleteTask() {
    setFormError(null);
    const saving = act({ action: "delete", date, taskId: task.id });
    setOpen(false);
    if (!(await saving)) {
      setFormError("The task could not be deleted. Please try again.");
    }
  }
  if (reached || !canUseTimer(snapshot)) {
    return null;
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setFormError(null);
      }}
    >
      <Dialog.Trigger
        className="text-muted hover:text-foreground focus-visible:outline-action flex h-5 w-fit shrink-0 cursor-pointer items-center rounded focus-visible:outline-2 focus-visible:outline-offset-2"
        title="Edit"
        aria-label={`Edit ${task.activity}`}
      >
        <AdjustmentsHorizontalIcon
          aria-hidden="true"
          className="size-5"
          strokeWidth={1.5}
        />
      </Dialog.Trigger>
      <TaskFormDialog
        title="Edit Task"
        submitLabel="Done"
        defaultActivity={drafts[task.id]?.activity ?? task.activity}
        defaultDescription={drafts[task.id]?.description ?? task.description}
        defaultDuration={drafts[task.id]?.duration ?? task.duration}
        busy={false}
        error={formError}
        onSubmit={submit}
        onDelete={deleteTask}
      />
    </Dialog.Root>
  );
}

export function AddTask({ disabled }: { disabled: boolean }) {
  const { act, snapshot, drafts } = useTimer("act", "snapshot", "drafts");
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
  }, [disabled, open]);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (snapshot === undefined) {
      return;
    }
    const values = readTaskForm(new FormData(event.currentTarget));
    if (typeof values === "string") {
      setFormError(values);
      return;
    }
    setFormError(null);
    const saving = act({ action: "add", date: snapshot.today, ...values });
    setOpen(false);
    if (!(await saving)) {
      setFormError("The activity could not be saved. Please try again.");
    }
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (value) {
          setSuggestion(
            TASK_SUGGESTIONS[
              Math.floor(Math.random() * TASK_SUGGESTIONS.length)
            ] ?? { activity: "New task", description: "" }
          );
        }
        setOpen(value);
        setFormError(null);
      }}
    >
      <Dialog.Trigger
        aria-keyshortcuts="Shift+N"
        disabled={disabled}
        ref={triggerRef}
        render={<Button variant="primary-subtle" />}
      >
        <span>Add Task</span>
      </Dialog.Trigger>
      <TaskFormDialog
        title="New Task"
        submitLabel="Add"
        showTaskPresets
        defaultActivity={drafts.add?.activity ?? suggestion.activity}
        defaultDescription={drafts.add?.description ?? suggestion.description}
        defaultDuration={drafts.add?.duration ?? 300}
        busy={false}
        error={formError}
        onSubmit={submit}
      />
    </Dialog.Root>
  );
}
