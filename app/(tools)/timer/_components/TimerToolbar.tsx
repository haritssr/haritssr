import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Switch } from "@base-ui/react/switch";
import {
  BellAlertIcon,
  Cog6ToothIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode, Ref } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import useTimerTicking from "@/app/(tools)/timer/hooks/useTimerTicking";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import Button from "@/components/Button";

import PresetSettings from "./PresetSettings";
import { AddTask } from "./TaskDialog";
import { getTaskCollection } from "./taskState";

const TASK_COUNT_STATES = [
  { key: "running", label: "Running", color: "bg-timer-running" },
  { key: "paused", label: "Paused", color: "bg-timer-paused" },
  { key: "ready", label: "Not started", color: "bg-foreground" },
] as const;

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

export default function TimerToolbar({
  backupActions,
}: {
  backupActions: ReactNode;
}) {
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const timestamp = useTimerClock(snapshot, clockOffset);
  const taskCounts = { running: 0, paused: 0, ready: 0 };
  if (snapshot !== undefined) {
    const { active } = getTaskCollection(
      snapshot.day.tasks,
      snapshot.today,
      timestamp
    );
    for (const { state } of active) {
      if (state.running) {
        taskCounts.running += 1;
      } else if (state.paused) {
        taskCounts.paused += 1;
      } else {
        taskCounts.ready += 1;
      }
    }
  }
  return (
    <div className="border-border flex w-full flex-wrap items-end gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-3">
        <AddTask disabled={!canUseTimer(snapshot)} />
        {backupActions}
        <TimerSettingsDialog />
      </div>
      {snapshot === undefined ? null : (
        <ul
          aria-label="Task counts"
          className="text-muted ml-auto flex items-center gap-3 text-base tabular-nums"
        >
          {TASK_COUNT_STATES.map(({ key, label, color }) => (
            <li key={key} title={label} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`${color} size-2 shrink-0 rounded-full`}
              />
              <span>
                <span className="sr-only">{label}: </span>
                {taskCounts[key]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TimerSettingsDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Settings"
        render={<Button size="icon-toolbar" variant="outline-toolbar" />}
      >
        <Cog6ToothIcon aria-hidden="true" className="size-4.5 stroke-2" />
        <span className="hidden lg:inline">Settings</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/40 fixed inset-0 z-90" />
        <Dialog.Popup className="scrollbar-subtle floating-material text-foreground fixed top-1/2 left-1/2 z-90 max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl p-4 outline-hidden">
          <Dialog.Title className="mb-5 text-center font-medium">
            Settings
          </Dialog.Title>
          <TimerSettings />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function TimerSettings() {
  const {
    snapshot,
    notificationsEnabled,
    setNotificationsEnabled,
    autoplay,
    setAutoplay,
  } = useTimer(
    "snapshot",
    "notificationsEnabled",
    "setNotificationsEnabled",
    "autoplay",
    "setAutoplay"
  );
  const { tickingEnabled, setTickingEnabled } = useTimerTicking();
  const [permissionFailed, setPermissionFailed] = useState(false);
  const browserPermission = useSyncExternalStore(
    subscribePermission,
    notificationPermission,
    serverPermission
  );
  const permission = permissionFailed ? "unsupported" : browserPermission;
  return (
    <div className="space-y-5">
      <div className="divide-border space-y-2.5 divide-y divide-dashed [&>*:not(:last-child)]:pb-2.5">
        <TimerSettingSwitch
          label="Notification"
          icon={<BellAlertIcon aria-hidden="true" className="size-4.5" />}
          title={
            permission === "denied" || permission === "unsupported"
              ? "Browser notifications unavailable"
              : "Notification"
          }
          disabled={
            !canUseTimer(snapshot) ||
            permission === "denied" ||
            permission === "unsupported"
          }
          checked={permission === "granted" && notificationsEnabled}
          onCheckedChange={(pressed) => {
            if (permission === "default") {
              void Notification.requestPermission()
                .then((result) => {
                  void setNotificationsEnabled(result === "granted");
                  window.dispatchEvent(new Event("timer-notifications"));
                })
                .catch(() => {
                  setPermissionFailed(true);
                });
            } else {
              void setNotificationsEnabled(pressed);
            }
          }}
        />
        <TimerSettingSwitch
          label="Autoplay"
          icon={<ForwardIcon aria-hidden="true" className="size-4.5" />}
          title="Autoplay"
          disabled={!canUseTimer(snapshot)}
          checked={autoplay}
          onCheckedChange={(next) => {
            void setAutoplay(next);
          }}
        />
        <MultitaskSetting />
        <TimerSettingSwitch
          label="Sound"
          title="Sound"
          icon={<SpeakerWaveIcon aria-hidden="true" className="size-4.5" />}
          disabled={!canUseTimer(snapshot)}
          checked={tickingEnabled}
          onCheckedChange={setTickingEnabled}
        />
      </div>
      <PresetSettings />
    </div>
  );
}

function MultitaskSetting() {
  const { snapshot, error, multitask, setMultitask } = useTimer(
    "snapshot",
    "error",
    "multitask",
    "setMultitask"
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const toggleRef = useRef<HTMLElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  async function confirmSingleTask() {
    setFailed(false);
    const saving = setMultitask(false);
    setConfirmOpen(false);
    if (!(await saving)) {
      setFailed(true);
    }
  }

  return (
    <AlertDialog.Root
      open={confirmOpen}
      onOpenChange={(open) => {
        setConfirmOpen(open);
      }}
    >
      <TimerSettingSwitch
        checked={multitask}
        disabled={!canUseTimer(snapshot)}
        dimWhenDisabled={!canUseTimer(snapshot)}
        icon={<Square3Stack3DIcon aria-hidden="true" className="size-4.5" />}
        label="Multitask"
        ref={toggleRef}
        onCheckedChange={(checked) => {
          const running =
            snapshot?.day.tasks.filter((task) => task.startedAt !== null)
              .length ?? 0;
          if (!checked && running > 1) {
            setFailed(false);
            setConfirmOpen(true);
          } else {
            void setMultitask(checked);
          }
        }}
      />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="bg-foreground/40 fixed inset-0 z-90" />
        <AlertDialog.Popup
          className="border-border bg-background text-foreground shadow-floating fixed top-1/2 left-1/2 z-90 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 outline-hidden"
          initialFocus={cancelRef}
          finalFocus={toggleRef}
        >
          <AlertDialog.Title className="font-semibold">
            Turn off Multitask?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-muted mt-2 text-sm">
            Only the most recent task will continue
          </AlertDialog.Description>
          {failed ? (
            <p className="text-danger mt-3 text-sm" role="alert">
              {error ?? "Could not turn off Multitask. Please try again."}
            </p>
          ) : null}
          <div className="mt-5 flex justify-end gap-3">
            <AlertDialog.Close
              render={<Button ref={cancelRef} variant="secondary" />}
            >
              Cancel
            </AlertDialog.Close>
            <Button
              onClick={() => {
                void confirmSingleTask();
              }}
            >
              OK
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function TimerSettingSwitch({
  ref,
  label,
  icon,
  title = label,
  checked,
  disabled,
  dimWhenDisabled = true,
  onCheckedChange,
}: {
  ref?: Ref<HTMLElement>;
  label: string;
  icon: ReactNode;
  title?: string;
  checked: boolean;
  disabled: boolean;
  dimWhenDisabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center justify-between gap-5 ${disabled ? "cursor-not-allowed" : ""}`}
      title={title}
    >
      <span className="flex items-center gap-3">
        <span className="text-muted">{icon}</span>
        <span>{label}</span>
      </span>
      <Switch.Root
        id={id}
        ref={ref}
        aria-label={label}
        className={`focus-visible:outline-action data-checked:bg-action bg-border not-data-disabled:not-data-checked:hover:bg-border-hover/60 not-data-disabled:data-checked:hover:bg-action/85 block w-11 shrink-0 cursor-pointer rounded-full p-1 outline-hidden transition-colors duration-150 focus-visible:outline-2 data-disabled:cursor-not-allowed ${dimWhenDisabled ? "data-disabled:opacity-50" : "data-disabled:opacity-100"}`}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        checked={checked}
      >
        <Switch.Thumb className="bg-surface block h-4 w-4 rounded-full transition-transform duration-100 will-change-transform data-checked:translate-x-5 motion-reduce:transition-none" />
      </Switch.Root>
    </label>
  );
}
