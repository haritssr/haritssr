import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";

import EmojiAtlas from "./emoji-atlas";

export const metadata: Metadata = getLabMetadata(
  "user-interface",
  "emoji-groups"
);

export default function EmojiGroupsPage() {
  return <EmojiAtlas />;
}
