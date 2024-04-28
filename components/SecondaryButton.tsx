import type React from "react";

export default function SecondaryButton({
	children,
	...props
}: { children: React.ReactChild; [key: string]: unknown }) {
	return (
		<button {...props} type="button">
			{children}
		</button>
	);
}
