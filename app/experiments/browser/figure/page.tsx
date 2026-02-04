import type { Metadata } from "next";
import FigureDemo from "@/components/experiments/browser/FigureDemo";

export const metadata: Metadata = {
  title: "Figure",
};

export default function FigurePage() {
  return <FigureDemo />;
}
