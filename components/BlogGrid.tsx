"use client";

import { allBlogs } from ".contentlayer/generated";
import Link from "next/link";

export default function BlogGrid() {
	return (
		<div className="space-y-2 gap-2 grid lg:grid-cols-2 lg:gap-4">
			{allBlogs.map((post) => (
				<Link
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="rounded-xl corner-squircle border border-zinc-300 px-3 py-2 hover:bg-zinc-50 flex items-start justify-between group"
				>
					<div className="w-full text-zinc-500 lg:flex lg:justify-between">
						<div>
							<p className="text-zinc-800">{post.title}</p>
						</div>
						<div>
							<p className="inline text-[14px] font-light">
								{post.publishedAt}
							</p>
							.&nbsp;
							<p className="inline text-[14px] font-light">
								{post.structuredData.wordCount} Words
							</p>
							, &nbsp;
							<p className="inline text-[14px] font-light">
								{Math.ceil(post.structuredData.wordCount / 200)} min read.
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
