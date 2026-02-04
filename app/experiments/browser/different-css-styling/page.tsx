import type { Metadata } from "next";
import DifferentCssStylingDemo from "@/components/experiments/browser/DifferentCssStylingDemo";

export const metadata: Metadata = {
  title: "Different CSS Styling",
};

export default function DifferentCssStylingPage() {
  return <DifferentCssStylingDemo />;
}
