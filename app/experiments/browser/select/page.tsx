import type { Metadata } from "next";
import SelectDemo from "@/components/experiments/browser/SelectDemo";

export const metadata: Metadata = {
  title: "Select",
};

export default function SelectPage() {
  return <SelectDemo />;
}
