import { useState } from "react";
import type { SubmitEvent } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import {
  durationPresetsSchema,
  taskPresetsSchema,
} from "@/app/(tools)/timer/utils/timerValidation";
import Accordion, { AccordionItem } from "@/components/Accordion";
import Button from "@/components/Button";

import DurationFields from "./DurationFields";
import { durationSeconds, durationValue } from "./durationValue";
import type { DurationValue } from "./durationValue";
import { TaskDescriptionField, TaskNameField } from "./TaskFormDialog";

interface PresetDraft {
  id: string;
  activity: string;
  description: string;
  duration: DurationValue;
}

export default function PresetSettings() {
  return (
    <div className="space-y-3">
      <Accordion>
        <PresetEditor kind="duration" />
      </Accordion>
      <Accordion>
        <PresetEditor kind="task" />
      </Accordion>
    </div>
  );
}

function PresetEditor({ kind }: { kind: "duration" | "task" }) {
  const {
    snapshot,
    durationPresets,
    taskPresets,
    setDurationPresets,
    setTaskPresets,
  } = useTimer(
    "snapshot",
    "durationPresets",
    "taskPresets",
    "setDurationPresets",
    "setTaskPresets"
  );
  const [draft, setDraft] = useState<PresetDraft[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const task = kind === "task";
  const limit = task ? 10 : 5;
  const title = task ? "Task Presets" : "Duration Presets";
  const saved: PresetDraft[] = task
    ? taskPresets.map((preset) => ({
        ...preset,
        duration: durationValue(preset.duration),
      }))
    : durationPresets.map((seconds, index) => ({
        id: `duration-${index}`,
        activity: "",
        description: "",
        duration: durationValue(seconds),
      }));
  const entries = draft ?? saved;
  const disabled = !canUseTimer(snapshot) || busy;

  function update(id: string, patch: Partial<PresetDraft>) {
    setDraft(
      entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry))
    );
    setError(null);
  }

  async function save(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = entries.map((entry) => ({
      ...entry,
      duration: durationSeconds(entry.duration),
    }));
    const validUnits = entries.every(
      (entry) =>
        Object.values(entry.duration).every(
          (unit) =>
            unit !== "" && Number.isInteger(Number(unit)) && Number(unit) >= 0
        ) &&
        Number(entry.duration.hours) <= 24 &&
        Number(entry.duration.minutes) <= 59 &&
        Number(entry.duration.seconds) <= 59
    );
    const durations = durationPresetsSchema.safeParse(
      values.map((entry) => entry.duration)
    );
    const tasks = taskPresetsSchema.safeParse(values);
    if (!validUnits || (task ? !tasks.success : !durations.success)) {
      setError(
        task
          ? "Use a name of 1–20 characters, a description of up to 35, and a duration from one second to 24 hours."
          : "Choose durations from one second to 24 hours."
      );
      return;
    }
    setError(null);
    setBusy(true);
    const success =
      task && tasks.success
        ? await setTaskPresets(tasks.data)
        : durations.success && (await setDurationPresets(durations.data));
    setBusy(false);
    if (success) {
      setDraft(null);
    } else {
      setError(
        "Presets could not be saved. Your changes are still here; try again."
      );
    }
  }

  return (
    <AccordionItem
      excludeFromContents
      title={title}
      trailing={
        <span className="text-muted text-xs tabular-nums">
          {entries.length}/{limit}
        </span>
      }
      value={kind}
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          void save(event);
        }}
      >
        <div className="divide-border space-y-5 divide-y divide-dashed [&>*:not(:last-child)]:pb-5">
          {entries.map((entry, index) => (
            <fieldset
              className="min-w-0 space-y-3"
              disabled={disabled}
              key={entry.id}
            >
              <legend className="text-foreground mb-3 w-full font-medium">
                <span className="flex items-center justify-between gap-3">
                  <span>Preset {index + 1}</span>
                  <button
                    aria-label={`Remove ${task ? "task" : "duration"} preset ${index + 1}`}
                    className="text-danger focus-visible:outline-danger cursor-pointer rounded text-sm font-normal focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={disabled || entries.length === 1}
                    onClick={() => {
                      setDraft(entries.filter((item) => item.id !== entry.id));
                      setError(null);
                    }}
                    type="button"
                  >
                    Remove
                  </button>
                </span>
              </legend>
              {task ? (
                <>
                  <TaskNameField
                    value={entry.activity}
                    onChange={(activity) => {
                      update(entry.id, { activity });
                    }}
                    disabled={disabled}
                  />
                  <TaskDescriptionField
                    value={entry.description}
                    onChange={(description) => {
                      update(entry.id, { description });
                    }}
                    disabled={disabled}
                  />
                </>
              ) : null}
              <DurationFields
                hideLegend={!task}
                value={entry.duration}
                onChange={(duration) => {
                  update(entry.id, { duration });
                }}
                disabled={disabled}
              />
            </fieldset>
          ))}
        </div>
        <Button
          className="w-full"
          disabled={disabled || entries.length >= limit}
          onClick={() => {
            setDraft([
              ...entries,
              {
                id: crypto.randomUUID(),
                activity: "",
                description: "",
                duration: durationValue(300),
              },
            ]);
            setError(null);
          }}
          variant="outline-regular"
        >
          Add preset
        </Button>
        {error === null ? null : (
          <p className="text-danger" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            disabled={disabled || draft === null}
            onClick={() => {
              setDraft(null);
              setError(null);
            }}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={disabled || draft === null}
            loading={busy}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </AccordionItem>
  );
}
