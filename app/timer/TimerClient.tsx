"use client";

import { Dialog } from "@base-ui/react/dialog";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { CSSProperties, SubmitEvent } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";
import { formatTimerTime, taskSpent } from "@/utils/timer";
import type { TimerTask } from "@/utils/timer";

const INPUT_CLASS =
  "form-control border-border bg-background focus:border-action focus-visible:outline-action w-full rounded-lg border px-3 py-2 text-base focus-visible:outline-2";
const SHEET_STYLE: CSSProperties & { "--timer-safe-bottom": string } = {
  "--timer-safe-bottom":
    "max(calc(var(--spacing) * 5), env(safe-area-inset-bottom))",
};

function subscribePermission(onChange: () => void) {
  window.addEventListener("focus", onChange);
  window.addEventListener("timer-notifications", onChange);
  return () => {
    window.removeEventListener("focus", onChange);
    window.removeEventListener("timer-notifications", onChange);
  };
}

function notificationPermission() {
  return "Notification" in window ? Notification.permission : "unsupported";
}

function serverPermission() {
  return "default" as const;
}

export default function TimerClient() {
  const { snapshot, error, busy, refresh } = useTimer();
  const [permissionFailed, setPermissionFailed] = useState(false);
  const browserPermission = useSyncExternalStore(
    subscribePermission,
    notificationPermission,
    serverPermission
  );
  const permission = permissionFailed ? "unsupported" : browserPermission;

  return (
    <div className="space-y-5">
      {snapshot?.mode === "demo" ? (
        <p className="border-border bg-surface text-muted rounded-lg border p-4 text-sm">
          Sample preview. Run this site locally to save your activities in daily
          JSON files.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <AddTask
            disabled={
              snapshot === undefined || snapshot.mode === "demo" || busy
            }
          />
          {snapshot?.mode === "local" && permission === "default" ? (
            <Button
              variant="secondary"
              onClick={() => {
                void Notification.requestPermission()
                  .then(() => {
                    window.dispatchEvent(new Event("timer-notifications"));
                  })
                  .catch(() => {
                    setPermissionFailed(true);
                  });
              }}
            >
              Enable notifications
            </Button>
          ) : null}
        </div>
      </div>
      {snapshot?.mode === "local" &&
      (permission === "denied" || permission === "unsupported") ? (
        <p className="text-muted text-sm">
          Browser notifications are unavailable. Completion messages will appear
          on this site.
        </p>
      ) : null}
      {error === null ? null : (
        <div
          className="border-danger text-danger flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
          role="alert"
        >
          <p>{error}</p>
          <Button
            variant="secondary"
            onClick={() => {
              void refresh();
            }}
          >
            Try again
          </Button>
        </div>
      )}
      {snapshot === undefined ? (
        <output className="text-muted block">
          Loading today’s activities…
        </output>
      ) : (
        <ul
          aria-label="Today's activities"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {snapshot.day.tasks.map((task) => (
            <li className="flex min-w-0" key={task.id}>
              <TaskCard date={snapshot.today} task={task} />
            </li>
          ))}
        </ul>
      )}
      <div className="text-muted flex flex-wrap items-center justify-between gap-3 text-sm">
        <p>
          {snapshot === undefined
            ? "Today"
            : `${snapshot.today} · Jakarta time (WIB)`}
        </p>
        {snapshot?.mode === "local" && permission === "granted" ? (
          <p>Notifications enabled</p>
        ) : null}
      </div>
    </div>
  );
}

function TaskCard({ task, date }: { task: TimerTask; date: string }) {
  const { act, snapshot, busy, clockOffset } = useTimer();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (task.startedAt === null) {
      return () => {
        /* Paused cards do not need a ticking clock. */
      };
    }
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [task.startedAt]);
  const spent = taskSpent(
    task,
    date,
    Math.max(
      now + clockOffset,
      Date.parse(snapshot?.now ?? task.startedAt ?? "1970-01-01")
    )
  );
  const reached = spent >= task.duration;
  const running = task.startedAt !== null && !reached;
  let label: "Start" | "Pause" | "Continue" | "Reached" =
    task.spent === 0 ? "Start" : "Continue";
  if (running) {
    label = "Pause";
  }
  if (reached) {
    label = "Reached";
  }

  return (
    <div className="corner-squircle border-border text-foreground corner-squircle flex min-w-0 flex-1 flex-col gap-5 rounded-xl border p-4">
      <div className="space-y-2">
        <p className="font-medium wrap-anywhere">{task.activity}</p>
        <p className="text-muted text-sm wrap-anywhere whitespace-pre-wrap">
          {task.description || "No description."}
        </p>
      </div>
      <div className="mt-auto space-y-4">
        <div className="space-y-2">
          <div
            aria-hidden="true"
            className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-1 text-base tabular-nums"
          >
            <span className={running ? "text-timer-running" : undefined}>
              {formatTimerTime(spent)}
            </span>
            <span className="text-muted font-normal">of</span>
            <span className="text-muted text-right">
              {formatTimerTime(task.duration)}
            </span>
          </div>
          <progress
            aria-label={`${task.activity}: time spent`}
            aria-valuetext={`${formatTimerTime(spent)} of ${formatTimerTime(task.duration)}`}
            className="bg-foreground/10 [&::-webkit-progress-bar]:bg-foreground/10 [&::-webkit-progress-value]:bg-timer-progress [&::-moz-progress-bar]:bg-timer-progress block h-2.5 w-full appearance-none overflow-hidden rounded-full border-0 [&::-moz-progress-bar]:rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full"
            max={task.duration}
            value={spent}
          />
        </div>
        <Button
          className="w-full"
          disabled={reached || busy || snapshot?.mode === "demo"}
          onClick={() => {
            void act({
              action: running ? "pause" : "start",
              date,
              taskId: task.id,
            });
          }}
          variant={running ? "success-subtle" : "outline"}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}

function AddTask({ disabled }: { disabled: boolean }) {
  const { act, snapshot, busy } = useTimer();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (snapshot === undefined) {
      return;
    }
    const form = new FormData(event.currentTarget);
    const hours = Number(form.get("hours"));
    const minutes = Number(form.get("minutes"));
    const seconds = Number(form.get("seconds"));
    const duration = hours * 3600 + minutes * 60 + seconds;
    if (
      ![hours, minutes, seconds].every(Number.isInteger) ||
      duration < 1 ||
      duration > 86_400
    ) {
      setFormError("Choose a duration from one second to 24 hours.");
      return;
    }
    const activityValue = form.get("activity");
    const activity =
      typeof activityValue === "string" ? activityValue.trim() : "";
    if (activity.length === 0) {
      setFormError("Enter an activity name.");
      return;
    }
    setFormError(null);
    const description = form.get("description");
    if (
      await act({
        action: "add",
        date: snapshot.today,
        activity,
        description: typeof description === "string" ? description.trim() : "",
        duration,
      })
    ) {
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
          setOpen(value);
          setFormError(null);
        }
      }}
    >
      <Dialog.Trigger
        disabled={disabled}
        render={<Button variant="secondary" />}
      >
        <PlusIcon aria-hidden="true" className="size-4" />
        Add task
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/40 fixed inset-0 z-90" />
        <Dialog.Popup
          style={SHEET_STYLE}
          className="border-border bg-background text-foreground shadow-floating fixed inset-x-0 bottom-0 z-90 max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-3xl border p-5 pb-(--timer-safe-bottom) outline-hidden sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-6"
        >
          <div
            aria-hidden="true"
            className="bg-border mx-auto mb-5 h-1 w-10 rounded-full sm:hidden"
          />
          <Dialog.Title className="pr-8 text-xl font-semibold">
            Add task
          </Dialog.Title>
          <Dialog.Description className="text-muted mt-2 text-sm">
            Choose one activity and give it a time budget for today.
          </Dialog.Description>
          <form
            className="mt-5 space-y-5"
            onSubmit={(event) => {
              void submit(event);
            }}
          >
            <label className="block space-y-2 text-sm">
              <span>Activity name</span>
              <input
                className={INPUT_CLASS}
                maxLength={120}
                name="activity"
                required
              />
            </label>
            <label className="block space-y-2 text-sm">
              <span>
                Description <span className="text-muted">(optional)</span>
              </span>
              <textarea
                className={`${INPUT_CLASS} min-h-24 resize-y`}
                maxLength={2000}
                name="description"
                rows={3}
              />
            </label>
            <fieldset className="space-y-2">
              <legend className="mb-2 text-sm">Duration</legend>
              <div className="grid grid-cols-3 gap-3">
                {(["hours", "minutes", "seconds"] as const).map((unit) => (
                  <label className="min-w-0 space-y-2 text-sm" key={unit}>
                    <span className="text-muted capitalize">{unit}</span>
                    <input
                      className={`${INPUT_CLASS} tabular-nums`}
                      defaultValue={unit === "minutes" ? 25 : 0}
                      inputMode="numeric"
                      max={unit === "hours" ? 24 : 59}
                      min={0}
                      name={unit}
                      required
                      step={1}
                      type="number"
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            {formError === null ? null : (
              <p className="text-danger text-sm" role="alert">
                {formError}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <Dialog.Close
                disabled={busy}
                render={<Button variant="secondary" />}
              >
                Cancel
              </Dialog.Close>
              <Button loading={busy} type="submit">
                Add task
              </Button>
            </div>
          </form>
          <Dialog.Close
            aria-label="Close add task"
            disabled={busy}
            className="text-muted hover:text-foreground focus-visible:outline-action absolute top-4 right-4 cursor-pointer rounded p-2 focus-visible:outline-2"
          >
            <XMarkIcon aria-hidden="true" className="size-5" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
