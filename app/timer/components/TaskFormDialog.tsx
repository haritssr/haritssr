import { Dialog } from "@base-ui/react/dialog";
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
  defaultActivity,
  defaultDescription = "",
  defaultDuration = 1500,
  busy,
  error,
  onSubmit,
  onDelete,
}: {
  title: string;
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
        className="border-border bg-background text-foreground shadow-floating fixed inset-x-0 bottom-0 z-90 max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-3xl border px-4 py-3.5 outline-hidden sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
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
          <Dialog.Title className="text-center font-semibold">
            {title}
          </Dialog.Title>
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
          <TaskFormActions busy={busy} onDelete={onDelete} />
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
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span>Name</span>
      <input
        className={`${INPUT_CLASS} h-10`}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={120}
        name="activity"
        required
      />
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
  onDelete,
}: {
  busy: boolean;
  onDelete?: () => Promise<void>;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      {onDelete === undefined ? null : (
        <Button
          disabled={busy}
          onClick={() => {
            void onDelete();
          }}
          variant="danger"
        >
          Delete
        </Button>
      )}
      <div className="ml-auto flex items-center gap-3">
        <Dialog.Close disabled={busy} render={<Button variant="secondary" />}>
          Cancel
        </Dialog.Close>
        <Button loading={busy} type="submit">
          Save
        </Button>
      </div>
    </div>
  );
}
