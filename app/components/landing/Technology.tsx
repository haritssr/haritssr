import InternalLink from "@/components/InternalLink";
import Wrapper from "./Wrapper";

export default function Technology() {
	return (
		<Wrapper
			id="technology"
			topic="Technology"
			className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4"
			explanation="My choosen libraries and framework to build web application."
		>
			<InternalLink name="Take A Look" href="/technology" />
		</Wrapper>
	);
}
