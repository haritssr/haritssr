import WritingGrid from "@/components/WritingGrid";

import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Writing() {
  return (
    <HomeSectionWrapper
      className="grid grid-cols-1"
      id="writing"
      topic="Writing"
    >
      <WritingGrid />
    </HomeSectionWrapper>
  );
}
