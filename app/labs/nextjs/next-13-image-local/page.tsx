import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "nextjs",
  "next-13-image-local"
);

export default function LabPage() {
  return <Demo />;
}
