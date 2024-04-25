"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type React from "react";

export default function ThemeProvider({
	children,
}: { children: React.ReactNode }) {
	return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}
