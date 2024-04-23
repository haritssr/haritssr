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
						<div className="w-full ">
							<p className="font-medium text-zinc-800 dark:text-zinc-100">{post.title}</p>
							<p className="text-zinc-400 inline text-[14px]">{post.publishedAt}</p>
							&nbsp; <span className="text-zinc-400">•</span> &nbsp;
							<p className="text-zinc-400 inline text-[14px]">{post.structuredData.wordCount} Words</p>
							&nbsp; <span className="text-zinc-400">•</span> &nbsp;
							<p className="text-zinc-400 inline text-[14px]">{Math.ceil(post.structuredData.wordCount / 200)} min read</p>
							<br />
							<p
								className={`inline ${
									post.topic === "Humanity\r"
										? "bg-green-50 dark:bg-zinc-800 text-green-500 dark:text-green-600  border-green-200 dark:border-green-700"
										: "bg-violet-50 dark:bg-zinc-800 text-violet-500 dark:text-violet-500  border-violet-200 dark:border-violet-700"
								} rounded px-1.5 py-0.5 text-[12px] border`}
							>
								{post.topic}
							</p>
						</div>
						<ChevronRightIcon
							width={2}
							className="mt-1  w-5 h-5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-500 dark:text-zinc-500"
						/>
					</>
				</Link>
			))}
		</div>
	);
}
