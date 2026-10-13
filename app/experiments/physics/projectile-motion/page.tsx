import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import Accordion, { AccordionItem } from "@/components/Accordion";

import "katex/dist/katex.min.css";
import Box from "@/components/Box";
import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import ProjectileLab from "./projectile-lab";

export const metadata = getExperimentMetadata("physics", "projectile-motion");

const SYMBOLS = {
  speed: ["v_0", "Launch speed", "\\mathrm{m\\,s^{-1}}"],
  angle: ["\\theta", "Launch angle above the horizontal", "\\mathrm{rad}"],
  height: ["h", "Launch height above the ground", "\\mathrm{m}"],
  gravity: [
    "g",
    "Magnitude of gravitational acceleration",
    "\\mathrm{m\\,s^{-2}}",
  ],
  time: ["t", "Time since launch", "\\mathrm{s}"],
  x: ["x", "Horizontal distance from the launch point", "\\mathrm{m}"],
  y: ["y", "Height above the ground", "\\mathrm{m}"],
  vx: ["v_x", "Horizontal velocity", "\\mathrm{m\\,s^{-1}}"],
  vy: ["v_y", "Vertical velocity, positive upward", "\\mathrm{m\\,s^{-1}}"],
  peakTime: ["t_{\\mathrm{peak}}", "Time to the highest point", "\\mathrm{s}"],
  peakHeight: ["H", "Maximum height above the ground", "\\mathrm{m}"],
  flight: ["T", "Time until the projectile reaches the ground", "\\mathrm{s}"],
  range: ["R", "Horizontal distance traveled before landing", "\\mathrm{m}"],
} as const;

const EQUATIONS: {
  id: string;
  title: string;
  expression: string;
  symbols: (keyof typeof SYMBOLS)[];
  explanation: string;
}[] = [
  {
    id: "launch-components",
    title: "Split the launch velocity",
    expression: "v_x=v_0\\cos\\theta,\\qquad v_y(0)=v_0\\sin\\theta",
    symbols: ["speed", "angle", "vx", "vy"],
    explanation:
      "Resolve the initial velocity into a horizontal component and an upward component. The angle is measured from the horizontal. Use degrees or radians consistently with your calculator; the lab converts its degree input to radians.",
  },
  {
    id: "position-equations",
    title: "Find the position at any time",
    expression:
      "\\begin{aligned}x(t)&=v_0\\cos\\theta\\,t\\\\y(t)&=h+v_0\\sin\\theta\\,t-\\tfrac12gt^2\\end{aligned}",
    symbols: ["x", "y", "height", "speed", "angle", "time", "gravity"],
    explanation:
      "Place the horizontal origin at launch and the vertical origin at ground level. Horizontal distance grows linearly with time. Vertical motion combines the starting height, upward launch velocity, and downward acceleration. Stop the ground-landing model at the first nonnegative landing time.",
  },
  {
    id: "velocity-equations",
    title: "Follow the velocity",
    expression: "v_x(t)=v_0\\cos\\theta,\\qquad v_y(t)=v_0\\sin\\theta-gt",
    symbols: ["vx", "vy", "speed", "angle", "gravity", "time"],
    explanation:
      "Horizontal velocity stays constant. Vertical velocity decreases continuously: positive during ascent, zero at the apex, and negative during descent. A negative vertical velocity describes direction, not a negative speed.",
  },
  {
    id: "parabolic-path",
    title: "See why the path is a parabola",
    expression: "y=h+x\\tan\\theta-\\frac{gx^2}{2v_0^2\\cos^2\\theta}",
    symbols: ["y", "height", "x", "angle", "gravity", "speed"],
    explanation:
      "Substitute the time from the horizontal position equation into the vertical position equation. The squared horizontal-distance term gives a downward-opening parabola. This form requires a nonzero horizontal velocity; a straight-up launch follows a vertical line instead.",
  },
  {
    id: "highest-point",
    title: "Find the highest point",
    expression:
      "t_{\\mathrm{peak}}=\\frac{v_0\\sin\\theta}{g},\\qquad H=h+\\frac{v_0^2\\sin^2\\theta}{2g}",
    symbols: ["peakTime", "peakHeight", "height", "speed", "angle", "gravity"],
    explanation:
      "Set the vertical velocity to zero to find the apex time, then substitute that time into the height equation. Maximum height here is measured from the ground. Subtract the launch height to find how far the projectile rises above its starting point.",
  },
  {
    id: "flight-and-range",
    title: "Find the landing time and range",
    expression:
      "\\begin{aligned}T&=\\frac{v_0\\sin\\theta+\\sqrt{v_0^2\\sin^2\\theta+2gh}}{g}\\\\R&=v_0\\cos\\theta\\,T\\end{aligned}",
    symbols: ["flight", "range", "speed", "angle", "height", "gravity"],
    explanation:
      "Set height to zero and solve the quadratic equation for the landing time, choosing the positive root for a flight above the ground. Multiply this time by the constant horizontal velocity to get the range. This expression includes launches from an elevated platform.",
  },
];

export default function ProjectileMotionPage() {
  return (
    <div className="pb-24">
      <ExperimentPageHeader>
        <PageDescription>
          A thrown ball moves forward while gravity pulls it downward. Explore
          how these two motions combine into a parabolic path, then predict its
          height, flight time, and landing point.
        </PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-16">
        <Section
          id="two-motions"
          title="One flight, two independent motions"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            Projectile motion is free flight under gravity after an object is
            launched. Take rightward as positive {katexify("x", false)} and
            upward as positive {katexify("y", false)}. With air resistance
            neglected, gravity affects the vertical motion while the horizontal
            velocity remains unchanged.
          </p>
          <div className="overflow-x-auto">
            {katexify("a_x=0,\\qquad a_y=-g", true)}
          </div>
          <p>
            The same elapsed time connects both directions. A faster horizontal
            component carries the object farther during that time; a larger
            upward component makes it rise longer before descending. Mass does
            not appear in this ideal model.
          </p>
          <p>
            We use constant gravity near Earth’s surface and a level ground
            plane. The launch angle ranges from {katexify("0^\\circ", false)} to{" "}
            {katexify("90^\\circ", false)}, and the starting height is
            nonnegative. Air drag, wind, spin, and Earth’s curvature are outside
            this model.
          </p>
        </Section>
        <Section
          id="trajectory-lab"
          title="Explore the trajectory"
          description="Change the launch conditions, then move through the flight to inspect the position and velocity."
        >
          <ProjectileLab />
        </Section>
        <Section
          id="equations"
          title="Equations behind the flight"
          description="Open each explanation for the symbols, units, and meaning of the equation."
        >
          <div className="space-y-16">
            {EQUATIONS.map((equation) => (
              <Section
                key={equation.id}
                id={equation.id}
                title={equation.title}
                headingAs="h3"
                className="min-w-0"
              >
                <div className="border-border min-w-0 overflow-hidden rounded-xl border">
                  <div className="scrollbar-subtle overflow-x-auto px-4 py-12 sm:px-6 sm:py-16">
                    <div className="w-fit min-w-full text-base sm:text-lg">
                      {katexify(equation.expression, true)}
                    </div>
                  </div>
                  <BaseAccordion.Root>
                    <BaseAccordion.Item value={equation.id}>
                      <BaseAccordion.Header data-toc-ignore="">
                        <BaseAccordion.Trigger
                          aria-label={`Explanation for ${equation.title}`}
                          className="group border-border text-foreground/70 focus-visible:outline-action flex w-full cursor-pointer items-center justify-between gap-3 border-t px-3 py-3 text-left text-sm outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
                        >
                          Explanation
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180 motion-reduce:transition-none"
                          />
                        </BaseAccordion.Trigger>
                      </BaseAccordion.Header>
                      <BaseAccordion.Panel className="border-border border-t">
                        <Table variant="embedded" className="min-w-100">
                          <caption className="sr-only">
                            Symbols and SI units for{" "}
                            {equation.title.toLowerCase()}
                          </caption>
                          <thead>
                            <tr className="divide-border bg-foreground/5 divide-x">
                              {["Symbol", "Meaning", "SI unit"].map(
                                (heading) => (
                                  <th
                                    key={heading}
                                    scope="col"
                                    className="px-3 py-2 text-left font-normal"
                                  >
                                    {heading}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-border divide-y">
                            {equation.symbols.map((key) => {
                              const [symbol, meaning, unit] = SYMBOLS[key];
                              return (
                                <tr
                                  key={key}
                                  className="divide-border divide-x"
                                >
                                  <th
                                    scope="row"
                                    className="px-3 py-2 text-left align-top font-normal whitespace-nowrap"
                                  >
                                    {katexify(symbol, false)}
                                  </th>
                                  <td className="px-3 py-2 align-top">
                                    {meaning}
                                  </td>
                                  <td className="px-3 py-2 align-top whitespace-nowrap">
                                    {katexify(unit, false)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <div className="border-border border-t px-4 py-5 sm:px-6">
                          <p className="text-foreground/80 max-w-3xl leading-7">
                            {equation.explanation}
                          </p>
                        </div>
                      </BaseAccordion.Panel>
                    </BaseAccordion.Item>
                  </BaseAccordion.Root>
                </div>
              </Section>
            ))}
          </div>
        </Section>
        <Section
          id="same-height"
          title="When launch and landing heights match"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            For a launch from ground level, {katexify("h=0", false)}, the flight
            time and range simplify to
          </p>
          <div className="overflow-x-auto">
            {katexify(
              "T=\\frac{2v_0\\sin\\theta}{g},\\qquad R=\\frac{v_0^2\\sin(2\\theta)}{g}",
              true
            )}
          </div>
          <p>
            At a fixed launch speed, the greatest range occurs at{" "}
            {katexify("45^\\circ", false)}. Complementary angles, such as{" "}
            {katexify("30^\\circ", false)} and {katexify("60^\\circ", false)},
            give the same range but different heights and flight times. Try both
            in the lab with launch height set to zero.
          </p>
          <p>
            An elevated launch has extra falling time, so these shortcuts no
            longer apply. Its best range angle is below{" "}
            {katexify("45^\\circ", false)} in this drag-free model. Use the
            general landing-time equation above when the starting height
            changes.
          </p>
        </Section>
        <Section
          id="worked-example"
          title="Work through a launch"
          description="A ball leaves ground level at a speed of 20 meters per second and an angle of 30 degrees."
          contentClassName="max-w-3xl space-y-5"
        >
          <ol className="list-decimal space-y-5 pl-5">
            <li>
              Resolve the launch velocity.
              <div className="overflow-x-auto">
                {katexify(
                  "v_x=20\\cos30^\\circ\\approx17.32\\,\\mathrm{m\\,s^{-1}},\\qquad v_y(0)=20\\sin30^\\circ=10\\,\\mathrm{m\\,s^{-1}}",
                  true
                )}
              </div>
            </li>
            <li>
              Find the time to land, using{" "}
              {katexify("g=9.81\\,\\mathrm{m\\,s^{-2}}", false)}.
              <div className="overflow-x-auto">
                {katexify(
                  "T=\\frac{2(10)}{9.81}\\approx2.04\\,\\mathrm{s}",
                  true
                )}
              </div>
            </li>
            <li>
              Multiply the horizontal velocity by flight time.
              <div className="overflow-x-auto">
                {katexify(
                  "R=\\frac{(20)^2\\sin60^\\circ}{9.81}\\approx35.31\\,\\mathrm{m}",
                  true
                )}
              </div>
            </li>
            <li>
              Calculate the peak height.
              <div className="overflow-x-auto">
                {katexify(
                  "H=\\frac{(10)^2}{2(9.81)}\\approx5.10\\,\\mathrm{m}",
                  true
                )}
              </div>
            </li>
          </ol>
          <p>Set these launch conditions in the lab to check the results.</p>
        </Section>
        <Section
          id="common-mistakes"
          title="What to watch for"
          contentClassName="max-w-3xl space-y-5"
        >
          <ul className="list-disc space-y-3 pl-5">
            <li>
              At the apex, {katexify("v_y=0", false)}, but gravity still acts.
              The object keeps moving horizontally unless the launch was
              straight up.
            </li>
            <li>
              Time to rise equals time to fall only when the launch and landing
              heights match. An elevated launch takes longer to fall to the
              ground.
            </li>
            <li>
              Doubling the launch speed at the same angle quadruples the range
              for equal launch and landing heights; it doubles the flight time.
            </li>
            <li>
              A straight-up launch has zero horizontal range. A horizontal
              launch needs a positive starting height to have a flight above the
              ground.
            </li>
          </ul>
          <p>
            Connect this to{" "}
            <InternalLink
              href="/experiments/physics/motion-diagrams"
              variant="inline"
            >
              motion diagrams
            </InternalLink>{" "}
            and the{" "}
            <InternalLink
              href="/experiments/physics/essential-physics-equations"
              variant="inline"
            >
              essential physics equations
            </InternalLink>
            .
          </p>
          <ExternalLink
            href="https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion"
            name="Source"
          />
        </Section>
        <Section
          id="try-it-yourself"
          title="Try it yourself"
          description="Predict the result first, then open the solution or check it in the lab."
        >
          <ul className="flex flex-col gap-4">
            <Box
              as="li"
              headingAs="h3"
              title="Launch horizontally from a platform"
            >
              <p>
                A ball starts {katexify("20\\,\\mathrm{m}", false)} above the
                ground with horizontal speed{" "}
                {katexify("10\\,\\mathrm{m\\,s^{-1}}", false)}. Find its flight
                time and range.
              </p>
              <Accordion className="mt-auto w-full">
                <AccordionItem
                  excludeFromContents
                  title="Show solution"
                  value="horizontal-launch"
                  panelClassName="space-y-4"
                >
                  <p>
                    The initial vertical velocity is zero. Solve for the falling
                    time, then use the horizontal velocity.
                  </p>
                  <div className="overflow-x-auto">
                    {katexify(
                      "T=\\sqrt{\\frac{2h}{g}}=\\sqrt{\\frac{40}{9.81}}\\approx2.02\\,\\mathrm{s}",
                      true
                    )}
                    {katexify("R=10T\\approx20.19\\,\\mathrm{m}", true)}
                  </div>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box as="li" headingAs="h3" title="Compare two launch angles">
              <p>
                Launch two balls from ground level at{" "}
                {katexify("20\\,\\mathrm{m\\,s^{-1}}", false)}, one at{" "}
                {katexify("30^\\circ", false)} and one at{" "}
                {katexify("60^\\circ", false)}. Which goes farther, and which
                stays airborne longer?
              </p>
              <Accordion className="mt-auto w-full">
                <AccordionItem
                  excludeFromContents
                  title="Show solution"
                  value="complementary-angles"
                  panelClassName="space-y-4"
                >
                  <p>
                    Both land at the same range because{" "}
                    {katexify("\\sin60^\\circ=\\sin120^\\circ", false)}. The
                    steeper launch has a larger upward velocity and stays
                    airborne longer.
                  </p>
                  <div className="overflow-x-auto">
                    {katexify("R\\approx35.31\\,\\mathrm{m}", true)}
                    {katexify(
                      "T_{30^\\circ}\\approx2.04\\,\\mathrm{s},\\qquad T_{60^\\circ}\\approx3.53\\,\\mathrm{s}",
                      true
                    )}
                  </div>
                </AccordionItem>
              </Accordion>
            </Box>
          </ul>
        </Section>
      </div>
    </div>
  );
}
