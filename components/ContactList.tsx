"use client";

import { ContactData } from "data/AboutData";
import Image from "next/image";

export default function ContactList() {
	return (
		<div className="w-full flex justify-center pt-1.5">
			<ul className="flex space-x-4">
				{ContactData.points.map((each) => (
					<li key={each.link} className="cursor-pointer">
						{each.link.startsWith("https://www.") || each.link.startsWith("https://www.") ? (
							<a title={each.link} target="_blank" rel="noreferrer noopener" href={each.link}>
								<Image alt={each.link} src={each.icon} height={20} width={20} className="h-5 w-h-5 grayscale hover:grayscale-0" title={each.link} />
							</a>
						) : each.link.includes("@") ? (
							<a href={`mailto:${each.link}`}>
								<Image alt={each.link} src={each.icon} height={20} width={20} className="h-5 w-h-5 grayscale hover:grayscale-0" title={each.link} />
							</a>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
}
