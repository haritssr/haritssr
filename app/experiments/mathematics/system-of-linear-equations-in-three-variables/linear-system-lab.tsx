"use client";

import { Fragment, useState } from "react";

import katexify from "@/utils/katexify";

import {
  ENTRY_LIMIT,
  matrixTex,
  solveSystem,
  systemTex,
  variables,
} from "./model";

const presets = [
  {
    name: "One solution",
    system: [
      [1, 1, 1, 6],
      [2, -1, 1, 3],
      [1, 2, -1, 2],
    ],
  },
  {
    name: "Infinitely many",
    system: [
      [1, 1, 1, 6],
      [2, -1, 1, 3],
      [3, 0, 2, 9],
    ],
  },
  {
    name: "No solution",
    system: [
      [1, 1, 1, 6],
      [2, -1, 1, 3],
      [3, 0, 2, 8],
    ],
  },
] as const;
const rowNames = ["first", "second", "third"] as const;
const columns = [...variables, "constant"] as const;
const equationGridClass =
  "grid grid-cols-[repeat(3,minmax(0,1fr))_auto_minmax(0,1fr)] items-center gap-2";
const inputClass =
  "border-border text-foreground focus-visible:outline-action min-w-0 w-full rounded-md border px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2";
const buttonClass =
  "border-border text-foreground hover:bg-interface-hover focus-visible:outline-action min-h-11 cursor-pointer rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-40";

function draftFor(system: readonly (readonly number[])[]) {
  return system.map((row) => row.map(String));
}

function parseDraft(draft: string[][]) {
  if (
    draft.some((row) =>
      row.some(
        (value) =>
          value.trim() === "" ||
          !Number.isInteger(Number(value)) ||
          Math.abs(Number(value)) > ENTRY_LIMIT
      )
    )
  ) {
    return null;
  }
  return draft.map((row) => row.map(Number));
}

function resultDescription(kind: "unique" | "infinite" | "none", rank: number) {
  if (kind === "none") {
    return "A row gives a false equality. No triple satisfies every equation.";
  }
  if (kind === "unique") {
    return "Every variable has a pivot. The three planes meet at exactly one point.";
  }
  if (rank === 2) {
    return "One variable is free. The solutions form a line: each parameter value gives a different point.";
  }
  if (rank === 1) {
    return "Two variables are free. The solutions form a plane.";
  }
  return "Every equation is an identity. All triples of real numbers are solutions.";
}

export default function LinearSystemLab() {
  const [draft, setDraft] = useState(() => draftFor(presets[0].system));
  const [stepIndex, setStepIndex] = useState(0);
  const system = parseDraft(draft);
  const result = system === null ? null : solveSystem(system);
  const step = result?.steps[stepIndex];
  const headings = {
    unique: "One solution",
    infinite: "Infinitely many solutions",
    none: "No solution",
  };

  function updateCoefficient(
    rowIndex: number,
    columnIndex: number,
    value: string
  ) {
    setDraft((current) =>
      current.map((row, index) =>
        index === rowIndex
          ? row.map((entry, column) => (column === columnIndex ? value : entry))
          : row
      )
    );
    setStepIndex(0);
  }

  return (
    <section
      aria-labelledby="linear-system-lab-heading"
      className="border-border text-foreground overflow-hidden rounded-2xl border"
    >
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h2
          className="text-foreground text-lg font-semibold"
          id="linear-system-lab-heading"
        >
          Explore a system, one operation at a time
        </h2>
        <p className="text-muted mt-1 text-sm leading-6">
          Choose an example or edit the coefficients. Follow the row operations
          to see why the system has its solution type.
        </p>
      </div>
      <div className="grid lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="border-border text-foreground min-w-0 space-y-6 border-b p-5 sm:p-6 lg:border-r lg:border-b-0">
          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Example systems</legend>
            {presets.map((preset) => (
              <button
                aria-pressed={
                  system !== null &&
                  preset.system.every((row, i) =>
                    row.every((value, j) => value === system[i][j])
                  )
                }
                className={`${buttonClass} aria-pressed:border-action aria-pressed:bg-action/10`}
                key={preset.name}
                onClick={() => {
                  setDraft(draftFor(preset.system));
                  setStepIndex(0);
                }}
                type="button"
              >
                {preset.name}
              </button>
            ))}
          </fieldset>
          <p className="text-muted text-xs leading-5">
            Use integers from {katexify(`${-ENTRY_LIMIT}`, false)} to{" "}
            {katexify(`${ENTRY_LIMIT}`, false)}. A zero coefficient leaves that
            variable out of the equation.
          </p>
          <div
            className={`${equationGridClass} text-center text-sm`}
            aria-hidden="true"
          >
            {variables.map((column) => (
              <span key={column}>{katexify(column, false)}</span>
            ))}
            <span className="invisible">{katexify("=", false)}</span>
            <span>{katexify("d", false)}</span>
          </div>
          {rowNames.map((name, rowIndex) => (
            <fieldset key={name}>
              <legend className="mb-2 text-sm font-medium">
                Equation {rowIndex + 1}
              </legend>
              <div className={equationGridClass}>
                {columns.map((column, columnIndex) => (
                  <Fragment key={column}>
                    {column === "constant" ? (
                      <span aria-hidden="true" className="text-muted">
                        {katexify("=", false)}
                      </span>
                    ) : null}
                    <input
                      aria-label={`${name} equation: ${column === "constant" ? "right-hand side" : `coefficient of ${column}`}`}
                      className={inputClass}
                      max={ENTRY_LIMIT}
                      min={-ENTRY_LIMIT}
                      step="1"
                      type="number"
                      value={draft[rowIndex][columnIndex]}
                      onChange={(event) => {
                        updateCoefficient(
                          rowIndex,
                          columnIndex,
                          event.currentTarget.value
                        );
                      }}
                    />
                  </Fragment>
                ))}
              </div>
            </fieldset>
          ))}
          <p className="text-muted border-border border-t pt-4 text-xs leading-5">
            The last column is the right-hand side. If all three variable
            coefficients vanish, the equation is an identity or a contradiction
            rather than a plane.
          </p>
        </div>
        <div className="text-foreground min-w-0 space-y-6 p-5 sm:p-6">
          {system === null || result === null || step === undefined ? (
            <output className="text-muted block text-sm leading-6">
              Fill every field with an integer from{" "}
              {katexify(`${-ENTRY_LIMIT}`, false)} to{" "}
              {katexify(`${ENTRY_LIMIT}`, false)} to explore the system.
            </output>
          ) : (
            <>
              <div className="overflow-x-auto py-2 text-sm sm:text-base">
                {katexify(systemTex(system), true)}
              </div>
              <div className="border-border rounded-xl border p-4">
                <p className="text-muted text-xs font-medium">
                  Step {stepIndex + 1} of {result.steps.length}
                </p>
                <div className="overflow-x-auto py-2 text-sm">
                  {katexify(step.operation, true)}
                </div>
                <div className="overflow-x-auto py-2 text-sm sm:text-base">
                  {katexify(matrixTex(step.matrix), true)}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className={buttonClass}
                    disabled={stepIndex === 0}
                    onClick={() => {
                      setStepIndex((current) => current - 1);
                    }}
                    type="button"
                  >
                    Back a step
                  </button>
                  <button
                    className={buttonClass}
                    disabled={stepIndex === result.steps.length - 1}
                    onClick={() => {
                      setStepIndex((current) => current + 1);
                    }}
                    type="button"
                  >
                    Next operation
                  </button>
                  <button
                    className={buttonClass}
                    disabled={stepIndex === result.steps.length - 1}
                    onClick={() => {
                      setStepIndex(result.steps.length - 1);
                    }}
                    type="button"
                  >
                    Show final matrix
                  </button>
                </div>
              </div>
              <div aria-live="polite" className="border-border border-t pt-5">
                <h3 className="text-foreground font-semibold">
                  {headings[result.kind]}
                </h3>
                <p className="text-muted mt-2 text-sm leading-6">
                  {resultDescription(result.kind, result.rank)}
                </p>
                <div className="mt-3 text-center">
                  {katexify(
                    result.kind === "none"
                      ? result.contradictionTex
                      : result.solutionTex,
                    true
                  )}
                </div>
                {result.parametersTex === "" ? null : (
                  <p className="text-muted text-center text-sm">
                    {katexify(result.parametersTex, false)}
                  </p>
                )}
                <p className="text-muted mt-3 text-xs leading-5">
                  Results and row operations use exact fractions. Every
                  displayed matrix has the same solutions as the original
                  system.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
