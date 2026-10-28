import InternalLink from "@/components/InternalLink";
import { allWritingPosts } from "@/utils/content/writing-posts";

export default function WritingTable() {
  return (
    <div className="scrollbar-subtle border-border w-full overflow-x-auto border-y border-dashed">
      <table className="text-foreground/90 w-full border-collapse sm:min-w-96">
        <caption className="sr-only">Writing, newest first</caption>
        <tbody className="divide-border divide-y divide-dashed">
          {allWritingPosts.map((post) => (
            <tr
              className="group/row hover:bg-foreground/5 relative cursor-pointer"
              key={post.slug}
            >
              <th
                className="w-full py-2.5 text-left font-normal sm:w-1/3"
                scope="row"
              >
                <InternalLink
                  className="text-base group-hover/row:underline after:absolute after:inset-0 after:content-[''] active:scale-none!"
                  href={`/writing/${post.slug}`}
                  variant="inline"
                >
                  {post.title}
                </InternalLink>
              </th>
              <td className="text-foreground hidden py-2.5 sm:table-cell">
                {post.summary}.
              </td>
              <td className="text-muted py-2.5 whitespace-nowrap tabular-nums">
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              </td>
              <td className="text-muted hidden py-2.5 pl-5 whitespace-nowrap tabular-nums sm:table-cell">
                {Math.ceil(post.wordCount / 200)} min
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
