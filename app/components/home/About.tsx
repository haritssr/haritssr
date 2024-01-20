import HomeSectionWrapper from "./HomeSectionWrapper";
import InternalLink from "@/components/InternalLink";

export default function About() {
	return (
		<HomeSectionWrapper
			id="about"
			topic="About"
			className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-0"
			explanation="More about me."
		>
			<InternalLink name="Explore" href="/about" />
		</HomeSectionWrapper>
	);
}
