import { useCallback, useMemo, useState } from "react";
import type { SubmitEvent } from "react";

import { canUseTimer, MAX_TIMER_TASKS } from "@/app/(tools)/timer/utils/timer";
import Accordion, { AccordionItem } from "@/components/Accordion";
import Button from "@/components/Button";

import {
  dailyTaskDrafts,
  moveDailyDraft,
  newDailyTaskDraft,
  parseDailyDrafts,
} from "./dailyTaskDraft";
import type { DailyDraft } from "./dailyTaskDraft";
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
    },
    [saved]
  );
  const move = useCallback(
    (id: string, step: -1 | 1) => {
      setDraft((current) => moveDailyDraft(current ?? saved, id, step));
      setError(null);
    },
    [saved]
  );
  const remove = useCallback(
    (id: string) => {
      setDraft((current) =>
        (current ?? saved).filter((entry) => entry.id !== id)
      );
      setError(null);
    },
    [saved]
  );

  async function save(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = parseDailyDrafts(entries);
    if (values === null) {
      setError(
        "Use a name of 1–20 characters, a duration from one second to 24 hours, and an end time later than the start. Midnight ends the day."
      );
      return;
    }
    setError(null);
    setBusy(true);
    const success = await setDailyTasks(values);
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
        value="daily"
        trailing={
          <span className="text-muted text-xs tabular-nums">
            {entries.length}/{MAX_TIMER_TASKS}
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
            onUpdate={update}
            onMove={move}
            onRemove={remove}
          />
          <Button
            className="w-full"
            variant="outline-regular"
            disabled={disabled || entries.length >= MAX_TIMER_TASKS}
            onClick={() => {
              const entry = newDailyTaskDraft();
              setDraft((current) => [...(current ?? saved), entry]);
              setError(null);
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
  onUpdate,
  onMove,
  onRemove,
}: {
  entries: DailyDraft[];
  disabled: boolean;
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
          onUpdate={onUpdate}
          onMove={onMove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
