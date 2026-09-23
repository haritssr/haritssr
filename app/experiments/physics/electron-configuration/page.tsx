import "katex/dist/katex.min.css";
import type { Metadata } from "next";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import { parseAtomicNumber } from "./_data";
import ElectronConfigurationDemo from "./demo";

const DESCRIPTION =
  "Explore how electrons fill atomic orbitals and build an element's electron configuration.";

export const metadata: Metadata = {
  ...getExperimentMetadata("physics", "electron-configuration"),
  description: DESCRIPTION,
};

export default async function ElectronConfigurationPage({
  searchParams,
}: {
  searchParams: Promise<{
    element?: string | string[] | undefined;
  }>;
}) {
  const { element } = await searchParams;
  const initialAtomicNumber = parseAtomicNumber(element);

  return (
    <>
      <SubTitle>{DESCRIPTION}</SubTitle>
      <SourceCodeLink />
      <ElectronConfigurationDemo initialAtomicNumber={initialAtomicNumber} />
    </>
  );
}
