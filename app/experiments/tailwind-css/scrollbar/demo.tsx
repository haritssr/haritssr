import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

const rows = [
  "A scrollbar appears when you hover over this area.",
  "Move the pointer over its thumb to see the stronger color.",
  "The track stays transparent, leaving the content unobstructed.",
  "The thumb stays visible while the pointer is over this area.",
  "The same utility works on horizontal overflow below.",
  "On touch devices, the browser keeps its usual scrollbar behavior.",
  "Forced colors mode also uses the browser's own rendering.",
  "End of the vertical scroll area.",
];

export default function ScrollbarDemo() {
  return (
    <>
      <SubTitle>
        Hover over the scroll areas and drag their thumbs to try a scrollbar
        that stays transparent until it is needed.
      </SubTitle>
      <SourceCodeLink />

      <div className="space-y-10 pb-16">
        <section aria-labelledby="vertical-scrollbar-title">
          <h2
            className="mb-3 text-lg font-semibold"
            id="vertical-scrollbar-title"
          >
            Vertical scrolling
          </h2>
          <div className="scroll-area-scrollbar h-64 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100">
            <div className="space-y-4 p-5 pr-8">
              {rows.map((row, index) => (
                <p className="rounded-lg bg-zinc-900 p-4" key={row}>
                  <span className="mr-3 text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {row}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="horizontal-scrollbar-title">
          <h2
            className="mb-3 text-lg font-semibold"
            id="horizontal-scrollbar-title"
          >
            Horizontal scrolling
          </h2>
          <div className="scroll-area-scrollbar overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100">
            <div className="flex w-max gap-4 p-5 pb-8">
              {rows.slice(0, 6).map((row, index) => (
                <div
                  className="flex h-36 w-56 flex-none flex-col justify-between rounded-lg bg-zinc-900 p-4"
                  key={row}
                >
                  <span className="text-sm text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{row}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
