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
          I am a touch typist and type around 90 words per minute consistently.
        </li>
        <li>
          <span className="text-zinc-800">haritssr</span> stands for{" "}
          <span className="text-zinc-800">harits</span>{" "}
          <span className="text-zinc-800">s</span>yah{" "}
          <span className="text-zinc-800">r</span>ahmatullah
        </li>
      </ul>
    </HomeSectionWrapper>
  );
}
