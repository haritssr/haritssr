"use client";
import { useState } from "react";

import { SelectField as ExperimentSelect } from "@/components/SelectField";
import katexify from "@/utils/katexify";

import { DemoButton, TexPreview } from "../_components/DemoControls";

const TERMS = [
  {
    value: "force",
    label: "Force",
    symbol: "F",
    unit: String.raw`\mathrm{N}=\mathrm{kg\,m\,s^{-2}}`,
    explanation:
      "The net external force along the chosen direction. It equals mass times acceleration in that direction.",
  },
  {
    value: "mass",
    label: "Mass",
    symbol: "m",
    unit: String.raw`\mathrm{kg}`,
    explanation:
      "The object's mass, assumed constant here. For the same net force, more mass means less acceleration.",
  },
  {
    value: "acceleration",
    label: "Acceleration",
    symbol: "a",
    unit: String.raw`\mathrm{m\,s^{-2}}`,
    explanation:
      "The rate of change of velocity along the chosen direction. Its sign follows the sign of the net force.",
  },
] as const;
const STYLES = [
  { value: "brace", label: "Labeled underbrace" },
  { value: "box", label: "Box" },
  { value: "color", label: "Color" },
];

function annotate(symbol: string, label: string, style: string) {
  if (style === "box") {
    return `\\boxed{${symbol}}`;
  }
  if (style === "color") {
    return `\\textcolor{#2563eb}{${symbol}}`;
  }
  return `\\underbrace{${symbol}}_{\\text{${label.toLowerCase()}}}`;
}

export default function AnnotationsDemo() {
  const [term, setTerm] = useState("force");
  const [style, setStyle] = useState("brace");
  const selected = TERMS.find((entry) => entry.value === term) ?? TERMS[0];
  const symbols = TERMS.map((entry) =>
    entry.value === term
      ? annotate(entry.symbol, entry.label, style)
      : entry.symbol
  );
  const tex = `${symbols[0]}=${symbols[1]}\\,${symbols[2]}`;

  function reset() {
    setTerm("force");
    setStyle("brace");
  }

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <ExperimentSelect
          label="Term"
          onValueChange={setTerm}
          options={TERMS}
          value={term}
        />
        <ExperimentSelect
          label="Annotation style"
          onValueChange={setStyle}
          options={STYLES}
          value={style}
        />
        <div aria-live="polite" className="border-border rounded-xl border p-5">
          <h3 className="mb-3 text-xl font-semibold">
            {selected.label} ({katexify(selected.symbol, false)})
          </h3>
          <p className="text-foreground/80 text-lg leading-relaxed">
            {selected.explanation}
          </p>
          <p className="text-foreground/80 mt-4 text-sm">
            SI unit: {katexify(selected.unit, false)}
          </p>
        </div>
        <DemoButton onClick={reset}>Reset</DemoButton>
      </div>
      <TexPreview tex={tex} />
    </div>
  );
}
