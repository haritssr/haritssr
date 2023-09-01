import { allBlogs } from "contentlayer/generated";
import Wrapper from "./Wrapper";
import InternalLink from "@/components/InternalLink";

export default function Blog() {
	return (
		<Wrapper
			id="blog"
			topic="Blog"
			className="space-y-3 grid grid-cols-1"
			explanation="Selected notes to share with the world."
		>
			{allBlogs
				.sort((a, b) => {
					if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<InternalLink
						key={post.slug}
						href={`/blog/${post.slug}`}
						name={post.title}
					/>
				))}
		</Wrapper>
	);
}
