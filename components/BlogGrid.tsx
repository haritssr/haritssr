import Link from "next/link";

import type { BlogPost } from "@/utils/blog-posts";
import { allBlogPosts } from "@/utils/blog-posts";

import MoreItemsLink from "./MoreItemsLink";

const blogDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const topicLabels: Record<string, string> = {
  engineering: "Eng",
  humanity: "General",
};

interface IndexedBlogPost {
  index: number;
  post: BlogPost;
}

interface BlogPostGroup {
  posts: IndexedBlogPost[];
  year: string;
}

const blogPostGroups = groupBlogPostsByYear();

export default function BlogGrid({
  mobileLimit,
  headingLevel = 2,
}: {
  mobileLimit?: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const remainingPosts = Math.max(
    allBlogPosts.length - (mobileLimit ?? allBlogPosts.length),
    0
  );

  return (
    <>
      <div className="columns-1 gap-5 md:columns-2">
        {blogPostGroups.map((group) => {
          const isHiddenOnMobile =
            mobileLimit !== undefined &&
            group.posts.every(({ index }) => index >= mobileLimit);

          return (
            <section
              className={`mb-3 break-inside-avoid-column ${
                isHiddenOnMobile ? "hidden sm:block" : ""
              }`}
              key={group.year}
            >
              <Heading className="text-foreground pb-2">{group.year}</Heading>
              <div className="divide-border border-border corner-squircle divide-y overflow-hidden rounded-2xl border">
                {group.posts.map(({ index, post }) => (
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
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    prefetch={false}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="text-action group-hover:text-action-hover">
                        {post.title}
                      </div>
                      <div className="text-foreground/60 mt-1.5 flex flex-wrap items-center space-x-1 text-xs">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <span aria-hidden="true">/</span>
                        <span>
                          {topicLabels[post.topic.toLowerCase()] ?? post.topic}
                        </span>
                        <span aria-hidden="true">/</span>
                        <span>{Math.ceil(post.wordCount / 200)} min</span>
                      </div>
                    </div>
                    <p className="text-foreground/70 mt-1 truncate text-sm">
                      {post.summary}.
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {remainingPosts > 0 ? (
        <MoreItemsLink
          className="sm:hidden!"
          count={remainingPosts}
          href="/blog"
          itemName="post"
        />
      ) : null}
    </>
  );
}

function formatDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

function groupBlogPostsByYear(): BlogPostGroup[] {
  const groups: BlogPostGroup[] = [];

  for (const [index, post] of allBlogPosts.entries()) {
    const year = post.publishedAt.slice(0, 4);
    const currentGroup = groups.at(-1);

    if (currentGroup?.year === year) {
      currentGroup.posts.push({ index, post });
    } else {
      groups.push({ posts: [{ index, post }], year });
    }
  }

  return groups;
}
