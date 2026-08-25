import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Misc() {
  return (
    <HomeSectionWrapper
      className="space-y-5"
      id="misc"
      isTitleLink={false}
      topic="Miscellaneous"
    >
      <ul className="list-outside list-disc space-y-1 pl-4 text-zinc-500">
        <li>
          I care deeply about UX/UI design, with references including{" "}
          <ExternalLink href="https://www.apple.com" name="Apple" />,
          <ExternalLink href="https://linear.app" name="Linear" />,
          <ExternalLink href="https://www.raycast.com" name="Raycast" />,
          <ExternalLink href="https://dub.co" name="Dub" />, and{" "}
          <ExternalLink href="https://vercel.com" name="Vercel" />.
        </li>
        <li>
          I am a touch typist and type around 90 words per minute consistently.
        </li>
        <li>
          <span className="text-zinc-800">haritssr</span> stands for{" "}
          <span className="text-zinc-800">harits</span>{" "}
          <span className="text-zinc-800">s</span>yah{" "}
          <span className="text-zinc-800">r</span>ahmatullah
        </li>
        <li>
          <a
            className="text-action hover:underline"
            download="cv-dec-2024.pdf"
            href="/cv-dec-2024.pdf"
            title="Download CV"
          >
            Curriculum Vitae
          </a>
        </li>
        <li>
          <Link
            className="text-action hover:underline"
            href="/experiments/ui-explorations/masalah-to-feature"
            prefetch={false}
          >
            Masalah Pelajar → HL Feature
          </Link>
        </li>
      </ul>
    </HomeSectionWrapper>
  );
}
