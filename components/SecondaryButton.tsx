import React from "react";

export default function SecondaryButton({ children, ...props }: { children: React.ReactChild; [key: string]: any }) {
	return <button {...props}>{children}</button>;
}
