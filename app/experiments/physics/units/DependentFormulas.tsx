"use client";

import { useState } from "react";

import { SelectField } from "@/components/SelectField";
import katexify from "@/utils/katexify";

interface FormulaUse {
  condition?: string;
  expression: string;
  formulaName: string;
  prerequisites: readonly { label: string; symbol?: string }[];
  result: string;
  resultSymbol: string;
}

export interface QuantityDependents {
  formulas: readonly FormulaUse[];
  quantity: string;
  quantitySymbol: string;
  unit: string;
  unitSymbol: string;
}

export default function DependentFormulas({
  quantities,
}: {
  quantities: readonly QuantityDependents[];
}) {
  const [selectedQuantity, setSelectedQuantity] = useState("Momentum");
  const selected =
    quantities.find((quantity) => quantity.quantity === selectedQuantity) ??
    quantities[0];

  if (selected === undefined) {
    return null;
  }

  const dependentCount = new Set(
    selected.formulas.map((formula) => formula.result)
  ).size;

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="border-border grid items-center gap-x-6 gap-y-3 border-b p-4 sm:grid-cols-2">
        <div className="min-w-0">
          <SelectField
            label="Pilih besaran"
            labelPlacement="inside"
            value={selected.quantity}
            onValueChange={setSelectedQuantity}
            options={quantities.map((quantity) => ({
              label: quantity.quantity,
              value: quantity.quantity,
            }))}
          />
        </div>
        <p className="text-foreground/70 text-sm">
          <span className="text-foreground font-medium">
            {selected.quantity} (<MathSymbol value={selected.quantitySymbol} />)
          </span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <MathSymbol value={selected.unitSymbol} />
        </p>
      </div>
      <div className="p-4">
        <p aria-live="polite" className="text-foreground/70 mb-3 text-sm">
          {selected.formulas.length} rumus untuk {dependentCount} besaran lain
        </p>
        {selected.formulas.length > 0 ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {selected.formulas.map((formula, formulaIndex) => (
              <li
                className="border-border flex min-w-0 flex-col gap-2 rounded-xl border p-3"
                key={`${formula.result}:${formula.formulaName}:${formulaIndex}`}
              >
                <div>
                  <span className="font-medium">
                    {formula.result} (
                    <MathSymbol value={formula.resultSymbol} />)
                  </span>
                  <p className="text-foreground/60 text-xs">
                    {formula.formulaName}
                  </p>
                </div>
                <div className="bg-surface-hover scrollbar-subtle overflow-x-auto rounded-lg px-3 py-2 text-center">
                  <MathSymbol value={formula.expression} />
                </div>
                <p className="text-foreground/70 text-xs">
                  Melalui:{" "}
                  {formula.prerequisites.map((prerequisite, index) => (
                    <span key={`${prerequisite.label}:${index}`}>
                      {index > 0 ? ", " : null}
                      {prerequisite.label}
                      {prerequisite.symbol !== undefined &&
                      prerequisite.symbol !== "" ? (
                        <>
                          {" ("}
                          <MathSymbol value={prerequisite.symbol} />)
                        </>
                      ) : null}
                    </span>
                  ))}
                </p>
                {formula.condition !== undefined && formula.condition !== "" ? (
                  <p className="text-foreground/60 text-xs">
                    Syarat: {formula.condition}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-foreground/70 text-sm">
            Belum ada rumus pada daftar ini yang menggunakan besaran tersebut.
          </p>
        )}
      </div>
    </div>
  );
}

function MathSymbol({ value }: { value: string }) {
  return <span>{katexify(value, false)}</span>;
}
