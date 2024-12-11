import type React from "react";

export default function SecondaryButton({
	children,
	href,
	...props
}: { children: React.ReactChild; href?: string; [key: string]: unknown }) {
	if (href) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}
	return (
		<button {...props} type="button">
			{children}
		</button>
	);
}
