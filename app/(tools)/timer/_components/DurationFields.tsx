import Button from "@/components/Button";
import NumberInput from "@/components/NumberInput";

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
  const totalSeconds = durationSeconds(duration);

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className={hideLegend ? "sr-only" : "mb-2 text-sm"}>
        Duration
      </legend>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,6.25rem),1fr))] gap-2">
        {(["hours", "minutes", "seconds"] as const).map((unit) => (
          <NumberInput
            disabled={disabled}
            format={{ useGrouping: false, maximumFractionDigits: 0 }}
            key={unit}
            label={unit}
            max={unit === "hours" ? 24 : 59}
            min={0}
            name={unit}
            onValueChange={(value) => {
              onChange({
                ...duration,
                [unit]: value === null ? "" : String(value),
              });
            }}
            onReset={() => {
              onChange({ ...duration, [unit]: "0" });
            }}
            required
            smallStep={1}
            step={1}
            value={duration[unit] === "" ? null : Number(duration[unit])}
            variant="field"
          />
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
