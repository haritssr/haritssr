import InternalLink from "@/components/InternalLink";
import Wrapper from "./Wrapper";

export default function DesignSystem() {
  return (
    <Wrapper
      id="design-system"
      topic="Design System"
      className=""
      explanation="My user interface components library and guidelines"
    >
      <InternalLink name="Take a look" href="/design-system" />
    </Wrapper>
  );
}
