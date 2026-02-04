import type { Metadata } from "next";
import ScrollTitleDemo from "@/components/experiments/browser/ScrollTitleDemo";

export const metadata: Metadata = {
  title: "Scroll Title",
};

export default function ScrollTitlePage() {
  return <ScrollTitleDemo />;
}
