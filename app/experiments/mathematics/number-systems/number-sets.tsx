"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

const examples = [
  {
    tex: "5",
    level: 4,
    reason: "A positive counting number belongs to every enclosing set.",
  },
  {
    tex: "0",
    level: 3,
    reason:
      "Zero is whole, integer, rational, and real. Here, natural numbers start at one.",
  },
  {
    tex: "-3",
    level: 2,
    reason:
      "A negative integer is rational because it can be written with denominator one.",
  },
  {
    tex: String.raw`\frac{2}{3}`,
    level: 1,
    reason:
      "A ratio of integers with a nonzero denominator is rational, but this one is not an integer.",
  },
  {
    tex: "0.125",
    level: 1,
    reason: "A terminating decimal is rational: this is one eighth.",
  },
  {
    tex: String.raw`0.\overline{3}`,
    level: 1,
    reason: "A repeating decimal is rational: this is exactly one third.",
  },
  {
    tex: String.raw`\sqrt{9}`,
    level: 4,
    reason:
      "Simplify first: the principal square root of nine is three, a natural number.",
  },
  {
    tex: String.raw`\sqrt{2}`,
    level: 0,
    reason:
      "This real number cannot be expressed as a ratio of integers. Its decimal never terminates or repeats.",
  },
  {
    tex: String.raw`\pi`,
    level: 0,
    reason:
      "Pi is irrational. A finite decimal approximation to pi is rational, but is not exactly pi.",
  },
] as const;

const sets = [
  {
    name: "Real",
    tex: String.raw`\mathbb{R}`,
    level: 0,
    cx: 300,
    cy: 180,
    rx: 290,
    ry: 170,
    labelX: 420,
    labelY: 95,
  },
  {
    name: "Rational",
    tex: String.raw`\mathbb{Q}`,
    level: 1,
    cx: 207,
    cy: 260,
    rx: 190,
    ry: 190,
    labelX: 147,
    labelY: 80,
  },
  {
    name: "Integer",
    tex: String.raw`\mathbb{Z}`,
    level: 2,
    cx: 195,
    cy: 295,
    rx: 145,
    ry: 145,
    labelX: 135,
    labelY: 160,
  },
  {
    name: "Whole",
    tex: String.raw`\mathbb{W}`,
    level: 3,
    cx: 182,
    cy: 330,
    rx: 104,
    ry: 100,
    labelX: 122,
    labelY: 240,
  },
  {
    name: "Natural",
    tex: String.raw`\mathbb{N}`,
    level: 4,
    cx: 175,
    cy: 370,
    rx: 73,
    ry: 55,
    labelX: 115,
    labelY: 335,
  },
] as const;

export default function NumberSets() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  const memberships = sets.filter((set) => set.level <= example.level);

  return (
    <section
      aria-labelledby="number-sets-heading"
      className="border-border text-foreground overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2
          className="text-foreground text-lg font-semibold"
          id="number-sets-heading"
        >
          Where does a number belong?
        </h2>
        <p className="text-muted mt-1 text-sm leading-6">
          Choose a number. Blue outlines show all the sets it belongs to.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <figure className="min-w-0 p-4 sm:p-6">
          <svg
            aria-hidden="true"
            className="w-full"
            focusable="false"
            viewBox="0 0 600 480"
          >
            {sets.map((set) => (
              <g key={set.name}>
                {set.level === 0 ? (
                  <rect
                    x="10"
                    y="10"
                    width="580"
                    height="460"
                    rx="24"
                    fill="var(--color-background)"
                    stroke="var(--color-action)"
                    strokeWidth="2"
                  />
                ) : (
                  <ellipse
                    cx={set.cx}
                    cy={set.cy}
                    fill="var(--color-background)"
                    rx={set.rx}
                    ry={set.ry}
                    stroke={
                      example.level >= set.level
                        ? "var(--color-action)"
                        : "var(--color-border)"
                    }
                    strokeWidth="2"
                  />
                )}
                <foreignObject
                  height="72"
                  width="120"
                  x={set.labelX}
                  y={set.labelY}
                >
                  <div className="text-foreground text-center text-3xl leading-tight sm:text-2xl">
                    {katexify(set.tex, false)}
                    <span
                      className={`${example.level >= set.level ? "text-action" : "text-muted"} block text-2xl sm:text-base`}
                    >
                      {set.name}
                    </span>
                  </div>
                </foreignObject>
              </g>
            ))}
            <foreignObject height="85" width="150" x="405" y="260">
              <div className="text-foreground text-center text-3xl leading-tight sm:text-2xl">
                {katexify(String.raw`\mathbb{R}\setminus\mathbb{Q}`, false)}
                <span
                  className={`${example.level === 0 ? "text-action" : "text-muted"} block text-2xl sm:text-base`}
                >
                  Irrational
                </span>
              </div>
            </foreignObject>
          </svg>
          <figcaption className="text-muted mt-3 text-sm leading-6">
            A nested Venn (Euler) diagram. Each inner set is contained in every
            set around it. Rational and irrational numbers are disjoint and
            together fill the real numbers. Regions are not drawn to scale.
          </figcaption>
        </figure>
        <div className="border-border text-foreground min-w-0 space-y-5 border-t p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Example numbers</legend>
            {examples.map(({ tex }, index) => (
              <button
                aria-pressed={index === selected}
                className="border-border text-foreground hover:bg-interface-hover focus-visible:outline-action aria-pressed:border-action aria-pressed:bg-action/10 min-h-11 min-w-11 cursor-pointer rounded-lg border px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                key={tex}
                onClick={() => {
                  setSelected(index);
                }}
                type="button"
              >
                {katexify(tex, false)}
              </button>
            ))}
          </fieldset>
          <div aria-live="polite" className="space-y-3">
            <p className="text-lg font-semibold">
              {katexify(example.tex, false)}
            </p>
            <p className="text-muted text-sm leading-6">{example.reason}</p>
            <p className="text-sm font-medium">Belongs to</p>
            <ul className="space-y-2 text-sm">
              {memberships.map((set) => (
                <li className="flex items-center gap-2" key={set.name}>
                  <span className="text-action">
                    {katexify(set.tex, false)}
                  </span>{" "}
                  {set.name}
                </li>
              ))}
              {example.level === 0 ? (
                <li className="text-action">Irrational</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
