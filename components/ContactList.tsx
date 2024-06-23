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
								className="flex items-center space-x-2 px-2 py-1 rounded sm:bg-zinc-100/50 sm:hover:bg-zinc-200/50 sm:mr-1.5 border border-zinc-300"
							>
								<Image
									alt={each.link}
									src={each.icon}
									height={20}
									width={20}
									className="h-4 w-4"
									title={each.link}
								/>

								<span>{each.name}</span>
							</a>
						) : each.link.includes("@") ? (
							<a
								href={`mailto:${each.link}`}
								className="flex items-center space-x-2 px-2 py-1 rounded sm:bg-zinc-100/50 sm:hover:bg-zinc-200/50 sm:mr-1.5 border border-zinc-300"
							>
								<Image
									alt={each.link}
									src={each.icon}
									height={20}
									width={20}
									className="h-4 w-4"
									title={each.link}
								/>
								<span>{each.name}</span>
							</a>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
}
