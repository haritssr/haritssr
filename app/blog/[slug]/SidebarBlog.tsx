"use client";

import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

export default function SidebarBlog() {
	const pathname = usePathname();
	const segments = pathname?.split("/") as string[];
	const lastSegment = segments[segments.length - 1];

	return (
		<div className="hidden sm:block sm:col-span-1 border-r border-b border-l dark:border-zinc-700">
			<Link
				className="block font-medium px-4 py-1.5 sticky top-[45px] bg-white dark:bg-zinc-800 border-b dark:border-zinc-700"
				href="/blog"
			>
				Blog
			</Link>

			<div className="flex flex-col space-y-1.5 py-5 px-2 sm:max-h-screen sm:overflow-auto">
				{allBlogs
					.sort((a, b) => {
						if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
							return -1;
						}
						return 1;
					})
					.map((article) => {
						return (
							<Link
								href={`/blog/${article.slug}`}
								key={article.slug}
								className={`${
									lastSegment === article.slug
										? "text-white  bg-action"
										: "text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-200/70 hover:text-zinc-950"
								}  px-2 py-1 rounded-md text-sm`}
							>
								{article.slug
									.split("-")
									.map((a) => capitalizeFirstLetter(a))
									.join(" ")}
							</Link>
						);
					})}
			</div>
		</div>
	);
}
