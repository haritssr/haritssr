import type { CSSProperties } from "react";

const MAIN_COLORS = [
  { name: "Success", token: "success", definition: "green-500 / green-600" },
  { name: "Attention", token: "attention", definition: "amber-500" },
  { name: "Danger", token: "danger", definition: "red-500" },
  { name: "Action", token: "action", definition: "blue-600 / blue-500" },
  { name: "Foreground", token: "foreground", definition: "zinc-800" },
  { name: "Background", token: "background", definition: "#fcfcfc" },
].map(({ name, token, definition }) => ({ name, token, definition }));

const ZINC_COLORS = [
  { name: "white", value: "#fafafa" },
  { name: "zinc-50", value: "#fafafa" },
  { name: "zinc-100", value: "#f4f4f5" },
  { name: "zinc-200", value: "#e4e4e7" },
  { name: "zinc-300", value: "#d4d4d8" },
  { name: "zinc-400", value: "#a1a1aa" },
  { name: "zinc-500", value: "#71717a" },
  { name: "zinc-600", value: "#52525b" },
  { name: "zinc-700", value: "#3f3f46" },
  { name: "zinc-800", value: "#27272a" },
  { name: "zinc-900", value: "#18181b" },
  { name: "black", value: "#18181b" },
].map(({ name, value }) => ({ name, token: name, definition: value }));

export function MainColors() {
  return <ColorTokenList colors={MAIN_COLORS} />;
}

export function HierarchicalColors() {
  return <ColorTokenList colors={ZINC_COLORS} />;
}

function ColorTokenList({
  colors,
}: {
  colors: readonly { definition: string; name: string; token: string }[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {colors.map(({ definition, name, token }) => {
        const style: CSSProperties & { "--swatch-color": string } = {
          "--swatch-color": `var(--color-${token})`,
        };
        return (
          <li className="flex items-start gap-4" key={name}>
            <div
              aria-hidden="true"
              className="corner-squircle border-foreground/10 size-10 shrink-0 rounded-lg border bg-(--swatch-color)"
              style={style}
            />
            <div className="min-w-0">
              <div className="text-foreground font-medium">{name}</div>
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
    definition: "color-mix( in oklab, blue-600 60%, blue-500 40% )",
  },
  {
    name: "action-hover",
    definition: "blue-700",
  },
  {
    name: "secondary-accent",
    definition: "color-mix( in oklab, purple-400 60.5%, purple-500 39.5% )",
  },
  {
    name: "muted",
    definition: "color-mix( in srgb, foreground 70%, background )",
  },
  {
    name: "success",
    definition: "color-mix( in oklab, green-500 60%, green-600 )",
  },
  {
    name: "success-hover",
    definition: "color-mix( in oklab, success 60%, green-600 )",
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
    definition: "zinc-600",
  },
  {
    name: "secondary-hover-foreground",
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
    definition: "zinc-500",
  },
];

export function DesignTokens() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {DESIGN_TOKENS.map(({ name, definition }) => {
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
              <div className="text-foreground font-medium">{name}</div>
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
