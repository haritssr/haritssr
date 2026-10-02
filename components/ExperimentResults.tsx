import Link from "next/link";

import type { ExperimentSummary } from "@/data/experimentExplorer";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function ExperimentResults({
  items,
}: {
  items: readonly ExperimentSummary[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.route}>
          <Link
            href={item.route}
            prefetch={false}
            className="border-border hover:bg-surface-hover focus-visible:outline-action flex h-full flex-col gap-3 rounded-xl border p-4 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <div>
              <p className="text-muted mb-1 text-xs">{item.domainTitle}</p>
              <h3 className="text-foreground font-semibold">{item.title}</h3>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {item.description}
            </p>
            <ul
              aria-label="Topics"
              className="text-muted mt-auto flex flex-wrap gap-2 text-xs"
            >
              {item.tags.map((tag) => (
                <li
                  className="bg-foreground/5 rounded-full px-2 py-1"
                  key={tag}
                >
                  {tag.replaceAll("-", " ")}
                </li>
              ))}
            </ul>
            <p className="text-muted text-xs">
              Updated{" "}
              <time dateTime={item.updatedAt}>
                {dateFormatter.format(
                  new Date(`${item.updatedAt}T00:00:00.000Z`)
                )}
              </time>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
