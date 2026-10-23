import type { Metadata } from "next";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";

import Demo from "./demo";

import "katex/dist/katex.min.css";

export const metadata: Metadata = getLabMetadata(
  "user-interface",
  "times-table"
);

export default function LabPage() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          Practice multiplication with a shuffled grid and instant feedback.
        </PageDescription>
      </LabPageHeader>
      <Demo />
    </>
  );
}
