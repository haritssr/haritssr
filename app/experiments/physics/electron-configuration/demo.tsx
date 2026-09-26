"use client";

import { NumberField } from "@base-ui/react/number-field";
import { useState } from "react";

import Section from "@/components/Section";
import katexify from "@/utils/katexify";

import {
  QuantumNumbersSummary,
  VocabularyGuide,
} from "../quantum-numbers/demo";
import {
  DEFAULT_ATOMIC_NUMBER,
  ELEMENTS,
  getElectronCounts,
  getRepresentativeMassNumber,
  isConfigurationException,
  MAX_ATOMIC_NUMBER,
  normalizeAtomicNumber,
  ORBITALS,
} from "./_data";
import type { OrbitalDefinition } from "./_data";
import OrbitalIllustration from "./orbital-illustration";

const AUFBAU_ROWS: readonly (readonly (number | null)[])[] = [
  [0, null, null, null],
  [1, 2, null, null],
  [3, 4, 6, null],
  [5, 7, 9, 12],
  [8, 10, 13, 16],
  [11, 14, 17, null],
  [15, 18, null, null],
];
const SHELL_STYLES = [
  {
    dot: "bg-red-600",
    label: "K shell",
    shortLabel: "K",
    surface: "border-red-200 bg-red-50",
    text: "text-red-700",
  },
  {
    dot: "bg-yellow-600",
    label: "L shell",
    shortLabel: "L",
    surface: "border-yellow-200 bg-yellow-50",
    text: "text-yellow-800",
  },
  {
    dot: "bg-green-600",
    label: "M shell",
    shortLabel: "M",
    surface: "border-green-200 bg-green-50",
    text: "text-green-700",
  },
  {
    dot: "bg-blue-600",
    label: "N shell",
    shortLabel: "N",
    surface: "border-blue-200 bg-blue-50",
    text: "text-blue-700",
  },
  {
    dot: "bg-purple-600",
    label: "O shell",
    shortLabel: "O",
    surface: "border-purple-200 bg-purple-50",
    text: "text-purple-700",
  },
  {
    dot: "bg-pink-600",
    label: "P shell",
    shortLabel: "P",
    surface: "border-pink-200 bg-pink-50",
    text: "text-pink-700",
  },
  {
    dot: "bg-cyan-600",
    label: "Q shell",
    shortLabel: "Q",
    surface: "border-cyan-200 bg-cyan-50",
    text: "text-cyan-700",
  },
] as const;
const SUPERSCRIPTS: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function toSuperscript(value: number): string {
  return String(value).replaceAll(
    /[0-9]/gu,
    (digit) => SUPERSCRIPTS[digit] ?? digit
  );
}

interface ConfigurationTerm {
  readonly electrons: number;
  readonly label: string;
  readonly shell: number;
}

function getConfiguration(
  electronCounts: readonly number[]
): ConfigurationTerm[] {
  return ORBITALS.map((orbital, index) => {
    const electrons = electronCounts[index] ?? 0;
    return electrons > 0
      ? { electrons, label: orbital.label, shell: orbital.shell }
      : null;
  }).filter((term): term is ConfigurationTerm => term !== null);
}

function getShellCounts(electronCounts: readonly number[]): number[] {
  const shellCounts = [0, 0, 0, 0, 0, 0, 0];

  for (const [index, electrons] of electronCounts.entries()) {
    const orbital = ORBITALS[index];
    if (orbital !== undefined) {
      shellCounts[orbital.shell - 1] += electrons;
    }
  }

  return shellCounts.filter((electrons) => electrons > 0);
}

function getOrbitalOccupancy(electrons: number, orbitalCount: number) {
  const pairedOrbitals = Math.max(electrons - orbitalCount, 0);
  const singlyOccupiedOrbitals = Math.min(electrons, orbitalCount);

  return Array.from({ length: orbitalCount }, (_, index) => {
    if (index < pairedOrbitals) {
      return 2;
    }
    if (index < singlyOccupiedOrbitals) {
      return 1;
    }
    return 0;
  });
}

function formatMagneticNumber(value: number): string {
  if (value > 0) {
    return `+${value}`;
  }
  return String(value).replace("-", "−");
}

function OrbitalBox({
  electrons,
  magneticNumber,
}: {
  electrons: number;
  magneticNumber: number;
}) {
  let electronSymbol: string | null = null;

  if (electrons === 2) {
    electronSymbol = "↑↓";
  } else if (electrons === 1) {
    electronSymbol = "↑";
  }

  return (
    <span className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <span className="text-foreground/60 font-mono text-xs font-medium">
        {formatMagneticNumber(magneticNumber)}
      </span>
      <span className="border-border bg-background flex h-9 w-full max-w-9 min-w-7 items-center justify-center rounded-md border font-mono text-base">
        {electronSymbol}
      </span>
    </span>
  );
}

function AufbauOrbital({
  electrons,
  isLastOccupied,
  orbital,
  order,
}: {
  electrons: number;
  isLastOccupied: boolean;
  orbital: OrbitalDefinition;
  order: number;
}) {
  const occupancy = getOrbitalOccupancy(electrons, orbital.orbitalCount);
  const occupancyDescription = occupancy
    .map((count, index) => {
      const magneticNumber = index - (orbital.orbitalCount - 1) / 2;
      return `m ${formatMagneticNumber(magneticNumber)}: ${count} electron${count === 1 ? "" : "s"}`;
    })
    .join(", ");

  return (
    <figure
      className={`rounded-lg border p-2.5 ${
        isLastOccupied
          ? "border-action bg-action/5"
          : "border-border bg-background"
      } ${electrons === 0 ? "opacity-60" : ""}`}
    >
      <figcaption className="sr-only">
        {orbital.label} subshell, filling order {order}, {electrons} electron
        {electrons === 1 ? "" : "s"}. {occupancyDescription}.
        {isLastOccupied ? " Contains the last electron." : ""}
      </figcaption>
      <div aria-hidden="true">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-semibold">
            {orbital.label}
            {electrons > 0 ? toSuperscript(electrons) : ""}
          </span>
          <span className="bg-surface-hover text-foreground/70 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-medium tabular-nums">
            {order}
          </span>
        </div>
        <div className="flex gap-1">
          {occupancy.map((count, index) => {
            const magneticNumber = index - (orbital.orbitalCount - 1) / 2;
            return (
              <OrbitalBox
                electrons={count}
                key={`${orbital.label}-${index}`}
                magneticNumber={magneticNumber}
              />
            );
          })}
        </div>
      </div>
    </figure>
  );
}

function AtomicNumberField({
  atomicNumber,
  id,
  onValueChange,
  showLabel = true,
}: {
  atomicNumber: number;
  id: string;
  onValueChange: (value: number) => void;
  showLabel?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {showLabel ? (
        <label className="text-foreground/70 text-xs" htmlFor={id}>
          Atomic number
        </label>
      ) : null}
      <NumberField.Root
        className="flex items-center"
        max={MAX_ATOMIC_NUMBER}
        min={1}
        name={id}
        onValueChange={(value) => {
          if (value !== null) {
            onValueChange(value);
          }
        }}
        snapOnStep
        step={1}
        value={atomicNumber}
      >
        <NumberField.Group className="flex items-center">
          <NumberField.Decrement
            aria-label="Previous element"
            className="border-border focus-visible:outline-action enabled:hover:bg-interface-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-md border-t border-b border-l text-lg outline-hidden focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </NumberField.Decrement>
          <NumberField.Input
            aria-label="Atomic number"
            autoComplete="off"
            className="form-control border-border bg-background focus:border-foreground/80 h-10 w-14 appearance-none border px-2 text-center font-mono text-base font-medium outline-hidden"
            id={id}
            inputMode="numeric"
          />
          <NumberField.Increment
            aria-label="Next element"
            className="border-border focus-visible:outline-action enabled:hover:bg-interface-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-md border-t border-r border-b text-lg outline-hidden focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </div>
  );
}

function AtomicNotation({
  atomicNumber,
  elementName,
  elementSymbol,
}: {
  atomicNumber: number;
  elementName: string;
  elementSymbol: string;
}) {
  const massNumber = getRepresentativeMassNumber(atomicNumber);
  const neutronNumber = massNumber - atomicNumber;

  return (
    <figure className="border-border self-start rounded-xl border p-3">
      <figcaption>
        <h3 className="text-foreground/70 text-xs font-medium">
          Atomic Notation
        </h3>
      </figcaption>
      <div aria-hidden="true" className="mt-2 text-2xl">
        {katexify(
          `{}^{${massNumber}}_{${atomicNumber}}\\mathrm{${elementSymbol}}`,
          false
        )}
      </div>
      <p className="sr-only">
        {elementName} with mass number {massNumber} and atomic number{" "}
        {atomicNumber}.
      </p>
      <dl className="mt-2 grid grid-cols-3 gap-2">
        <div>
          <dt className="text-foreground/70 text-xs">Proton</dt>
          <dd className="font-mono text-sm font-medium tabular-nums">
            {atomicNumber}
          </dd>
        </div>
        <div>
          <dt className="text-foreground/70 text-xs">Electron</dt>
          <dd className="font-mono text-sm font-medium tabular-nums">
            {atomicNumber}
          </dd>
        </div>
        <div>
          <dt className="text-foreground/70 text-xs">Neutron</dt>
          <dd className="font-mono text-sm font-medium tabular-nums">
            {neutronNumber}
          </dd>
        </div>
      </dl>
    </figure>
  );
}

export default function ElectronConfigurationDemo({
  initialAtomicNumber = DEFAULT_ATOMIC_NUMBER,
}: {
  initialAtomicNumber?: number;
}) {
  const [atomicNumber, setAtomicNumber] = useState(() =>
    normalizeAtomicNumber(initialAtomicNumber)
  );
  const element = ELEMENTS[atomicNumber - 1] ?? ELEMENTS[0];
  const electronCounts = getElectronCounts(atomicNumber);
  const shellCounts = getShellCounts(electronCounts);
  const configuration = getConfiguration(electronCounts);
  const lastOccupiedOrbitalIndex = electronCounts.findLastIndex(
    (electrons) => electrons > 0
  );

  function selectAtomicNumber(value: number) {
    const nextAtomicNumber = normalizeAtomicNumber(value);
    setAtomicNumber(nextAtomicNumber);

    const url = new URL(window.location.href);
    if (nextAtomicNumber === DEFAULT_ATOMIC_NUMBER) {
      url.searchParams.delete("element");
    } else {
      url.searchParams.set("element", String(nextAtomicNumber));
    }
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="space-y-16">
      <section aria-labelledby="element-selector-title">
        <Section id="element-selector-title" name="Pick An Element" />
        <p aria-atomic="true" aria-live="polite" className="sr-only">
          {element.name} selected, atomic number {atomicNumber}.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border rounded-xl border p-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-foreground/70 text-xs">Element</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {element.symbol}
                  </span>
                  <span className="pb-0.5 text-base">{element.name}</span>
                </div>
              </div>
              <AtomicNumberField
                atomicNumber={atomicNumber}
                id="element-atomic-number"
                onValueChange={selectAtomicNumber}
              />
            </div>
          </div>
          <AtomicNotation
            atomicNumber={atomicNumber}
            elementName={element.name}
            elementSymbol={element.symbol}
          />
          <div className="border-border rounded-xl border p-3">
            <p className="text-foreground/70 text-xs">Electron configuration</p>
            <p className="mt-2 font-mono text-base leading-6 wrap-break-word">
              {configuration.map((term, index) => {
                const shellStyle =
                  SHELL_STYLES[term.shell - 1] ?? SHELL_STYLES[0];

                return (
                  <span className={shellStyle.text} key={term.label}>
                    {index > 0 ? " " : ""}
                    {term.label}
                    <sup>{toSuperscript(term.electrons)}</sup>
                  </span>
                );
              })}
            </p>
            <ul
              aria-label="Electron shell color key"
              className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs"
            >
              {SHELL_STYLES.slice(0, shellCounts.length).map(
                ({ dot, label, text }) => (
                  <li className="flex items-center gap-1.5" key={label}>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${dot}`}
                    />
                    <span className={text}>{label}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="border-border rounded-xl border p-3">
            <p className="text-foreground/70 text-xs">Shell distribution</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {shellCounts.map((count, index) => {
                const shellStyle = SHELL_STYLES[index] ?? SHELL_STYLES[0];

                return (
                  <li
                    className={`min-w-14 rounded-lg border px-2 py-1.5 text-center ${shellStyle.surface}`}
                    key={`shell-${index + 1}`}
                  >
                    <span
                      className={`block text-xs font-medium ${shellStyle.text}`}
                    >
                      {shellStyle.shortLabel}
                    </span>
                    <span
                      className={`mt-0.5 block text-base font-semibold tabular-nums ${shellStyle.text}`}
                    >
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border-border rounded-xl border p-3">
            <QuantumNumbersSummary atomicNumber={atomicNumber} />
          </div>
        </div>
      </section>

      <OrbitalIllustration
        atomicNumber={atomicNumber}
        elementName={element.name}
      />

      <section aria-labelledby="aufbau-diagram-title">
        <Section id="aufbau-diagram-title" name="Aufbau Diagram" />
        <div className="border-border rounded-xl border">
          <div className="border-border flex items-center gap-3 border-b p-4">
            <div className="scrollbar-subtle min-w-0 overflow-x-auto">
              <ol
                aria-label="Aufbau orbital filling order"
                className="flex min-w-max items-center gap-1.5"
              >
                {ORBITALS.map((orbital, index) => {
                  const electrons = electronCounts[index] ?? 0;
                  const isLastOccupied = index === lastOccupiedOrbitalIndex;
                  let stateClassName =
                    "border-border bg-background text-foreground/70";

                  if (isLastOccupied) {
                    stateClassName = "border-action bg-action text-white";
                  } else if (electrons > 0) {
                    stateClassName = "border-action bg-action/10 text-action";
                  }

                  return (
                    <li
                      className="flex items-center gap-1.5"
                      key={orbital.label}
                    >
                      <span
                        className={`rounded-md border px-2 py-1 font-mono text-xs font-medium ${stateClassName}`}
                      >
                        {orbital.label}
                      </span>
                      {index < ORBITALS.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="text-foreground/50 text-xs"
                        >
                          →
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="ml-auto shrink-0">
              <AtomicNumberField
                atomicNumber={atomicNumber}
                id="aufbau-atomic-number"
                onValueChange={selectAtomicNumber}
                showLabel={false}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[3rem_minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,2fr)]">
              <div className="text-foreground/70 hidden items-center justify-center font-mono text-xs lg:flex">
                n ∖ ℓ
              </div>
              {["s", "p", "d", "f"].map((subshell) => (
                <div
                  className="text-foreground/70 hidden py-1 text-center font-mono text-xs font-medium uppercase lg:block"
                  key={subshell}
                >
                  {subshell}
                </div>
              ))}

              {AUFBAU_ROWS.map((orbitalIndexes, rowIndex) => (
                <div className="contents" key={`shell-${rowIndex + 1}`}>
                  <div className="bg-surface-hover text-foreground/70 mt-2 rounded-md px-3 py-2 font-mono text-sm lg:mt-0 lg:flex lg:items-center lg:justify-center lg:bg-transparent lg:px-0 lg:py-0">
                    <span className="lg:hidden">Shell </span>
                    {rowIndex + 1}
                  </div>
                  {orbitalIndexes.map((orbitalIndex, columnIndex) => {
                    if (orbitalIndex === null) {
                      return (
                        <div
                          aria-hidden="true"
                          className="hidden lg:block"
                          key={`empty-${rowIndex}-${columnIndex}`}
                        />
                      );
                    }

                    const orbital = ORBITALS[orbitalIndex];
                    if (orbital === undefined) {
                      return null;
                    }

                    return (
                      <AufbauOrbital
                        electrons={electronCounts[orbitalIndex] ?? 0}
                        isLastOccupied={
                          orbitalIndex === lastOccupiedOrbitalIndex
                        }
                        key={orbital.label}
                        orbital={orbital}
                        order={orbitalIndex + 1}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {isConfigurationException(atomicNumber) ? (
          <p className="border-attention mt-3 rounded-lg border bg-yellow-50 px-3 py-2 text-sm text-yellow-900">
            {element.name}&apos;s ground-state configuration differs from the
            simple Aufbau filling-order prediction.
          </p>
        ) : null}
      </section>
      <VocabularyGuide />
    </div>
  );
}
