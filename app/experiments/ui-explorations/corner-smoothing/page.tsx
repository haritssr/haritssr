import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import CornerComparison from "./demo";

export const metadata: Metadata = {
  ...getExperimentMetadata("ui-explorations", "corner-smoothing"),
  description:
    "Compare ordinary rounded corners, native CSS squircles styled with Tailwind CSS, and Lisse’s Figma-style corner smoothing.",
};

const comparisonRows = [
  {
    feature: "Corner curve",
    rounded: "Circular arc",
    css: "Superellipse-based squircle",
    lisse: "Figma-style curve with smooth shoulders and a central arc",
  },
  {
    feature: "Controls",
    rounded: "Radius",
    css: "Radius and corner-shape; squircle is a fixed curve",
    lisse: "Radius and a smoothing amount from 0 to 1",
  },
  {
    feature: "Rendering in this demo",
    rounded: "CSS border-radius",
    css: "CSS border-radius + corner-shape",
    lisse: "A generated SVG path applied through CSS clip-path",
  },
  {
    feature: "Browser support",
    rounded: "Widely supported",
    css: "Requires corner-shape support; otherwise falls back to rounded corners",
    lisse: "Requires clip-path: path(); does not depend on corner-shape",
  },
  {
    feature: "Borders and shadows",
    rounded: "Handled by CSS",
    css: "Follow the corner shape in supporting browsers",
    lisse:
      "Clipping alone is insufficient; use Lisse’s effect APIs or wrappers",
  },
] as const;

export default function CornerSmoothingPage() {
  return (
    <div className="space-y-20 pb-16">
      <p className="text-foreground/80 max-w-3xl text-lg leading-relaxed">
        Compare the same size, radius, and color across three corner treatments.
        The CSS example uses this site’s Tailwind utility, which sets native
        <code> corner-shape: squircle</code>. Lisse uses a different curve, so
        equal radius values do not guarantee identical outlines.
      </p>

      <section aria-labelledby="corner-comparison-heading">
        <Section id="corner-comparison-heading" name="Compare the corners" />
        <CornerComparison />
      </section>

      <section aria-labelledby="corner-differences-heading">
        <Section id="corner-differences-heading" name="What changes?" />
        <div className="border-border overflow-hidden rounded-md border">
          <div className="scrollbar-subtle overflow-x-auto">
            <table className="divide-border text-foreground/80 w-full min-w-160 border-collapse divide-y text-sm">
              <caption className="sr-only">
                Differences between rounded corners, CSS squircles, and Lisse
              </caption>
              <thead>
                <tr className="divide-border bg-foreground/5 divide-x">
                  {["Feature", "Rounded corners", "CSS squircle", "Lisse"].map(
                    (heading) => (
                      <th
                        className="px-3 py-2 text-left font-medium whitespace-nowrap"
                        key={heading}
                        scope="col"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {comparisonRows.map((row) => (
                  <tr className="divide-border divide-x" key={row.feature}>
                    <th
                      className="px-3 py-3 text-left align-top font-medium"
                      scope="row"
                    >
                      {row.feature}
                    </th>
                    {[row.rounded, row.css, row.lisse].map((value) => (
                      <td className="px-3 py-3 align-top" key={value}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="corner-reading-heading">
        <Section id="corner-reading-heading" name="Explore further" />
        <div className="text-foreground/80 max-w-3xl space-y-4 leading-relaxed">
          <p>
            Use native CSS when the browser’s corner curve fits your design and
            rounded corners are an acceptable fallback. Read the{" "}
            <ExternalLink
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape"
              name="corner-shape documentation"
              size="inherit"
            />{" "}
            for its behavior and current browser compatibility.
          </p>
          <p>
            Use Lisse when you want Figma-style smoothing with an adjustable
            amount. This experiment imports only its DOM-free path generator;
            the library also offers components and APIs for borders and shadows.
            See the{" "}
            <ExternalLink
              href="https://github.com/JaceThings/Lisse"
              name="Lisse repository"
              size="inherit"
            />{" "}
            for the full library.
          </p>
        </div>
      </section>
    </div>
  );
}
