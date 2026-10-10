import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "live-playground",
  {
    description:
      "Edit TeX and compare inline and display math in a live KaTeX playground.",
  }
);

export default function LivePlaygroundPage() {
  return (
    <div className="space-y-20 pb-16">
      <div className="max-w-3xl space-y-5">
        <SubTitle>
          Write TeX and watch KaTeX typeset it as you edit. Try a template, then
          change the notation or compare inline math with a standalone equation.
        </SubTitle>
        <SourceCodeLink />
      </div>
      <Section title="Try your own notation" id="playground-heading">
        <Demo />
      </Section>
      <Section
        title="Inline and display math"
        id="playground-notes-heading"
        description={
          <>
            Inline mode fits equations into a line of text. Display mode centers
            a standalone equation and gives large operators more room. Enter TeX
            directly, without dollar-sign delimiters. KaTeX typesets
            expressions; it does not solve or evaluate them. Explore the{" "}
            <ExternalLink
              href="https://katex.org/docs/supported.html"
              name="supported TeX functions"
              size="inherit"
            />{" "}
            for more notation to try.
          </>
        }
      />
    </div>
  );
}
