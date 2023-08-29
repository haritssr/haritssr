import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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
	period,
	status,
	imgSrc,
	industry,
}: ExperienceCardTypes) {
	return (
		<Link
			passHref
			href={`/experiences/${title.toLowerCase().split(" ").join("-")}`}
			className="flex w-full flex-col justify-between overflow-hidden rounded-lg border border-zinc-400/60 selection:mx-auto hover:ring-2 hover:ring-zinc-400 hover:border-zinc-700 group"
		>
			{/* Header + Title + Explanation */}
			<section className=" flex flex-col justify-between p-3 space-y-2">
				<div className="flex justify-between items-center">
					<Image
						src={imgSrc}
						alt={title}
						width={30}
						height={30}
						blurDataURL={imgSrc}
						className="mb-1.5 h-7 w-7"
						// placeholder='blur'
					/>
					<ChevronRightIcon className="w-5 h-5 text-zinc-400 stroke-2 group-hover:text-zinc-700" />
				</div>
				<div className="truncate font-semibold text-zinc-800 sm:text-lg">
					{title}
				</div>

				<div className="text-zinc-800">{description}</div>

				{/* Site Link */}
				<cite className="group not-italic">
					{href.startsWith("https://www.") ? (
						<span className={`text-base text-zinc-700`}>{href.slice(12)}</span>
					) : (
						<span className={`text-base text-zinc-700`}>{href.slice(8)}</span>
					)}
				</cite>
			</section>

			{/* Details */}
			<section className=" flex flex-col space-y-1.5 border-t border-zinc-400/60 px-3 py-2 text-zinc-500 text-sm bg-zinc-50">
				<article className="flex items-center justify-between">
					<div className="flex w-1/3 items-center justify-between">
						<div>Period</div>
						<div>:</div>
					</div>
					<div>{period}</div>
				</article>
				<article className="flex items-center justify-between">
					<div className="flex w-1/3 items-center justify-between">
						<div>Status</div>
						<div>:</div>
					</div>
					<div>{status[0]}</div>
				</article>
				<article className="flex items-center justify-between">
					<div className="flex w-1/3 items-center justify-between">
						<div>Industry</div>
						<div>:</div>
					</div>
					<div>{industry}</div>
				</article>
			</section>
		</Link>
	);
}
