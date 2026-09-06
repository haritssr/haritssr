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
        <li>Touch typist (±90 WPM)</li>
        <li>
          <span className="text-zinc-800">haritssr</span> ={" "}
          <span className="text-zinc-800">harits</span>{" "}
          <span className="text-zinc-800">s</span>yah{" "}
          <span className="text-zinc-800">r</span>ahmatullah
        </li>
        <li>
          Former chess addict, peaked at around 2000 Elo and won several school
          and university medals. Now I focus on math, physics, and web product
          engineering at harislab.com.
        </li>
        <li>I designed all the interface in this site, some kind of batch update or refactor I delegate to AI</li>
        <li>
          <a
            className="text-action hover:underline"
            download="cv-dec-2024.pdf"
            href="/cv-dec-2024.pdf"
            title="Download CV"
          >
            CV
          </a>
        </li>
      </ul>
    </HomeSectionWrapper>
  );
}
