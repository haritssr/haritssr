import BlogGrid from "@/components/BlogGrid";

import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Blog() {
  return (
    <HomeSectionWrapper className="grid grid-cols-1" id="blog" topic="Blog">
      <BlogGrid mobileLimit={5} />
    </HomeSectionWrapper>
  );
}
