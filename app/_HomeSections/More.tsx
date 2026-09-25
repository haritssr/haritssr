import HomeSectionWrapper from "./HomeSectionWrapper";

export default function More() {
  return (
    <HomeSectionWrapper className="space-y-5" id="misc" topic="More">
      <ul className="text-foreground/70 list-outside list-disc space-y-1 pl-4">
        <li>Touch typist (±90 WPM)</li>

        <li>
          <span className="text-action">haritssr</span> ={" "}
          <span className="text-action">harits</span>{" "}
          <span className="text-action">s</span>yah{" "}
          <span className="text-action">r</span>ahmatullah
        </li>
        <li>Former chess player, peaked at around 2000 Elo.</li>
        <li>Prefer eudaimonic to hedonic.</li>
        <li>Constraints give shape.</li>
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
        <li>
          Press <kbd className="text-foreground">⌘P</kbd> (or{" "}
          <kbd className="text-foreground">ctrl+P</kbd>) to search the site.
        </li>
      </ul>
    </HomeSectionWrapper>
  );
}
