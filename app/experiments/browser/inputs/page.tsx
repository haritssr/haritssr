import type { Metadata } from "next";
import InputsDemo from "@/components/experiments/browser/InputsDemo";

export const metadata: Metadata = {
  title: "Inputs",
};

export default function InputsPage() {
  return <InputsDemo />;
}
