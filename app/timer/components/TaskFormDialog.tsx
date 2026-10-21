import { Dialog } from "@base-ui/react/dialog";
import { useId, useRef, useState } from "react";
import type { CSSProperties, RefObject, SubmitEvent } from "react";

import Button from "@/components/Button";

import DeleteTaskButton from "./DeleteTaskButton";
import DurationFields from "./DurationFields";

const INPUT_CLASS =
  "form-control border-border bg-background focus:border-action focus:ring-action/20 w-full rounded-lg border px-2.5 py-1.5 text-base outline-hidden focus:ring-2";

const SHEET_STYLE: CSSProperties & { "--timer-safe-bottom": string } = {
  "--timer-safe-bottom":
    "max(calc(var(--spacing) * 5), env(safe-area-inset-bottom))",
};

export default function TaskFormDialog({
  title,
  submitLabel = "Done",
  defaultActivity,
  defaultDescription = "",
  defaultDuration = 300,
  busy,
  error,
  onSubmit,
  onDelete,
}: {
  title: string;
  submitLabel?: string;
  defaultActivity: string;
  defaultDescription?: string;
  defaultDuration?: number;
  busy: boolean;
  error: string | null;
  onDelete?: () => Promise<void>;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="timer-dialog-backdrop bg-foreground/40 fixed inset-0 z-90" />
      <Dialog.Popup
        initialFocus={nameRef}
        style={SHEET_STYLE}
        className="border-border bg-background text-foreground shadow-floating fixed inset-x-0 bottom-0 z-90 max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-3xl border p-4 outline-hidden sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
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
            defaultValue={defaultActivity}
            disabled={busy}
            inputRef={nameRef}
          />
          <TaskDescriptionField
            defaultValue={defaultDescription}
            disabled={busy}
          />
          <DurationFields defaultDuration={defaultDuration} disabled={busy} />
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
    </Dialog.Portal>
  );
}

function TaskNameField({
  defaultValue,
  disabled,
  inputRef,
}: {
  defaultValue: string;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const hintId = useId();
  const [value, setValue] = useState(defaultValue);
  const { length } = value;
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="flex items-center justify-between">
        <span>Name</span>
        <span
          className={`text-xs tabular-nums ${length >= 20 ? "text-attention font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/20
        </span>
      </span>
      <span className="relative block">
        <input
          aria-describedby={hintId}
          className={`${INPUT_CLASS} h-10 pr-11.5`}
          value={value}
          disabled={disabled}
          maxLength={20}
          name="activity"
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          placeholder="Short title"
          ref={inputRef}
          required
        />

        <Button
          aria-label="Clear name"
          title="Clear"
          className="absolute top-1/2 right-2.5 -translate-y-1/2"
          size="icon-small"
          disabled={disabled || length === 0}
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
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

function TaskDescriptionField({
  defaultValue,
  disabled,
}: {
  defaultValue: string;
  disabled: boolean;
}) {
  const hintId = useId();
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const { length } = value;
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="flex items-center justify-between">
        <span>
          Description <span className="text-muted">(optional)</span>
        </span>
        <span
          className={`text-xs tabular-nums ${length >= 35 ? "text-danger font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/35
        </span>
      </span>
      <span className="relative block">
        <textarea
          aria-describedby={hintId}
          className={`${INPUT_CLASS} scrollbar-subtle block h-10 resize-y overflow-y-auto pr-11.5`}
          value={value}
          disabled={disabled}
          maxLength={35}
          name="description"
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          placeholder="e.g. Review notes and practice"
          ref={descriptionRef}
          rows={2}
        />

        <Button
          aria-label="Clear description"
          title="Clear"
          className="absolute top-1/2 right-2.5 -translate-y-1/2"
          size="icon-small"
          disabled={disabled || length === 0}
          onClick={() => {
            setValue("");
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
          />
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
