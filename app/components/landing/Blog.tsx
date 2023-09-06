import InternalLink from "@/components/InternalLink";
import Wrapper from "./Wrapper";
import { allBlogs } from ".contentlayer/generated";

export default function Blog() {
	return (
		<Wrapper
			id="blog"
			topic="Blog"
			className="space-y-3 grid grid-cols-1"
			explanation="Selected notes that I want to share to the world."
		>
			<div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{allBlogs
					.sort((a, b) => {
						if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
							return -1;
						}
						return 1;
					})
					.map((post) => (
						<InternalLink key={post.slug} href={`/blog/${post.slug}`} name={post.title} />
					))}
			</div>
		</Wrapper>
	);
}
