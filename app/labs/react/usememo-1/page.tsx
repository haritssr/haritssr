import type { Metadata } from "next";

import { getLabMetadata } from "@/data/LabsData";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata("react", "usememo-1");

export default function LabPage() {
  return <Demo />;
}
