import type { Metadata } from "next";
import NumberGameDemo from "@/components/experiments/browser/NumberGameDemo";

export const metadata: Metadata = {
  title: "Number Game",
};

export default function NumberGamePage() {
  return <NumberGameDemo />;
}
