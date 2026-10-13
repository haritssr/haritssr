import InternalLink from "@/components/InternalLink";
import Table from "@/components/Table";
import { allWritingPosts } from "@/utils/writing-posts";

const writingDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

export default function WritingTable() {
  return (
    <Table className="min-w-96">
      <caption className="sr-only">Writing, newest first</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th
            className="w-full px-3 py-2 text-left font-normal sm:w-1/3"
            scope="col"
          >
            Title
          </th>
          <th
            className="hidden px-3 py-2 text-left font-normal sm:table-cell"
            scope="col"
          >
            Description
          </th>
          <th
            className="hidden px-3 py-2 text-left font-normal sm:table-cell"
            scope="col"
          >
            Year
          </th>
          <th className="px-3 py-2 text-left font-normal" scope="col">
            Date
          </th>
          <th className="px-3 py-2 text-left font-normal" scope="col">
            Time
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {allWritingPosts.map((post) => (
          <tr
            className="divide-border hover:bg-interface-hover divide-x"
            key={post.slug}
          >
            <th className="px-3 py-2 text-left font-normal" scope="row">
              <InternalLink className="text-sm" href={`/writing/${post.slug}`}>
                {post.title}
              </InternalLink>
            </th>
            <td className="text-muted hidden px-3 py-2 sm:table-cell">
              {post.summary}.
            </td>
            <td className="text-muted hidden px-3 py-2 tabular-nums sm:table-cell">
              {post.publishedAt.slice(0, 4)}
            </td>
            <td className="text-muted px-3 py-2 whitespace-nowrap tabular-nums">
              <time className="sm:hidden" dateTime={post.publishedAt}>
                {post.publishedAt}
              </time>
              <time className="hidden sm:inline" dateTime={post.publishedAt}>
                {writingDateFormatter
                  .format(new Date(`${post.publishedAt}T00:00:00.000Z`))
                  .replace(/^Sep /u, "Sept ")}
              </time>
            </td>
            <td className="text-muted px-3 py-2 whitespace-nowrap tabular-nums">
              {Math.ceil(post.wordCount / 200)} min
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
