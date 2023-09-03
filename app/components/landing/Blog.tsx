import Wrapper from "./Wrapper";
import InternalLink from "@/components/InternalLink";

export default function Blog() {
	return (
		<Wrapper
			id="blog"
			topic="Blog"
			className="space-y-3 grid grid-cols-1"
			explanation="Selected notes that I want to share to the world."
		>
			<InternalLink name="Read Articles" href="/blog" />
		</Wrapper>
	);
}
