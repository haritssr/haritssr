import type { Metadata } from "next";

import { getLabMetadata } from "@/data/LabsData";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "tailwind-css",
  "glowing-background"
);

export default function LabPage() {
  return <Demo />;
}
