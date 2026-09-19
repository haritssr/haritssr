export default function Box({
  title,
  name,
  children,
}: {
  title: string;
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="corner-squircle border-border overflow-hidden rounded-xl border">
      <div className="border-border bg-surface-hover text-foreground flex items-center justify-between border-b px-3 py-1.5 select-none">
        <span>{title}</span>
        {name !== undefined && name.length > 0 ? (
          <span className="text-foreground/50 font-mono text-sm">{`${name}.tsx`}</span>
        ) : null}
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </div>
  );
}
