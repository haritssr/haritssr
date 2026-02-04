import type { Metadata } from "next";
import DetailsDemo from "@/components/experiments/browser/DetailsDemo";

export const metadata: Metadata = {
  title: "Details",
};

export default function DetailsPage() {
  return <DetailsDemo />;
}
