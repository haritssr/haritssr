import type { Metadata } from "next";
import ClockDemo from "@/components/experiments/browser/ClockDemo";

export const metadata: Metadata = {
  title: "Clock",
};

export default function ClockPage() {
  return <ClockDemo />;
}
