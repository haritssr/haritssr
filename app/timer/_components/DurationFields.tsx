import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useId } from "react";

import Button from "@/components/Button";

import {
  durationSeconds,
  durationValue,
  formatPresetDuration,
} from "./durationValue";
import type { DurationValue } from "./durationValue";

export default function DurationFields({
  value: duration,
  onChange,
  disabled,
  presets,
  hideLegend = false,
}: {
  value: DurationValue;
  onChange: (value: DurationValue) => void;
  disabled: boolean;
  presets?: number[];
  hideLegend?: boolean;
}) {
  const id = useId();
  const totalSeconds = durationSeconds(duration);

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className={hideLegend ? "sr-only" : "mb-2 text-sm"}>
        Duration
      </legend>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,5rem),1fr))] gap-2">
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
              onChange({
                ...duration,
                [unit]: value === null ? "" : String(value),
              });
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
      {presets === undefined || presets.length === 0 ? null : (
        <fieldset
          aria-label="Duration presets"
          className="border-border border-t border-dashed pt-3"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-2">
            {presets.map((seconds, index) => (
              <Button
                aria-pressed={totalSeconds === seconds}
                className="h-8.5"
                key={`${index}-${seconds}`}
                onClick={() => {
                  onChange(durationValue(seconds));
                }}
                variant={
                  totalSeconds === seconds
                    ? "action-outline-regular"
                    : "outline-regular"
                }
              >
                {formatPresetDuration(seconds)}
              </Button>
            ))}
          </div>
        </fieldset>
      )}
    </fieldset>
  );
}
