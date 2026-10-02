import { Accordion } from "@base-ui/react/accordion";

import "katex/dist/katex.min.css";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

import PrerequisiteGraph from "@/components/PrerequisiteGraph";
import type {
  PrerequisiteGraphEdgeData,
  PrerequisiteGraphNodeData,
} from "@/components/PrerequisiteGraph";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import {
  BASE_UNITS,
  DERIVED_FORMULAS,
  DERIVED_UNITS,
  DESCRIPTION,
  GRAPH_PREREQUISITE_ALIASES,
} from "./_data";
import type {
  FormulaDefinition,
  PrerequisiteNode,
  UnitDefinition,
} from "./_data";
import DependentFormulas from "./DependentFormulas";
import type { QuantityDependents } from "./DependentFormulas";

interface UnitsTableProps {
  caption: string;
  showFormulas?: boolean;
  units: readonly UnitDefinition[];
}

const PREREQUISITE_GRAPH_NODES = [
  ...BASE_UNITS.map((unit): PrerequisiteGraphNodeData => ({
    id: `base:${unit.quantity}`,
    kind: "base",
    label: unit.quantity,
    symbol: <MathSymbol value={unit.quantitySymbol} />,
  })),
  ...DERIVED_UNITS.map((unit): PrerequisiteGraphNodeData => ({
    id: `derived:${unit.quantity}`,
    kind: "derived",
    label: unit.quantity,
    symbol: <MathSymbol value={unit.quantitySymbol} />,
  })),
];

const PREREQUISITE_GRAPH_EDGES = createPrerequisiteGraphEdges();

const QUANTITY_DEPENDENTS = createQuantityDependents();

export const metadata: Metadata = {
  ...getExperimentMetadata("physics", "units"),
  description: DESCRIPTION,
};

export default function UnitsPage() {
  return (
    <div lang="id">
      <SubTitle>{DESCRIPTION}</SubTitle>
      <SourceCodeLink />
      <div className="space-y-20">
        <section>
          <Section name="Besaran Pokok" />
          <UnitsTable caption="Tujuh satuan pokok SI" units={BASE_UNITS} />
        </section>
        <section>
          <Section name="Besaran Turunan" />
          <UnitsTable
            caption="Besaran turunan yang umum dipelajari di SMA"
            showFormulas
            units={DERIVED_UNITS}
          />
        </section>
        <section>
          <Section name="Peta Prasyarat" />
          <p className="text-foreground/70 mb-4 text-sm">
            Buka besaran untuk melihat prasyarat konsep dan rumus yang umum
            digunakan di SMA.
          </p>
          <PrerequisiteDiagrams units={DERIVED_UNITS} />
        </section>
        <section>
          <Section name="Besaran yang Bergantung" />
          <p className="text-foreground/70 mb-4 text-sm">
            Pilih besaran untuk melihat rumus dan besaran lain yang langsung
            menggunakannya dalam daftar fisika SMA ini.
          </p>
          <DependentFormulas quantities={QUANTITY_DEPENDENTS} />
        </section>
        <section>
          <Section name="Graf Prasyarat" />
          <p className="text-foreground/70 mb-4 text-sm">
            Klik sebuah besaran untuk menyorot jalur yang menghubungkannya
            dengan prasyarat besaran pokok dan turunan.
          </p>
          <PrerequisiteGraph
            edges={PREREQUISITE_GRAPH_EDGES}
            nodes={PREREQUISITE_GRAPH_NODES}
          />
        </section>
      </div>
    </div>
  );
}

function MathSymbol({
  useDisplayFractions = false,
  value,
}: {
  useDisplayFractions?: boolean;
  value: string;
}) {
  const math = useDisplayFractions
    ? value.replaceAll("\\frac", "\\dfrac")
    : value;

  return <span>{katexify(math, false)}</span>;
}

function createPrerequisiteGraphEdges(): PrerequisiteGraphEdgeData[] {
  const nodeIdByLabel = new Map(
    PREREQUISITE_GRAPH_NODES.map((node) => [node.label, node.id])
  );
  const edges: PrerequisiteGraphEdgeData[] = [];
  const edgeKeys = new Set<string>();

  for (const [quantity, definitions] of Object.entries(DERIVED_FORMULAS)) {
    const targetId = nodeIdByLabel.get(quantity);

    if (targetId === undefined) {
      continue;
    }

    for (const definition of definitions) {
      for (const prerequisite of definition.prerequisites) {
        const prerequisiteLabel =
          GRAPH_PREREQUISITE_ALIASES[prerequisite.label] ?? prerequisite.label;
        const prerequisiteId = nodeIdByLabel.get(prerequisiteLabel);

        if (prerequisiteId === undefined || prerequisiteId === targetId) {
          continue;
        }

        const edgeKey = `${prerequisiteId}->${targetId}`;

        if (edgeKeys.has(edgeKey)) {
          continue;
        }

        edgeKeys.add(edgeKey);
        edges.push({ from: prerequisiteId, to: targetId });
      }
    }
  }

  return edges;
}

function createQuantityDependents(): QuantityDependents[] {
  const quantities = [...BASE_UNITS, ...DERIVED_UNITS];
  const formulasByQuantity = new Map<
    string,
    QuantityDependents["formulas"][number][]
  >(quantities.map((unit) => [unit.quantity, []]));

  for (const derivedUnit of DERIVED_UNITS) {
    for (const definition of getFormulaDefinitions(derivedUnit.quantity)) {
      const prerequisitesByQuantity = new Map<
        string,
        { label: string; symbol?: string }[]
      >();

      for (const prerequisite of definition.prerequisites) {
        if (prerequisite.type !== "quantity") {
          continue;
        }

        const quantity =
          GRAPH_PREREQUISITE_ALIASES[prerequisite.label] ?? prerequisite.label;

        if (!formulasByQuantity.has(quantity)) {
          continue;
        }

        const matches = prerequisitesByQuantity.get(quantity) ?? [];
        matches.push({
          label: prerequisite.label,
          symbol: prerequisite.symbol,
        });
        prerequisitesByQuantity.set(quantity, matches);
      }

      for (const [quantity, prerequisites] of prerequisitesByQuantity) {
        formulasByQuantity.get(quantity)?.push({
          condition: definition.condition,
          expression: definition.expression,
          formulaName: definition.name,
          prerequisites,
          result: derivedUnit.quantity,
          resultSymbol: derivedUnit.quantitySymbol,
        });
      }
    }
  }

  return quantities.map((unit) => ({
    formulas: formulasByQuantity.get(unit.quantity) ?? [],
    quantity: unit.quantity,
    quantitySymbol: unit.quantitySymbol,
    unit: unit.unit,
    unitSymbol: unit.unitSymbol,
  }));
}

function getFormulaDefinitions(quantity: string) {
  const definitions = DERIVED_FORMULAS[quantity];

  if (definitions === undefined) {
    throw new Error(`Missing prerequisite formulas for ${quantity}`);
  }

  return definitions;
}

function PrerequisiteNodeCard({ node }: { node: PrerequisiteNode }) {
  return (
    <div
      className={`flex min-w-24 flex-col items-center justify-center border px-3 py-2 text-center ${
        node.type === "concept"
          ? "border-border bg-surface-hover"
          : "border-border bg-background"
      }`}
    >
      <span className="text-xs">{node.label}</span>
      {node.symbol !== undefined && node.symbol !== "" ? (
        <span className="text-foreground/70 mt-1">
          <MathSymbol value={node.symbol} />
        </span>
      ) : null}
    </div>
  );
}

function FormulaPath({
  formulaDefinition,
  result,
}: {
  formulaDefinition: FormulaDefinition;
  result: UnitDefinition;
}) {
  return (
    <div className="border-border border p-3">
      <div className="text-foreground/60 mb-3 text-xs">
        {formulaDefinition.name}
      </div>
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-2 md:justify-start">
          {formulaDefinition.prerequisites.map((node, index) => (
            <div className="flex items-center gap-2" key={node.label}>
              <PrerequisiteNodeCard node={node} />
              {index < formulaDefinition.prerequisites.length - 1 ? (
                <span aria-hidden="true" className="text-foreground/40">
                  +
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <ArrowRightIcon
          aria-hidden="true"
          className="text-foreground/40 mx-auto size-4 shrink-0 rotate-90 md:mx-0 md:rotate-0"
        />
        <div className="border-border bg-surface-hover flex min-h-14 flex-1 items-center justify-center border px-3 py-2 text-center">
          <MathSymbol
            useDisplayFractions
            value={formulaDefinition.expression}
          />
        </div>
        <ArrowRightIcon
          aria-hidden="true"
          className="text-foreground/40 mx-auto size-4 shrink-0 rotate-90 md:mx-0 md:rotate-0"
        />
        <div className="border-border bg-foreground/5 flex min-h-14 flex-1 items-center justify-center border px-3 py-2 text-center">
          <span className="text-xs">
            {result.quantity} ( <MathSymbol value={result.quantitySymbol} /> )
          </span>
        </div>
      </div>
      {formulaDefinition.condition !== undefined &&
      formulaDefinition.condition !== "" ? (
        <p className="text-foreground/60 mt-3 text-xs">
          Syarat: {formulaDefinition.condition}
        </p>
      ) : null}
    </div>
  );
}

function PrerequisiteDiagrams({ units }: { units: readonly UnitDefinition[] }) {
  return (
    <Accordion.Root className="w-full space-y-3" multiple>
      {units.map((unit) => (
        <Accordion.Item key={unit.quantity} value={unit.quantity}>
          <Accordion.Header>
            <Accordion.Trigger className="group focus-visible:outline-action border-border bg-foreground/5 text-foreground hover:bg-foreground/10 data-panel-open:bg-foreground/10 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm font-medium outline-hidden transition-colors focus-visible:outline-2 data-panel-open:rounded-b-none">
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{unit.quantity}</span>
                <span className="text-foreground/60 shrink-0">
                  <MathSymbol value={unit.quantitySymbol} />
                </span>
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className="text-foreground size-5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="border-border text-foreground/70 rounded-b-lg border-r border-b border-l bg-white p-3 text-sm">
            <div className="mb-3 flex items-center gap-3 text-xs">
              <span className="text-foreground/60">
                Prasyarat → rumus → hasil
              </span>
              <span aria-hidden="true" className="text-foreground/40">
                ·
              </span>
              <span className="text-foreground/60">
                {getFormulaDefinitions(unit.quantity).length} rumus
              </span>
            </div>
            <div className="space-y-3">
              {getFormulaDefinitions(unit.quantity).map((formulaDefinition) => (
                <FormulaPath
                  formulaDefinition={formulaDefinition}
                  key={formulaDefinition.name}
                  result={unit}
                />
              ))}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

function UnitsTable({ caption, showFormulas = false, units }: UnitsTableProps) {
  return (
    <Table className="min-w-70">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="w-12 px-3 py-2 text-center font-medium" scope="col">
            No
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Besaran
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Simbol besaran
          </th>
          {showFormulas ? (
            <th className="px-3 py-2 text-left font-medium" scope="col">
              Rumus
            </th>
          ) : null}
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Satuan
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Simbol satuan
          </th>
          <th className="px-3 py-2 text-left font-medium" scope="col">
            Dimensi
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {units.map((unit, index) => (
          <tr className="divide-border divide-x" key={unit.quantity}>
            <td className="w-12 px-3 py-2 text-center tabular-nums">
              {index + 1}
            </td>
            <th className="px-3 py-2 text-left font-normal" scope="row">
              {unit.quantity}
            </th>
            <td className="px-3 py-2">
              <MathSymbol value={unit.quantitySymbol} />
            </td>
            {showFormulas ? (
              <td className="px-3 py-2">
                <ul className="space-y-3">
                  {getFormulaDefinitions(unit.quantity).map((definition) => (
                    <li key={definition.name}>
                      <p className="mb-1 text-xs">{definition.name}</p>
                      <MathSymbol
                        useDisplayFractions
                        value={definition.expression}
                      />
                      {definition.condition !== undefined &&
                      definition.condition !== "" ? (
                        <p className="mt-1 text-xs">{definition.condition}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </td>
            ) : null}
            <td className="px-3 py-2">{unit.unit}</td>
            <td className="px-3 py-2">
              <MathSymbol value={unit.unitSymbol} />
            </td>
            <td className="px-3 py-2">
              <MathSymbol value={unit.dimension} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
