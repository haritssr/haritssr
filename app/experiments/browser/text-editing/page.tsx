import type { Metadata } from "next";
import TextEditingDemo from "@/components/experiments/browser/TextEditingDemo";

export const metadata: Metadata = {
  title: "Text Editing",
};

export default function TextEditingPage() {
  return <TextEditingDemo />;
}
