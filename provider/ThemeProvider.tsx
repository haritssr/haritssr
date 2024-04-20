"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}
