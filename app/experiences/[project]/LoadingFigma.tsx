"use client";
import { Suspense, useState } from "react";
export default function LoadingFigma({ project }) {
	const [loading, setLoading] = useState(true);
	function hideLoading() {
		setLoading(false);
	}

	return (
		<Suspense fallback={<div className="w-full border border-zinc-300 flex items-center justify-center py-10">Loading...</div>}>
			{project.figma.length !== 0 ? (
				project.figma.map((a) => <iframe key={a} onLoad={hideLoading} className="w-full h-[600px]" src={a} allowFullScreen></iframe>)
			) : (
				<p className="text-zinc-800 ">No design</p>
			)}
		</Suspense>
	);
}
