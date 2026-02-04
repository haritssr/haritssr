import type { Metadata } from "next";
import DescriptionListDemo from "@/components/experiments/browser/DescriptionListDemo";

export const metadata: Metadata = {
  title: "Description List",
};

export default function DescriptionListPage() {
  return <DescriptionListDemo />;
}
