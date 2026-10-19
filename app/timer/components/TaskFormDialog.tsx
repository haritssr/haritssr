import { Dialog } from "@base-ui/react/dialog";
import { useId, useState } from "react";
import type { CSSProperties, SubmitEvent } from "react";

import Button from "@/components/Button";

import DurationFields from "./DurationFields";

const INPUT_CLASS =
  "form-control border-border bg-background focus:border-action focus:ring-action/20 w-full rounded-lg border px-3 py-2 text-base outline-hidden focus:ring-2";

const SHEET_STYLE: CSSProperties & { "--timer-safe-bottom": string } = {
  "--timer-safe-bottom":
    "max(calc(var(--spacing) * 5), env(safe-area-inset-bottom))",
};

export default function TaskFormDialog({
  title,
  submitLabel = "Save",
  defaultActivity,
  defaultDescription = "",
  defaultDuration = 1500,
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
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="timer-dialog-backdrop bg-foreground/40 fixed inset-0 z-90" />
      <Dialog.Popup
        style={SHEET_STYLE}
        className="border-border bg-background text-foreground shadow-floating fixed inset-x-0 bottom-0 z-90 max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-3xl border p-4 outline-hidden sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
      >
        <div
          aria-hidden="true"
          className="bg-border mx-auto mb-5 h-1 w-10 rounded-full sm:hidden"
        />
        <form
          className="space-y-5"
          onSubmit={(event) => {
            void onSubmit(event);
          }}
        >
          <TaskFormActions
            busy={busy}
            submitLabel={submitLabel}
            title={title}
          />
          <TaskNameField defaultValue={defaultActivity} disabled={busy} />
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
          {onDelete === undefined ? null : (
            <div className="flex items-center gap-3 pt-2">
              <Button
                disabled={busy}
                onClick={() => {
                  void onDelete();
                }}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          )}
        </form>
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

function TaskNameField({
  defaultValue,
  disabled,
}: {
  defaultValue: string;
  disabled: boolean;
}) {
  const hintId = useId();
  const [length, setLength] = useState(defaultValue.length);
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span>Name</span>
      <span className="relative block">
        <input
          aria-describedby={hintId}
          className={`${INPUT_CLASS} h-10 pr-18`}
          defaultValue={defaultValue}
          disabled={disabled}
          maxLength={20}
          name="activity"
          onChange={(event) => {
            setLength(event.currentTarget.value.length);
          }}
          placeholder="Short title"
          required
        />
        <span
          className={`pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs tabular-nums ${length >= 20 ? "text-attention font-medium" : "text-muted"}`}
          id={hintId}
        >
          <span className="sr-only">Characters: </span>
          {length}/20
        </span>
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
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span>
        Description <span className="text-muted">(optional)</span>
      </span>
      <textarea
        className={`${INPUT_CLASS} h-10 resize-y overflow-hidden`}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={2000}
        name="description"
        rows={1}
      />
    </label>
  );
}

function TaskFormActions({
  busy,
  title,
  submitLabel,
}: {
  busy: boolean;
  title: string;
  submitLabel: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div className="grid w-18 justify-self-start">
        <Dialog.Close
          disabled={busy}
          render={<Button className="w-full!" variant="secondary" />}
        >
          Cancel
        </Dialog.Close>
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
