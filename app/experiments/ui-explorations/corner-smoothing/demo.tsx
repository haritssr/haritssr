"use client";

import { Slider } from "@base-ui/react/slider";
import { generateClipPath } from "@lisse/core/path";
import { useId, useState } from "react";

import styles from "./demo.module.css";

const DEFAULT_SIZE = 176;
const DEFAULT_RADIUS = 48;
const DEFAULT_SMOOTHING = 60;

export default function CornerComparison() {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [smoothing, setSmoothing] = useState(DEFAULT_SMOOTHING);
  const shapeStyle = { width: size, height: size, borderRadius: radius };
  const clipPath = generateClipPath(size, size, {
    radius,
    smoothing: smoothing / 100,
    curve: "squircle",
    preserveSmoothing: false,
  });

  function changeSize(value: number) {
    setSize(value);
    setRadius((previous) => Math.min(previous, value / 2));
  }

  function reset() {
    setSize(DEFAULT_SIZE);
    setRadius(DEFAULT_RADIUS);
    setSmoothing(DEFAULT_SMOOTHING);
  }

  return (
    <div className="space-y-6">
      <div className="border-border rounded-xl border p-5">
        <div className="grid gap-6 sm:grid-cols-3">
          <ComparisonSlider
            label="Size"
            max={224}
            min={80}
            onValueChange={changeSize}
            step={2}
            unit="px"
            value={size}
          />
          <ComparisonSlider
            label="Radius"
            max={size / 2}
            min={0}
            onValueChange={setRadius}
            unit="px"
            value={radius}
          />
          <ComparisonSlider
            label="Lisse smoothing"
            max={100}
            min={0}
            onValueChange={setSmoothing}
            unit="%"
            value={smoothing}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-foreground/70 text-sm">
            Smoothing changes only Lisse. At 0%, it uses circular corners.
          </p>
          <button
            className="border-border hover:bg-foreground/5 focus-visible:outline-action cursor-pointer rounded-lg border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-foreground/80 text-sm">
        <span className={styles.supported}>
          Your browser supports native CSS squircles.
        </span>
        <span className={styles.unsupported}>
          Your browser does not support corner-shape: squircle. The CSS example
          below shows ordinary rounded corners instead.
        </span>
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        <figure className="border-border min-w-0 rounded-xl border p-4">
          <figcaption className="font-semibold">Rounded corners</figcaption>
          <div
            aria-hidden="true"
            className="flex h-64 items-center justify-center"
          >
            <div className="bg-action shrink-0" style={shapeStyle} />
          </div>
          <p className="text-foreground/70 mb-3 text-sm">
            Circular corner arcs.
          </p>
          <CodeSample code={`border-radius: ${radius}px;`} />
        </figure>

        <figure className="border-border min-w-0 rounded-xl border p-4">
          <figcaption className="font-semibold">CSS squircle</figcaption>
          <div
            aria-hidden="true"
            className="flex h-64 items-center justify-center"
          >
            <div
              className="corner-squircle bg-action shrink-0"
              style={shapeStyle}
            />
          </div>
          <p className="text-foreground/70 mb-3 text-sm">
            Native corner shape via Tailwind.
          </p>
          <CodeSample
            code={`border-radius: ${radius}px;\ncorner-shape: squircle;`}
          />
        </figure>

        <figure className="border-border min-w-0 rounded-xl border p-4">
          <figcaption className="font-semibold">Lisse</figcaption>
          <div
            aria-hidden="true"
            className="flex h-64 items-center justify-center"
          >
            <div
              className="bg-action shrink-0"
              style={{ width: size, height: size, clipPath }}
            />
          </div>
          <p className="text-foreground/70 mb-3 text-sm">
            Figma-style smoothing through a path.
          </p>
          <CodeSample
            code={`generateClipPath(${size}, ${size}, {\n  radius: ${radius},\n  smoothing: ${(smoothing / 100).toFixed(2)},\n  curve: "squircle",\n  preserveSmoothing: false,\n});`}
          />
        </figure>
      </div>

      <p className="text-foreground/70 max-w-3xl text-sm leading-relaxed">
        All samples keep their pixel dimensions as you resize the page. The
        radius is capped at half the size. Lisse preserves that radius here and
        reduces smoothing if there is too little edge space, so large radii can
        make the smoothing control less noticeable.
      </p>
    </div>
  );
}

function ComparisonSlider({
  label,
  max,
  min,
  onValueChange,
  step = 1,
  unit,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onValueChange: (value: number) => void;
  step?: number;
  unit: string;
  value: number;
}) {
  const labelId = useId();

  return (
    <Slider.Root
      max={max}
      min={min}
      onValueChange={onValueChange}
      step={step}
      value={value}
    >
      <div className="text-foreground/80 mb-2 flex justify-between gap-3 text-sm">
        <span id={labelId}>{label}</span>
        <Slider.Value className="tabular-nums">
          {() => `${value}${unit === "%" ? "" : " "}${unit}`}
        </Slider.Value>
      </div>
      <Slider.Control className="relative flex h-8 w-full touch-none items-center">
        <Slider.Track className="bg-border relative h-2 flex-1 rounded-full">
          <Slider.Indicator className="bg-action absolute h-full rounded-full" />
          <Slider.Thumb
            aria-labelledby={labelId}
            aria-valuetext={`${value} ${unit === "%" ? "percent" : "pixels"}`}
            className="has-focus-visible:outline-action border-border hover:border-action-hover block size-5 cursor-pointer rounded-full border bg-white outline-hidden has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
          />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

function CodeSample({ code }: { code: string }) {
  return (
    <pre className="bg-foreground/5 scrollbar-subtle overflow-x-auto rounded-lg p-3 text-xs leading-5">
      <code>{code}</code>
    </pre>
  );
}
