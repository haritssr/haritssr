import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export const metadata: Metadata = getLabMetadata("user-interface", "shadow");

const SHADOW_SAMPLES = [
  {
    name: "Timer card",
    className:
      "corner-squircle border-border bg-surface space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "IndexCard",
    className:
      "corner-squircle border-border bg-surface space-y-3 rounded-2xl border p-4 shadow-none",
  },
  {
    name: "Success",
    className:
      "corner-squircle border-success bg-success text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Attention",
    className:
      "corner-squircle border-attention bg-attention text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Danger",
    className:
      "corner-squircle border-danger bg-danger text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Action",
    className:
      "corner-squircle border-action-hover bg-action text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Foreground",
    className:
      "corner-squircle border-foreground bg-foreground text-background space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Background",
    className:
      "corner-squircle border-border bg-background text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "White",
    className:
      "corner-squircle border-border bg-white text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 50",
    className:
      "corner-squircle border-border bg-zinc-50 text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 100",
    className:
      "corner-squircle border-border bg-zinc-100 text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 200",
    className:
      "corner-squircle border-border bg-zinc-200 text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 300",
    className:
      "corner-squircle border-border bg-zinc-300 text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 400",
    className:
      "corner-squircle border-border bg-zinc-400 text-foreground space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 500",
    className:
      "corner-squircle border-border bg-zinc-500 text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 600",
    className:
      "corner-squircle border-border bg-zinc-600 text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 700",
    className:
      "corner-squircle border-border bg-zinc-700 text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 800",
    className:
      "corner-squircle border-border bg-zinc-800 text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Zinc 900",
    className:
      "corner-squircle border-border bg-zinc-900 text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
  {
    name: "Black",
    className:
      "corner-squircle border-black bg-black text-white space-y-3 rounded-2xl border p-4 shadow-lg",
  },
];

export default function ShadowPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          Explore how box shadows and borders give surfaces depth and
          definition.
        </PageDescription>
      </LabPageHeader>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SHADOW_SAMPLES.map((sample) => (
          <figure className={sample.className} key={sample.name}>
            <figcaption className="font-medium">{sample.name}</figcaption>
            <code className="block text-sm wrap-anywhere opacity-80">
              {sample.className}
            </code>
          </figure>
        ))}
      </div>
    </div>
  );
}
