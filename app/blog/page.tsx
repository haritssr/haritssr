import type { Metadata } from "next";
import { allBlogs } from ".contentlayer/generated";
import { PageTitle } from "@/components/SubTitle";
import InternalLink from "@/components/InternalLink";

export const metadata: Metadata = {
	title: "Blog",
	description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
	return (
		<section className="max-w-2xl mx-auto">
			<PageTitle
				title="Blog"
				description="Selected notes that I want to share to the world."
			>
				<div className="space-y-3">
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
				</div>
			</PageTitle>
		</section>
	);
}
