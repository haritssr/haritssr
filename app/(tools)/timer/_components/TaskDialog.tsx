import { Dialog } from "@base-ui/react/dialog";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import {
  DAILY_DESCRIPTION_LIMIT,
  isDailyTask,
} from "@/app/(tools)/timer/utils/dailyTasks";
import { canUseTimer, taskSpent } from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import { readTaskForm } from "@/app/(tools)/timer/utils/timerInput";
import Button from "@/components/Button";

import TaskFormDialog from "./TaskFormDialog";

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
  const daily = isDailyTask(task);
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readTaskForm(
      new FormData(event.currentTarget),
      daily ? DAILY_DESCRIPTION_LIMIT : undefined
    );
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
        <PencilSquareIcon
          aria-hidden="true"
          className="size-5"
          strokeWidth={1.5}
        />
      </Dialog.Trigger>
      <TaskFormDialog
        title="Edit Task"
        submitLabel="Save"
        defaultActivity={drafts[task.id]?.activity ?? task.activity}
        defaultDescription={drafts[task.id]?.description ?? task.description}
        defaultDuration={drafts[task.id]?.duration ?? task.duration}
        descriptionLimit={daily ? DAILY_DESCRIPTION_LIMIT : undefined}
        notice={daily ? "Changes apply to today." : undefined}
        busy={false}
        error={formError}
        onSubmit={submit}
        onDelete={daily ? undefined : deleteTask}
      />
    </Dialog.Root>
  );
}

export function AddTask({ disabled }: { disabled: boolean }) {
  const { act, snapshot, drafts } = useTimer("act", "snapshot", "drafts");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
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
        defaultActivity={drafts.add?.activity ?? ""}
        defaultDescription={drafts.add?.description ?? ""}
        defaultDuration={drafts.add?.duration ?? 0}
        busy={false}
        error={formError}
        onSubmit={submit}
      />
    </Dialog.Root>
  );
}
