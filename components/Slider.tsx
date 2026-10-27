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
  trackClassName,
  orientation = "horizontal",
  variant = "default",
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  valueText?: string;
  trackClassName?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "music";
}) {
  return (
    <BaseSlider.Root
      className={`relative flex min-w-0 items-center select-none ${orientation === "vertical" ? "h-32 w-5 justify-center" : "w-full"}`}
      orientation={orientation}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      thumbAlignment="edge"
    >
      <BaseSlider.Control
        className={`group/slider relative flex min-w-0 touch-none items-center ${orientation === "vertical" ? "h-full w-full justify-center" : "w-full"}`}
      >
        <BaseSlider.Track
          className={`bg-border relative min-w-0 rounded-full ${variant === "music" ? "group-hover/slider:bg-slider-track-hover" : ""} ${orientation === "horizontal" ? "flex-1" : ""} ${trackClassName ?? (orientation === "vertical" ? "h-full w-1.5" : "h-2.5")}`}
        >
          <BaseSlider.Indicator
            className={`${variant === "music" ? "bg-music" : "bg-action"} absolute rounded-full ${orientation === "vertical" ? "w-full" : "h-full"}`}
          />
          <BaseSlider.Thumb
            aria-label={label}
            aria-valuetext={valueText}
            className="interactive-elevation has-focus-visible:outline-action border-border hover:border-action-hover data-dragging:border-action data-dragging:ring-action/20 bg-surface block h-5 w-5 cursor-pointer rounded-full border outline-hidden has-focus-visible:outline-2 data-dragging:scale-110 data-dragging:cursor-grabbing data-dragging:ring-4 motion-safe:transition-[scale,box-shadow,border-color] motion-safe:duration-150"
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
