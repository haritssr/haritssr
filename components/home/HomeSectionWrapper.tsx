"use client";

import Link from "next/link";

export default function HomeSectionWrapper({
	topic,
	className,
	children,
	id,
	explanation,
}: {
	topic: string;
	className?: string;
	children: React.ReactNode;
	id: string;
	explanation: string;
}) {
	return (
		<div id={id}>
			<section className="flex items-center justify-between">
				<Link
					href={`/${id}`}
					className="select-none text-2xl font-semibold text-zinc-800 hover:underline"
				>
					{topic}
				</Link>
			</section>
			<div className="mb-16">
				<div className="mt-3 mb-5 text-lg text-zinc-500 select-none">
					{explanation}
				</div>
				<div className={className}>{children}</div>
			</div>
		</div>
	);
}
