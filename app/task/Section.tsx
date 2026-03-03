import type { ReactNode } from "react";

interface SectionProps {
  title: ReactNode;
  titleMeta?: ReactNode;
  children: ReactNode;
}

export default function Section({ title, titleMeta, children }: SectionProps) {
  return (
    <div className="mb-1 mt-5 overflow-hidden rounded-2xl corner-squircle border border-zinc-300">
      <div className="select-none border-zinc-300 border-b bg-zinc-100/70 px-2.5 py-1.5">
        <div className="flex items-center justify-between">
          <div className="font-medium text-zinc-800">{title}</div>
          {titleMeta && <div className="text-sm text-zinc-500">{titleMeta}</div>}
        </div>
      </div>
      <div className="p-2.5 space-y-2.5">{children}</div>
    </div>
  );
}
