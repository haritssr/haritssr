"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { TitleAndPathData } from "data/TitleAndPathData";

export default function GlobalNavigationMobile() {
	return (
		<div className="sticky bottom-0 block  w-full border-t border-zinc-200 bg-white/90 saturate-150 backdrop-blur-lg sm:hidden">
			<div className="flex w-full items-center ">
				{TitleAndPathData.map(({ title, path }) => (
					<IconWrapper key={title} to={`/${title}`} path={path} />
				))}
			</div>
		</div>
	);
}

function capitalizeFirstLetter(to: string): string {
	const capitalize = to.substring(1).charAt(0).toUpperCase() + to.slice(2);
	return capitalize;
}

const IconWrapper = ({ to, path }: { to: string; path: React.ReactNode }) => {
	const pathname = usePathname();
	const CurrentPageBaseRoute = pathname?.split("/")[1];

	let color: string;
	if (pathname === to) {
		color = "text-action";
	} else if (pathname === "/" && to === "/home") {
		color = "text-action";
	} else if (CurrentPageBaseRoute === to.substring(1)) {
		color = "text-action";
	} else {
		color = "text-zinc-600";
	}

	return (
		<Link
			href={`${to === "/home" ? "/" : to}`}
			className="block w-1/5 active:scale-95"
		>
			<div className="flex flex-col items-center justify-center py-[5px]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={`h-6 w-6 ${color}`}
					viewBox="0 0 24 24"
					stroke="currentColor"
					fill="none"
					strokeWidth={1.5}
				>
					<title>{to}</title>
					{path}
				</svg>

				<div className={`text-[11px] leading-[15px] -mt-px ${color}`}>
					{capitalizeFirstLetter(to)}
				</div>
			</div>
		</Link>
	);
};
