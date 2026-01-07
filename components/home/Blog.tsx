import BlogGrid from "@/components/BlogGrid";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Blog() {
  return (
    <HomeSectionWrapper
      className="grid grid-cols-1 space-y-3"
      explanation="Selected notes that I want to share to the world."
      id="blog"
      topic="Blog"
    >
      <BlogGrid />
    </HomeSectionWrapper>
  );
}
