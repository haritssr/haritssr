import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "user-interface",
  "times-table"
);

export default function LabPage() {
  return <Demo />;
}
