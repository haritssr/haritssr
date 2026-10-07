"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

import { GraphAxes, graphPath, graphX, graphY } from "../graph";

const RANGE = { xMin: -3, xMax: 3, yMin: -3, yMax: 9 };
type FunctionKind = "square" | "line";

function evaluate(kind: FunctionKind, x: number): number {
  return kind === "square" ? x * x : x;
}

function exactArea(kind: FunctionKind, lower: number, upper: number): number {
  return kind === "square"
    ? (upper ** 3 - lower ** 3) / 3
    : (upper ** 2 - lower ** 2) / 2;
}

function format(value: number): string {
  return Number(value.toFixed(4)).toString();
}

export default function IntegralsLab() {
  const [kind, setKind] = useState<FunctionKind>("square");
  const [upper, setUpper] = useState(2);
  const [rectangles, setRectangles] = useState(8);
  const lower = kind === "square" ? 0 : -2;
  const width = (upper - lower) / rectangles;
  const samples = Array.from({ length: rectangles }, (_, index) => {
    const x = lower + index * width;
    const height = evaluate(kind, x + width / 2);
    return { x, height };
  });
  const estimate = samples.reduce(
    (total, sample) => total + sample.height * width,
    0
  );
  const exact = exactArea(kind, lower, upper);
  const curve = graphPath(
    RANGE.xMin,
    RANGE.xMax,
    (x) => evaluate(kind, x),
    RANGE
  );
  const formula = kind === "square" ? "f(x)=x^2" : "f(x)=x";

  function chooseKind(nextKind: FunctionKind) {
    setKind(nextKind);
    setUpper(2);
  }

  return (
    <section
      aria-labelledby="integrals-lab-heading"
      className="border-border overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2
          className="text-foreground text-lg font-semibold"
          id="integrals-lab-heading"
        >
          Build area from rectangles
        </h2>
        <p className="text-muted mt-1 text-sm">
          Add rectangles and watch the estimate approach the exact integral.
        </p>
      </div>
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <figure className="min-w-0">
          <svg
            aria-hidden="true"
            className="w-full"
            focusable="false"
            viewBox="0 0 680 340"
          >
            <defs>
              <clipPath id="integral-plot-clip">
                <rect height="278" width="568" x="54" y="20" />
              </clipPath>
            </defs>
            <GraphAxes range={RANGE} />
            <g clipPath="url(#integral-plot-clip)">
              {samples.map((sample, index) => {
                const x1 = graphX(sample.x, RANGE);
                const x2 = graphX(sample.x + width, RANGE);
                const baseline = graphY(0, RANGE);
                const heightY = graphY(sample.height, RANGE);
                return (
                  <rect
                    fill={sample.height < 0 ? "#f59e0b" : "#60a5fa"}
                    fillOpacity="0.4"
                    height={Math.abs(baseline - heightY)}
                    key={index}
                    stroke={sample.height < 0 ? "#b45309" : "#2563eb"}
                    strokeWidth="1"
                    width={x2 - x1}
                    x={x1}
                    y={Math.min(baseline, heightY)}
                  />
                );
              })}
              <path d={curve} fill="none" stroke="#1d4ed8" strokeWidth="3" />
            </g>
          </svg>
          <figcaption className="text-muted text-sm leading-6">
            Blue rectangles contribute positive signed area. Amber rectangles
            below the horizontal axis contribute negative signed area. Each
            rectangle uses the function value at its midpoint.
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-5">
          <div>
            <label
              className="text-foreground block text-sm font-medium"
              htmlFor="integral-function"
            >
              Function
            </label>
            <select
              className="border-border mt-2 w-full rounded-xl border px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600"
              id="integral-function"
              onChange={(event) => {
                const { value } = event.currentTarget;
                if (value === "square" || value === "line") {
                  chooseKind(value);
                }
              }}
              value={kind}
            >
              <option value="square">Square curve</option>
              <option value="line">Line across the axis</option>
            </select>
            <div className="mt-2 text-sm">{katexify(formula, false)}</div>
          </div>
          <div>
            <label
              className="text-foreground block text-sm font-medium"
              htmlFor="integral-upper"
            >
              Upper bound
            </label>
            <input
              className="mt-3 w-full accent-blue-700"
              id="integral-upper"
              max="3"
              min={kind === "square" ? "0.5" : "-1"}
              onChange={(event) => {
                setUpper(event.currentTarget.valueAsNumber);
              }}
              step="0.1"
              type="range"
              value={upper}
            />
            <output
              className="text-muted mt-1 block text-sm"
              htmlFor="integral-upper"
            >
              {katexify(String.raw`a=${lower},\quad b=${format(upper)}`, false)}
            </output>
          </div>
          <div>
            <label
              className="text-foreground block text-sm font-medium"
              htmlFor="integral-rectangles"
            >
              Number of rectangles
            </label>
            <input
              className="mt-3 w-full accent-blue-700"
              id="integral-rectangles"
              max="64"
              min="4"
              onChange={(event) => {
                setRectangles(event.currentTarget.valueAsNumber);
              }}
              step="1"
              type="range"
              value={rectangles}
            />
            <output
              className="text-muted mt-1 block text-sm"
              htmlFor="integral-rectangles"
            >
              {katexify(`n=${rectangles}`, false)}
            </output>
          </div>
          <div
            aria-live="polite"
            className="text-foreground border-border rounded-xl border p-4 text-sm leading-7"
          >
            <div>
              {katexify(
                String.raw`\int_{${lower}}^{${format(upper)}} ${kind === "square" ? "x^2" : "x"}\,dx=${format(exact)}`,
                false
              )}
            </div>
            <div>Midpoint estimate: {katexify(format(estimate), false)}</div>
            <div>
              Absolute error:{" "}
              {katexify(format(Math.abs(estimate - exact)), false)}
            </div>
          </div>
        </div>
      </div>
      <p className="border-border text-muted border-t px-5 py-4 text-sm leading-6 sm:px-6">
        A definite integral measures signed accumulation. When the curve crosses
        the axis, positive and negative parts can cancel even though the
        geometric area is not zero.
      </p>
    </section>
  );
}
