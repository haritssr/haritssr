"use client";

import { allBlogs } from ".contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BlogGrid() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
			{allBlogs.map((post) => (
				<Link
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="rounded-xl corner-squircle border border-zinc-300 px-3 py-2 hover:bg-zinc-100 bg-zinc-50 flex  items-start justify-between group"
				>
					<div className="w-full text-zinc-500">
						<p className="text-zinc-800">{post.title}</p>
						<p className="inline text-[14px] font-light">{post.publishedAt}</p>
						.&nbsp;
						<p className="inline text-[14px] font-light">
							{post.structuredData.wordCount} Words
						</p>
						, &nbsp;
						<p className="inline text-[14px] font-light">
							{Math.ceil(post.structuredData.wordCount / 200)} min read.
						</p>
					</div>
					<ChevronRightIcon
						width={3}
						className="mt-1 text-zinc-400 w-4 h-4 group-hover:text-zinc-800"
					/>
				</Link>
			))}
		</div>
	);
}
