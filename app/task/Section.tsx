import type { ReactNode } from "react";

interface SectionProps {
  title: ReactNode;
  titleMeta?: ReactNode;
  children: ReactNode;
  accordion?: {
    defaultOpen?: boolean;
  };
}

export default function Section({ title, titleMeta, children, accordion }: SectionProps) {
  const header = (
    <div className="flex items-center justify-between">
      <div className="font-medium text-zinc-800">{title}</div>
      {titleMeta && <div className="text-sm text-zinc-500">{titleMeta}</div>}
    </div>
  );

  if (accordion) {
    return (
      <details className="group mb-1 mt-5 overflow-hidden rounded-2xl corner-squircle border border-zinc-300" open={accordion.defaultOpen}>
        <summary className="cursor-pointer list-none select-none bg-zinc-100/70 px-2.5 py-1.5 group-open:border-b group-open:border-zinc-300">
          <div className="flex items-center justify-between">
            <div className="font-medium text-zinc-800">{title}</div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              {titleMeta}
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </summary>
        <div className="p-2.5 space-y-2.5">{children}</div>
      </details>
    );
  }

  return (
    <div className="mb-1 mt-5 overflow-hidden rounded-2xl corner-squircle border border-zinc-300">
      <div className="select-none border-zinc-300 border-b bg-zinc-100/70 px-2.5 py-1.5">{header}</div>
      <div className="p-2.5 space-y-2.5">{children}</div>
    </div>
  );
}
