"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";

export default function Slider({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  valueText,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  valueText?: string;
}) {
  return (
    <BaseSlider.Root
      className="relative flex w-full min-w-0 items-center select-none"
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      thumbAlignment="edge"
    >
      <BaseSlider.Control className="relative flex h-8 w-full min-w-0 touch-none items-center">
        <BaseSlider.Track className="bg-border relative h-2 min-w-0 flex-1 rounded-full">
          <BaseSlider.Indicator className="bg-action absolute h-full rounded-full" />
          <BaseSlider.Thumb
            aria-label={label}
            aria-valuetext={valueText}
            className="has-focus-visible:outline-action border-border hover:border-action-hover block h-5 w-5 cursor-pointer rounded-full border bg-white shadow outline-hidden has-focus-visible:outline-2"
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
