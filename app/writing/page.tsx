import type { Metadata } from "next";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import WritingGrid from "@/components/WritingGrid";
import { RSS_PATH, WRITING_DESCRIPTION } from "@/utils/site";

export const metadata: Metadata = {
  title: "Writing",
  description: WRITING_DESCRIPTION,
};

export default function WritingPage() {
  return (
    <>
      <PageTitle title="Writing" />
      <PageDescription
        description={
          <>
            {WRITING_DESCRIPTION}{" "}
            <a className="text-action hover:text-blue-400" href={RSS_PATH}>
              Subscribe via RSS.
            </a>
          </>
        }
      />
      <WritingGrid />
    </>
  );
}
