import "katex/dist/katex.min.css";
import { Accordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import Contents from "./contents";
import {
  AngularExplorer,
  FactorExplorer,
  OrbitalExplorer,
  PotentialExplorer,
  ProbabilityExplorer,
  RadialExplorer,
} from "./interactions";

import styles from "./accordion.module.css";

const SECTIONS = [
  { id: "explore", label: "Compare the shapes" },
  { id: "angular-shapes", label: "Why the shapes differ" },
  { id: "probability", label: "A probability pattern" },
  { id: "radial-nodes", label: "Same shape, new shell" },
  { id: "deeper", label: "Go deeper" },
  { id: "references", label: "Sources" },
] as const;

export const metadata: Metadata = {
  ...getExperimentMetadata("physics", "schrodinger-orbitals"),
  description:
    "Explore how wave patterns and angular nodes give s, p, d, and f orbitals their shapes with interactive visuals.",
};

export default function SchrodingerOrbitalsPage() {
  return (
    <div className="pb-24">
      <SubTitle>
        Orbitals are wave patterns around a nucleus, not paths traced by tiny
        planets. Explore how angular nodes divide those patterns into the s, p,
        d, and f shapes, and how the patterns describe where an electron is
        likely to be found.
      </SubTitle>
      <SourceCodeLink />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-8">
        <Contents items={SECTIONS} />
        <div className="min-w-0 space-y-16 lg:col-start-1 lg:row-start-1">
          <section
            aria-labelledby="explore-heading"
            className="scroll-mt-28"
            id="explore"
          >
            <Section id="explore-heading" name="Start by comparing shapes" />
            <div className="space-y-4 leading-7">
              <p>
                Choose an orbital family, then choose one of its orientations.
                Rotate the model to see the full three-dimensional pattern.
              </p>
              <OrbitalExplorer />
              <p>
                Notice where the pattern has lobes and where it has gaps. The
                gaps are places where the wave is zero; those surfaces help
                determine each orbital&apos;s shape.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="angular-shapes-heading"
            className="scroll-mt-28"
            id="angular-shapes"
          >
            <Section
              id="angular-shapes-heading"
              name="Angular nodes make the shapes"
            />
            <div className="space-y-4 leading-7">
              <p>
                The angular pattern describes how the wave changes with
                direction. Its zero-amplitude surfaces, called angular nodes,
                divide the surrounding space into lobes. Changing the angular
                quantum number {katexify(String.raw`\ell`, false)} changes this
                pattern.
              </p>
              <AngularExplorer />
              <p>
                The sequence is{" "}
                {katexify(
                  String.raw`s\;(\ell=0),\;p\;(\ell=1),\;d\;(\ell=2)`,
                  false
                )}
                , and {katexify(String.raw`f\;(\ell=3)`, false)}. Each family
                has {katexify(String.raw`2\ell+1`, false)} orientations: 1, 3,
                5, and 7. The magnetic quantum number {katexify("m", false)}{" "}
                distinguishes angular patterns within a family; it does not
                change the family itself.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="probability-heading"
            className="scroll-mt-28"
            id="probability"
          >
            <Section
              id="probability-heading"
              name="An orbital is a probability pattern"
            />
            <div className="space-y-4 leading-7">
              <p>
                The wavefunction can have positive or negative values. Its sign
                is not electric charge. Squaring its magnitude,{" "}
                {katexify(String.raw`|\psi|^2`, false)}, gives the probability
                of finding the electron in each small region of space.
              </p>
              <ProbabilityExplorer />
              <p className="text-foreground/65 text-sm">
                The colored lobes are not solid walls. They summarize where the
                electron is more likely to be found; the color shows the
                wave&apos;s sign, not a different kind of charge.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="radial-nodes-heading"
            className="scroll-mt-28"
            id="radial-nodes"
          >
            <Section
              id="radial-nodes-heading"
              name="Same shape, different shell"
            />
            <div className="space-y-4 leading-7">
              <p>
                The shell number {katexify("n", false)} changes the radial
                pattern: how far from the nucleus the electron is likely to be
                found and how many spherical nodes appear. Changing{" "}
                {katexify("n", false)} can add radial structure while keeping
                the same angular family.
              </p>
              <Accordion.Root className="w-full" keepMounted multiple>
                <ExplanationAccordionItem
                  title="See the radial wave and node rule"
                  value="radial-wave"
                >
                  <p>
                    For a hydrogen-like orbital, the radial node count is{" "}
                    {katexify("n - \\ell - 1", false)}. These spherical surfaces
                    are separate from the angular nodes that shape the lobes.
                  </p>
                  <div className="border-border overflow-x-auto rounded-xl border bg-zinc-50 px-4 py-5 text-center">
                    {katexify(
                      String.raw`\text{radial nodes}=n-\ell-1\qquad\text{angular nodes}=\ell`,
                      true
                    )}
                  </div>
                  <RadialExplorer />
                </ExplanationAccordionItem>
              </Accordion.Root>
            </div>
          </section>

          <section
            aria-labelledby="deeper-heading"
            className="scroll-mt-28"
            id="deeper"
          >
            <Section id="deeper-heading" name="Follow the math, if you want" />
            <Accordion.Root className="space-y-3" keepMounted multiple>
              <ExplanationAccordionItem
                title="Why does hydrogen have allowed wave patterns?"
                value="allowed-waves"
              >
                <p>
                  Start with hydrogen: one electron attracted to one proton. Its
                  time-independent Schrödinger equation asks which wave patterns
                  can have a definite energy.
                </p>
                <div className="border-border overflow-x-auto rounded-xl border bg-zinc-50 px-4 py-5 text-center">
                  {katexify(
                    String.raw`\left[-\frac{\hbar^2}{2m_e}\nabla^2-\frac{e^2}{4\pi\varepsilon_0r}\right]\psi=E\psi`,
                    true
                  )}
                </div>
                <p>
                  The first term describes how the wave bends through space; the
                  second is the attractive electric potential.
                </p>
                <PotentialExplorer />
              </ExplanationAccordionItem>

              <ExplanationAccordionItem
                title="How do distance and direction fit together?"
                value="distance-and-direction"
              >
                <p>
                  Hydrogen&apos;s attraction depends only on distance from the
                  nucleus. That spherical symmetry lets us separate a
                  wavefunction into a radial part and an angular part:
                </p>
                <div className="border-border overflow-x-auto rounded-xl border bg-zinc-50 px-4 py-5 text-center">
                  {katexify(
                    String.raw`\psi_{n\ell m}(r,\theta,\phi)=R_{n\ell}(r)Y_{\ell}^{m}(\theta,\phi)`,
                    true
                  )}
                </div>
                <p>
                  The radial part changes with distance. The angular part
                  changes with direction. Probe the real{" "}
                  {katexify("2p_y", false)} example below;{" "}
                  {katexify("\\theta", false)} is measured from the vertical{" "}
                  {katexify("+y", false)} axis used by the 3D viewer.
                </p>
                <FactorExplorer />
                <p className="text-foreground/65 text-sm">
                  The quantum numbers obey {katexify("n \\ge 1", false)},{" "}
                  {katexify("0 \\le \\ell < n", false)}, and{" "}
                  {katexify("-\\ell \\le m \\le \\ell", false)}. The real
                  orbitals shown here are combinations of the complex{" "}
                  {katexify("m", false)} states when {katexify("m", false)} is
                  nonzero.
                </p>
              </ExplanationAccordionItem>

              <ExplanationAccordionItem
                title="Where do all four families appear in an atom?"
                value="orbital-families"
              >
                <p>
                  Cerium (Ce, atomic number 58) is the first neutral
                  ground-state atom with occupied s, p, d, and f subshells. Its
                  configuration is{" "}
                  {katexify("[\\mathrm{Xe}]4f^1 5d^1 6s^2", false)}; the{" "}
                  {katexify("[\\mathrm{Xe}]", false)} core includes filled p
                  subshells. Lanthanum (57) has no occupied f subshell in its
                  ground state.
                </p>
                <p>
                  The interactive shapes above are hydrogen-like models. They
                  isolate the shape families; they are not exact solutions for
                  the many-electron cerium atom.
                </p>
                <p>
                  To see how electrons fill these subshells, continue to the{" "}
                  <Link
                    className="text-action hover:text-action-hover underline"
                    href="/experiments/physics/electron-configuration"
                  >
                    electron-configuration experiment
                  </Link>
                  .
                </p>
              </ExplanationAccordionItem>
            </Accordion.Root>
          </section>

          <section
            aria-labelledby="references-heading"
            className="scroll-mt-28"
            id="references"
          >
            <Section id="references-heading" name="Sources and next steps" />
            <ul className="text-foreground/70 list-disc space-y-2 pl-5 text-sm leading-6">
              <li>
                <a
                  className="text-action underline"
                  href="https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom"
                >
                  OpenStax: The Hydrogen Atom
                </a>{" "}
                — equation, separation, and probability.
              </li>
              <li>
                <a
                  className="text-action underline"
                  href="https://openstax.org/books/chemistry-atoms-first-2e/pages/3-3-development-of-quantum-theory"
                >
                  OpenStax: Development of Quantum Theory
                </a>{" "}
                — orbital families and quantum numbers.
              </li>
              <li>
                <a
                  className="text-action underline"
                  href="https://physics.nist.gov/PhysRefData/Handbook/Tables/ceriumtable1.htm"
                >
                  NIST: Cerium
                </a>{" "}
                and{" "}
                <a
                  className="text-action underline"
                  href="https://physics.nist.gov/PhysRefData/Handbook/Tables/lanthanumtable1.htm"
                >
                  NIST: Lanthanum
                </a>{" "}
                — measured ground-state configurations.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function ExplanationAccordionItem({
  children,
  title,
  value,
}: {
  children: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Accordion.Item value={value}>
      <Accordion.Header>
        <Accordion.Trigger className="group focus-visible:outline-action border-border bg-foreground/5 text-foreground hover:bg-foreground/10 data-panel-open:bg-foreground/10 flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm font-medium outline-hidden transition-colors focus-visible:outline-2 data-panel-open:rounded-b-none">
          <span>{title}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className="text-foreground h-5 w-5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180"
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel
        className={`${styles.panel} border-border text-foreground/70 space-y-4 rounded-b-lg border-r border-b border-l bg-white p-3 text-sm leading-7`}
      >
        {children}
      </Accordion.Panel>
    </Accordion.Item>
  );
}
