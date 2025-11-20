"use client";

import { ContactData } from "data/AboutData";
import Image from "next/image";

export default function ContactList() {
	return (
		<div className="justify-center self-center">
			<ul className="space-y-1.5">
				{ContactData.points.map((each) => (
					<li key={each.link} className="cursor-pointer">
						{each.link.startsWith("https://www.") ||
						each.link.startsWith("https://www.") ? (
							<a
								title={each.link}
								target="_blank"
								rel="noreferrer noopener"
								href={each.link}
								className="flex items-center space-x-2 px-2 py-1.5 sm:py-1 rounded-xl corner-squircle sm:hover:bg-zinc-100 sm:mr-1.5 border border-zinc-300"
							>
								<Image
									alt={each.link}
									src={each.icon}
									height={20}
									width={20}
									className="h-4 w-4"
									title={each.link}
								/>

								<span className="text-zinc-500">{each.link.substring(12)}</span>
							</a>
						) : each.link.includes("@") ? (
							<a
								href={`mailto:${each.link}`}
								className="flex items-center space-x-2 px-2 py-1.5 sm:py-1 rounded sm:hover:bg-zinc-100 sm:mr-1.5 border border-zinc-300"
							>
								<Image
									alt={each.link}
									src={each.icon}
									height={20}
									width={20}
									className="h-4 w-4"
									title={each.link}
								/>
								<span className="text-zinc-500">{each.link}</span>
							</a>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
}
