import { Switch } from "@base-ui/react/switch";
import { memo } from "react";

import { DAILY_DESCRIPTION_LIMIT } from "../utils/dailyTasks";
import type { DailyDraft } from "./dailyTaskDraft";
import DurationFields from "./DurationFields";
import { TaskDescriptionField, TaskNameField } from "./TaskFormDialog";

const TIME_INPUT_CLASS =
  "form-control border-border bg-background focus:border-action focus:ring-action/20 w-full min-w-0 rounded-lg border px-2.5 py-1.5 text-base outline-hidden focus:ring-2";

interface DailyTaskFieldsProps {
  entry: DailyDraft;
  index: number;
  count: number;
  disabled: boolean;
  onUpdate: (id: string, patch: Partial<DailyDraft>) => void;
  onMove: (id: string, step: -1 | 1) => void;
  onRemove: (id: string) => void;
}

const DailyTaskFields = memo(
  ({
    entry,
    index,
    count,
    disabled,
    onUpdate,
    onMove,
    onRemove,
  }: DailyTaskFieldsProps) => (
    <fieldset disabled={disabled} className="min-w-0 space-y-3">
      <legend className="text-foreground mb-3 w-full font-medium">
        <span className="flex flex-wrap items-center justify-between gap-3">
          <span>Task {index + 1}</span>
          <span className="flex items-center gap-3">
            <button
              type="button"
              className="text-muted focus-visible:outline-action cursor-pointer rounded text-sm font-normal focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Move task ${index + 1} up`}
              disabled={disabled || index === 0}
              onClick={() => {
                onMove(entry.id, -1);
              }}
            >
              Up
            </button>
            <button
              type="button"
              className="text-muted focus-visible:outline-action cursor-pointer rounded text-sm font-normal focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Move task ${index + 1} down`}
              disabled={disabled || index === count - 1}
              onClick={() => {
                onMove(entry.id, 1);
              }}
            >
              Down
            </button>
            <button
              type="button"
              className="text-danger focus-visible:outline-danger cursor-pointer rounded text-sm font-normal focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Remove daily task ${index + 1}`}
              disabled={disabled}
              onClick={() => {
                onRemove(entry.id);
              }}
            >
              Remove
            </button>
          </span>
        </span>
      </legend>
      <TaskNameField
        value={entry.activity}
        onChange={(activity) => {
          onUpdate(entry.id, { activity });
        }}
        disabled={disabled}
      />
      <TaskDescriptionField
        value={entry.description}
        onChange={(description) => {
          onUpdate(entry.id, { description });
        }}
        maxLength={DAILY_DESCRIPTION_LIMIT}
        disabled={disabled}
      />
      <DurationFields
        value={entry.duration}
        onChange={(duration) => {
          onUpdate(entry.id, { duration });
        }}
        disabled={disabled}
      />
      <label
        htmlFor={`daily-window-${entry.id}`}
        className="flex items-center justify-between gap-3 text-sm"
      >
        Scheduled availability
        <Switch.Root
          id={`daily-window-${entry.id}`}
          checked={entry.window !== null}
          disabled={disabled}
          onCheckedChange={(checked) => {
            onUpdate(entry.id, {
              window: checked ? { from: "18:00", until: "00:00" } : null,
            });
          }}
          className="focus-visible:outline-action data-checked:bg-action bg-border block w-10 shrink-0 cursor-pointer rounded-full p-1 outline-hidden focus-visible:outline-2 data-disabled:cursor-not-allowed"
        >
          <Switch.Thumb className="bg-surface block size-4 rounded-full data-checked:translate-x-4" />
        </Switch.Root>
      </label>
      {entry.window === null ? null : (
        <div className="grid grid-cols-2 gap-2">
          <label className="min-w-0 space-y-1 text-sm">
            <span>From (WIB)</span>
            <input
              type="time"
              required
              className={TIME_INPUT_CLASS}
              value={entry.window.from}
              onChange={(event) => {
                onUpdate(entry.id, {
                  window: {
                    from: event.currentTarget.value,
                    until: entry.window?.until ?? "00:00",
                  },
                });
              }}
            />
          </label>
          <label className="min-w-0 space-y-1 text-sm">
            <span>Until (WIB)</span>
            <input
              type="time"
              required
              className={TIME_INPUT_CLASS}
              value={entry.window.until}
              onChange={(event) => {
                onUpdate(entry.id, {
                  window: {
                    from: entry.window?.from ?? "18:00",
                    until: event.currentTarget.value,
                  },
                });
              }}
            />
          </label>
        </div>
      )}
    </fieldset>
  )
);

DailyTaskFields.displayName = "DailyTaskFields";

export default DailyTaskFields;
