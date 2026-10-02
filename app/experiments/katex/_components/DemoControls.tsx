"use client";

import type { ComponentProps } from "react";
import { memo } from "react";

import katexify from "@/utils/katexify";

export function DemoButton({
  className = "",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={`border-border text-foreground/80 hover:bg-foreground/5 focus-visible:outline-action cursor-pointer rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      type="button"
      {...props}
    />
  );
}

export const TexPreview = memo(
  ({ displayMode = true, tex }: { displayMode?: boolean; tex: string }) => (
    <div className="min-w-0 space-y-4">
      <figure className="border-border min-w-0 rounded-xl border p-4">
        <figcaption className="text-foreground/80 mb-3 text-sm font-medium">
          Rendered result
        </figcaption>
        <div className="scrollbar-subtle min-h-24 overflow-x-auto py-3">
          {tex.trim() === "" ? (
            <p className="text-foreground/70 text-sm">
              Enter some TeX to see a preview.
            </p>
          ) : (
            katexify(tex, displayMode)
          )}
        </div>
      </figure>
      <figure className="min-w-0">
        <figcaption className="text-foreground/80 mb-2 text-sm font-medium">
          TeX source
        </figcaption>
        <pre className="bg-foreground/5 scrollbar-subtle overflow-x-auto rounded-lg p-4 text-sm leading-relaxed">
          <code>{tex}</code>
        </pre>
      </figure>
    </div>
  )
);

TexPreview.displayName = "TexPreview";
