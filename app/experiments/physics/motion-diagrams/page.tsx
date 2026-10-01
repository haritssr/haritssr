import "katex/dist/katex.min.css";
import SubTitle from "components/SubTitle";
import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import MotionDiagram from "./MotionDiagram";

const motions = [
  {
    id: "glb",
    abbreviation: "ULM",
    name: "Uniform linear motion",
    description:
      "Velocity stays constant over time, so the graph is horizontal. The area beneath it gives displacement.",
    formula: String.raw`v(t) = v_0`,
    areaFormula: String.raw`\Delta x = v_0 t`,
    kind: "linear" as const,
    accelerated: false,
  },
  {
    id: "glbb",
    abbreviation: "UALM",
    name: "Uniformly accelerated linear motion",
    description:
      "Constant acceleration makes velocity change linearly. The line's slope is acceleration, and the area beneath it is displacement.",
    formula: String.raw`v(t) = v_0 + at`,
    areaFormula: String.raw`\Delta x = v_0 t + \frac{1}{2}at^2`,
    kind: "linear" as const,
    accelerated: true,
  },
  {
    id: "gmb",
    abbreviation: "UCM",
    name: "Uniform circular motion",
    description:
      "Angular velocity stays constant over time. Its graph is horizontal, and the area beneath it gives angular displacement.",
    formula: String.raw`\omega(t) = \omega_0`,
    areaFormula: String.raw`\Delta\theta = \omega_0 t`,
    kind: "angular" as const,
    accelerated: false,
  },
  {
    id: "gmbb",
    abbreviation: "UACM",
    name: "Uniformly accelerated circular motion",
    description:
      "Constant angular acceleration makes angular velocity change linearly. The line's slope is angular acceleration, and the area beneath it is angular displacement.",
    formula: String.raw`\omega(t) = \omega_0 + \alpha t`,
    areaFormula: String.raw`\Delta\theta = \omega_0 t + \frac{1}{2}\alpha t^2`,
    kind: "angular" as const,
    accelerated: true,
  },
];

export const metadata: Metadata = {
  ...getExperimentMetadata("physics", "motion-diagrams"),
  description:
    "Interactive velocity-time diagrams for uniform and uniformly accelerated linear and circular motion.",
};

export default function MotionDiagramsPage() {
  return (
    <div className="pb-24">
      <div className="max-w-3xl space-y-4">
        <SubTitle>
          Adjust the controls and see how each motion graph changes over time.
        </SubTitle>
        <SourceCodeLink />
        <nav
          aria-label="Jump to a motion type"
          className="my-10 flex flex-wrap gap-2"
        >
          {motions.map((motion) => (
            <a
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={`#${motion.id}`}
              key={motion.id}
            >
              {motion.abbreviation}
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-16">
        {motions.map((motion) => (
          <section
            aria-labelledby={`${motion.id}-title`}
            className="scroll-mt-24"
            id={motion.id}
            key={motion.id}
          >
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <Section
                  id={`${motion.id}-title`}
                  name={`${motion.abbreviation} · ${motion.name}`}
                />
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {motion.description}
                </p>
              </div>
            </div>

            <MotionDiagram
              accelerated={motion.accelerated}
              areaFormula={motion.areaFormula}
              formula={motion.formula}
              id={motion.id}
              kind={motion.kind}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
