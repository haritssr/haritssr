"use client";

import { useId, useState } from "react";

import katexify from "@/utils/katexify";

import { graphPath, graphX, graphY } from "../graph";

const bases = [
  { value: 0.25, tex: String.raw`\frac14`, name: "One quarter" },
  { value: 0.5, tex: String.raw`\frac12`, name: "One half" },
  { value: 2, tex: "2", name: "Two" },
  { value: Math.E, tex: "e", name: "Euler's number" },
  { value: 3, tex: "3", name: "Three" },
  { value: 10, tex: "10", name: "Ten" },
] as const;
const range = { xMin: -0.5, xMax: 10.5, yMin: -4, yMax: 4 };
const xTicks = [1, 2, 4, 6, 8, 10];
const yTicks = [-4, -2, 0, 2, 4];

function decimal(value: number): string {
  return Number(value.toFixed(3)).toString();
}

export default function LogarithmLab() {
  const [baseIndex, setBaseIndex] = useState(2);
  const [argument, setArgument] = useState(4);
  const [showInverse, setShowInverse] = useState(false);
  const clipId = useId();
  const inputId = useId();
  const base = bases[baseIndex];
  const output = Math.log(argument) / Math.log(base.value);
  // Sampling exponents gives detail near the vertical asymptote without
  // evaluating a logarithm at zero or at a negative argument.
  const logPath = Array.from({ length: 241 }, (_, index) => {
    const y = range.yMin + ((range.yMax - range.yMin) * index) / 240;
    const x = base.value ** y;
    return `${index === 0 ? "M" : "L"}${graphX(x, range).toFixed(2)},${graphY(y, range).toFixed(2)}`;
  }).join(" ");
  const inverseBound = Math.log(range.yMax) / Math.log(base.value);
  const inverseFrom =
    base.value > 1 ? range.xMin : Math.max(range.xMin, inverseBound);
  const inverseTo =
    base.value > 1 ? Math.min(range.xMax, inverseBound) : range.xMax;

  return (
    <section
      aria-labelledby="logarithm-lab-heading"
      className="border-border overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold" id="logarithm-lab-heading">
          Explore the logarithmic graph
        </h2>
        <p className="text-muted mt-1 text-sm leading-6">
          Choose a base and move the input. Compare increasing and decreasing
          curves, then show the exponential inverse.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <figure className="min-w-0 p-5 sm:p-6">
          <div className="text-action mb-4 text-center">
            {katexify(`y={}^{${base.tex}}\\!\\log x`, true)}
          </div>
          <svg
            aria-hidden="true"
            className="w-full"
            focusable="false"
            viewBox="0 0 680 340"
          >
            <defs>
              <clipPath id={clipId}>
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
                  height="32"
                  width="40"
                  x={graphX(tick, range) - 20}
                  y="304"
                >
                  <div className="text-muted text-center text-xl sm:text-xs">
                    {katexify(String(tick), false)}
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
                  height="30"
                  width="42"
                  x="0"
                  y={graphY(tick, range) - 12}
                >
                  <div className="text-muted text-right text-xl sm:text-xs">
                    {katexify(String(tick), false)}
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
              strokeDasharray="4 4"
              x1={graphX(0, range)}
              x2={graphX(0, range)}
              y1="20"
              y2="298"
            />
            <foreignObject
              height="30"
              width="32"
              x="630"
              y={graphY(0, range) - 12}
            >
              <div className="text-muted text-xl sm:text-xs">
                {katexify("x", false)}
              </div>
            </foreignObject>
            <foreignObject
              height="30"
              width="32"
              x={graphX(0, range) + 6}
              y="0"
            >
              <div className="text-muted text-xl sm:text-xs">
                {katexify("y", false)}
              </div>
            </foreignObject>
            <g clipPath={`url(#${clipId})`}>
              {showInverse ? (
                <>
                  <path
                    d={graphPath(range.xMin, range.yMax, (x) => x, range)}
                    fill="none"
                    stroke="var(--color-muted)"
                    strokeDasharray="2 6"
                  />
                  <path
                    d={graphPath(
                      inverseFrom,
                      inverseTo,
                      (x) => base.value ** x,
                      range
                    )}
                    fill="none"
                    stroke="var(--color-foreground)"
                    strokeDasharray="8 5"
                    strokeWidth="2"
                  />
                </>
              ) : null}
              <path
                d={logPath}
                fill="none"
                stroke="var(--color-action)"
                strokeWidth="3"
              />
              <line
                stroke="var(--color-muted)"
                strokeDasharray="4 4"
                x1={graphX(argument, range)}
                x2={graphX(argument, range)}
                y1={graphY(0, range)}
                y2={graphY(output, range)}
              />
              <line
                stroke="var(--color-muted)"
                strokeDasharray="4 4"
                x1={graphX(0, range)}
                x2={graphX(argument, range)}
                y1={graphY(output, range)}
                y2={graphY(output, range)}
              />
              <circle
                cx={graphX(1, range)}
                cy={graphY(0, range)}
                fill="var(--color-background)"
                r="5"
                stroke="var(--color-action)"
                strokeWidth="2"
              />
              <circle
                cx={graphX(argument, range)}
                cy={graphY(output, range)}
                fill="var(--color-action)"
                r="6"
                stroke="var(--color-background)"
                strokeWidth="2"
              />
            </g>
          </svg>
          <figcaption className="text-muted mt-3 space-y-2 text-sm leading-6">
            <p>
              The solid blue curve is the logarithm. It passes through{" "}
              {katexify("(1,0)", false)} and approaches the vertical asymptote{" "}
              {katexify("x=0", false)} without reaching it.
            </p>
            {showInverse ? (
              <p>
                The dashed curve is {katexify(`y=(${base.tex})^x`, false)}.
                Swapping input and output reflects the two curves across the
                dotted line {katexify("y=x", false)}. Parts outside the plotted
                window are clipped.
              </p>
            ) : null}
          </figcaption>
        </figure>
        <div className="border-border space-y-6 border-t p-5 lg:border-t-0 lg:border-l">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">
              Choose a base
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {bases.map((option, index) => (
                <label
                  className={`focus-within:outline-action flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm focus-within:outline-2 focus-within:outline-offset-2 ${baseIndex === index ? "border-action bg-action/10 text-action" : "border-border text-foreground hover:bg-interface-hover"}`}
                  key={option.name}
                >
                  <input
                    aria-label={`Base ${option.name}`}
                    checked={baseIndex === index}
                    className="sr-only"
                    name={`${inputId}-base`}
                    onChange={() => {
                      setBaseIndex(index);
                    }}
                    type="radio"
                    value={index}
                  />
                  {katexify(option.tex, false)}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label
              className="mb-3 flex items-center justify-between text-sm font-semibold"
              htmlFor={inputId}
            >
              Input {katexify(`x=${decimal(argument)}`, false)}
            </label>
            <input
              className="accent-action focus-visible:outline-action w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              id={inputId}
              max={10}
              min={0.1}
              onChange={(event) => {
                setArgument(event.currentTarget.valueAsNumber);
              }}
              step={0.1}
              type="range"
              value={argument}
            />
            <p className="text-muted mt-2 text-xs">
              The input stays positive so the logarithm is defined.
            </p>
          </div>
          <label className="focus-within:outline-action flex cursor-pointer items-center gap-2 rounded-sm text-sm focus-within:outline-2 focus-within:outline-offset-4">
            <input
              checked={showInverse}
              className="accent-action size-4 cursor-pointer"
              onChange={(event) => {
                setShowInverse(event.currentTarget.checked);
              }}
              type="checkbox"
            />
            Show exponential inverse
          </label>
          <div className="border-border space-y-3 border-t pt-4">
            <p className="text-sm font-semibold">Find the exponent</p>
            <output aria-live="off" className="block overflow-x-auto">
              {katexify(
                `{}^{${base.tex}}\\!\\log ${decimal(argument)}\\approx${decimal(output)}`,
                true
              )}
            </output>
            <p className="text-muted text-sm leading-6">
              Raising this base to the displayed exponent gives the input,
              approximately. Displayed outputs are rounded to three decimals.
            </p>
            <p className="text-sm font-semibold">
              {base.value > 1 ? "Increasing" : "Decreasing"}
            </p>
            <p className="text-muted text-sm leading-6">
              {base.value > 1
                ? "With a base greater than one, larger inputs give larger logarithms."
                : "With a base between zero and one, larger inputs give smaller logarithms."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
