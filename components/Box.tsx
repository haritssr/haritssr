export default function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="corner-squircle overflow-hidden rounded-xl border border-zinc-300">
      <div className="select-none border-zinc-300 border-b bg-zinc-50 px-3 py-1.5 text-zinc-800">
        {title}
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </div>
  );
}
