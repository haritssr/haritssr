import TopLevelSectionPageDescription from "components/TopLevelSectionPageDescription";
import type { Metadata } from "next";

import PageTitle from "@/components/PageTitle";
import WritingTable from "@/components/WritingTable";
import { createPageMetadata } from "@/utils/pageMetadata";
import { WRITING_DESCRIPTION } from "@/utils/site";

export const metadata: Metadata = createPageMetadata({
  path: "/writing",
  title: "Writing",
  description: WRITING_DESCRIPTION,
});

export default function WritingPage() {
  return (
    <>
      <PageTitle>Writing</PageTitle>
      <TopLevelSectionPageDescription>
        {WRITING_DESCRIPTION}
      </TopLevelSectionPageDescription>
      <WritingTable />
    </>
  );
}
