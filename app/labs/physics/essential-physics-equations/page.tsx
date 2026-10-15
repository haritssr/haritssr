import { Accordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";

import "katex/dist/katex.min.css";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { getLabMetadata } from "@/data/LabsData";
import katexify from "@/utils/katexify";

import { colorPhysicsSymbols } from "./_colors";
import { DESCRIPTION, PHYSICS_DOMAINS } from "./_data";
import type { PhysicsEquation } from "./_data";

import styles from "./equations.module.css";

export const metadata: Metadata = getLabMetadata(
  "physics",
  "essential-physics-equations"
);

export default function PhysicsEquationsPage() {
  return (
    <>
      <LabPageHeader title="Essential Physics Equations">
        <PageDescription>{DESCRIPTION}</PageDescription>
      </LabPageHeader>

      <article className={`${styles.equations} space-y-20 pb-24`}>
        {PHYSICS_DOMAINS.map((domain) => (
          <Section
            className="min-w-0 scroll-mt-24"
            id={domain.id}
            key={domain.id}
            title={<span id={`${domain.id}-title`}>{domain.title}</span>}
            description={domain.description}
          >
            <div className="space-y-10">
              {domain.equations.map((equation) => (
                <EquationSection equation={equation} key={equation.id} />
              ))}
            </div>
          </Section>
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
            {katexify(colorPhysicsSymbols(equation.expression), true)}
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
          <th className="px-3 text-left font-normal" scope="col">
            Symbol
          </th>
          <th className="px-3 text-left font-normal" scope="col">
            Meaning
          </th>
          <th className="px-3 text-left font-normal" scope="col">
            SI unit
          </th>
          <th className="px-3 text-left font-normal" scope="col">
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
              {katexify(colorPhysicsSymbols(symbol), false)}
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
