import { allBlogs } from ".contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BlogGrid() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
			{allBlogs
				.sort((a, b) => {
					if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					// <InternalLink key={post.slug} href={`/blog/${post.slug}`} name={post.title} />

					<Link
						passHref
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="rounded-lg border border-zinc-400/70 pl-3 pr-4 py-2 hover:bg-zinc-50 flex items-center justify-between  group"
					>
						<>
							<div>
								<p className="font-medium text-zinc-700">{post.title}</p>
								<p className="text-zinc-400">{post.publishedAt}</p>
							</div>
							<ChevronRightIcon width={2} className="w-5 h-5 text-zinc-500 group-hover:text-zinc-800" />
						</>
					</Link>
				))}
		</div>
	);
}
