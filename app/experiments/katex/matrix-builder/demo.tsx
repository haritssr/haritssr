"use client";
import { useState } from "react";

import NumberInput from "@/components/NumberInput";
import { SelectField as ExperimentSelect } from "@/components/SelectField";

import { DemoButton, TexPreview } from "../_components/DemoControls";

const SIZES = [
  { label: "2 by 2", value: "2" },
  { label: "3 by 3", value: "3" },
];
const DELIMITERS = [
  { label: "Square brackets", value: "bmatrix" },
  { label: "Parentheses", value: "pmatrix" },
];

function identity() {
  return [
    ["1", "0"],
    ["0", "1"],
  ];
}

function numberTex(value: string) {
  const number = Number(value);
  const [coefficient, exponent] = String(number).split("e");
  return exponent === undefined
    ? coefficient
    : `${coefficient} \\times 10^{${Number(exponent)}}`;
}

export default function MatrixDemo() {
  const [cells, setCells] = useState(identity);
  const [environment, setEnvironment] = useState("bmatrix");
  const size = cells.length;
  const valid = cells.every((row) =>
    row.every((value) => value.trim() !== "" && Number.isFinite(Number(value)))
  );
  const tex = `\\begin{${environment}}\n${cells.map((row) => row.map(numberTex).join(" & ")).join(" \\\\\n")}\n\\end{${environment}}`;

  function resize(value: string) {
    const nextSize = Number(value);
    setCells((previous) =>
      Array.from({ length: nextSize }, (_, row) =>
        Array.from(
          { length: nextSize },
          (_entry, column) => previous[row]?.[column] ?? "0"
        )
      )
    );
  }

  function changeCell(row: number, column: number, value: string) {
    setCells((previous) =>
      previous.map((entries, rowIndex) =>
        rowIndex === row
          ? entries.map((entry, columnIndex) =>
              columnIndex === column ? value : entry
            )
          : entries
      )
    );
  }

  function reset() {
    setCells(identity());
    setEnvironment("bmatrix");
  }

  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <ExperimentSelect
            label="Matrix size"
            onValueChange={resize}
            options={SIZES}
            value={String(size)}
          />
          <ExperimentSelect
            label="Delimiters"
            onValueChange={setEnvironment}
            options={DELIMITERS}
            value={environment}
          />
        </div>
        <fieldset className="border-border min-w-0 rounded-xl border p-4">
          <legend className="text-foreground/80 px-1 text-sm font-medium">
            Matrix entries
          </legend>
          <div className="scrollbar-subtle overflow-x-auto">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${size}, minmax(8rem, 1fr))`,
              }}
            >
              {cells.flatMap((row, rowIndex) =>
                row.map((value, columnIndex) => (
                  <div key={`${rowIndex}:${columnIndex}`}>
                    <NumberInput
                      label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`}
                      value={value === "" ? null : Number(value)}
                      invalid={
                        value.trim() === "" || !Number.isFinite(Number(value))
                      }
                      onValueChange={(next) => {
                        changeCell(
                          rowIndex,
                          columnIndex,
                          next === null ? "" : String(next)
                        );
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </fieldset>
        <p className="text-foreground/70 text-sm">
          Resizing keeps the retained entries. New entries start at zero.
        </p>
        <DemoButton onClick={reset}>Reset</DemoButton>
      </div>
      {valid ? (
        <TexPreview tex={tex} />
      ) : (
        <output className="text-foreground/80 bg-foreground/5 rounded-xl p-4 text-sm">
          Enter a finite number in every cell to render the matrix.
        </output>
      )}
    </div>
  );
}
