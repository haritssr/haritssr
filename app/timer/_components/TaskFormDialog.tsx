import { Dialog } from "@base-ui/react/dialog";
import { useId, useRef, useState } from "react";
import type { CSSProperties, RefObject, SubmitEvent } from "react";

import { useTimer } from "@/app/timer/_components/TimerProvider";
import { TASK_INPUT_LIMITS } from "@/app/timer/utils/timerInput";
import Button from "@/components/Button";

import DeleteTaskButton from "./DeleteTaskButton";
import DurationFields from "./DurationFields";
import {
  durationSeconds,
  durationValue,
  formatPresetDuration,
} from "./durationValue";

const INPUT_CLASS =
  "form-control border-border bg-background focus:border-action focus:ring-action/20 w-full rounded-lg border px-2.5 py-1.5 text-base outline-hidden focus:ring-2";

const SHEET_STYLE: CSSProperties & { "--timer-safe-bottom": string } = {
  "--timer-safe-bottom":
    "max(calc(var(--spacing) * 5), env(safe-area-inset-bottom))",
};

interface TaskFormDialogProps {
  title: string;
  submitLabel?: string;
  defaultActivity: string;
  defaultDescription?: string;
  defaultDuration?: number;
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
  submitLabel = "Done",
  defaultActivity,
  defaultDescription = "",
  defaultDuration = 300,
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
  const [duration, setDuration] = useState(() =>
    durationValue(defaultDuration)
  );
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Dialog.Backdrop className="timer-dialog-backdrop bg-foreground/40 fixed inset-0 z-90" />
      <Dialog.Popup
        initialFocus={nameRef}
        style={SHEET_STYLE}
        className="border-border bg-background text-foreground shadow-floating fixed inset-x-0 bottom-0 z-90 h-[90dvh] max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-3xl border p-4 outline-hidden sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:w-[calc(100%-2rem)] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
      >
        <div
          aria-hidden="true"
          className="bg-border mx-auto mb-5 h-1 w-10 rounded-full sm:hidden"
        />
        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            void onSubmit(event);
          }}
        >
          <TaskNameField
            value={activity}
            onChange={setActivity}
            disabled={busy}
            inputRef={nameRef}
          />
          <TaskDescriptionField
            value={description}
            onChange={setDescription}
            disabled={busy}
          />
          <DurationFields
            value={duration}
            onChange={setDuration}
            disabled={busy}
            presets={durationPresets}
          />
          {showTaskPresets ? (
            <fieldset className="space-y-3" disabled={busy}>
              <legend className="mb-2 text-sm">Preset</legend>
              <div className="grid grid-cols-2 gap-2">
                {taskPresets.map((preset) => {
                  const selected =
                    activity === preset.activity &&
                    description === preset.description &&
                    durationSeconds(duration) === preset.duration;
                  return (
                    <Button
                      key={preset.id}
                      aria-pressed={selected}
                      className="h-8.5 w-full items-center justify-between!"
                      variant={
                        selected ? "action-outline-regular" : "outline-regular"
                      }
                      onClick={() => {
                        setActivity(preset.activity);
                        setDescription(preset.description);
                        setDuration(durationValue(preset.duration));
                      }}
                    >
                      <span>{preset.activity}</span>
                      <span className="text-muted shrink-0">
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
          <TaskFormActions
            busy={busy}
            onDelete={onDelete}
            submitLabel={submitLabel}
            title={title}
          />
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
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
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
          className={`text-xs tabular-nums ${length >= TASK_INPUT_LIMITS.activity ? "text-attention font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/{TASK_INPUT_LIMITS.activity}
        </span>
      </span>
      <span className="relative block">
        <input
          aria-describedby={hintId}
          className={`${INPUT_CLASS} h-10 pr-11.5`}
          value={value}
          disabled={disabled}
          maxLength={TASK_INPUT_LIMITS.activity}
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
          size="icon-small"
          disabled={disabled || length === 0}
          onClick={() => {
            onChange("");
            fieldRef.current?.focus();
          }}
          variant="black"
        >
          <svg
            aria-hidden="true"
            className="size-2.5 shrink-0"
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
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  const hintId = useId();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { length } = value;
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="flex items-center justify-between">
        <span>
          Description <span className="text-muted">(optional)</span>
        </span>
        <span
          className={`text-xs tabular-nums ${length >= TASK_INPUT_LIMITS.description ? "text-danger font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/{TASK_INPUT_LIMITS.description}
        </span>
      </span>
      <span className="relative block">
        <input
          aria-describedby={hintId}
          className={`${INPUT_CLASS} pr-11.5`}
          type="text"
          value={value}
          disabled={disabled}
          maxLength={TASK_INPUT_LIMITS.description}
          name="description"
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
          size="icon-small"
          disabled={disabled || length === 0}
          onClick={() => {
            onChange("");
            descriptionRef.current?.focus();
          }}
          variant="black"
        >
          <svg
            aria-hidden="true"
            className="size-2.5 shrink-0"
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
  submitLabel,
}: {
  busy: boolean;
  title: string;
  submitLabel: string;
  onDelete?: () => Promise<void>;
}) {
  return (
    <div className="order-first grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div className="grid w-18 justify-self-start">
        {onDelete === undefined ? (
          <Dialog.Close
            disabled={busy}
            render={<Button className="w-full!" variant="secondary" />}
          >
            Cancel
          </Dialog.Close>
        ) : (
          <DeleteTaskButton
            className="w-full!"
            disabled={busy}
            onDelete={onDelete}
            variant="secondary"
          >
            Delete
          </DeleteTaskButton>
        )}
      </div>
      <Dialog.Title className="text-center font-medium">{title}</Dialog.Title>
      <div className="grid w-18 justify-self-end">
        <Button className="w-full!" loading={busy} type="submit">
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
