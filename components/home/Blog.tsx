import { BLOG_DESCRIPTION } from "data/PageDescriptions";
import BlogGrid from "@/components/BlogGrid";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Blog() {
  return (
    <HomeSectionWrapper
      className="grid grid-cols-1 space-y-3"
      explanation={BLOG_DESCRIPTION}
      id="blog"
      topic="Blog"
    >
      <BlogGrid />
    </HomeSectionWrapper>
  );
}
