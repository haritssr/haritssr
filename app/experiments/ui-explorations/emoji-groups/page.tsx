import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import EmojiAtlas from "./emoji-atlas";

export const metadata: Metadata = getExperimentMetadata(
  "ui-explorations",
  "emoji-groups"
);

export default function EmojiGroupsPage() {
  return <EmojiAtlas />;
}
