export default function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-400/50">
      <div className="select-none border-zinc-400/50 border-b bg-zinc-50 px-3 py-2 font-medium text-zinc-800">
        {title}
      </div>
      <div className="flex h-72 items-center justify-center p-5">
        <div>{children}</div>
      </div>
    </div>
  );
}
