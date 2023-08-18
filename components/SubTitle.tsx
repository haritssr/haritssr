"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-8 space-y-1 break-words pb-5 text-zinc-800">
			{children}
		</div>
	);
}

import { useInView } from "react-intersection-observer";

export function PageTitle({
	title,
	description,
	children,
}: {
	title: string;
	description: string | React.ReactNode;
	children: React.ReactNode;
}) {
	const { ref, inView } = useInView({ rootMargin: "-90px" });

	function capitalizeFirstLetter(to: string) {
		return to.substring(1).charAt(0).toUpperCase() + to.slice(2);
	}

	let router = usePathname() as string;
	return (
		<div>
			<div
				className={`${
					inView ? "hidden" : "block sm:hidden"
				} sticky top-[44.5px] border-b bg-white/70 saturate-150 backdrop-blur-lg py-2.5 z-20 -mx-6 sm:-mx-0 px-3 sm:px-0 text-center font-semibold`}
			>
				{capitalizeFirstLetter(router)}
			</div>
			<div
				ref={ref}
				className="text-4xl font-bold text-zinc-800 mt-10 sm:mt-16"
			>
				{title}
			</div>
			<div className="mt-4 mb-10 break-words text-zinc-700 text-base sm:text-lg">
				{description}
			</div>
			<div>{children}</div>
		</div>
	);
}
