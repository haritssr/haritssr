import { BLOG_DESCRIPTION } from "data/PageDescriptions";
import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
};

export default function BlogPage() {
  return (
    <>
      <PageTitle description={BLOG_DESCRIPTION} title="Blog" />
      <BlogGrid />
    </>
  );
}
