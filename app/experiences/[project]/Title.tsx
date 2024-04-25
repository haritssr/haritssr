"use client";
import { usePathname } from "next/navigation";

export default function Title({ browserTitle }: { browserTitle: string }) {
	const pathname = usePathname();
	return (
		<title>
			{pathname === "/" ? "Harits Syah" : `${browserTitle} - Harits Syah`}
		</title>
	);
}
