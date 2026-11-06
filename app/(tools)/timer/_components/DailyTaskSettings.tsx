import { useCallback, useMemo, useState } from "react";
import type { SubmitEvent } from "react";

import { MAX_DAILY_TASKS } from "@/app/(tools)/timer/utils/dailyTasks";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import Accordion, { AccordionItem } from "@/components/Accordion";
import Button from "@/components/Button";

import {
  dailyTaskDrafts,
  moveDailyDraft,
  newDailyTaskDraft,
  parseDailyDrafts,
} from "./dailyTaskDraft";
import type { DailyDraft, DailyDraftError } from "./dailyTaskDraft";
import DailyTaskFields from "./DailyTaskFields";
import { useTimer } from "./TimerProvider";

export default function DailyTaskSettings({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) {
  const { snapshot, dailyTasks, setDailyTasks } = useTimer(
    "snapshot",
    "dailyTasks",
    "setDailyTasks"
  );
  const [draft, setDraft] = useState<DailyDraft[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<DailyDraftError | null>(null);
  const saved = useMemo(() => dailyTaskDrafts(dailyTasks), [dailyTasks]);
  const entries = draft ?? saved;
  const disabled = busy || !canUseTimer(snapshot);

  const update = useCallback(
    (id: string, patch: Partial<DailyDraft>) => {
      setDraft((current) =>
        (current ?? saved).map((entry) =>
          entry.id === id ? { ...entry, ...patch } : entry
        )
      );
      setError(null);
      setFieldError(null);
    },
    [saved]
  );
  const move = useCallback(
    (id: string, step: -1 | 1) => {
      setDraft((current) => moveDailyDraft(current ?? saved, id, step));
      setError(null);
      setFieldError(null);
    },
    [saved]
  );
  const remove = useCallback(
    (id: string) => {
      setDraft((current) =>
        (current ?? saved).filter((entry) => entry.id !== id)
      );
      setError(null);
      setFieldError(null);
    },
    [saved]
  );

  async function save(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = await parseDailyDrafts(entries);
    if (!result.success) {
      setFieldError(result.error);
      const index = entries.findIndex(
        (entry) => entry.id === result.error.taskId
      );
      const entry = entries.find((item) => item.id === result.error.taskId);
      const name = entry?.activity.trim() ?? "";
      const label = name.length > 0 ? ` (${name})` : "";
      setError(
        entry === undefined
          ? result.error.message
          : `Task ${index + 1}${label}: ${result.error.message}`
      );
      if (entry !== undefined) {
        const fieldset = form.querySelector(
          `[data-daily-task="${CSS.escape(entry.id)}"]`
        );
        let selector = 'fieldset input:not([type="hidden"])';
        if (
          result.error.field === "activity" ||
          result.error.field === "description"
        ) {
          selector = `input[name="${result.error.field}"]`;
        } else if (result.error.field === "window") {
          selector = 'input[type="time"]';
        }
        fieldset?.querySelector<HTMLInputElement>(selector)?.focus();
      }
      return;
    }
    setError(null);
    setFieldError(null);
    setBusy(true);
    const success = await setDailyTasks(result.data);
    setBusy(false);
    if (success) {
      setDraft(null);
    } else {
      setError(
        "Daily tasks could not be saved. Your changes are still here; try again."
      );
    }
  }

  return (
    <Accordion defaultValue={defaultOpen ? ["daily"] : []}>
      <AccordionItem
        excludeFromContents
        title="Daily Tasks"
        variant="active-border"
        value="daily"
        trailing={
          <span className="text-muted text-xs tabular-nums">
            {entries.length}/{MAX_DAILY_TASKS}
          </span>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(event) => {
            void save(event);
          }}
        >
          <p className="text-muted text-sm">
            Saved changes apply to future days.
          </p>
          <DailyTaskRows
            entries={entries}
            disabled={disabled}
            fieldError={fieldError}
            onUpdate={update}
            onMove={move}
            onRemove={remove}
          />
          <Button
            className="w-full"
            variant="outline-white"
            disabled={disabled || entries.length >= MAX_DAILY_TASKS}
            onClick={() => {
              const entry = newDailyTaskDraft();
              setDraft((current) => [...(current ?? saved), entry]);
              setError(null);
              setFieldError(null);
            }}
          >
            Add daily task
          </Button>
          {error === null ? null : (
            <p className="text-danger" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant="secondary"
              disabled={disabled || draft === null}
              onClick={() => {
                setDraft(null);
                setError(null);
                setFieldError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={disabled || draft === null}
              loading={busy}
            >
              Save
            </Button>
          </div>
        </form>
      </AccordionItem>
    </Accordion>
  );
}

function DailyTaskRows({
  entries,
  disabled,
  fieldError,
  onUpdate,
  onMove,
  onRemove,
}: {
  entries: DailyDraft[];
  disabled: boolean;
  fieldError: DailyDraftError | null;
  onUpdate: (id: string, patch: Partial<DailyDraft>) => void;
  onMove: (id: string, step: -1 | 1) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="divide-border space-y-5 divide-y divide-dashed [&>*:not(:last-child)]:pb-5">
      {entries.map((entry, index) => (
        <DailyTaskFields
          key={entry.id}
          entry={entry}
          index={index}
          count={entries.length}
          disabled={disabled}
          error={fieldError?.taskId === entry.id ? fieldError : null}
          onUpdate={onUpdate}
          onMove={onMove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
