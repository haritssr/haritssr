import type { Metadata } from "next";
import CustomScrollDemo from "@/components/experiments/browser/CustomScrollDemo";

export const metadata: Metadata = {
  title: "Custom Scroll",
};

export default function CustomScrollPage() {
  return <CustomScrollDemo />;
}
