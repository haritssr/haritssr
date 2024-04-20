import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import generateTOC from "utils/generateTOC";

export default function TableOfContents({ title }: { title: string }) {
	let articleTOC = generateTOC(`../haritssr/content/${title}.mdx`);

	return (
		<section className="sm:col-span-1 sm:border-r sm:border-b hidden sm:block dark:border-zinc-700">
			<div className="sticky top-[45px]">
				<div className="font-medium py-2 text-zinc-500 dark:text-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 border-b px-5">
					In This Page
				</div>

				<div className="space-y-2 sm:p-5 overflow-y-auto">
					{articleTOC.map((heading) => (
						<Link key={heading} href={`#${heading.split(" ").join("-")}`} className="block text-zinc-500 dark:text-zinc-400 hover:underline text-sm">
							{capitalizeFirstLetter(heading)}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
