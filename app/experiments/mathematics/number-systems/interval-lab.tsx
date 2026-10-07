"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

import type { Interval } from "./model";
import { intervalDetails } from "./model";

const initialInterval: Interval = {
  lower: -2,
  upper: 3,
  includeLower: true,
  includeUpper: false,
  unboundedLower: false,
  unboundedUpper: false,
};
const presets = [
  { name: "Half-open", interval: initialInterval },
  { name: "Open", interval: { ...initialInterval, includeLower: false } },
  { name: "Closed", interval: { ...initialInterval, includeUpper: true } },
  { name: "Ray", interval: { ...initialInterval, unboundedUpper: true } },
  {
    name: "All real numbers",
    interval: {
      ...initialInterval,
      unboundedLower: true,
      unboundedUpper: true,
    },
  },
] as const;
const bounds = ["lower", "upper"] as const;
const intervalKeys = [
  "lower",
  "upper",
  "includeLower",
  "includeUpper",
  "unboundedLower",
  "unboundedUpper",
] as const;
const ticks = Array.from({ length: 13 }, (_, index) => index - 6);
const position = (value: number) => 40 + ((value + 6) / 12) * 560;

export default function IntervalLab() {
  const [interval, setInterval] = useState<Interval>(initialInterval);
  const details = intervalDetails(interval);
  const left = interval.unboundedLower ? 18 : position(interval.lower);
  const right = interval.unboundedUpper ? 622 : position(interval.upper);

  function update<K extends keyof Interval>(key: K, value: Interval[K]) {
    setInterval((current) => ({ ...current, [key]: value }));
  }

  return (
    <section
      aria-labelledby="interval-lab-heading"
      className="border-border text-foreground overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2
          className="text-foreground text-lg font-semibold"
          id="interval-lab-heading"
        >
          Build an interval
        </h2>
        <p className="text-muted mt-1 text-sm leading-6">
          Move the endpoints and decide whether to include them. Unbounded sides
          extend to infinity.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0 space-y-6 p-5 sm:p-6">
          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Interval examples</legend>
            {presets.map((preset) => (
              <button
                aria-pressed={intervalKeys.every(
                  (key) => interval[key] === preset.interval[key]
                )}
                className="border-border text-foreground hover:bg-interface-hover focus-visible:outline-action aria-pressed:border-action aria-pressed:bg-action/10 min-h-11 cursor-pointer rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                key={preset.name}
                onClick={() => {
                  setInterval(preset.interval);
                }}
                type="button"
              >
                {preset.name}
              </button>
            ))}
          </fieldset>
          <div aria-live="polite" className="space-y-4">
            <div className="border-border rounded-xl border px-4 py-3 text-center">
              <p className="text-muted text-xs font-medium">
                Interval notation
              </p>
              <div className="overflow-x-auto">
                {katexify(details.notation, true)}
              </div>
            </div>
            <div className="text-center">
              <p className="text-muted mb-2 text-xs font-medium">
                Equivalent condition
              </p>
              <div className="overflow-x-auto text-sm">
                {katexify(details.inequality, false)}
              </div>
            </div>
            <p className="text-muted text-sm leading-6">
              {details.description}
            </p>
          </div>
          <figure>
            <div className="relative">
              <svg
                aria-hidden="true"
                className="h-24 w-full"
                focusable="false"
                preserveAspectRatio="none"
                viewBox="0 0 640 96"
              >
                <path
                  d="M18 48H622M26 42L18 48L26 54M614 42L622 48L614 54"
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                {ticks.map((tick) => (
                  <line
                    key={tick}
                    stroke="var(--color-muted)"
                    vectorEffect="non-scaling-stroke"
                    x1={position(tick)}
                    x2={position(tick)}
                    y1="40"
                    y2="56"
                  />
                ))}
                {details.empty ? null : (
                  <g stroke="var(--color-action)" strokeWidth="3">
                    <line
                      x1={left}
                      x2={right}
                      y1="48"
                      y2="48"
                      vectorEffect="non-scaling-stroke"
                    />
                    {bounds.map((bound) => {
                      const isLower = bound === "lower";
                      const unbounded = isLower
                        ? interval.unboundedLower
                        : interval.unboundedUpper;
                      const x = isLower ? left : right;
                      if (unbounded) {
                        const direction = isLower ? 1 : -1;
                        return (
                          <path
                            d={`M${x + direction * 12} 40L${x} 48L${x + direction * 12} 56`}
                            fill="none"
                            key={bound}
                            vectorEffect="non-scaling-stroke"
                          />
                        );
                      }
                      return null;
                    })}
                  </g>
                )}
              </svg>
              {details.empty
                ? null
                : bounds.map((bound) => {
                    const isLower = bound === "lower";
                    const unbounded = isLower
                      ? interval.unboundedLower
                      : interval.unboundedUpper;
                    const included = isLower
                      ? interval.includeLower
                      : interval.includeUpper;
                    if (unbounded) {
                      return null;
                    }
                    return (
                      <span
                        aria-hidden="true"
                        className="border-action bg-background absolute top-12 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                        key={bound}
                        style={{
                          left: `${(position(interval[bound]) / 640) * 100}%`,
                          backgroundColor: included
                            ? "var(--color-action)"
                            : undefined,
                        }}
                      />
                    );
                  })}
            </div>
            <div
              className="relative -mt-6 h-7 text-xs sm:text-sm"
              aria-hidden="true"
            >
              {ticks
                .filter((tick) => tick % 2 === 0)
                .map((tick) => (
                  <span
                    className="text-muted absolute -translate-x-1/2"
                    key={tick}
                    style={{ left: `${(position(tick) / 640) * 100}%` }}
                  >
                    {katexify(`${tick}`, false)}
                  </span>
                ))}
            </div>
            <figcaption className="text-muted mt-4 text-sm leading-6">
              A filled marker includes an endpoint; a hollow marker excludes it.
              Arrows mean the interval continues beyond the displayed window.
            </figcaption>
          </figure>
        </div>
        <div className="border-border text-foreground min-w-0 space-y-6 border-t p-5 sm:p-6 lg:border-t-0 lg:border-l">
          {bounds.map((bound) => {
            const isLower = bound === "lower";
            const includeKey = isLower ? "includeLower" : "includeUpper";
            const unboundedKey = isLower ? "unboundedLower" : "unboundedUpper";
            const unbounded = interval[unboundedKey];
            return (
              <fieldset className="space-y-3" key={bound}>
                <legend className="mb-3 text-sm font-semibold">
                  {isLower ? "Left endpoint" : "Right endpoint"}
                </legend>
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm" htmlFor={`interval-${bound}`}>
                    {isLower ? "Lower bound" : "Upper bound"}
                  </label>
                  <output htmlFor={`interval-${bound}`}>
                    {katexify(
                      unbounded
                        ? `${isLower ? "-" : ""}\\infty`
                        : `${interval[bound]}`,
                      false
                    )}
                  </output>
                </div>
                <input
                  className="accent-action focus-visible:outline-action w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-40"
                  disabled={unbounded}
                  id={`interval-${bound}`}
                  min="-6"
                  max="6"
                  step="1"
                  type="range"
                  value={interval[bound]}
                  onChange={(event) => {
                    update(bound, event.currentTarget.valueAsNumber);
                  }}
                />
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    className="accent-action size-4"
                    type="checkbox"
                    checked={interval[includeKey] && !unbounded}
                    disabled={unbounded}
                    onChange={(event) => {
                      update(includeKey, event.currentTarget.checked);
                    }}
                  />
                  Include this endpoint
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    className="accent-action size-4"
                    type="checkbox"
                    checked={unbounded}
                    onChange={(event) => {
                      update(unboundedKey, event.currentTarget.checked);
                    }}
                  />
                  {isLower ? "Unbounded to the left" : "Unbounded to the right"}
                </label>
              </fieldset>
            );
          })}
          <p className="text-muted border-border border-t pt-4 text-xs leading-5">
            Infinity is not a real endpoint, so it always takes a parenthesis.
            Try equal endpoints or put the lower bound above the upper bound.
          </p>
        </div>
      </div>
    </section>
  );
}
