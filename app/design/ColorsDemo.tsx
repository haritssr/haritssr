import type { CSSProperties } from "react";

const MAIN_COLORS = [
  { name: "Success", token: "success" },
  { name: "Attention", token: "attention" },
  { name: "Danger", token: "danger" },
  { name: "Action", token: "action" },
  { name: "Foreground", token: "foreground" },
  { name: "Background", token: "background" },
] as const;

const ZINC_COLORS = [
  { name: "white", value: "#ffffff" },
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
  { name: "black", value: "#000000" },
] as const;

export function MainColorsDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {MAIN_COLORS.map((color) => (
        <ColorSwatch
          key={color.name}
          name={color.name}
          label={`bg-${color.token}`}
          value={`var(--color-${color.token})`}
        />
      ))}
    </div>
  );
}

export function HierarchicalColorsDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {ZINC_COLORS.map((color) => (
        <ColorSwatch
          key={color.name}
          name={color.name}
          label={color.value}
          value={color.value}
        />
      ))}
    </div>
  );
}

function ColorSwatch({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: string;
}) {
  const style: CSSProperties & { "--swatch-color": string } = {
    "--swatch-color": value,
  };
  return (
    <figure className="border-border bg-surface min-w-0 space-y-3 rounded-xl border p-3">
      <div
        aria-hidden="true"
        className="border-foreground/25 h-20 w-full rounded-lg border bg-(--swatch-color)"
        data-color-swatch
        style={style}
      />
      <figcaption className="space-y-1 text-sm">
        <div className="text-foreground font-medium">{name}</div>
        <code className="text-muted block text-xs break-all">{label}</code>
      </figcaption>
    </figure>
  );
}
