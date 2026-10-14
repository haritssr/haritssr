import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";

import "katex/dist/katex.min.css";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import { VocabularyGuide } from "../_components/VocabularyGuide";
import { parseAtomicNumber } from "../_lib/electron-configuration";
import ElectronConfigurationDemo from "./demo";

const DESCRIPTION = "See how electrons fill atomic orbitals.";

export const metadata: Metadata = getExperimentMetadata(
  "physics",
  "electron-configuration"
);

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
      <ExperimentPageHeader>
        <PageDescription>{DESCRIPTION}</PageDescription>
      </ExperimentPageHeader>

      <ElectronConfigurationDemo
        initialAtomicNumber={initialAtomicNumber}
        vocabulary={<VocabularyGuide />}
      />
    </>
  );
}
