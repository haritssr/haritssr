import InternalLink from "@/components/InternalLink";
import { allWritingPosts } from "@/utils/writing-posts";

export default function WritingTable() {
  return (
    <div className="scrollbar-subtle border-border w-full overflow-x-auto border-y">
      <table className="text-foreground/90 w-full border-collapse sm:min-w-96">
        <caption className="sr-only">Writing, newest first</caption>
        <tbody className="divide-border divide-y">
          {allWritingPosts.map((post) => (
            <tr className="hover:bg-interface-hover" key={post.slug}>
              <th
                className="w-full py-2.5 text-left font-normal sm:w-1/3"
                scope="row"
              >
                <InternalLink
                  className="text-base"
                  href={`/writing/${post.slug}`}
                >
                  {post.title}
                </InternalLink>
              </th>
              <td className="text-muted hidden py-2.5 sm:table-cell">
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
