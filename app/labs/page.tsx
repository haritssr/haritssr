import type { Metadata } from "next";

import LabsGrid from "@/components/LabsGrid";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { getAvailableLabCount } from "@/utils/labCatalog";
import { createPageMetadata } from "@/utils/pageMetadata";

const labsHomeDescription = getLabsHomeDescription();

export const metadata: Metadata = createPageMetadata({
  path: "/labs",
  title: "Labs",
  description: labsHomeDescription,
});

export default function LabsPage() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path="/labs">
        <PageTitle>Labs</PageTitle>
        <PageDescription>{labsHomeDescription}</PageDescription>
      </PageHeader>
      <LabsGrid />
    </>
  );
}

function getLabsHomeDescription(): string {
  const totalLabs = getAvailableLabCount();
  const labLabel = totalLabs === 1 ? "lab" : "labs";

  return `${totalLabs} ${labLabel} exploring web development, mathematics, and physics.`;
}
