"use client";
import React from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		// global-error must include html and body tags
		<html lang="en">
			<body>
				<h2>Something went wrong!</h2>
				<button type="button" onClick={() => reset()}>
					Try again
				</button>
			</body>
		</html>
	);
}

// global-error.js is only enabled in production. In development, our error overlay will show instead.
// The React DevTools allow you to toggle error boundaries to test error states.
