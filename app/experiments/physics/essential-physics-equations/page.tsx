import { Accordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

import "katex/dist/katex.min.css";
import ExternalLink from "@/components/ExternalLink";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import { DESCRIPTION, PHYSICS_DOMAINS } from "./_data";
import type { PhysicsEquation } from "./_data";

import styles from "./equations.module.css";

export const metadata: Metadata = getExperimentMetadata(
  "physics",
  "essential-physics-equations"
);

export default function PhysicsEquationsPage() {
  return (
    <>
      <PageTitle size="large">Essential Physics Equations</PageTitle>
      <div className="max-w-full">
        <SubTitle>{DESCRIPTION}</SubTitle>
        <SourceCodeLink />
      </div>
      <article className={`${styles.equations} space-y-20 pb-24`}>
        {PHYSICS_DOMAINS.map((domain) => (
          <div className="min-w-0 scroll-mt-24" id={domain.id} key={domain.id}>
            <SectionHeading
              className="text-foreground mb-4 text-3xl font-bold"
              id={`${domain.id}-title`}
            >
              {domain.title}
            </SectionHeading>
            <p className="text-foreground/65 mb-20 max-w-full text-base leading-7">
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

function EquationSection({ equation }: { equation: PhysicsEquation }) {
  return (
    <Section
      className="min-w-0 scroll-mt-24"
      id={equation.id}
      title={equation.title}
      headingAs="h3"
    >
      <div className="border-border bg-background min-w-0 overflow-hidden rounded-xl border">
        <div className="scrollbar-subtle min-w-0 overflow-x-auto px-4 py-12 sm:px-6 sm:py-16">
          <div className="w-fit min-w-full text-base sm:text-lg">
            {katexify(equation.expression, true)}
          </div>
        </div>
        <Accordion.Root>
          <Accordion.Item value={equation.id}>
            <Accordion.Header data-toc-ignore="">
              <Accordion.Trigger
                aria-label={`Details for ${equation.title}`}
                className="group border-border text-foreground/70 focus-visible:outline-action flex w-full cursor-pointer items-center justify-between gap-3 border-t px-3 py-3 text-left text-sm outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 sm:pr-4 sm:pl-3"
              >
                Explanation
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180 motion-reduce:transition-none"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="border-border border-t">
              <VariableTable equation={equation} />
              <div className="border-border space-y-4 border-t px-4 py-5 sm:px-6">
                <p className="text-foreground/80 w-full text-base leading-7">
                  {equation.explanation}{" "}
                  <ExternalLink
                    href={equation.source.href}
                    name="Source"
                    size="inherit"
                  />
                </p>
                {equation.unitsNote === undefined ? null : (
                  <p className="text-foreground/65 max-w-3xl text-xs leading-5">
                    {equation.unitsNote}
                  </p>
                )}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </Section>
  );
}

function VariableTable({ equation }: { equation: PhysicsEquation }) {
  return (
    <Table className="min-w-120" variant="embedded">
      <caption className="sr-only">
        {equation.title}: symbols, definitions, SI units, and constant values
      </caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 py-2 text-left font-normal" scope="col">
            Symbol
          </th>
          <th className="px-3 py-2 text-left font-normal" scope="col">
            Meaning
          </th>
          <th className="px-3 py-2 text-left font-normal" scope="col">
            SI unit
          </th>
          <th className="px-3 py-2 text-left font-normal" scope="col">
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
