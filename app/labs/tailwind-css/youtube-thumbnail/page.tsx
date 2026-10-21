import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "tailwind-css",
  "youtube-thumbnail"
);

export default function LabPage() {
  return <Demo />;
}
