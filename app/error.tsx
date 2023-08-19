"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="space-y-10">
				<div>Something error...</div>
				<button
					onClick={() => reset()}
					className="px-3 py-2 rounded-md bg-zinc-800 text-white hover:bg-zinc-600"
				>
					Refresh page
				</button>
			</div>
		</div>
	);
}
