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
          I used to be heavily addicted to chess from junior high school through
          college. I knew all the top grandmasters in the world, won several
          gold and silver medals representing my school, department, faculty,
          and university, then threw them all away, by the way. I deleted three
          chess accounts on Chess.com and Lichess.org, with a peak Elo rating of
          around 2000. Now I have completely stepped away from chess and focus
          on math, physics, and web product engineering at harislab.com.
        </li>
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
