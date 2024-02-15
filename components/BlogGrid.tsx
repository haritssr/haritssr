"use client";

import { useState } from "react";
import { allBlogs } from ".contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BlogGrid() {
	const [filter, setFilter] = useState<"Humanity\r" | "Engineering\r" | true>(true);
	const filteredAllBlogs = allBlogs
		.sort((a, b) => {
			if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
				return -1;
			}
			return 1;
		})
		.filter((post) => (filter === true ? true : post.topic === filter));
	const cn = "px-2.5 py-0.5 rounded-full border border-zinc-300 hover:bg-zinc-100";
	return (
		<>
			<div className="mb-5 space-x-2">
				<button className={`${cn} ${filter === true ? "bg-zinc-100 text-zinc-800" : ""}`} onClick={() => setFilter(true)}>
					All
				</button>
				<button
					className={`${cn} ${filter === "Humanity\r" ? "bg-zinc-100 text-zinc-800" : ""}`}
					onClick={() => {
						setFilter("Humanity\r");
					}}
				>
					Humanity
				</button>
				<button
					className={`${cn} ${filter === "Engineering\r" ? "bg-zinc-100 text-zinc-800" : ""}`}
					onClick={() => {
						setFilter("Engineering\r");
					}}
				>
					Engineering
				</button>
			</div>
			<div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
				{filteredAllBlogs.map((post) => (
					<Link
						passHref
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="rounded-lg border border-zinc-300 px-3 py-2 hover:bg-zinc-50 flex items-start justify-between  group"
					>
						<>
							<div className="w-full ">
								<p className="font-medium text-zinc-700">{post.title}</p>
								<p className="text-zinc-400 inline text-[14px]">{post.publishedAt}</p>
								&nbsp; <span className="text-zinc-400">•</span> &nbsp;
								<p className="text-zinc-400 inline text-[14px]">{post.structuredData.wordCount} Words</p>
								&nbsp; <span className="text-zinc-400">•</span> &nbsp;
								<p className="text-zinc-400 inline text-[14px]">{Math.ceil(post.structuredData.wordCount / 200)} min read</p>
								<br />
								<p
									className={`inline ${
										post.topic === "Humanity\r" ? "bg-green-50 text-green-500  border-green-200" : "bg-rose-50 text-rose-500 border-rose-200"
									} rounded-full px-1.5 py-0.5 text-[12px] border`}
								>
									{post.topic}
								</p>
							</div>
							<ChevronRightIcon width={2} className="mt-1  w-5 h-5 text-zinc-400 group-hover:text-zinc-800" />
						</>
					</Link>
				))}
			</div>
		</>
	);
}
