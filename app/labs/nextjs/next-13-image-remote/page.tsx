import type { Metadata } from "next";

import { getLabMetadata } from "@/data/LabsData";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "nextjs",
  "next-13-image-remote"
);

export default function LabPage() {
  return <Demo />;
}
