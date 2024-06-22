import Image from "next/image";
import type { ClassAttributes, HTMLAttributes } from "react";

export const TechnologyCard = (
	{
		domain,
		links,
	}: {
		domain?: string;
		links?: Array<{ href: string; imgSrc: string; name: string }>;
	},
	props: JSX.IntrinsicAttributes &
		ClassAttributes<HTMLDivElement> &
		HTMLAttributes<HTMLDivElement>,
) => {
	return (
		<div
			{...props}
			className="h-fit overflow-hidden rounded-md border border-zinc-300"
		>
			<div className="truncate px-3 py-1.5 bg-zinc-50 text-tiny font-medium text-zinc-700 sm:text-base border-b border-zinc-300">
				{domain}
			</div>
			<div className="">
				{links?.map(({ href, imgSrc, name }) => {
					return (
						<a
							key={name}
							title={href}
							href={href}
							target="_blank"
							rel="noreferrer noopener"
							className="group flex w-auto items-center justify-between space-x-2 py-[7px] px-3 hover:bg-zinc-100/50"
						>
							<section className="flex items-center space-x-2 overflow-hidden">
								<Image
									src={imgSrc}
									height={18}
									width={18}
									alt={name}
									className="aspect-auto h-[18px] w-[18px]"
									blurDataURL={imgSrc}
									// placeholder='blur'
								/>
								<div className="truncate text-zinc-500 group-hover:text-zinc-700">
									{name}
								</div>
							</section>
							{/* External Link Icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="hidden h-4 w-4 text-white group-hover:text-zinc-800 sm:block"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1.5}
							>
								<title>External Link Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</a>
					);
				})}
			</div>
		</div>
	);
};
