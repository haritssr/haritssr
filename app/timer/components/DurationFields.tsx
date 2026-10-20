import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";

import Button from "@/components/Button";

const DURATION_PRESETS = [5, 15, 30, 60];

export default function DurationFields({
  defaultDuration,
  disabled,
}: {
  defaultDuration: number;
  disabled: boolean;
}) {
  const id = useId();
  const [duration, setDuration] = useState({
    hours: String(Math.floor(defaultDuration / 3600)),
    minutes: String(Math.floor((defaultDuration % 3600) / 60)),
    seconds: String(defaultDuration % 60),
  });
  const totalSeconds =
    Number(duration.hours) * 3600 +
    Number(duration.minutes) * 60 +
    Number(duration.seconds);
  const presetSelected = DURATION_PRESETS.some(
    (minutes) => totalSeconds === minutes * 60
  );

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="mb-2 text-sm">Duration</legend>
      <div className="grid grid-cols-3 gap-3">
        {(["hours", "minutes", "seconds"] as const).map((unit) => (
          <NumberField.Root
            className="flex min-w-0 flex-col gap-2 text-sm"
            disabled={disabled}
            format={{ useGrouping: false, maximumFractionDigits: 0 }}
            id={`${id}-${unit}`}
            key={unit}
            max={unit === "hours" ? 24 : 59}
            min={0}
            name={unit}
            onValueChange={(value) => {
              setDuration((current) => ({
                ...current,
                [unit]: value === null ? "" : String(value),
              }));
            }}
            required
            smallStep={1}
            step={1}
            value={duration[unit] === "" ? null : Number(duration[unit])}
          >
            <label className="text-muted capitalize" htmlFor={`${id}-${unit}`}>
              {unit}
            </label>
            <NumberField.Group className="border-border bg-background focus-within:border-action focus-within:ring-action/20 flex h-8.5 min-w-0 items-center overflow-hidden rounded-lg border focus-within:ring-2">
              <NumberField.Decrement
                aria-label={`Decrease ${unit}`}
                className="hover:bg-interface-hover focus-visible:outline-action flex h-full w-8 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-2 data-disabled:cursor-default data-disabled:opacity-40"
              >
                <MinusIcon aria-hidden="true" className="size-4" />
              </NumberField.Decrement>
              <NumberField.Input
                className="form-control h-full w-full min-w-0 bg-transparent px-1 text-center text-base tabular-nums outline-hidden"
                inputMode="numeric"
              />
              <NumberField.Increment
                aria-label={`Increase ${unit}`}
                className="hover:bg-interface-hover focus-visible:outline-action flex h-full w-8 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-2 data-disabled:cursor-default data-disabled:opacity-40"
              >
                <PlusIcon aria-hidden="true" className="size-4" />
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        ))}
      </div>
      <fieldset
        aria-label="Duration presets"
        className="border-border grid grid-cols-4 gap-2"
      >
        <p className="text-muted col-span-4 text-sm">Presets</p>
        {DURATION_PRESETS.map((minutes) => (
          <Button
            aria-pressed={totalSeconds === minutes * 60}
            key={minutes}
            tabIndex={presetSelected ? -1 : 0}
            onClick={() => {
              setDuration({
                hours: String(Math.floor(minutes / 60)),
                minutes: String(minutes % 60),
                seconds: "0",
              });
            }}
            variant={
              totalSeconds === minutes * 60
                ? "action-outline-regular"
                : "outline-regular"
            }
          >
            {minutes === 60 ? "1 hour" : `${minutes} min`}
          </Button>
        ))}
      </fieldset>
    </fieldset>
  );
}
