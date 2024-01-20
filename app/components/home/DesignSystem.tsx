import InternalLink from "@/components/InternalLink";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function DesignSystem() {
	return (
		<HomeSectionWrapper
			id="design-system"
			topic="Pure Design System"
			className=""
			explanation="User interface component library, design priciples, and guidelines."
		>
			<InternalLink name="Learn more" href="/pure" />
		</HomeSectionWrapper>
	);
}
