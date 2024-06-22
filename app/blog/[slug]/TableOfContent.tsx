import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import generateTOC from "utils/generateTOC";

export default function TableOfContents({ title }: { title: string }) {
	const articleTOC = generateTOC(`../haritssr/content/${title}.mdx`);

	return (
		<section className="sm:col-span-1 sm:border-r sm:border-b hidden sm:block">
			<div className="sticky top-[45px]">
				<div className="py-2 text-zinc-400 bg-white border-b px-5">
					In This Page
				</div>

				<div className="space-y-2 sm:p-5 overflow-y-auto">
					{articleTOC.map((heading) => (
						<Link
							key={heading}
							href={`#${heading.split(" ").join("-")}`}
							className="block text-zinc-400 hover:underline text-sm"
						>
							{capitalizeFirstLetter(heading)}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
