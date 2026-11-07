import { Dialog } from "@base-ui/react/dialog";
import { Switch } from "@base-ui/react/switch";
import { useId, useRef, useState } from "react";
import type { CSSProperties, RefObject, SubmitEvent } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { TASK_INPUT_LIMITS } from "@/app/(tools)/timer/utils/timerInput";
import Button from "@/components/Button";

import type { Period, TaskKind } from "../utils/timer";
import { isAllDay, taskKind, timerDate, timerDayBounds } from "../utils/timer";
import { inputTime } from "../utils/timerTime";
import DeleteTaskButton from "./DeleteTaskButton";
import DurationFields from "./DurationFields";
import {
  durationSeconds,
  durationValue,
  formatPresetDuration,
} from "./durationValue";
import TaskKindField from "./TaskKindField";

import styles from "./TaskFormDialog.module.css";

const INPUT_CLASS =
  "form-control border-border bg-white focus:border-action focus:ring-action/20 w-full rounded-lg border px-2.5 py-1.5 text-base outline-hidden focus:ring-2";

const SHEET_STYLE: CSSProperties & { "--timer-safe-bottom": string } = {
  "--timer-safe-bottom":
    "max(calc(var(--spacing) * 5), env(safe-area-inset-bottom))",
};

interface TaskFormDialogProps {
  title: string;
  /** Shown under the title, such as the day a new task is added to. */
  subtitle?: string;
  submitLabel?: string;
  defaultActivity: string;
  defaultDescription?: string;
  defaultDuration?: number;
  defaultKind?: TaskKind;
  defaultPeriod?: Period;
  activityLimit?: number;
  descriptionLimit?: number;
  notice?: string;
  showTaskPresets?: boolean;
  busy: boolean;
  error: string | null;
  onDelete?: () => Promise<void>;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
}

export default function TaskFormDialog(props: TaskFormDialogProps) {
  return (
    <Dialog.Portal>
      <TaskFormPopup {...props} />
    </Dialog.Portal>
  );
}

function TaskFormPopup({
  title,
  subtitle,
  submitLabel = "Done",
  defaultActivity,
  defaultDescription = "",
  defaultDuration = 300,
  defaultKind = "work",
  defaultPeriod,
  activityLimit,
  descriptionLimit,
  notice,
  showTaskPresets = false,
  busy,
  error,
  onSubmit,
  onDelete,
}: TaskFormDialogProps) {
  const { durationPresets, taskPresets } = useTimer(
    "durationPresets",
    "taskPresets"
  );
  const [activity, setActivity] = useState(defaultActivity);
  const [description, setDescription] = useState(defaultDescription);
  const [kind, setKind] = useState<TaskKind>(defaultKind);
  const [duration, setDuration] = useState(() =>
    durationValue(defaultDuration)
  );
  const [windowFrom, setWindowFrom] = useState(
    inputTime(defaultPeriod?.from ?? 0)
  );
  const [windowUntil, setWindowUntil] = useState(
    inputTime(defaultPeriod?.until ?? 0)
  );
  const [allDay, setAllDay] = useState(() => isAllDay(defaultPeriod));
  // Both fields at 00:00 are also the whole day; descriptions are optional
  // only for tasks with a scheduled period.
  const hasWindow =
    !allDay && (windowFrom !== "00:00" || windowUntil !== "00:00");
  const allDayLabelId = useId();
  function chooseAllDay(checked: boolean) {
    setAllDay(checked);
    if (checked || windowFrom !== "00:00" || windowUntil !== "00:00") {
      return;
    }
    // Start an hour-long period at the next 15-minute slot in Jakarta.
    const now = Date.now();
    const minutes = (now - timerDayBounds(timerDate(now)).start) / 60_000;
    const from = Math.min(1380, Math.ceil(minutes / 15) * 15);
    setWindowFrom(inputTime(from));
    setWindowUntil(inputTime(Math.min(1440, from + 60)));
  }
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Dialog.Backdrop className="timer-dialog-backdrop bg-foreground/40 fixed inset-0 z-90 backdrop-blur-xs" />
      <Dialog.Popup
        initialFocus={nameRef}
        style={SHEET_STYLE}
        className="corner-squircle border-border border-hairline bg-background text-foreground shadow-foreground/10 fixed inset-x-0 bottom-0 z-90 flex h-[90dvh] max-h-[90dvh] flex-col overflow-hidden rounded-t-xl shadow-lg outline-hidden supports-[corner-shape:squircle]:rounded-t-3xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:w-[calc(100%-2rem)] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:supports-[corner-shape:squircle]:rounded-3xl"
      >
        <form
          className={`${styles.sheet} relative flex min-h-0 flex-1 flex-col`}
          onSubmit={(event) => {
            void onSubmit(event);
          }}
        >
          <TaskFormActions
            busy={busy}
            onDelete={onDelete}
            submitLabel={submitLabel}
            subtitle={subtitle}
            title={title}
          />
          <div
            className={`${styles.body} flex flex-col gap-5 overflow-y-auto overscroll-contain p-3 pt-18`}
          >
            {notice === undefined ? null : (
              <p className="text-muted text-sm">{notice}</p>
            )}
            <TaskNameField
              value={activity}
              onChange={setActivity}
              disabled={busy}
              inputRef={nameRef}
              maxLength={activityLimit}
            />
            <TaskDescriptionField
              value={description}
              onChange={setDescription}
              maxLength={descriptionLimit}
              optional={hasWindow}
              disabled={busy}
            />
            <TaskKindField
              name="kind"
              value={kind}
              onChange={setKind}
              disabled={busy}
            />
            <DurationFields
              value={duration}
              onChange={setDuration}
              disabled={busy}
              presets={durationPresets}
            />
            <fieldset disabled={busy} className="space-y-2">
              <legend className="mb-2 text-sm">Period</legend>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span id={allDayLabelId} className="text-muted/70">
                  All day
                </span>
                <Switch.Root
                  aria-labelledby={allDayLabelId}
                  checked={allDay}
                  disabled={busy}
                  onCheckedChange={chooseAllDay}
                  className="focus-visible:outline-action data-checked:bg-action bg-border block w-10 shrink-0 cursor-pointer rounded-full p-1 outline-hidden focus-visible:outline-2 data-disabled:cursor-not-allowed"
                >
                  <Switch.Thumb className="bg-surface block size-4 rounded-full data-checked:translate-x-4" />
                </Switch.Root>
              </div>
              {/* All day submits 00:00 to 00:00, which the form reads as 0–1440. */}
              {allDay ? (
                <>
                  <input type="hidden" name="from" value="00:00" />
                  <input type="hidden" name="until" value="00:00" />
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <label className="min-w-0 space-y-1 text-sm">
                    <span className="text-muted/70">From</span>
                    <input
                      type="time"
                      step={900}
                      name="from"
                      value={windowFrom}
                      onChange={(event) => {
                        setWindowFrom(event.currentTarget.value);
                      }}
                      className={`${INPUT_CLASS} cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                      required
                    />
                  </label>
                  <label className="min-w-0 space-y-1 text-sm">
                    <span className="text-muted/70">Until</span>
                    <input
                      type="time"
                      step={900}
                      name="until"
                      value={windowUntil}
                      onChange={(event) => {
                        setWindowUntil(event.currentTarget.value);
                      }}
                      className={`${INPUT_CLASS} cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                      required
                    />
                  </label>
                </div>
              )}
            </fieldset>
            {showTaskPresets ? (
              <fieldset className="space-y-3" disabled={busy}>
                <legend className="mb-2 text-sm">Presets</legend>
                <div className="grid grid-cols-2 gap-2">
                  {taskPresets.map((preset) => {
                    const selected =
                      activity === preset.activity &&
                      description === preset.description &&
                      kind === taskKind(preset) &&
                      durationSeconds(duration) === preset.duration;
                    return (
                      <Button
                        key={preset.id}
                        aria-pressed={selected}
                        align="between"
                        className="h-9 w-full items-center"
                        variant={
                          selected
                            ? "action-outline-regular"
                            : "outline-regular"
                        }
                        onClick={() => {
                          setActivity(preset.activity);
                          setKind(taskKind(preset));
                          setDescription(preset.description);
                          setDuration(durationValue(preset.duration));
                        }}
                      >
                        <span>{preset.activity}</span>
                        <span className="text-muted/70 shrink-0">
                          {formatPresetDuration(preset.duration)}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}
            {error === null ? null : (
              <p className="text-danger text-sm" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      </Dialog.Popup>
    </>
  );
}

export function TaskNameField({
  value,
  onChange,
  disabled,
  inputRef,
  maxLength = TASK_INPUT_LIMITS.activity,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  maxLength?: number;
}) {
  const localRef = useRef<HTMLInputElement>(null);
  const fieldRef = inputRef ?? localRef;
  const hintId = useId();
  const { length } = value;
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="flex items-center justify-between">
        <span>Name</span>
        <span
          className={`text-xs tabular-nums ${length >= maxLength ? "text-danger font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/{maxLength}
        </span>
      </span>
      <span className="relative block">
        <input
          aria-describedby={hintId}
          className={`${INPUT_CLASS} h-10 pr-11.5`}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          name="activity"
          onChange={(event) => {
            onChange(event.currentTarget.value);
          }}
          placeholder="Short title"
          ref={fieldRef}
          required
        />

        <Button
          aria-label="Clear name"
          title="Clear"
          className="absolute top-1/2 right-2.5 -translate-y-1/2"
          size="icon-clear"
          disabled={disabled || length === 0}
          onClick={() => {
            onChange("");
            fieldRef.current?.focus();
          }}
          variant="black"
        >
          <svg
            aria-hidden="true"
            className="size-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 16 16"
          >
            <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </Button>
      </span>
    </label>
  );
}

export function TaskDescriptionField({
  value,
  onChange,
  disabled,
  maxLength = TASK_INPUT_LIMITS.description,
  optional = false,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  maxLength?: number;
  optional?: boolean;
}) {
  const hintId = useId();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { length } = value;
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="flex items-center justify-between">
        <span>Description</span>
        <span
          className={`text-xs tabular-nums ${length >= maxLength ? "text-danger font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/{maxLength}
        </span>
      </span>
      <span className="relative block">
        <input
          aria-describedby={hintId}
          className={`${INPUT_CLASS} pr-11.5`}
          type="text"
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          name="description"
          required={!optional}
          onChange={(event) => {
            onChange(event.currentTarget.value);
          }}
          placeholder="e.g. Review notes and practice"
          ref={descriptionRef}
        />

        <Button
          aria-label="Clear description"
          title="Clear"
          className="absolute top-1/2 right-2.5 -translate-y-1/2"
          size="icon-clear"
          disabled={disabled || length === 0}
          onClick={() => {
            onChange("");
            descriptionRef.current?.focus();
          }}
          variant="black"
        >
          <svg
            aria-hidden="true"
            className="size-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 16 16"
          >
            <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </Button>
      </span>
    </label>
  );
}

function TaskFormActions({
  busy,
  onDelete,
  title,
  subtitle,
  submitLabel,
}: {
  busy: boolean;
  title: string;
  subtitle?: string;
  submitLabel: string;
  onDelete?: () => Promise<void>;
}) {
  return (
    <div
      className={`${styles.header} grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3`}
    >
      <div className="grid w-18 justify-self-start">
        {onDelete === undefined ? (
          <Dialog.Close
            disabled={busy}
            render={<Button className="w-full" variant="secondary" />}
          >
            Cancel
          </Dialog.Close>
        ) : (
          <DeleteTaskButton
            className="w-full"
            disabled={busy}
            onDelete={onDelete}
            variant="danger"
          >
            Delete
          </DeleteTaskButton>
        )}
      </div>
      <div className="text-center">
        <Dialog.Title className="font-medium">{title}</Dialog.Title>
        {subtitle === undefined ? null : (
          <Dialog.Description className="text-muted text-xs">
            {subtitle}
          </Dialog.Description>
        )}
      </div>
      <div className="grid w-18 justify-self-end">
        <Button
          className="w-full"
          data-custom-width=""
          loading={busy}
          type="submit"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
