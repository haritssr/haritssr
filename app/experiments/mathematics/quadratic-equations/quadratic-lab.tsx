"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

import { graphPath, graphX, graphY } from "../graph";
import type { Coefficients } from "./model";
import { format, polynomialTex, quadraticDetails } from "./model";

const presets = [
  { label: "Two real roots", a: 1, b: -3, c: 2 },
  { label: "Repeated root", a: 1, b: -2, c: 1 },
  { label: "No real roots", a: 1, b: 0, c: 1 },
] as const;
const leadingCoefficients = [-3, -2, -1, 1, 2, 3];

function axisTicks(min: number, max: number): number[] {
  const targetStep = (max - min) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(targetStep));
  const multiple =
    [1, 2, 5, 10].find((value) => value * magnitude >= targetStep) ?? 10;
  const step = multiple * magnitude;
  const first = Math.ceil(min / step) * step;
  return Array.from(
    { length: Math.floor((max - first) / step) + 1 },
    (_, index) => first + index * step
  );
}

export default function QuadraticLab() {
  const [coefficients, setCoefficients] = useState<Coefficients>({
    a: 1,
    b: -3,
    c: 2,
  });
  const { a, b, c } = coefficients;
  const { discriminant, roots, rootsTex, vertexX, vertexY } =
    quadraticDetails(coefficients);
  const range = {
    xMin: Math.floor(Math.min(-4, vertexX - 2, ...roots.map((x) => x - 1))),
    xMax: Math.ceil(Math.max(4, vertexX + 2, ...roots.map((x) => x + 1))),
    yMin: Math.floor(Math.min(-3, vertexY - 2, c - 2)),
    yMax: Math.ceil(Math.max(5, vertexY + 2, c + 2)),
  };
  const xTicks = axisTicks(range.xMin, range.xMax);
  const yTicks = axisTicks(range.yMin, range.yMax);
  let rootDescription =
    "No real roots: the curve stays on one side of the horizontal axis.";
  if (discriminant > 0) {
    rootDescription =
      "Two distinct real roots: the curve crosses the horizontal axis twice.";
  } else if (discriminant === 0) {
    rootDescription =
      "One repeated real root: the vertex touches the horizontal axis.";
  }

  function updateCoefficient(key: keyof Coefficients, value: number) {
    setCoefficients((current) => ({ ...current, [key]: value }));
  }

  return (
    <section
      aria-labelledby="quadratic-lab-heading"
      className="border-border overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold" id="quadratic-lab-heading">
          See where the roots come from
        </h2>
        <p className="text-muted mt-1 text-sm leading-6">
          Change the coefficients or choose an example. The view adjusts to keep
          the vertex and real roots visible.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <figure className="min-w-0 p-5 sm:p-6">
          <div className="text-foreground overflow-x-auto pb-3 text-center">
            {katexify(`y=${polynomialTex(coefficients)}`, true)}
          </div>
          <svg
            aria-hidden="true"
            className="w-full"
            focusable="false"
            viewBox="0 0 680 340"
          >
            <defs>
              <clipPath id="quadratic-plot-clip">
                <rect height="278" width="568" x="54" y="20" />
              </clipPath>
            </defs>
            {xTicks.map((tick) => (
              <g key={`x-${tick}`}>
                <line
                  stroke="var(--color-border)"
                  x1={graphX(tick, range)}
                  x2={graphX(tick, range)}
                  y1="20"
                  y2="298"
                />
                <foreignObject
                  height="28"
                  width="52"
                  x={graphX(tick, range) - 26}
                  y="303"
                >
                  <div className="text-muted text-center text-xl sm:text-xs">
                    {katexify(format(tick), false)}
                  </div>
                </foreignObject>
              </g>
            ))}
            {yTicks.map((tick) => (
              <g key={`y-${tick}`}>
                <line
                  stroke="var(--color-border)"
                  x1="54"
                  x2="622"
                  y1={graphY(tick, range)}
                  y2={graphY(tick, range)}
                />
                <foreignObject
                  height="28"
                  width="46"
                  x="0"
                  y={graphY(tick, range) - 10}
                >
                  <div className="text-muted text-right text-xl sm:text-xs">
                    {katexify(format(tick), false)}
                  </div>
                </foreignObject>
              </g>
            ))}
            <line
              stroke="var(--color-muted)"
              strokeWidth="1.5"
              x1="54"
              x2="622"
              y1={graphY(0, range)}
              y2={graphY(0, range)}
            />
            <line
              stroke="var(--color-muted)"
              strokeWidth="1.5"
              x1={graphX(0, range)}
              x2={graphX(0, range)}
              y1="20"
              y2="298"
            />
            <g clipPath="url(#quadratic-plot-clip)">
              <path
                d={graphPath(
                  range.xMin,
                  range.xMax,
                  (x) => a * x * x + b * x + c,
                  range
                )}
                fill="none"
                stroke="var(--color-action)"
                strokeWidth="3"
              />
              {roots.map((root) => (
                <circle
                  cx={graphX(root, range)}
                  cy={graphY(0, range)}
                  fill="var(--color-action)"
                  key={root}
                  r="5"
                />
              ))}
              <circle
                cx={graphX(vertexX, range)}
                cy={graphY(vertexY, range)}
                fill="var(--color-background)"
                r="6"
                stroke="var(--color-foreground)"
                strokeWidth="2"
              />
            </g>
          </svg>
          <figcaption className="text-muted mt-2 text-sm leading-6">
            The horizontal axis is {katexify("x", false)} and the vertical axis
            is {katexify("y", false)}. Filled dots mark real roots; the outlined
            dot marks the vertex. Values are rounded to three decimal places.
          </figcaption>
        </figure>

        <div className="border-border min-w-0 space-y-6 border-t p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                aria-pressed={
                  a === preset.a && b === preset.b && c === preset.c
                }
                className="border-border text-foreground hover:bg-interface-hover focus-visible:outline-action aria-pressed:border-action aria-pressed:bg-action/10 cursor-pointer rounded-md border px-3 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:font-semibold"
                key={preset.label}
                onClick={() => {
                  setCoefficients({ a: preset.a, b: preset.b, c: preset.c });
                }}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="quadratic-a">
              Opening and steepness, {katexify("a", false)}
            </label>
            <select
              className="border-border focus-visible:outline-action mt-2 w-full rounded-md border px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
              id="quadratic-a"
              onChange={(event) => {
                updateCoefficient("a", Number(event.currentTarget.value));
              }}
              value={a}
            >
              {leadingCoefficients.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <p className="text-muted mt-2 text-xs leading-5">
              A positive value opens upward; a negative value opens downward.
              Zero is excluded so the equation stays quadratic.
            </p>
          </div>
          {(["b", "c"] as const).map((key) => (
            <div key={key}>
              <div className="flex items-center justify-between gap-3">
                <label
                  className="text-sm font-medium"
                  htmlFor={`quadratic-${key}`}
                >
                  {key === "b" ? "Linear coefficient" : "Vertical intercept"},{" "}
                  {katexify(key, false)}
                </label>
                <output htmlFor={`quadratic-${key}`}>
                  {katexify(`${key}=${coefficients[key]}`, false)}
                </output>
              </div>
              <input
                className="accent-action focus-visible:outline-action mt-3 w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
                id={`quadratic-${key}`}
                max="8"
                min="-8"
                onChange={(event) => {
                  updateCoefficient(key, event.currentTarget.valueAsNumber);
                }}
                step="1"
                type="range"
                value={coefficients[key]}
              />
            </div>
          ))}
          <div
            aria-live="polite"
            className="border-border space-y-3 border-t pt-5"
          >
            <p className="font-semibold">
              {katexify(`D=b^2-4ac=${discriminant}`, false)}
            </p>
            <p className="text-muted text-sm leading-6">{rootDescription}</p>
            <div className="overflow-x-auto py-1 text-sm">
              {katexify(rootsTex, false)}
            </div>
            <p className="text-muted text-sm leading-6">
              Vertex:{" "}
              {katexify(`(${format(vertexX)},${format(vertexY)})`, false)}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
