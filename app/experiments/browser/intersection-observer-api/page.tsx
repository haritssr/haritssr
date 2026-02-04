import type { Metadata } from "next";
import IntersectionObserverDemo from "@/components/experiments/browser/IntersectionObserverDemo";

export const metadata: Metadata = {
  title: "Intersection Observer API",
};

export default function IntersectionObserverPage() {
  return <IntersectionObserverDemo />;
}
