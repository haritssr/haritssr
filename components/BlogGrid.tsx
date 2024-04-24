"use client";

import { allBlogs } from ".contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BlogGrid() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
			{allBlogs.map((post) => (
				<Link
					passHref
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 flex bg-white dark:bg-zinc-800 items-start justify-between  group"
				>
					<>
						<div className="w-full text-zinc-400">
							<p className="font-medium text-zinc-800 dark:text-zinc-100">{post.title}</p>
							<p className="inline text-[14px]">{post.publishedAt}</p>.&nbsp;
							<p className="inline text-[14px]">{post.structuredData.wordCount} Words</p>, &nbsp;
							<p className="inline text-[14px]">{Math.ceil(post.structuredData.wordCount / 200)} min read.</p>
						</div>
						<ChevronRightIcon
							width={3}
							className="mt-1 text-zinc-400 w-4 h-4 group-hover:text-zinc-800 dark:group-hover:text-zinc-500 dark:text-zinc-500"
						/>
					</>
				</Link>
			))}
		</div>
	);
}
