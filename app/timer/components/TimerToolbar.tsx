import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  BellAlertIcon,
  ForwardIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode, Ref } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";

import { AddTask } from "./TaskDialog";
import type { TaskView } from "./taskPresentation";

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
  view,
  onViewChange,
}: {
  view: TaskView;
  onViewChange: (view: TaskView) => void;
}) {
  const { snapshot } = useTimer();
  return (
    <div className="border-border flex w-full items-center justify-between pb-5 sm:border-b sm:border-dashed">
      <AddTask disabled={snapshot === undefined || snapshot.mode === "demo"} />
      <div className="flex shrink-0 items-center gap-5">
        <TimerSettings />
        <TaskViewSwitcher onViewChange={onViewChange} view={view} />
      </div>
    </div>
  );
}

function TimerSettings() {
  const {
    snapshot,
    notificationsEnabled,
    setNotificationsEnabled,
    autoplay,
    setAutoplay,
  } = useTimer();
  const [permissionFailed, setPermissionFailed] = useState(false);
  const browserPermission = useSyncExternalStore(
    subscribePermission,
    notificationPermission,
    serverPermission
  );
  const permission = permissionFailed ? "unsupported" : browserPermission;
  return (
    <div className="isolate inline-flex shrink-0 items-center rounded">
      <TimerSettingToggle
        label="Notification"
        icon={<BellAlertIcon aria-hidden="true" className="size-4.5" />}
        title={
          permission === "denied" || permission === "unsupported"
            ? "Browser notifications unavailable"
            : "Notification"
        }
        disabled={
          snapshot?.mode !== "local" ||
          permission === "denied" ||
          permission === "unsupported"
        }
        checked={permission === "granted" && notificationsEnabled}
        onCheckedChange={(pressed) => {
          if (permission === "default") {
            void Notification.requestPermission()
              .then((result) => {
                setNotificationsEnabled(result === "granted");
                window.dispatchEvent(new Event("timer-notifications"));
              })
              .catch(() => {
                setPermissionFailed(true);
              });
          } else {
            setNotificationsEnabled(pressed);
          }
        }}
      />
      <TimerSettingToggle
        label="Autoplay"
        icon={<ForwardIcon aria-hidden="true" className="size-4.5" />}
        title="Autoplay"
        disabled={snapshot?.mode !== "local"}
        checked={autoplay}
        onCheckedChange={setAutoplay}
      />
      <MultitaskSetting />
    </div>
  );
}

function MultitaskSetting() {
  const { snapshot, busy, error, multitask, setMultitask } = useTimer();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  async function confirmSingleTask() {
    setFailed(false);
    if (await setMultitask(false)) {
      setConfirmOpen(false);
    } else {
      setFailed(true);
    }
  }

  return (
    <AlertDialog.Root
      open={confirmOpen}
      onOpenChange={(open) => {
        if (!busy) {
          setConfirmOpen(open);
        }
      }}
    >
      <TimerSettingToggle
        checked={multitask}
        disabled={snapshot?.mode !== "local" || busy}
        dimWhenDisabled={snapshot?.mode !== "local"}
        icon={<Squares2X2Icon aria-hidden="true" className="size-4.5" />}
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
              disabled={busy}
              render={<Button ref={cancelRef} variant="secondary" />}
            >
              Cancel
            </AlertDialog.Close>
            <Button
              disabled={busy}
              loading={busy}
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

function TimerSettingToggle({
  ref,
  label,
  icon,
  title = label,
  checked,
  disabled,
  dimWhenDisabled = true,
  onCheckedChange,
}: {
  ref?: Ref<HTMLButtonElement>;
  label: string;
  icon: ReactNode;
  title?: string;
  checked: boolean;
  disabled: boolean;
  dimWhenDisabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Toggle
      ref={ref}
      aria-label={label}
      className={`border-border text-muted hover:bg-foreground/5 focus-visible:outline-foreground data-pressed:border-border data-pressed:text-action corner-squircle relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center gap-1.5 border px-3 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-xl last:rounded-r-xl focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-pressed:z-10 motion-reduce:transition-none ${dimWhenDisabled ? "data-disabled:opacity-50" : "data-disabled:opacity-100"}`}
      disabled={disabled}
      onPressedChange={onCheckedChange}
      pressed={checked}
      title={title}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Toggle>
  );
}

function TaskViewSwitcher({
  onViewChange,
  view,
}: {
  onViewChange: (view: TaskView) => void;
  view: TaskView;
}) {
  return (
    <ToggleGroup
      aria-label="Task view"
      className="isolate hidden shrink-0 items-center rounded sm:inline-flex"
      onValueChange={(values: TaskView[]) => {
        const [next] = values;
        if (next !== undefined) {
          onViewChange(next);
        }
      }}
      value={[view]}
    >
      {(
        [
          { value: "cards", label: "Cards", icon: Squares2X2Icon },
          { value: "list", label: "List", icon: ListBulletIcon },
        ] as const
      ).map(({ value, label, icon: Icon }) => (
        <Toggle
          aria-label={label}
          className="border-border text-muted hover:bg-foreground/5 focus-visible:outline-foreground data-pressed:border-border data-pressed:text-action corner-squircle relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center gap-1.5 border px-3 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-xl last:rounded-r-xl focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:z-10 motion-reduce:transition-none"
          key={value}
          title={label}
          value={value}
        >
          <Icon aria-hidden="true" className="size-4.5" />
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
