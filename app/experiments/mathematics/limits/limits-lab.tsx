"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

import { GraphAxes, graphPath, graphX, graphY } from "../graph";

const RANGE = { xMin: -1, xMax: 3, yMin: -1, yMax: 9 };
const APPROACHES = [1, 0.1, 0.01, 0.001];

type Example = "continuous" | "hole" | "jump";
type Side = "left" | "right";

const EXAMPLES: Record<
  Example,
  {
    title: string;
    formula: string;
    target: number;
    leftLimit: number;
    rightLimit: number;
    valueAtTarget: number;
    explanation: string;
  }
> = {
  continuous: {
    title: "A continuous curve",
    formula: String.raw`f(x)=x^2,\quad a=2`,
    target: 2,
    leftLimit: 4,
    rightLimit: 4,
    valueAtTarget: 4,
    explanation:
      "Both sides approach the same height, and the point on the curve has that height too.",
  },
  hole: {
    title: "A hole with a different point",
    formula: String.raw`f(x)=\begin{cases}\frac{x^2-1}{x-1}&x\ne 1\\0&x=1\end{cases},\quad a=1`,
    target: 1,
    leftLimit: 2,
    rightLimit: 2,
    valueAtTarget: 0,
    explanation:
      "Nearby values approach two, although the function is assigned zero at the target.",
  },
  jump: {
    title: "A jump",
    formula: String.raw`f(x)=\begin{cases}x+1&x<1\\x+2&x\ge 1\end{cases},\quad a=1`,
    target: 1,
    leftLimit: 2,
    rightLimit: 3,
    valueAtTarget: 3,
    explanation:
      "The left and right sides approach different heights, so the two-sided limit does not exist.",
  },
};

function evaluate(example: Example, x: number): number {
  if (example === "continuous") {
    return x * x;
  }
  if (example === "hole") {
    return x === 1 ? 0 : x + 1;
  }
  return x < 1 ? x + 1 : x + 2;
}

function format(value: number): string {
  return Number(value.toFixed(3)).toString();
}

export default function LimitsLab() {
  const [example, setExample] = useState<Example>("continuous");
  const [side, setSide] = useState<Side>("left");
  const [power, setPower] = useState(0.5);
  const selected = EXAMPLES[example];
  const distance = 10 ** -power;
  const sampleX = selected.target + (side === "left" ? -distance : distance);
  const sampleY = evaluate(example, sampleX);
  const twoSidedLimit =
    selected.leftLimit === selected.rightLimit
      ? format(selected.leftLimit)
      : String.raw`\text{does not exist}`;
  const curves =
    example === "jump"
      ? [
          graphPath(RANGE.xMin, 1, (x) => x + 1, RANGE),
          graphPath(1, RANGE.xMax, (x) => x + 2, RANGE),
        ]
      : [
          graphPath(
            RANGE.xMin,
            RANGE.xMax,
            (x) => (example === "hole" ? x + 1 : evaluate(example, x)),
            RANGE
          ),
        ];

  return (
    <section
      aria-labelledby="limits-lab-heading"
      className="border-border overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2
          className="text-foreground text-lg font-semibold"
          id="limits-lab-heading"
        >
          Approach a point
        </h2>
        <p className="text-muted mt-1 text-sm">
          Choose a function, then bring the sample point closer from either
          side.
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
            <GraphAxes range={RANGE} />
            {curves.map((curve, index) => (
              <path
                d={curve}
                fill="none"
                key={index}
                stroke="#2563eb"
                strokeLinecap="round"
                strokeWidth="3"
              />
            ))}
            {example === "continuous" ? null : (
              <circle
                cx={graphX(selected.target, RANGE)}
                cy={graphY(selected.leftLimit, RANGE)}
                fill="white"
                r="7"
                stroke="#2563eb"
                strokeWidth="3"
              />
            )}
            <circle
              cx={graphX(selected.target, RANGE)}
              cy={graphY(selected.valueAtTarget, RANGE)}
              fill="#2563eb"
              r="6"
            />
            <line
              stroke="#f59e0b"
              strokeDasharray="5 5"
              x1={graphX(sampleX, RANGE)}
              x2={graphX(sampleX, RANGE)}
              y1={graphY(0, RANGE)}
              y2={graphY(sampleY, RANGE)}
            />
            <circle
              cx={graphX(sampleX, RANGE)}
              cy={graphY(sampleY, RANGE)}
              fill="#d97706"
              r="6"
            />
          </svg>
          <figcaption className="text-muted text-sm leading-6">
            Blue shows the function; amber marks the approaching sample. Open
            circles mark a missing endpoint. The horizontal axis is{" "}
            {katexify(String.raw`x\in[-1,3]`, false)}.
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-5">
          <div>
            <label
              className="text-foreground block text-sm font-medium"
              htmlFor="limit-example"
            >
              Example
            </label>
            <select
              className="border-border mt-2 w-full rounded-xl border px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600"
              id="limit-example"
              onChange={(event) => {
                const { value } = event.currentTarget;
                if (
                  value === "continuous" ||
                  value === "hole" ||
                  value === "jump"
                ) {
                  setExample(value);
                }
              }}
              value={example}
            >
              {Object.entries(EXAMPLES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.title}
                </option>
              ))}
            </select>
            <div className="mt-3 overflow-x-auto text-sm">
              {katexify(selected.formula, true)}
            </div>
          </div>
          <div>
            <label
              className="text-foreground block text-sm font-medium"
              htmlFor="limit-side"
            >
              Approach from
            </label>
            <select
              className="border-border mt-2 w-full rounded-xl border px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600"
              id="limit-side"
              onChange={(event) => {
                const { value } = event.currentTarget;
                if (value === "left" || value === "right") {
                  setSide(value);
                }
              }}
              value={side}
            >
              <option value="left">The left</option>
              <option value="right">The right</option>
            </select>
          </div>
          <div>
            <label
              className="text-foreground block text-sm font-medium"
              htmlFor="limit-distance"
            >
              Distance from the target
            </label>
            <input
              className="mt-3 w-full accent-blue-700"
              id="limit-distance"
              max="3"
              min="0"
              onChange={(event) => {
                setPower(event.currentTarget.valueAsNumber);
              }}
              step="0.01"
              type="range"
              value={power}
            />
            <output
              className="text-muted mt-1 block text-sm"
              htmlFor="limit-distance"
            >
              {katexify(`h=${format(distance)}`, false)}
            </output>
          </div>
          <div
            aria-live="polite"
            className="text-foreground border-border rounded-xl border p-4 text-sm leading-7"
          >
            <div>
              {katexify(
                String.raw`x=${format(sampleX)},\quad f(x)=${format(sampleY)}`,
                false
              )}
            </div>
            <div>
              {katexify(
                `f(${selected.target})=${selected.valueAtTarget}`,
                false
              )}
            </div>
            <div>
              {katexify(
                String.raw`\lim_{x\to ${selected.target}}f(x)=${twoSidedLimit}`,
                false
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-border border-t px-5 py-5 sm:px-6">
        <h3 className="text-foreground text-base font-semibold">
          Look from both sides
        </h3>
        <div className="scrollbar-subtle mt-3 overflow-x-auto">
          <table className="w-full min-w-96 text-left text-sm">
            <caption className="sr-only">
              Nearby function values from the left and right
            </caption>
            <thead className="border-border text-muted border-b">
              <tr>
                <th className="py-2 pr-4" scope="col">
                  {katexify("h", false)}
                </th>
                <th className="py-2 pr-4" scope="col">
                  {katexify(String.raw`f(a-h)`, false)}
                </th>
                <th className="py-2" scope="col">
                  {katexify(String.raw`f(a+h)`, false)}
                </th>
              </tr>
            </thead>
            <tbody>
              {APPROACHES.map((step) => (
                <tr className="border-border border-b" key={step}>
                  <td className="py-2 pr-4">{katexify(format(step), false)}</td>
                  <td className="py-2 pr-4">
                    {katexify(
                      format(evaluate(example, selected.target - step)),
                      false
                    )}
                  </td>
                  <td className="py-2">
                    {katexify(
                      format(evaluate(example, selected.target + step)),
                      false
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted mt-4 text-sm leading-6">
          {selected.explanation}
        </p>
      </div>
    </section>
  );
}
