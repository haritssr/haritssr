import type { Metadata } from "next";
import BlogGrid from "@/components/BlogGrid";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import { BLOG_DESCRIPTION } from "../../data/PageDescriptions";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
};

export default function BlogPage() {
  return (
    <>
      <PageTitle title="Blog" />
      <PageDescription description={BLOG_DESCRIPTION} />
      <BlogGrid />
    </>
  );
}
