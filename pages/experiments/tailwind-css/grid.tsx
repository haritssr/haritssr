import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function Grid() {
  return (
    <LayoutToExperiments domain="Tailwind CSS" title="Grid">
      <SubTitle>
        Responsive Grid Layout with Tailwind CSS.
        <ExternalLink
          href="https://www.youtube.com/watch?v=WJDw1J7FZnE"
          name="Source"
        />
      </SubTitle>
      <div className="grid min-h-screen place-items-center">
        <div className="grid max-w-5xl xs:grid-cols-2 gap-4 md:grid-cols-4">
          <h1 className="xs:col-span-2 xs:grid xs:grid-cols-2 xs:gap-4 font-extrabold text-4xl md:col-span-3 md:grid-cols-3 md:text-5xl">
            <span className="bg-yellow-300 md:col-span-2">
              Grid layout with Tailwind CSS
            </span>
          </h1>
          <p className="xs:col-start-2 xs:row-start-2 xs:self-center md:col-span-2 md:col-start-1 md:pr-12 md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            adipisci inventore explicabo quidem sunt molestiae quae quia
            blanditiis dolorum, obcaecati enim aut a .
          </p>
          <div className="xs:square h-16 xs:h-auto bg-blue-500" />
          <div className="xs:square h-16 xs:h-auto bg-blue-500" />
          <div className="xs:square h-16 xs:h-auto bg-pink-500" />
          <div className="xs:square h-16 xs:h-auto bg-blue-500 md:col-start-2" />
          <div className="xs:square h-16 xs:h-auto bg-pink-500" />
          <div className="xs:square h-16 xs:h-auto bg-blue-500" />
          <div className="xs:square h-16 xs:h-auto bg-blue-500" />
          <div className="xs:square h-16 xs:h-auto bg-pink-500" />
          <p className="self-center md:col-span-2 md:px-4 md:text-center md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            perferendis fugit at debitis.
          </p>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
