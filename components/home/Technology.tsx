import InternalLink from "@/components/InternalLink";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Technology() {
	return (
		<HomeSectionWrapper
			id="technology"
			topic="Technology"
			className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4"
			explanation="My choosen libraries and framework to build web application."
		>
			<InternalLink name="Explore" href="/technology" />
		</HomeSectionWrapper>
	);
}
