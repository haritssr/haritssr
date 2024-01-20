import HomeSectionWrapper from "./HomeSectionWrapper";
import BlogGrid from "@/components/BlogGrid";

export default function Blog() {
	return (
		<HomeSectionWrapper id="blog" topic="Blog" className="space-y-3 grid grid-cols-1" explanation="Selected notes that I want to share to the world.">
			<BlogGrid />
		</HomeSectionWrapper>
	);
}
