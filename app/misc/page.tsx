import type { Metadata } from "next";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";

const MISC_DESCRIPTION = "A few miscellaneous facts about me.";

export const metadata: Metadata = {
  description: MISC_DESCRIPTION,
  title: "Miscellaneous",
};

export default function MiscellaneousPage() {
  return (
    <>
      <PageTitle title="Miscellaneous" />
      <PageDescription description={MISC_DESCRIPTION} />
      <ul className="list-outside list-disc space-y-1 pl-4 text-zinc-500">
        <li>
          I am a touch typist and type around 90 words per minute consistently.
        </li>
        <li>
          <span className="text-zinc-800">haritssr</span> stands for{" "}
          <span className="text-zinc-800">harits</span>{" "}
          <span className="text-zinc-800">s</span>yah{" "}
          <span className="text-zinc-800">r</span>ahmatullah
        </li>
      </ul>
    </>
  );
}
