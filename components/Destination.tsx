"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

export default function Destination({ link }: { link: string }) {
	const pathname = usePathname();

	const CurrentPageBaseRoute = pathname?.split("/")[1];

	let color: string;

	if (pathname === `/${link}`) {
		color = "text-blue-700 dark:text-blue-500";
	} else if (CurrentPageBaseRoute === link) {
		color = "text-blue-700 dark:text-blue-500";
	} else {
		color = "text-zinc-800 hover:underline dark:text-zinc-200";
	}

	return (
		<li>
			<Link className={`${color}`} href={`${link === "pure" ? "/pure" : `/${link}`}`}>
				{capitalizeFirstLetter(link)}
			</Link>
		</li>
	);
}
