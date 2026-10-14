import BackButton from "@/components/BackButton";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: "More",
  description: "Interests and personal notes about Harits Syah.",
  path: "/more",
});

export default function MorePage() {
  return (
    <>
      <PageHeader navigation={<BackButton href="/" name="Home" />}>
        <PageTitle>More</PageTitle>
        <PageDescription>
          Interests and personal notes about me.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section id="interests" title="Interests">
          <p>
            Web, JS, TS, Effect, React, Next.js, Functional Programming, Math,
            Physics, and Education.
          </p>
        </Section>
        <Section id="misc" title="Personal notes">
          <ul className="marker:text-muted list-outside list-disc space-y-2 pl-5">
            <li>Touch typist, ±90 WPM.</li>
            <li>Former chess player, ±2000 Elo.</li>
            <li>
              <span className="text-foreground">haritssr</span> ={" "}
              <span className="text-foreground">harits</span>{" "}
              <span className="text-foreground">s</span>yah{" "}
              <span className="text-foreground">r</span>ahmatullah
            </li>
            <li>I develop with Codex CLI in Zed.</li>
          </ul>
        </Section>
      </div>
    </>
  );
}
