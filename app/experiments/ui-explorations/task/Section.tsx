import type { ReactNode } from "react";

interface SectionProps {
  title: ReactNode;
  titleMeta?: ReactNode;
  children: ReactNode;
  accordion?: {
    defaultOpen?: boolean;
  };
}

export default function Section({
  title,
  titleMeta,
  children,
  accordion,
}: SectionProps) {
  const header = (
    <div className="flex items-center justify-between">
      <div className="font-medium text-zinc-800">{title}</div>
      {titleMeta !== undefined && titleMeta !== null ? (
        <div className="text-sm text-zinc-500">{titleMeta}</div>
      ) : null}
    </div>
  );

  if (accordion !== undefined) {
    return (
      <details
        className="group corner-squircle overflow-hidden rounded-2xl border border-zinc-300"
        open={accordion.defaultOpen}
      >
        <summary
          aria-label={typeof title === "string" ? title : "Toggle section"}
          className="cursor-pointer list-none bg-zinc-100/70 px-2.5 py-1.5 select-none group-open:border-b group-open:border-zinc-300"
        >
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
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </summary>
        <div className="space-y-2.5 p-2.5">{children}</div>
      </details>
    );
  }

  return (
    <div className="corner-squircle overflow-hidden rounded-2xl border border-zinc-300">
      <div className="border-b border-zinc-300 bg-zinc-100/70 px-2.5 py-1.5 select-none">
        {header}
      </div>
      <div className="space-y-2.5 p-2.5">{children}</div>
    </div>
  );
}
