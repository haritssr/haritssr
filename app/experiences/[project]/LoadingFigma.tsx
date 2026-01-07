"use client";

import type { ExperiencesDataType } from "data/ExperiencesData";
import { Suspense, useState } from "react";

export default function LoadingFigma({
	project,
}: {
	project: ExperiencesDataType;
}) {
	const [, setLoading] = useState(true);
	function hideLoading() {
		setLoading(false);
	}

	return (
		<Suspense
			fallback={
				<div className="flex w-full items-center justify-center border border-zinc-300 py-10">
					Loading...
				</div>
			}
		>
			{project.figma.length !== 0 ? (
				project.figma.map((a) => (
					<iframe
						title="figma"
						key={a}
						onLoad={hideLoading}
						className="h-[600px] w-full"
						src={a}
						allowFullScreen
					/>
				))
			) : (
				<p className="text-zinc-800">No design</p>
			)}
		</Suspense>
	);
}
