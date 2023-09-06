"use client";

import * as Popover from "@radix-ui/react-popover";
import { ContactData } from "data/AboutData";
import Image from "next/image";

export default function PopoverContact() {
	return (
		<div className="flex justify-center">
			<Popover.Root>
				<Popover.Trigger>
					<div className="space-x-1 flex items-center rounded-md py-0.5 pl-1.5 pr-1  hover:bg-zinc-50 active:ring-1 active:ring-offset-1 active:ring-zinc-500 select-none rounded-md ring-1 ring-zinc-950/20 focus:outline-none focus:ring-zinc-800 shadow">
						<div className="text-zinc-600 text-sm">@haritssr</div>
						<svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-action">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
							/>
						</svg>
					</div>
				</Popover.Trigger>
				<Popover.Content
					className="rounded-lg border border-zinc-300 bg-white w-fit shadow-xl max-w-sm text-zinc-800 p-3 z-50"
					sideOffset={10}
					side="bottom"
				>
					<ul className="block space-y-2">
						{ContactData.points.map((each) => (
							<li key={each.link} className="text-zinc-700 flex space-x-2 items-center">
								<Image alt={each.link} src={each.icon} height={20} width={20} className="h-[18px] w-[18px]" />
								{each.link.startsWith("https://www.") ? (
									<a
										title={each.link}
										className="hover:underline hover:text-zinc-800"
										target="_blank"
										rel="noreferrer noopener"
										href={each.link}
									>
										{each.link.slice(12)}
									</a>
								) : each.link.startsWith("https://") ? (
									<a
										title={each.link}
										className="hover:underline hover:text-zinc-800"
										target="_blank"
										rel="noreferrer noopener"
										href={each.link}
									>
										{each.link.slice(8)}
									</a>
								) : each.link.includes("@") ? (
									<a className="hover:underline hover:text-zinc-800" href={`mailto:${each.link}`}>
										{each.link}
									</a>
								) : (
									each.link
								)}
							</li>
						))}
					</ul>
					<Popover.Arrow className="fill-zinc-300" />
				</Popover.Content>
			</Popover.Root>
		</div>
	);
}
