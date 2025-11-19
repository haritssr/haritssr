import type React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-8 space-y-1 break-words pb-5 text-zinc-800">
			{children}
		</div>
	);
}

export function PageTitle({
	title,
	description,
}: {
	title: string;
	description: string | React.ReactNode;
}) {
	return (
		<div>
			<h1 className="text-3xl sm:text-4xl font-bold text-zinc-800 mt-10 sm:mt-16">
				{title}
			</h1>
			<div className="mt-4 mb-10 break-words text-zinc-500 text-lg sm:text-xl">
				{description}
			</div>
		</div>
	);
}
