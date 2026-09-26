import TopLevelSectionPageDescription from "components/TopLevelSectionPageDescription";
import type { Metadata } from "next";

import BlogGrid from "@/components/BlogGrid";
import PageTitle from "@/components/PageTitle";
import { BLOG_DESCRIPTION } from "@/utils/site";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
};

export default function BlogPage() {
  return (
    <>
      <PageTitle>Blog</PageTitle>
      <TopLevelSectionPageDescription>
        {BLOG_DESCRIPTION}
      </TopLevelSectionPageDescription>
      <BlogGrid />
    </>
  );
}
