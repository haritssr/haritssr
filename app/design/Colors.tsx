import type { CSSProperties } from "react";

const DESIGN_TOKENS = [
  {
    name: "action",
    definition: "blue-600/60 + blue-500/40",
  },
  {
    name: "action-hover",
    definition: "blue-700",
  },
  {
    name: "secondary-accent",
    label: "accent",
    definition: "purple-500",
  },
  {
    name: "contact-accent",
    label: "contact",
    definition: "eme-600/80 + eme-500/20",
  },
  {
    name: "success",
    definition: "green-500/60 + green-600/40",
  },
  {
    name: "attention",
    definition: "amber-500",
  },
  {
    name: "timer-paused",
    definition: "orange-500",
  },
  {
    name: "danger",
    definition: "red-500",
  },
  {
    name: "music",
    definition: "cyan-500",
  },
  {
    name: "surface",
    definition: "#fafafa",
  },
  {
    name: "background",
    definition: "#fcfcfc",
  },
  {
    name: "surface-hover",
    definition: "zinc-50",
  },
  {
    name: "interface-hover",
    definition: "zinc-100",
  },
  {
    name: "middle-hover",
    definition: "zinc-200",
  },
  {
    name: "border",
    definition: "zinc-300",
  },
  {
    name: "border-hover",
    definition: "zinc-400",
  },
  {
    name: "muted",
    definition: "foreground/70 + background/30",
  },
  {
    name: "secondary-foreground",
    label: "secondary",
    definition: "zinc-600",
  },
  {
    name: "secondary-hover-foreground",
    label: "secondary-hover",
    definition: "zinc-700",
  },
  {
    name: "foreground",
    definition: "zinc-800",
  },
];

export function DesignTokens() {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {DESIGN_TOKENS.map(({ name, definition, label }) => {
        const style: CSSProperties & { "--swatch-color": string } = {
          "--swatch-color": `var(--color-${name})`,
        };
        return (
          <li className="flex items-center gap-4" key={name}>
            <div
              aria-hidden="true"
              className="corner-squircle border-foreground/10 size-10 shrink-0 rounded-lg border bg-(--swatch-color)"
              style={style}
            />
            <div className="min-w-0">
              <div className="text-foreground font-medium">{label ?? name}</div>
              <code className="text-muted block text-sm wrap-break-word">
                {definition}
              </code>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
