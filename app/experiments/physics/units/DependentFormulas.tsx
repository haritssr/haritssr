"use client";

import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
          <Select.Root
            modal={false}
            onValueChange={(value) => {
              if (value !== null) {
                setSelectedQuantity(value);
              }
            }}
            value={selected.quantity}
          >
            <Select.Trigger
              aria-label="Pilih besaran"
              className="form-control border-border text-foreground/90 focus-visible:outline-action hover:bg-foreground/5 inline-flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-sm outline-hidden focus-visible:outline-2"
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-foreground/70">Pilih besaran:</span>
                <Select.Value />
              </span>
              <Select.Icon>
                <ChevronDownIcon aria-hidden="true" className="size-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner alignItemWithTrigger={false} sideOffset={4}>
                <Select.Popup className="border-border z-50 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border bg-white shadow-xl">
                  <Select.List className="max-h-72 overflow-y-auto p-1">
                    {quantities.map((quantity) => (
                      <Select.Item
                        className="text-foreground data-highlighted:bg-foreground/10 relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none"
                        key={quantity.quantity}
                        value={quantity.quantity}
                      >
                        <Select.ItemText>{quantity.quantity}</Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2">
                          <CheckIcon aria-hidden="true" className="size-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
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
