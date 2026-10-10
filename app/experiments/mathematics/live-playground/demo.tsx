"use client";
import { useDeferredValue, useId, useState } from "react";

import { SelectField as ExperimentSelect } from "@/components/SelectField";

import { DemoButton, TexPreview } from "../_katex-components/DemoControls";

const TEMPLATE_GROUPS = [
  {
    label: "Algebra",
    templates: [
      { label: "Fraction", tex: String.raw`\frac{a+b}{c+d}` },
      {
        label: "Quadratic formula",
        tex: String.raw`x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}`,
      },
      {
        label: "Aligned equations",
        tex: String.raw`\begin{aligned}y &= mx+b \\ f(x) &= x^2+2x+1\end{aligned}`,
      },
    ],
  },
  {
    label: "Calculus",
    templates: [
      {
        label: "Summation",
        tex: String.raw`\sum_{k=1}^n k = \frac{n(n+1)}{2}`,
      },
      {
        label: "Definite integral",
        tex: String.raw`\int_0^1 x^2\,dx = \frac{1}{3}`,
      },
      {
        label: "Limit",
        tex: String.raw`\lim_{x \to 0} \frac{\sin x}{x} = 1`,
      },
    ],
  },
  {
    label: "Structures",
    templates: [
      {
        label: "Piecewise function",
        tex: String.raw`f(x) = \begin{cases} x^2 & x \ge 0 \\ -x & x < 0 \end{cases}`,
      },
      {
        label: "Matrix",
        tex: String.raw`A = \begin{bmatrix}1 & 2 \\ 3 & 4\end{bmatrix}`,
      },
    ],
  },
] as const;

const DEFAULT_TEX = TEMPLATE_GROUPS[0].templates[0].tex;
const TEMPLATES = TEMPLATE_GROUPS.flatMap((group) =>
  group.templates.map((template) => ({
    label: `${group.label} · ${template.label}`,
    value: template.tex,
  }))
);

const MODES = [
  { label: "Display math", value: "display" },
  { label: "Inline math", value: "inline" },
];

export default function PlaygroundDemo() {
  const editorId = useId();
  const [tex, setTex] = useState<string>(DEFAULT_TEX);
  const [mode, setMode] = useState("display");
  const previewTex = useDeferredValue(tex);
  const selectedTemplate = TEMPLATES.find((template) => template.value === tex);

  function reset() {
    setTex(DEFAULT_TEX);
    setMode("display");
  }

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <ExperimentSelect
          label="TeX template"
          onValueChange={setTex}
          options={TEMPLATES}
          placeholder="Choose a template"
          value={selectedTemplate?.value ?? null}
        />
        <div className="space-y-2">
          <label
            className="text-foreground/80 block text-sm font-medium"
            htmlFor={editorId}
          >
            TeX expression
          </label>
          <textarea
            autoCapitalize="off"
            autoComplete="off"
            className="form-control border-border focus-visible:outline-action scrollbar-subtle w-full resize-y rounded-lg border p-3 font-mono text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2"
            id={editorId}
            onChange={(event) => {
              setTex(event.target.value);
            }}
            rows={7}
            spellCheck={false}
            value={tex}
          />
          <p className="text-foreground/70 text-sm">
            An invalid command appears in red. Correct the source to restore the
            preview.
          </p>
        </div>
        <ExperimentSelect
          label="Rendering mode"
          onValueChange={setMode}
          options={MODES}
          value={mode}
        />
        <DemoButton onClick={reset}>Reset</DemoButton>
      </div>
      <TexPreview displayMode={mode === "display"} tex={previewTex} />
    </div>
  );
}
