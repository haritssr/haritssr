import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import { PageTitle } from "@/components/SubTitle";

export const metadata: Metadata = {
	title: "Blog",
	description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
	return (
		<>
			<PageTitle
				title="Blog"
				description="Selected notes that I want to share to the world."
			/>
			<BlogGrid />
		</>
	);
}
