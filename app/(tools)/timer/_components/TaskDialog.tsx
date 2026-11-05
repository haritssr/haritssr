import { Dialog } from "@base-ui/react/dialog";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import type { ReactElement, SubmitEvent } from "react";

import { isDailyTask } from "@/app/(tools)/timer/utils/dailyTasks";
import {
  canUseTimer,
  isAllDay,
  taskKind,
  taskSpent,
  timerDayBounds,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";
import {
  TASK_FORM_INPUT_LIMITS,
  readTaskForm,
} from "@/app/(tools)/timer/utils/timerInput";
import Button from "@/components/Button";

import { inputWindow } from "../utils/timerTime";
import { scheduledWindowSchema } from "../utils/timerValidation";
import { useTaskEditing } from "./TaskEditing";
import TaskFormDialog from "./TaskFormDialog";

function formWindow(form: FormData) {
  // Both fields at 00:00 give 0–1440, the all-day period.
  const result = scheduledWindowSchema.safeParse(
    inputWindow(form.get("from"), form.get("until"))
  );
  return result.success
    ? result.data
    : "Choose times in 15-minute increments, at least 15 minutes apart.";
}

export function EditTask({
  task,
  date,
  reached,
  trigger,
}: {
  task: TimerTask;
  date: string;
  reached: boolean;
  trigger?: ReactElement;
}) {
  const { act, snapshot, drafts, clockOffset } = useTaskEditing();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const daily = isDailyTask(task);
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const period = formWindow(form);
    if (typeof period === "string") {
      setFormError(period);
      return;
    }
    const values = readTaskForm(
      form,
      TASK_FORM_INPUT_LIMITS.description,
      TASK_FORM_INPUT_LIMITS.activity,
      !isAllDay(period)
    );
    if (typeof values === "string") {
      setFormError(values);
      return;
    }
    const now = Date.now() + clockOffset;
    if (
      !isAllDay(period) &&
      isAllDay(task.period) &&
      timerDayBounds(date).start + period.until * 60_000 <= now
    ) {
      setFormError("Choose an end time later than now.");
      return;
    }
    if (values.duration <= taskSpent(task, date, now)) {
      setFormError("Choose a duration longer than the time already spent.");
      return;
    }
    setFormError(null);
    const saving = act({
      action: "edit",
      date,
      taskId: task.id,
      ...values,
      period,
    });
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
      {trigger ? (
        <Dialog.Trigger render={trigger} aria-label={`Edit ${task.activity}`} />
      ) : (
        <Dialog.Trigger
          className={`focus-visible:outline-action relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded before:absolute before:-inset-1 focus-visible:outline-2 focus-visible:outline-offset-2 ${open ? "text-action" : "text-foreground/50 hover:text-foreground"}`}
          title="Edit"
          aria-label={`Edit ${task.activity}`}
        >
          <AdjustmentsHorizontalIcon
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.5}
          />
        </Dialog.Trigger>
      )}
      <TaskFormDialog
        title="Edit Task"
        submitLabel="Save"
        defaultActivity={drafts[task.id]?.activity ?? task.activity}
        defaultDescription={drafts[task.id]?.description ?? task.description}
        defaultDuration={drafts[task.id]?.duration ?? task.duration}
        defaultKind={drafts[task.id]?.kind ?? taskKind(task)}
        defaultPeriod={drafts[task.id]?.period ?? task.period ?? undefined}
        activityLimit={TASK_FORM_INPUT_LIMITS.activity}
        descriptionLimit={TASK_FORM_INPUT_LIMITS.description}
        notice={
          daily
            ? `Changes apply to ${date === snapshot?.today ? "today" : date}.`
            : undefined
        }
        busy={false}
        error={formError}
        onSubmit={submit}
        onDelete={daily ? undefined : deleteTask}
      />
    </Dialog.Root>
  );
}

export function AddTask({ disabled }: { disabled: boolean }) {
  const { act, snapshot, drafts } = useTaskEditing();
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
    const form = new FormData(event.currentTarget);
    const period = formWindow(form);
    if (typeof period === "string") {
      setFormError(period);
      return;
    }
    const values = readTaskForm(
      form,
      TASK_FORM_INPUT_LIMITS.description,
      TASK_FORM_INPUT_LIMITS.activity,
      !isAllDay(period)
    );
    if (typeof values === "string") {
      setFormError(values);
      return;
    }
    setFormError(null);
    const taskId = drafts.add?.taskId ?? crypto.randomUUID();
    window.dispatchEvent(
      new CustomEvent("timer-task-added", { detail: taskId })
    );
    const saving = act({
      action: "add",
      date: snapshot.day.date,
      taskId,
      ...values,
      period,
    });
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
        aria-label="Add task"
        aria-keyshortcuts="Shift+N"
        disabled={disabled}
        ref={triggerRef}
        render={
          <Button
            className="fixed right-4 bottom-[var(--floating-controls-clearance,calc(5rem+env(safe-area-inset-bottom,0px)))] max-md:z-50 md:static"
            size="responsive-floating"
            variant="primary-floating"
          />
        }
      >
        <span>Add Task</span>
      </Dialog.Trigger>
      <TaskFormDialog
        title="New Task"
        submitLabel="Add"
        showTaskPresets
        activityLimit={TASK_FORM_INPUT_LIMITS.activity}
        descriptionLimit={TASK_FORM_INPUT_LIMITS.description}
        defaultActivity={drafts.add?.activity ?? ""}
        defaultDescription={drafts.add?.description ?? ""}
        defaultDuration={drafts.add?.duration ?? 0}
        defaultKind={drafts.add?.kind}
        defaultPeriod={drafts.add?.period}
        notice={
          drafts.add?.date !== undefined &&
          drafts.add.date !== snapshot?.day.date
            ? "Recovered from a different day. Check the period before saving."
            : undefined
        }
        busy={false}
        error={formError}
        onSubmit={submit}
      />
    </Dialog.Root>
  );
}
