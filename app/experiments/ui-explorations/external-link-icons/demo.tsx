"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const icons = [
  {
    id: "northeast",
    name: "Northeast arrow",
    meaning: "Right and up",
    description: "A familiar outward gesture, without the box.",
    path: "M6 18 18 6M7 6h11v11",
  },
  {
    id: "short-northeast",
    name: "Short northeast",
    meaning: "A small way out",
    description: "Less shaft, more breathing room beside the text.",
    path: "M9 15 17 7M9 7h8v8",
  },
  {
    id: "corner",
    name: "Open corner",
    meaning: "Outside",
    description: "Only the arrowhead. The lightest diagonal option.",
    path: "M8 6h10v10",
  },
  {
    id: "right",
    name: "Right arrow",
    meaning: "Go",
    description: "A direct forward motion with three simple lines.",
    path: "M4 12h16M14 6l6 6-6 6",
  },
  {
    id: "chevron",
    name: "Right chevron",
    meaning: "Continue",
    description: "Two lines. Also reads as navigation or disclosure.",
    path: "m9 6 6 6-6 6",
  },
  {
    id: "turn",
    name: "Turn outward",
    meaning: "Go out",
    description: "A small bend suggests leaving the current path.",
    path: "M5 18v-8h14M14 5l5 5-5 5",
  },
  {
    id: "exit",
    name: "Exit marker",
    meaning: "Cross a boundary",
    description: "One boundary stroke gives the arrow an outside.",
    path: "M5 5v14M9 12h11M15 7l5 5-5 5",
  },
  {
    id: "solid",
    name: "Solid northeast",
    meaning: "Outward, in one shape",
    description: "A compact filled arrow instead of separate strokes.",
    path: "M7 5h12v12h-3V10L7 19l-2-2 9-9H7Z",
  },
] as const;

type IconOption = (typeof icons)[number];

function ExperimentIcon({
  icon,
  size,
  weight,
}: {
  icon: IconOption;
  size: number;
  weight: number;
}) {
  const filled = icon.id === "solid";

  return (
    <svg
      aria-hidden="true"
      className="inline shrink-0 align-middle"
      fill={filled ? "currentColor" : "none"}
      focusable="false"
      height={size}
      stroke={filled ? "none" : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={icon.path} />
    </svg>
  );
}

function SampleLink({
  icon,
  size,
  weight,
  children = "Visit website",
}: {
  icon: IconOption;
  size: number;
  weight: number;
  children?: ReactNode;
}) {
  return (
    <a
      className="text-action hover:text-action-hover focus-visible:outline-action rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
      href="https://example.com"
      rel="noopener noreferrer"
      target="_blank"
      title="Open example.com in a new tab"
    >
      {children}
      <span className="ml-1 inline whitespace-nowrap">
        <ExperimentIcon icon={icon} size={size} weight={weight} />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function IconComparison({
  componentLink,
}: {
  componentLink: ReactNode;
}) {
  const [selectedId, setSelectedId] = useState<IconOption["id"]>("northeast");
  const [size, setSize] = useState(18);
  const [weight, setWeight] = useState(2);
  const selected = icons.find((icon) => icon.id === selectedId) ?? icons[1];

  function reset() {
    setSelectedId("northeast");
    setSize(18);
    setWeight(2);
  }

  return (
    <div className="space-y-20">
      <div className="border-border rounded-xl border p-5">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-3" htmlFor="external-icon-size">
            <span className="flex justify-between gap-3 text-sm font-medium">
              Icon size
              <span className="text-muted tabular-nums">{size} px</span>
            </span>
            <input
              className="accent-action block min-h-6 w-full cursor-pointer"
              id="external-icon-size"
              max={24}
              min={10}
              onChange={(event) => setSize(Number(event.target.value))}
              step={1}
              type="range"
              value={size}
            />
          </label>
          <label className="space-y-3" htmlFor="external-icon-weight">
            <span className="flex justify-between gap-3 text-sm font-medium">
              Stroke weight
              <span className="text-muted tabular-nums">
                {weight.toFixed(1)}
              </span>
            </span>
            <input
              className="accent-action block min-h-6 w-full cursor-pointer"
              id="external-icon-weight"
              max={2.5}
              min={1}
              onChange={(event) => setWeight(Number(event.target.value))}
              step={0.1}
              type="range"
              value={weight}
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted text-sm">
            Controls apply to the candidates. The filled arrow has no stroke.
          </p>
          <button
            className="border-border hover:bg-surface-hover focus-visible:outline-action cursor-pointer rounded-lg border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <section aria-labelledby="external-icon-preview-heading">
        <h2
          className="mb-4 text-xl font-semibold"
          id="external-icon-preview-heading"
        >
          Side by side
        </h2>
        <div className="border-border grid overflow-hidden rounded-xl border sm:grid-cols-2">
          <div className="border-border space-y-5 border-b p-6 sm:border-r sm:border-b-0">
            <p className="text-muted text-sm">Chosen icon</p>
            <div className="text-base">{componentLink}</div>
            <p className="text-muted text-sm">
              Northeast arrow · 18 px · 2 px stroke
            </p>
          </div>
          <div className="bg-action/3 space-y-5 p-6">
            <p className="text-muted text-sm">{selected.name}</p>
            <div className="text-base">
              <SampleLink icon={selected} size={size} weight={weight} />
            </div>
            <p className="text-muted text-sm">{selected.description}</p>
          </div>
        </div>
      </section>

      <fieldset>
        <legend className="mb-4 text-xl font-semibold">
          Choose a direction
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {icons.map((icon) => (
            <label
              className="border-border has-checked:border-action has-checked:bg-action/5 hover:bg-surface-hover has-focus-visible:outline-action relative flex cursor-pointer flex-col gap-4 rounded-xl border p-4 has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
              key={icon.id}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-action flex h-12 items-center">
                  <ExperimentIcon icon={icon} size={32} weight={weight} />
                </span>
                <input
                  checked={selectedId === icon.id}
                  className="accent-action size-4"
                  name="external-link-icon"
                  onChange={() => setSelectedId(icon.id)}
                  type="radio"
                  value={icon.id}
                />
              </div>
              <span className="space-y-1">
                <span className="block text-sm font-medium">{icon.name}</span>
                <span className="text-muted block text-sm">{icon.meaning}</span>
              </span>
              <span aria-hidden="true" className="text-action text-base">
                Visit website{" "}
                <ExperimentIcon icon={icon} size={size} weight={weight} />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <section aria-labelledby="external-icon-context-heading">
        <h2
          className="mb-4 text-xl font-semibold"
          id="external-icon-context-heading"
        >
          In context
        </h2>
        <div className="border-border space-y-6 rounded-xl border p-6">
          <p className="text-sm leading-relaxed">
            Small text: read the{" "}
            <SampleLink icon={selected} size={size} weight={weight}>
              documentation
            </SampleLink>{" "}
            before getting started.
          </p>
          <p className="text-base leading-relaxed">
            Body text: find more details on the{" "}
            <SampleLink icon={selected} size={size} weight={weight}>
              project website
            </SampleLink>{" "}
            or save it for later.
          </p>
          <p className="text-lg leading-relaxed">
            <SampleLink icon={selected} size={size} weight={weight}>
              Explore the full collection
            </SampleLink>
          </p>
        </div>
        <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">
          All sample links open example.com in a new tab. Try hovering, tabbing
          through the links, and narrowing the window to judge the icon at
          reading size. Right arrows and chevrons can also suggest a next step;
          the diagonal options give a more distinct outward cue.
        </p>
      </section>
    </div>
  );
}
