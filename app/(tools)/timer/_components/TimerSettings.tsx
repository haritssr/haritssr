"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Switch } from "@base-ui/react/switch";
import {
  BellAlertIcon,
  ForwardIcon,
  ListBulletIcon,
  SpeakerWaveIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import {
  createContext,
  use,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ComponentProps, ReactNode, Ref } from "react";

import Button from "@/components/Button";

import useTimerTicking from "../hooks/useTimerTicking";
import { canUseTimer } from "../utils/timer";
import PresetSettings from "./PresetSettings";
import { useTimer } from "./TimerProvider";

type SettingsSection = "general" | "daily";
const SettingsContext = createContext<Dialog.Handle<SettingsSection> | null>(
  null
);

export function TimerSettingsTrigger({
  section = "general",
  children,
  ...props
}: ComponentProps<typeof Button> & { section?: SettingsSection }) {
  const handle = use(SettingsContext);
  if (handle === null) {
    throw new Error("Timer settings triggers require TimerSettingsScope.");
  }
  return (
    <Dialog.Trigger
      handle={handle}
      payload={section}
      render={<Button {...props} />}
    >
      {children}
    </Dialog.Trigger>
  );
}

export default function TimerSettingsScope({
  children,
}: {
  children: ReactNode;
}) {
  // oxlint-disable-next-line react/hook-use-state -- One stable page-scoped handle; Base UI owns the dialog state.
  const [handle] = useState(() => Dialog.createHandle<SettingsSection>());
  return (
    <SettingsContext value={handle}>
      {children}
      <Dialog.Root handle={handle}>
        {({ payload }) => (
          <Dialog.Portal>
            <Dialog.Backdrop className="timer-dialog-backdrop bg-foreground/40 fixed inset-0 z-90" />
            <Dialog.Popup className="corner-squircle scrollbar-subtle floating-material text-foreground fixed top-1/2 left-1/2 z-90 max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg p-4 outline-hidden supports-[corner-shape:squircle]:rounded-2xl">
              <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <Dialog.Title className="col-start-2 text-center font-medium">
                  Settings
                </Dialog.Title>
                <div className="grid w-18 justify-self-end">
                  <Dialog.Close
                    render={<Button className="w-full!" variant="secondary" />}
                  >
                    Done
                  </Dialog.Close>
                </div>
              </div>
              <div className="space-y-5">
                <TimerSettingsControls />
                <PresetSettings dailyOpen={payload === "daily"} />
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </SettingsContext>
  );
}

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

function TimerSettingsControls() {
  const {
    snapshot,
    notificationsEnabled,
    setNotificationsEnabled,
    autoplay,
    setAutoplay,
    desktopListView,
    setDesktopListView,
  } = useTimer(
    "snapshot",
    "notificationsEnabled",
    "setNotificationsEnabled",
    "autoplay",
    "setAutoplay",
    "desktopListView",
    "setDesktopListView"
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
    <div className="divide-border space-y-2.5 divide-y divide-dashed [&>*:not(:last-child)]:pb-2.5">
      <TimerSettingSwitch
        label="Alerts"
        icon={
          <BellAlertIcon aria-hidden="true" className="size-4.5 stroke-2" />
        }
        title={
          permission === "denied" || permission === "unsupported"
            ? "Browser notifications unavailable"
            : "Alerts"
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
        icon={<ForwardIcon aria-hidden="true" className="size-4.5 stroke-2" />}
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
        icon={
          <SpeakerWaveIcon aria-hidden="true" className="size-4.5 stroke-2" />
        }
        disabled={!canUseTimer(snapshot)}
        checked={tickingEnabled}
        onCheckedChange={setTickingEnabled}
      />
      <div className="hidden lg:block">
        <TimerSettingSwitch
          label="List View"
          title="Show horizontal task rows on screens 640px and wider"
          icon={
            <ListBulletIcon aria-hidden="true" className="size-4.5 stroke-2" />
          }
          disabled={!canUseTimer(snapshot)}
          checked={desktopListView}
          onCheckedChange={(next) => {
            void setDesktopListView(next);
          }}
        />
      </div>
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
        icon={
          <Square3Stack3DIcon
            aria-hidden="true"
            className="size-4.5 stroke-2"
          />
        }
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
        <AlertDialog.Backdrop className="timer-dialog-backdrop bg-foreground/40 fixed inset-0 z-90" />
        <AlertDialog.Popup
          className="corner-squircle border-border bg-background text-foreground shadow-floating fixed top-1/2 left-1/2 z-90 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border p-5 outline-hidden supports-[corner-shape:squircle]:rounded-2xl"
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
