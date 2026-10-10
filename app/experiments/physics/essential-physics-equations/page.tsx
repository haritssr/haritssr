import type { Metadata } from "next";

import "katex/dist/katex.min.css";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import { DESCRIPTION, PHYSICS_DOMAINS } from "./_data";
import type { PhysicsEquation } from "./_data";

export const metadata: Metadata = getExperimentMetadata(
  "physics",
  "essential-physics-equations",
  { description: DESCRIPTION }
);

export default function PhysicsEquationsPage() {
  return (
    <>
      <SubTitle>{DESCRIPTION}</SubTitle>
      <SourceCodeLink />
      <article className="space-y-20 pb-24">
        <EquationContents />

        {PHYSICS_DOMAINS.map((domain) => (
          <div className="min-w-0 scroll-mt-24" id={domain.id} key={domain.id}>
            <SectionHeading id={`${domain.id}-title`}>
              {domain.title}
            </SectionHeading>
            <p className="text-foreground/65 mb-10 max-w-3xl text-base leading-7">
              {domain.description}
            </p>
            <div className="space-y-20">
              {domain.equations.map((equation) => (
                <EquationSection equation={equation} key={equation.id} />
              ))}
            </div>
          </div>
        ))}
      </article>
    </>
  );
}

function EquationContents() {
  return (
    <nav
      aria-labelledby="equation-contents-title"
      className="border-border rounded-2xl border p-5 sm:p-6"
    >
      <SectionHeading id="equation-contents-title">
        Browse by domain
      </SectionHeading>
      <p className="text-foreground/65 mb-6 max-w-3xl text-sm leading-6">
        Units follow SI; {katexify("1", false)} means dimensionless. An em dash
        indicates no applicable unit or no universal constant value. Values
        marked {katexify(String.raw`\approx`, false)} are approximate; other
        listed constant values are exact.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PHYSICS_DOMAINS.map((domain) => (
          <div key={domain.id}>
            <a
              className="text-foreground focus-visible:outline-action rounded-sm text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              href={`#${domain.id}`}
            >
              {domain.title}
            </a>
            <ul className="mt-3 space-y-2">
              {domain.equations.map((equation) => (
                <li key={equation.id}>
                  <a
                    className="text-foreground/70 hover:text-action focus-visible:outline-action rounded-sm text-sm leading-5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`#${equation.id}`}
                  >
                    {equation.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <ExternalLink
          href="https://www.bipm.org/en/measurement-units/si-defining-constants"
          name="BIPM · SI defining constants"
        />
        <ExternalLink
          href="https://physics.nist.gov/cuu/Constants/Table/allascii.txt"
          name="NIST · 2022 CODATA constants"
        />
      </div>
    </nav>
  );
}

function EquationSection({ equation }: { equation: PhysicsEquation }) {
  return (
    <Section
      className="min-w-0 scroll-mt-24"
      id={equation.id}
      title={equation.title}
      headingAs="h3"
    >
      <div className="mb-5 grid sm:mt-5 sm:grid-cols-2 sm:items-start sm:gap-8">
        <div className="border-border bg-background scrollbar-subtle mb-5 min-w-0 overflow-x-auto rounded-xl border px-4 py-6 sm:my-0 sm:px-6">
          <div className="w-fit min-w-full text-base sm:text-lg">
            {katexify(equation.expression, true)}
          </div>
        </div>
        <p className="text-foreground/80 min-w-0 text-base leading-7">
          {equation.explanation}{" "}
          <ExternalLink
            href={equation.source.href}
            name={equation.source.label}
            size="inherit"
          />
        </p>
      </div>
      <VariableTable equation={equation} />
      {equation.unitsNote === undefined ? null : (
        <p className="text-foreground/65 mt-3 text-xs leading-5">
          {equation.unitsNote}
        </p>
      )}
      <p className="text-foreground/70 mt-5 text-sm leading-6">
        <span className="text-foreground font-medium">When it applies: </span>
        {equation.condition}
      </p>
    </Section>
  );
}

function VariableTable({ equation }: { equation: PhysicsEquation }) {
  return (
    <Table className="min-w-120">
      <caption className="sr-only">
        {equation.title}: symbols, definitions, SI units, and constant values
      </caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Symbol
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Meaning
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            SI unit
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Constant value
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {equation.symbols.map(({ constantValue, meaning, symbol, unit }) => (
          <tr className="divide-border divide-x" key={symbol}>
            <th
              className="px-3 py-2 text-left align-top font-normal whitespace-nowrap"
              scope="row"
            >
              {katexify(symbol, false)}
            </th>
            <td className="px-3 py-2 align-top">{meaning}</td>
            <td className="px-3 py-2 align-top whitespace-nowrap">
              {unit === null ? "—" : katexify(unit, false)}
            </td>
            <td className="px-3 py-2 align-top whitespace-nowrap">
              {constantValue === undefined
                ? "—"
                : katexify(constantValue, false)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
