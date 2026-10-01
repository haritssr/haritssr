"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

import { GraphAxes, graphPath, graphX, graphY } from "../graph";

const RANGE = { xMin: -3, xMax: 3, yMin: -1, yMax: 10 };
const CURVE = graphPath(RANGE.xMin, RANGE.xMax, (x) => x * x, RANGE);

function format(value: number): string {
  return Number(value.toFixed(3)).toString();
}

export default function DerivativesLab() {
  const [position, setPosition] = useState(1);
  const [side, setSide] = useState<"left" | "right">("right");
  const [power, setPower] = useState(0.5);
  const distance = 10 ** -power;
  const h = side === "left" ? -distance : distance;
  const secondX = position + h;
  const firstY = position * position;
  const secondY = secondX * secondX;
  const secantSlope = (secondY - firstY) / h;
  const tangentSlope = 2 * position;
  const secant = (x: number) => firstY + secantSlope * (x - position);
  const tangent = (x: number) => firstY + tangentSlope * (x - position);

  return (
    <section
      aria-labelledby="derivatives-lab-heading"
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
    >
      <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6">
        <h2
          className="text-lg font-semibold text-zinc-950"
          id="derivatives-lab-heading"
        >
          Shrink a secant into a tangent
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Move the point and shrink the horizontal gap. Compare the two slopes.
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
              <clipPath id="derivative-plot-clip">
                <rect height="278" width="568" x="54" y="20" />
              </clipPath>
            </defs>
            <GraphAxes range={RANGE} />
            <g clipPath="url(#derivative-plot-clip)">
              <path d={CURVE} fill="none" stroke="#2563eb" strokeWidth="3" />
              <path
                d={graphPath(RANGE.xMin, RANGE.xMax, tangent, RANGE)}
                fill="none"
                stroke="#059669"
                strokeDasharray="7 5"
                strokeWidth="2.5"
              />
              <path
                d={graphPath(RANGE.xMin, RANGE.xMax, secant, RANGE)}
                fill="none"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              <circle
                cx={graphX(position, RANGE)}
                cy={graphY(firstY, RANGE)}
                fill="#2563eb"
                r="6"
              />
              <circle
                cx={graphX(secondX, RANGE)}
                cy={graphY(secondY, RANGE)}
                fill="#d97706"
                r="6"
              />
            </g>
          </svg>
          <figcaption className="text-sm leading-6 text-zinc-600">
            Blue is {katexify("f(x)=x^2", false)}. Amber is the secant through
            two points; dashed green is the tangent at the selected point. The
            horizontal axis is {katexify(String.raw`x\in[-3,3]`, false)}.
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-zinc-800"
              htmlFor="derivative-position"
            >
              Point on the curve
            </label>
            <input
              className="mt-3 w-full accent-blue-700"
              id="derivative-position"
              max="2"
              min="-2"
              onChange={(event) => {
                setPosition(event.currentTarget.valueAsNumber);
              }}
              step="0.1"
              type="range"
              value={position}
            />
            <output
              className="mt-1 block text-sm text-zinc-600"
              htmlFor="derivative-position"
            >
              {katexify(`a=${format(position)}`, false)}
            </output>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-800"
              htmlFor="derivative-side"
            >
              Second point
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600"
              id="derivative-side"
              onChange={(event) => {
                const { value } = event.currentTarget;
                if (value === "left" || value === "right") {
                  setSide(value);
                }
              }}
              value={side}
            >
              <option value="left">To the left</option>
              <option value="right">To the right</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-800"
              htmlFor="derivative-distance"
            >
              Horizontal gap
            </label>
            <input
              className="mt-3 w-full accent-blue-700"
              id="derivative-distance"
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
              className="mt-1 block text-sm text-zinc-600"
              htmlFor="derivative-distance"
            >
              {katexify(`h=${format(h)}`, false)}
            </output>
          </div>
          <div
            aria-live="polite"
            className="rounded-xl bg-blue-50 p-4 text-sm leading-7 text-blue-950"
          >
            <div>
              {katexify(
                String.raw`\frac{f(a+h)-f(a)}{h}=${format(secantSlope)}`,
                false
              )}
            </div>
            <div>{katexify(`f'(a)=2a=${format(tangentSlope)}`, false)}</div>
            <p className="mt-2 text-xs leading-5 text-blue-900">
              As the gap approaches zero from either side, the secant slope
              approaches the tangent slope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
