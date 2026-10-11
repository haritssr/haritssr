import Link from "next/link";

import type { WritingPost } from "@/utils/writing-posts";
import { allWritingPosts } from "@/utils/writing-posts";

import MoreItemsLink from "./MoreItemsLink";

const writingDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

interface WritingPostGroup {
  firstIndex: number;
  posts: WritingPost[];
  year: string;
}

const writingPostGroups = groupWritingPostsByYear(allWritingPosts);

export default function WritingGrid({
  mobileLimit,
  headingLevel = 2,
}: {
  mobileLimit?: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const remainingPosts =
    mobileLimit === undefined
      ? 0
      : Math.max(allWritingPosts.length - mobileLimit, 0);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {writingPostGroups.map((group) => {
          const groupIsHiddenOnMobile =
            mobileLimit !== undefined && group.firstIndex >= mobileLimit;

          return (
            <section
              className={groupIsHiddenOnMobile ? "hidden sm:block" : undefined}
              key={group.year}
            >
              <Heading className="text-foreground pb-2">{group.year}</Heading>
              <ul className="divide-border border-border corner-squircle list-none divide-y overflow-hidden rounded-2xl border">
                {group.posts.map((post, index) => {
                  const postIndex = group.firstIndex + index;
                  const postIsHiddenOnMobile =
                    mobileLimit !== undefined && postIndex >= mobileLimit;
                  const isLastMobilePost =
                    mobileLimit !== undefined && postIndex === mobileLimit - 1;

                  return (
                    <li
                      className={`${
                        postIsHiddenOnMobile ? "hidden sm:block" : ""
                      } ${isLastMobilePost ? "max-sm:border-b-0!" : ""}`}
                      key={post.slug}
                    >
                      <Link
                        className="group hover:bg-interface-hover flex flex-col px-3 py-2.5 transition-colors"
                        href={`/writing/${post.slug}`}
                        prefetch={false}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="text-action group-hover:text-action-hover">
                            {post.title}
                          </div>
                          <div className="text-muted mt-1.5 flex flex-wrap items-center space-x-1 text-xs">
                            <span>{Math.ceil(post.wordCount / 200)} min</span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={post.publishedAt}>
                              {formatDate(post.publishedAt)}
                            </time>
                          </div>
                        </div>
                        <p className="text-foreground/70 mt-1 truncate text-sm">
                          {post.summary}.
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
      {remainingPosts > 0 ? (
        <MoreItemsLink
          className="mt-5 sm:hidden!"
          count={remainingPosts}
          href="/writing"
          itemName="post"
        />
      ) : null}
    </>
  );
}

function formatDate(date: string) {
  return writingDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

function groupWritingPostsByYear(
  posts: readonly WritingPost[]
): WritingPostGroup[] {
  const groups: WritingPostGroup[] = [];

  for (const [index, post] of posts.entries()) {
    const year = post.publishedAt.slice(0, 4);
    const currentGroup = groups.at(-1);

    if (currentGroup?.year === year) {
      currentGroup.posts.push(post);
    } else {
      groups.push({ firstIndex: index, posts: [post], year });
    }
  }

  return groups;
}
