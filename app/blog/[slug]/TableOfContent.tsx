import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";
import generateTOC from "utils/generateTOC";

export default function TableOfContents({ title }: { title: string }) {
	const articleTOC = generateTOC(`../haritssr/content/${title}.mdx`);

	return (
		<section className="sm:col-span-1 sm:border-r sm:border-b hidden sm:block">
			<div className="sticky top-[45px]">
				<div className="py-2 text-zinc-500 bg-white border-b px-5">
					In this page
				</div>

				<div className="space-y-2 sm:p-5 overflow-y-auto">
					{articleTOC.map((heading) => {
						const slug = heading
							.replace(/[^a-zA-Z0-9\s-]/g, "") // strip everything except letters, numbers, spaces, and hyphens
							.trim()
							.split(/\s+/) // collapse consecutive spaces before joining
							.join("-");

						return (
							<Link
								key={heading}
								href={`#${slug}`}
								className="block text-zinc-500 hover:text-zinc-700 text-sm"
							>
								{capitalizeFirstLetter(heading)}
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
