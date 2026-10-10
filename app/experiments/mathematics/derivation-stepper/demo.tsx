"use client";

import { useState } from "react";

import { DemoButton, TexPreview } from "../_katex-components/DemoControls";

const STEPS = [
  {
    tex: String.raw`x^2+6x+5 &= 0`,
    title: "Start with the quadratic",
    explanation:
      "We will rewrite the left side as a perfect square so that we can take square roots.",
  },
  {
    tex: String.raw`x^2+6x &= -5`,
    title: "Move the constant",
    explanation:
      "Subtract five from both sides to leave the quadratic and linear terms together.",
  },
  {
    tex: String.raw`x^2+6x+9 &= 4`,
    title: "Complete the square",
    explanation:
      "Half the linear coefficient is three. Add its square, nine, to both sides.",
  },
  {
    tex: String.raw`(x+3)^2 &= 4`,
    title: "Factor the perfect square",
    explanation:
      "The three terms on the left are the expansion of a squared binomial.",
  },
  {
    tex: String.raw`x+3 &= \pm 2`,
    title: "Take both square roots",
    explanation:
      "Both positive two and negative two square to four, so keep both possibilities.",
  },
  {
    tex: String.raw`x &= -1\quad\text{or}\quad x=-5`,
    title: "Isolate the variable",
    explanation:
      "Subtract three from each possibility. Both solutions satisfy the original equation.",
  },
] as const;

export default function DerivationDemo() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const tex = `\\begin{aligned}\n${STEPS.slice(0, step + 1)
    .map((entry) => entry.tex)
    .join(" \\\\\n")}\n\\end{aligned}`;

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2">
      <div className="space-y-5">
        <div aria-live="polite" className="border-border rounded-xl border p-5">
          <p className="text-foreground/70 mb-2 text-sm">
            Step {step + 1} of {STEPS.length}
          </p>
          <h3 className="mb-3 text-xl font-semibold">{current.title}</h3>
          <p className="text-foreground/80 text-lg leading-relaxed">
            {current.explanation}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DemoButton
            disabled={step === 0}
            onClick={() => {
              setStep((previous) => Math.max(0, previous - 1));
            }}
          >
            Previous
          </DemoButton>
          <DemoButton
            disabled={step === STEPS.length - 1}
            onClick={() => {
              setStep((previous) => Math.min(STEPS.length - 1, previous + 1));
            }}
          >
            Next
          </DemoButton>
          <DemoButton
            onClick={() => {
              setStep(0);
            }}
          >
            Reset
          </DemoButton>
        </div>
      </div>
      <TexPreview tex={tex} />
    </div>
  );
}
