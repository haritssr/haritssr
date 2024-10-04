"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

export default function Destination({ link }: { link: string }) {
	const pathname = usePathname();

	const CurrentPageBaseRoute = pathname?.split("/")[1];

	let color: string;

	if (pathname === `/${link}`) {
		color = "text-blue-500";
	} else if (CurrentPageBaseRoute === link) {
		color = "text-blue-500";
	} else {
		color = "text-zinc-700 hover:text-blue-500";
	}

	return (
		<li>
			<Link
				className={`${color}`}
				href={`${link === "pure" ? "/pure" : `/${link}`}`}
			>
				{capitalizeFirstLetter(link)}
			</Link>
		</li>
	);
}
