"use client";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Layout({ children, pageA, pageB }: { children: React.ReactNode; pageA: React.ReactNode; pageB: React.ReactNode }) {
	const segmentASegment = useSelectedLayoutSegment("pageA");
	return (
		<div>
			{children}
			{pageA}
			{segmentASegment}
			{pageB}
		</div>
	);
}
