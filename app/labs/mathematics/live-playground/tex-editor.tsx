"use client";

import { useId } from "react";

export default function TexEditor({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value: string;
}) {
  const editorId = useId();
  const helpId = `${editorId}-help`;

  return (
    <div className="min-w-0 space-y-2">
      <label
        className="text-foreground/80 block text-sm font-medium"
        htmlFor={editorId}
      >
        TeX expression
      </label>
      <textarea
        aria-describedby={helpId}
        autoCapitalize="off"
        autoComplete="off"
        className="form-control border-border focus-visible:outline-action scrollbar-subtle w-full resize-y rounded-lg border p-3 font-mono text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2"
        id={editorId}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
        rows={7}
        spellCheck={false}
        value={value}
      />
      <p className="text-muted text-sm leading-7" id={helpId}>
        Enter TeX without dollar-sign delimiters. Invalid commands appear in
        red; correct the source to restore the preview.
      </p>
    </div>
  );
}
