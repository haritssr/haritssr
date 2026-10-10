"use client";
import { useDeferredValue, useState } from "react";

import Button from "@/components/Button";
import { SelectField } from "@/components/SelectField";

import { TexPreview } from "../_katex-components/DemoControls";
import { DEFAULT_TEX, TEMPLATES } from "./templates";
import TexEditor from "./tex-editor";

const MODES = [
  { label: "Display math", value: "display" },
  { label: "Inline math", value: "inline" },
];

export default function PlaygroundDemo() {
  const [tex, setTex] = useState<string>(DEFAULT_TEX);
  const [displayMode, setDisplayMode] = useState(true);
  const previewTex = useDeferredValue(tex);
  const selectedTemplate = TEMPLATES.find((template) => template.value === tex);

  function reset() {
    setTex(DEFAULT_TEX);
    setDisplayMode(true);
  }

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <SelectField
          label="TeX template"
          onValueChange={setTex}
          options={TEMPLATES}
          placeholder="Choose a template"
          value={selectedTemplate?.value ?? null}
        />
        <TexEditor onValueChange={setTex} value={tex} />
        <SelectField
          label="Rendering mode"
          onValueChange={(value) => {
            setDisplayMode(value === "display");
          }}
          options={MODES}
          value={displayMode ? "display" : "inline"}
        />
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>
      <div aria-busy={tex !== previewTex} className="min-w-0">
        <TexPreview displayMode={displayMode} tex={previewTex} />
      </div>
    </div>
  );
}
