import Accordion, { AccordionItem } from "@/components/Accordion";
import Box from "@/components/Box";
import InternalLink from "@/components/InternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import CircleLab from "./circle-lab";
import CircleParts from "./circle-parts";

export const metadata = getExperimentMetadata("mathematics", "circle");

function Equation({
  tex,
  layout = "stacked",
}: {
  tex: string | readonly string[];
  layout?: "stacked" | "row";
}) {
  const lines = typeof tex === "string" ? [tex] : tex;

  return (
    <div
      className={`border-border max-w-full min-w-0 overflow-x-auto rounded-xl border px-3 py-3 text-sm sm:text-base [&_.katex-display]:my-0 ${layout === "row" ? "flex flex-wrap items-center justify-center gap-x-6 gap-y-3" : "space-y-3"}`}
    >
      {lines.map((line) => (
        <div key={line}>{katexify(line, true)}</div>
      ))}
    </div>
  );
}

const exercises = [
  {
    title: "From diameter to area",
    given: [String.raw`d=12\ \mathrm{cm}`],
    find: ["r", "C", "A"],
    steps: [
      String.raw`r=\frac d2=6\ \mathrm{cm}`,
      String.raw`\begin{aligned}C&=2\pi(6)\\&=12\pi\ \mathrm{cm}\\&\approx37.699\ \mathrm{cm}\end{aligned}`,
      String.raw`\begin{aligned}A&=\pi(6)^2\\&=36\pi\ \mathrm{cm}^2\\&\approx113.097\ \mathrm{cm}^2\end{aligned}`,
    ],
    explanation:
      "Halve the diameter before using the radius in either formula.",
  },
  {
    title: "A slice of a circle",
    given: [String.raw`r=6\ \mathrm{cm}`, String.raw`\alpha=60^\circ`],
    find: ["s", String.raw`A_{\mathrm{sector}}`],
    steps: [
      String.raw`\frac{\alpha}{360^\circ}=\frac16`,
      String.raw`\begin{aligned}s&=\frac16\cdot2\pi(6)\\&=2\pi\ \mathrm{cm}\end{aligned}`,
      String.raw`\begin{aligned}A_{\mathrm{sector}}&=\frac16\cdot\pi(6)^2\\&=6\pi\ \mathrm{cm}^2\end{aligned}`,
    ],
    explanation: "The arc and sector each take one sixth of the whole circle.",
  },
  {
    title: "Recover the radius",
    given: [String.raw`C=10\pi\ \mathrm{m}`],
    find: ["r", "A"],
    steps: [
      String.raw`\begin{aligned}r&=\frac{C}{2\pi}\\&=\frac{10\pi}{2\pi}=5\ \mathrm{m}\end{aligned}`,
      String.raw`A=\pi(5)^2=25\pi\ \mathrm{m}^2`,
    ],
    explanation:
      "Rearrange the circumference formula, then calculate the area.",
  },
];

export default function CirclePage() {
  return (
    <div className="text-foreground space-y-20 pb-24">
      <div className="max-w-3xl space-y-5">
        <SubTitle>
          Understand a circle from its center outward. Explore how radius sets
          its size, why circumference and area follow different rules, and how
          angles describe arcs and sectors.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        className="max-w-3xl"
        title="What is a circle?"
        id="circle-definition"
        description={
          <>
            A circle is the set of all points in a plane at the same distance
            from a fixed point called the center. That distance is its radius,{" "}
            {katexify("r", false)}, with {katexify("r>0", false)}. The circle is
            the boundary; the filled region inside it is a disk.
          </>
        }
        contentClassName="grid gap-5 sm:grid-cols-2"
      >
        <Box title="Radius and diameter">
          <p className="text-muted text-sm leading-7">
            A radius joins the center to the circle. A diameter joins two points
            on the circle through the center, spanning two radii.
          </p>
          <Equation tex={String.raw`d=2r\qquad r=\frac d2`} />
        </Box>
        <Box title="Chords, arcs, and sectors">
          <p className="text-muted text-sm leading-7">
            A chord joins any two points on the circle. An arc is part of the
            curved boundary. A sector is the region enclosed by two radii and
            their connecting arc, like a slice of pizza.
          </p>
        </Box>
      </Section>

      <CircleParts />

      <Section
        title="Distance around, area inside"
        id="circle-measurements"
        contentClassName="grid gap-5 md:grid-cols-2"
      >
        <Box title="Circumference">
          <p className="text-muted text-sm leading-7">
            Circumference, {katexify("C", false)}, is the length of the
            boundary. Every circle has the same ratio of circumference to
            diameter, called {katexify(String.raw`\pi`, false)}.
          </p>
          <Equation tex={String.raw`\pi=\frac Cd\approx3.14159`} />
          <Equation tex={String.raw`C=\pi d=2\pi r`} />
          <p className="text-muted text-sm leading-7">
            Doubling the radius doubles the circumference. Measure both in
            length units, such as centimeters.
          </p>
        </Box>
        <Box title="Area">
          <p className="text-muted text-sm leading-7">
            Area, {katexify("A", false)}, measures the disk inside the circle.
            Imagine cutting it into many thin sectors and alternating them to
            approach a rectangle: its height approaches the radius and its base
            approaches half the circumference.
          </p>
          <Equation tex={String.raw`A=\frac C2\cdot r=\pi r^2`} />
          <p className="text-muted text-sm leading-7">
            Doubling the radius quadruples the area. Use square units, such as{" "}
            {katexify(String.raw`\mathrm{cm}^2`, false)}.
          </p>
        </Box>
      </Section>

      <CircleLab />

      <Section
        className="max-w-3xl"
        title="Arcs and sectors"
        id="circle-sectors"
        description={
          <>
            A central angle selects a fraction of a full turn. When the angle{" "}
            {katexify(String.raw`\alpha`, false)} is in degrees, the same
            fraction determines the arc length {katexify("s", false)} and sector
            area. Here{" "}
            {katexify(String.raw`0^\circ\le\alpha\le360^\circ`, false)}.
          </>
        }
      >
        <Equation
          tex={[
            String.raw`s=\frac{\alpha}{360^\circ}\,2\pi r`,
            String.raw`A_{\mathrm{sector}}=\frac{\alpha}{360^\circ}\,\pi r^2`,
          ]}
        />
        <p className="text-muted">
          Radians measure angle as arc length divided by radius. A full turn is{" "}
          {katexify(String.raw`2\pi`, false)} radians. For an angle{" "}
          {katexify(String.raw`\theta`, false)} in radians:
        </p>
        <Equation
          tex={[
            String.raw`\theta=\frac{\alpha}{180^\circ}\,\pi`,
            String.raw`s=r\theta`,
            String.raw`A_{\mathrm{sector}}=\frac12r^2\theta`,
          ]}
        />
        <p className="text-muted">
          Arc length follows the curve. The sector perimeter also includes both
          straight radii, so for a sector smaller than a full disk:
        </p>
        <Equation
          tex={[
            String.raw`P_{\mathrm{sector}}=s+2r`,
            String.raw`0<\theta<2\pi`,
          ]}
        />
      </Section>

      <Section
        className="max-w-3xl"
        title="A circle on the coordinate plane"
        id="circle-coordinates"
        description={
          <>
            For a center at {katexify("(h,k)", false)}, the horizontal and
            vertical distances to a point {katexify("(x,y)", false)} form a
            right triangle with hypotenuse {katexify("r", false)}. The
            Pythagorean theorem gives the circle equation:
          </>
        }
      >
        <Equation tex={String.raw`(x-h)^2+(y-k)^2=r^2`} />
        <p className="text-muted">
          For example, a circle centered at {katexify("(2,-1)", false)} with
          radius {katexify("3", false)} has equation:
        </p>
        <Equation tex={String.raw`(x-2)^2+(y+1)^2=9`} />
        <p className="text-muted">
          A tangent touches the circle at a single point and is perpendicular to
          the radius drawn to that point. The unit circle has center at the
          origin and radius {katexify("1", false)}; explore its connection to
          rotation in{" "}
          <InternalLink
            href="/experiments/mathematics/euler-s-identity"
            variant="inline"
          >
            Euler’s identity
          </InternalLink>
          .
        </p>
      </Section>

      <Section
        title="Try it yourself"
        id="circle-practice"
        description={
          <>
            Keep answers exact using {katexify(String.raw`\pi`, false)} until
            the final step. Solve each problem before revealing the solution.
          </>
        }
        contentClassName="grid min-w-0 gap-5 lg:grid-cols-2"
      >
        {exercises.map((exercise) => (
          <Box key={exercise.title} title={exercise.title}>
            <Equation tex={exercise.given} layout="row" />
            <p className="text-muted flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-sm leading-7">
              <span>Find</span>
              {exercise.find.map((variable, index) => (
                <span key={variable}>
                  {katexify(variable, false)}
                  {index === exercise.find.length - 1 ? "." : ","}
                </span>
              ))}
            </p>
            <Accordion>
              <AccordionItem
                excludeFromContents
                title="Show solution"
                value={exercise.title}
                panelClassName="bg-transparent"
              >
                <ol className="space-y-3">
                  {exercise.steps.map((step) => (
                    <li key={step}>
                      <Equation tex={step} />
                    </li>
                  ))}
                </ol>
                <p className="text-muted mt-4 text-sm leading-7">
                  {exercise.explanation}
                </p>
              </AccordionItem>
            </Accordion>
          </Box>
        ))}
      </Section>
    </div>
  );
}
