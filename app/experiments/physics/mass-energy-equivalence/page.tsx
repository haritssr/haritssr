import "katex/dist/katex.min.css";
import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

const DESCRIPTION =
  "Learn what Einstein’s mass–energy equivalence means, define its symbols, and work through an example.";

export const metadata: Metadata = {
  ...getExperimentMetadata("physics", "mass-energy-equivalence"),
  description: DESCRIPTION,
};

export default function MassEnergyEquivalencePage() {
  return (
    <>
      <SubTitle>
        Often described as one of physics’ most influential equations,
        mass–energy equivalence connects an object’s rest mass with the energy
        associated with it.
      </SubTitle>
      <SourceCodeLink />
      <article className="space-y-12 pb-24">
        <figure className="border-border bg-background border px-4 py-10 text-center sm:px-8">
          <div className="text-4xl sm:text-6xl">
            {katexify("E = mc^2", true)}
          </div>
          <figcaption className="text-foreground/65 mt-5 text-sm">
            Rest energy equals rest mass multiplied by the square of the speed
            of light in vacuum.
          </figcaption>
        </figure>

        <section>
          <Section name="Variables and constant" />
          <p className="text-foreground/75 mb-4 text-sm leading-6">
            The equation has two variables and one physical constant. The
            squared constant is the conversion factor between mass and energy.
          </p>
          <div className="border-border overflow-x-auto border">
            <table className="divide-border text-foreground w-full min-w-120 border-collapse divide-y text-sm">
              <caption className="sr-only">
                Definitions, meanings, and SI units of the symbols in the
                mass–energy equivalence equation
              </caption>
              <thead>
                <tr className="bg-surface-hover">
                  <th className="px-3 py-2 text-left font-medium" scope="col">
                    Symbol
                  </th>
                  <th className="px-3 py-2 text-left font-medium" scope="col">
                    Definition
                  </th>
                  <th className="px-3 py-2 text-left font-medium" scope="col">
                    SI unit or value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                <tr>
                  <th className="px-3 py-3 text-left font-normal" scope="row">
                    {katexify("E", false)}
                  </th>
                  <td className="px-3 py-3">Rest energy</td>
                  <td className="px-3 py-3">
                    joule ({katexify("\\text{J}", false)})
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 text-left font-normal" scope="row">
                    {katexify("m", false)}
                  </th>
                  <td className="px-3 py-3">
                    Invariant mass (rest mass) of the object
                  </td>
                  <td className="px-3 py-3">
                    kilogram ({katexify("\\text{kg}", false)})
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 text-left font-normal" scope="row">
                    {katexify("c", false)}
                  </th>
                  <td className="px-3 py-3">Speed of light in vacuum</td>
                  <td className="px-3 py-3">
                    {katexify(
                      "299\\,792\\,458\\ \\text{m}\\,\\text{s}^{-1}\\text{ (exact)}",
                      false
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-foreground/65 mt-3 text-xs leading-5">
            The speed of light’s SI value is exact by definition. The energy
            depends on the object’s rest mass.
          </p>
        </section>

        <section>
          <Section name="A worked example" />
          <p className="text-foreground/75 mb-4 text-sm leading-6">
            If one gram of rest mass were completely converted into energy,
            first express the mass in kilograms, then substitute the speed of
            light:
          </p>
          <div className="border-border bg-background space-y-4 border px-4 py-5 text-center sm:px-6">
            <div className="overflow-x-auto">
              {katexify(
                "m = 1\\,\\text{g} = 1.00 \\times 10^{-3}\\,\\text{kg}",
                true
              )}
            </div>
            <div className="overflow-x-auto">
              {katexify(
                "E = (1.00 \\times 10^{-3}\\,\\text{kg})(299\\,792\\,458\\,\\text{m/s})^2 \\approx 8.99 \\times 10^{13}\\,\\text{J}",
                true
              )}
            </div>
            <p className="text-foreground/65 text-xs">
              That is about 90 trillion joules. This is a theoretical full
              conversion of the mass, not the energy released by an ordinary
              chemical reaction.
            </p>
          </div>
        </section>

        <section>
          <Section name="Why it matters—and what it does not say" />
          <div className="text-foreground/75 space-y-4 text-sm leading-6">
            <p>
              The equation says that rest mass is a form of energy: changing the
              mass of a system changes its rest energy. This relationship is
              essential for accounting for the energy released in nuclear
              reactions, where the products can have slightly less total rest
              mass than the starting materials.
            </p>
            <p>
              It does not mean that ordinary matter can readily release all of
              its rest energy. Chemical reactions convert only a tiny fraction
              of a system’s mass into other forms of energy, and even nuclear
              reactions release only the mass difference between their initial
              and final states. The displayed equation gives rest energy; a
              moving object’s total energy also includes its motion.
            </p>
          </div>
        </section>

        <section>
          <Section name="Check the units" />
          <p className="text-foreground/75 mb-4 text-sm leading-6">
            The units on the right-hand side reduce to joules, the SI unit of
            energy:
          </p>
          <div className="border-border bg-background overflow-x-auto border px-4 py-5 text-center">
            {katexify(
              "\\text{kg}\\left(\\frac{\\text{m}}{\\text{s}}\\right)^2 = \\frac{\\text{kg}\\,\\text{m}^2}{\\text{s}^2} = \\text{J}",
              true
            )}
          </div>
        </section>
      </article>
    </>
  );
}
