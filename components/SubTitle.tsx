import type React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="wrap-break-words mb-8 space-y-1 pb-5 text-zinc-800">
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
			<h1 className="mt-10 font-bold text-3xl text-zinc-800 sm:mt-16 sm:text-4xl">
				{title}
			</h1>
			<div className="wrap-break-words mt-4 mb-10 text-lg text-zinc-500 sm:text-xl">
				{description}
			</div>
		</div>
	);
}
