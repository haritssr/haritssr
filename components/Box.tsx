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
    <div className="corner-squircle overflow-hidden rounded-xl border border-zinc-300">
      <div className="flex items-center justify-between border-b border-zinc-300 bg-zinc-100 px-3 py-1.5 text-zinc-700 select-none">
        <span>{title}</span>
        {name !== undefined && name.length > 0 ? (
          <span className="font-mono text-sm text-zinc-400">{`${name}.tsx`}</span>
        ) : null}
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </div>
  );
}
