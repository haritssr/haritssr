import Link from "next/link";

import type { Writing } from "@/utils/writings";
import { allWritings } from "@/utils/writings";

import MoreItemsLink from "./MoreItemsLink";

const writingDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const topicLabels: Record<string, string> = {
  engineering: "Eng",
  humanity: "general",
};

function formatDate(date: string) {
  return writingDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

interface IndexedWriting {
  index: number;
  writing: Writing;
}

interface WritingGroup {
  writings: IndexedWriting[];
  year: string;
}

function groupWritingsByYear(): WritingGroup[] {
  const groups: WritingGroup[] = [];

  for (const [index, writing] of allWritings.entries()) {
    const year = writing.publishedAt.slice(0, 4);
    const currentGroup = groups.at(-1);

    if (currentGroup?.year === year) {
      currentGroup.writings.push({ index, writing });
    } else {
      groups.push({ writings: [{ index, writing }], year });
    }
  }

  return groups;
}

const writingGroups = groupWritingsByYear();

export default function WritingGrid({ mobileLimit }: { mobileLimit?: number }) {
  const remainingWritings = Math.max(
    allWritings.length - (mobileLimit ?? allWritings.length),
    0
  );

  return (
    <>
      <div className="columns-1 gap-5 md:columns-2">
        {writingGroups.map((group) => {
          const isHiddenOnMobile =
            mobileLimit !== undefined &&
            group.writings.every(({ index }) => index >= mobileLimit);

          return (
            <section
              className={`mb-3 break-inside-avoid-column ${
                isHiddenOnMobile ? "hidden sm:block" : ""
              }`}
              key={group.year}
            >
              <h2 className="text-foreground pb-2">{group.year}</h2>
              <div className="divide-border border-border corner-squircle divide-y overflow-hidden rounded-2xl border">
                {group.writings.map(({ index, writing }) => (
                  <Link
                    className={`group hover:bg-interface-hover flex flex-col px-3 py-2.5 transition-colors ${
                      mobileLimit !== undefined && index >= mobileLimit
                        ? "hidden! sm:flex!"
                        : ""
                    } ${
                      mobileLimit !== undefined && index === mobileLimit - 1
                        ? "max-sm:border-b-0!"
                        : ""
                    }`}
                    href={`/writing/${writing.slug}`}
                    key={writing.slug}
                    prefetch={false}
                  >
                    <div className="flex w-full justify-between">
                      <div className="text-action group-hover:text-action-hover">
                        {writing.title}
                      </div>
                      <div className="text-foreground/60 mt-1.5 flex flex-wrap items-center gap-x-2 text-xs">
                        <time dateTime={writing.publishedAt}>
                          {formatDate(writing.publishedAt)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>
                          {topicLabels[writing.topic.toLowerCase()] ??
                            writing.topic}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{Math.ceil(writing.wordCount / 200)} min</span>
                      </div>
                    </div>
                    <p className="text-foreground/70 mt-1 truncate text-sm">
                      {writing.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {remainingWritings > 0 ? (
        <MoreItemsLink
          className="sm:hidden!"
          count={remainingWritings}
          href="/writing"
          itemName="writing"
        />
      ) : null}
    </>
  );
}
