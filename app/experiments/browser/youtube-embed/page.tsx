import type { Metadata } from "next";
import YoutubeEmbedDemo from "@/components/experiments/browser/YoutubeEmbedDemo";

export const metadata: Metadata = {
  title: "YouTube Embed",
};

export default function YoutubeEmbedPage() {
  return <YoutubeEmbedDemo />;
}
