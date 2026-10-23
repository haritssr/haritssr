import PageDescription from "components/PageDescription";
import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";
import { WRITING_DESCRIPTION } from "@/utils/metadata/site";

import WritingTable from "./WritingTable";

export const metadata: Metadata = createPageMetadata({
  path: "/writing",
  title: "Writing",
  description: WRITING_DESCRIPTION,
});

export default function WritingPage() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path="/writing">
        <PageTitle>Writing</PageTitle>
        <PageDescription>{WRITING_DESCRIPTION}</PageDescription>
      </PageHeader>
      <WritingTable />
    </>
  );
}
