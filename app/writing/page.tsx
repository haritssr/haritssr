import TopLevelSectionPageDescription from "components/TopLevelSectionPageDescription";
import type { Metadata } from "next";

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
      <TopLevelSectionPageDescription>
        {WRITING_DESCRIPTION}
      </TopLevelSectionPageDescription>
      <WritingGrid />
    </>
  );
}
