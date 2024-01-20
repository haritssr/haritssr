import Wrapper from "./Wrapper";
import BlogGrid from "@/components/BlogGrid";

export default function Blog() {
	return (
		<Wrapper id="blog" topic="Blog" className="space-y-3 grid grid-cols-1" explanation="Selected notes that I want to share to the world.">
			<BlogGrid />
		</Wrapper>
	);
}
