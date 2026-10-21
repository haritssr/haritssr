import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "react",
  "react-use-reducer-july-2026"
);

export default function LabPage() {
  return <Demo />;
}
