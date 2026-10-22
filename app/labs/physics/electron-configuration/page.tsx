import type { Metadata } from "next";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";

import "katex/dist/katex.min.css";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";

import { VocabularyGuide } from "../_components/VocabularyGuide";
import { parseAtomicNumber } from "../_lib/electron-configuration";
import ElectronConfigurationDemo from "./demo";

const DESCRIPTION = "See how electrons fill atomic orbitals.";

export const metadata: Metadata = getLabMetadata(
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
      <LabPageHeader>
        <PageDescription>{DESCRIPTION}</PageDescription>
      </LabPageHeader>

      <ElectronConfigurationDemo
        initialAtomicNumber={initialAtomicNumber}
        vocabulary={<VocabularyGuide />}
      />
    </>
  );
}
