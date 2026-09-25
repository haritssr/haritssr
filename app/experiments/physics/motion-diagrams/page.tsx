import SubTitle from "components/SubTitle";
import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import MotionDiagram from "./MotionDiagram";

const motions = [
  {
    id: "glb",
    abbreviation: "GLB",
    name: "Gerak Lurus Beraturan",
    description:
      "Kecepatan tetap terhadap waktu. Grafiknya berupa garis mendatar, sehingga luas di bawah garis menyatakan perpindahan.",
    formula: "v(t) = v₀",
    areaFormula: "Δx = v₀t",
    kind: "linear" as const,
    accelerated: false,
  },
  {
    id: "glbb",
    abbreviation: "GLBB",
    name: "Gerak Lurus Berubah Beraturan",
    description:
      "Percepatan konstan membuat kecepatan berubah secara linear. Kemiringan garis adalah percepatan; luas di bawahnya adalah perpindahan.",
    formula: "v(t) = v₀ + at",
    areaFormula: "Δx = v₀t + ½at²",
    kind: "linear" as const,
    accelerated: true,
  },
  {
    id: "gmb",
    abbreviation: "GMB",
    name: "Gerak Melingkar Beraturan",
    description:
      "Kecepatan sudut tetap. Grafik ω terhadap t mendatar dan luas di bawahnya menyatakan perpindahan sudut.",
    formula: "ω(t) = ω₀",
    areaFormula: "Δθ = ω₀t",
    kind: "angular" as const,
    accelerated: false,
  },
  {
    id: "gmbb",
    abbreviation: "GMBB",
    name: "Gerak Melingkar Berubah Beraturan",
    description:
      "Percepatan sudut konstan membuat kecepatan sudut berubah secara linear. Kemiringan garis adalah α; luasnya adalah perpindahan sudut.",
    formula: "ω(t) = ω₀ + αt",
    areaFormula: "Δθ = ω₀t + ½αt²",
    kind: "angular" as const,
    accelerated: true,
  },
];

export const metadata: Metadata = {
  ...getExperimentMetadata("physics", "motion-diagrams"),
  description:
    "Diagram kecepatan dan kecepatan sudut terhadap waktu untuk GLB, GLBB, GMB, dan GMBB.",
};

export default function MotionDiagramsPage() {
  return (
    <div className="pb-24">
      <div className="max-w-3xl space-y-4">
        <SubTitle>
          Atur nilainya dan lihat bagaimana grafik berubah terhadap waktu.
        </SubTitle>
        <SourceCodeLink />
        <nav
          aria-label="Lompat ke jenis gerak"
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

      <div className="space-y-20">
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
                  name={`${motion.abbreviation} (${motion.name})`}
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
