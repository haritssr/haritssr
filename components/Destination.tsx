"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Destination({ link }: { link: string }) {
	const pathname = usePathname();

	const CurrentPageBaseRoute = pathname?.split("/")[1];

	function capitalizeFirstLetter(to: string) {
		return to.substring(0).charAt(0).toUpperCase() + to.slice(1);
	}

	let color: string;

	if (pathname === `/${link}`) {
		color = "text-blue-700";
	} else if (CurrentPageBaseRoute === link) {
		color = "text-blue-700";
	} else {
		color = "text-zinc-800 hover:text-zinc-400";
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
