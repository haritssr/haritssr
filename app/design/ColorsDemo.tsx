const MAIN_COLORS = [
  { className: "bg-success", name: "Success", value: "#34c759" },
  { className: "bg-attention", name: "Attention", value: "#eab308" },
  { className: "bg-danger", name: "Danger", value: "#ef4444" },
  { className: "bg-action", name: "Action", value: "#0284c7" },
  { className: "bg-zinc-800", name: "Black", value: "#27272a" },
  { className: "border bg-white", name: "Background", value: "#fff" },
] as const;

const ZINC_COLORS = [
  { className: "border bg-white", name: "white", value: "#fff" },
  { className: "border bg-zinc-50", name: "zinc-50", value: "#fafafa" },
  { className: "bg-zinc-100", name: "zinc-100", value: "#f4f4f5" },
  { className: "bg-zinc-200", name: "zinc-200", value: "#e4e4e7" },
  { className: "bg-zinc-300", name: "zinc-300", value: "#d4d4d8" },
  { className: "bg-zinc-400", name: "zinc-400", value: "#a1a1aa" },
  { className: "bg-zinc-500", name: "zinc-500", value: "#6b7280" },
  { className: "bg-zinc-600", name: "zinc-600", value: "#52525b" },
  { className: "bg-zinc-700", name: "zinc-700", value: "#3f3f46" },
  { className: "bg-zinc-800", name: "zinc-800", value: "#27272a" },
  { className: "bg-zinc-900", name: "zinc-900", value: "#18181b" },
  { className: "bg-black", name: "black", value: "#000" },
] as const;

export function MainColorsDemo() {
  return (
    <div className="grid grid-cols-3 gap-5 sm:grid-cols-4">
      {MAIN_COLORS.map((color) => (
        <ColorSwatch
          className={color.className}
          key={color.name}
          name={color.name}
          value={color.value}
        />
      ))}
    </div>
  );
}

export function HierarchicalColorsDemo() {
  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-1 sm:grid-cols-6 sm:gap-y-5">
      {ZINC_COLORS.map((color) => (
        <ColorSwatch
          className={color.className}
          key={color.name}
          name={color.name}
          value={color.value}
        />
      ))}
    </div>
  );
}

function ColorSwatch({
  className,
  name,
  value,
}: {
  className: string;
  name: string;
  value: string;
}) {
  return (
    <figure className="space-y-1">
      <div aria-hidden="true" className={`h-12 w-12 rounded ${className}`} />
      <figcaption className="text-foreground/60 text-sm">
        <div>{name}</div>
        <div>{value}</div>
      </figcaption>
    </figure>
  );
}
