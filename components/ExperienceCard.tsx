import Image from "next/image";
import Link from "next/link";

interface ExperienceCardTypes {
	href: string;
	title: string;
	description: string;
	period: string | null;
	status: string[];
	imgSrc: string;
	industry: string;
}

export default function ExperienceCard({
	href,
	title,
	description,
	imgSrc,
}: ExperienceCardTypes) {
	return (
		<div className="group corner-squircle flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-zinc-300 selection:mx-auto">
			{/* Header + Title + Explanation */}
			<section className="flex flex-col justify-between space-y-2 p-3">
				<div className="flex items-start justify-between">
					<Image
						src={imgSrc}
						alt={title}
						width={30}
						height={30}
						blurDataURL={imgSrc}
						className="mb-1.5 h-7 w-7"
					/>

					<Link
						href={`/experiences/${title.toLowerCase().split(" ").join("-")}`}
						className="flex cursor-pointer items-center justify-center space-x-1.5 rounded-full border border-zinc-300 px-3 py-1 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
					>
						<p className="text-sm">Case Study</p>
					</Link>
				</div>
				<div className="truncate font-medium text-lg text-zinc-800">
					{title}
				</div>

				<div className="text-zinc-600">{description}</div>

				{/* Site Link (Text Only) */}
				<cite className="group not-italic">
					<span className="font-light text-base text-zinc-400">
						{href.startsWith("https://www.") ? href.slice(12) : href.slice(8)}
					</span>
				</cite>
			</section>

			<section className="px-3 pb-3">
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="corner-squircle flex w-full select-none items-center justify-center space-x-2 rounded-xl bg-zinc-700 py-1.5 text-center text-tiny text-zinc-100 hover:bg-zinc-600"
				>
					<p>Visit Site</p>
				</a>
			</section>
		</div>
	);
}
