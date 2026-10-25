import type { CSSProperties } from "react";

const DESIGN_TOKENS = [
  {
    name: "white",
    definition: "#fafafa",
  },
  {
    name: "black",
    definition: "#18181b",
  },
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
    definition: "emerald-600/80 + emerald-500/20",
  },
  {
    name: "muted",
    definition: "foreground/70 + background/30",
  },
  {
    name: "success",
    definition: "green-500/60 + green-600/40",
  },
  {
    name: "success-hover",
    definition: "success/60 + green-600/40",
  },
  {
    name: "attention",
    definition: "amber-500",
  },
  {
    name: "danger",
    definition: "red-500",
  },
  {
    name: "surface",
    definition: "white",
  },
  {
    name: "switch-thumb",
    definition: "#fafafa",
  },
  {
    name: "switch-active",
    definition: "zinc-600",
  },
  {
    name: "slider-thumb",
    definition: "#fafafa",
  },
  {
    name: "background",
    definition: "#fcfcfc",
  },
  {
    name: "foreground",
    definition: "zinc-800",
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
    name: "surface-hover",
    definition: "zinc-50",
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
    name: "interface-hover",
    definition: "zinc-100",
  },
  {
    name: "middle-hover",
    definition: "zinc-200",
  },
  {
    name: "searchicon-hover",
    label: "search-hover",
    definition: "zinc-500",
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
          <li className="flex items-start gap-4" key={name}>
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
