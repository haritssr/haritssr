import type { CSSProperties } from "react";

const MAIN_COLORS = [
  { name: "Success", token: "success" },
  { name: "Attention", token: "attention" },
  { name: "Danger", token: "danger" },
  { name: "Action", token: "action" },
  { name: "Foreground", token: "foreground" },
  { name: "Background", token: "background" },
].map(({ name, token }) => ({
  name,
  label: `bg-${token}`,
  value: `var(--color-${token})`,
}));

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
].map(({ name, value }) => ({ name, label: value, value }));

interface ColorSwatchProps {
  label: string;
  name: string;
  value: string;
}

export function MainColorsDemo() {
  return <ColorSwatchGrid colors={MAIN_COLORS} />;
}

export function HierarchicalColorsDemo() {
  return <ColorSwatchGrid colors={ZINC_COLORS} />;
}

function ColorSwatchGrid({ colors }: { colors: readonly ColorSwatchProps[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {colors.map((color) => (
        <ColorSwatch key={color.name} {...color} />
      ))}
    </div>
  );
}

function ColorSwatch({ label, name, value }: ColorSwatchProps) {
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
