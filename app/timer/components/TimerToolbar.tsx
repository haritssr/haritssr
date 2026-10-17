import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { BellAlertIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

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
    <div className="flex w-full flex-row-reverse items-center justify-between border-b pb-4">
      <div className="flex shrink-0 items-center gap-3">
        <TimerSettings />
        <TaskViewSwitcher onViewChange={onViewChange} view={view} />
      </div>
      <AddTask disabled={snapshot === undefined || snapshot.mode === "demo"} />
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
    </div>
  );
}

function TimerSettingToggle({
  label,
  icon,
  title = label,
  checked,
  disabled,
  onCheckedChange,
}: {
  label: string;
  icon: ReactNode;
  title?: string;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Toggle
      aria-label={label}
      className="border-border text-secondary-foreground hover:bg-foreground/5 focus-visible:outline-action data-pressed:border-action data-pressed:text-action corner-squircle relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center gap-1.5 border px-3 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-xl last:rounded-r-xl focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:z-10 motion-reduce:transition-none"
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
          { value: "cards", label: "Cards" },
          { value: "list", label: "List" },
        ] as const
      ).map(({ value, label }) => (
        <Toggle
          aria-label={label}
          className="border-border text-secondary-foreground hover:bg-foreground/5 focus-visible:outline-action data-pressed:border-action data-pressed:text-action corner-squircle relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center gap-1.5 border px-3 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-xl last:rounded-r-xl focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:z-10 motion-reduce:transition-none"
          key={value}
          title={label}
          value={value}
        >
          <span className="block">{label}</span>
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
