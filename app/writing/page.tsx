import type { Metadata } from "next";

import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import WritingGrid from "@/components/WritingGrid";
import { WRITING_DESCRIPTION } from "@/utils/site";

export const metadata: Metadata = {
  title: "Writing",
  description: WRITING_DESCRIPTION,
};

export default function WritingPage() {
  return (
    <>
      <PageTitle>Writing</PageTitle>
      <PageDescription>{WRITING_DESCRIPTION}</PageDescription>
      <WritingGrid />
    </>
  );
}
