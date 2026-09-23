"use client";

import katexify from "@/utils/katexify";

import { getLastElectronQuantumNumbers } from "../electron-configuration/_data";

const SUBSHELLS = ["s", "p", "d", "f"] as const;

interface VocabularyItem {
  readonly example: string;
  readonly meaning: string;
  readonly symbol: string;
  readonly term: string;
}

const VOCABULARY: readonly VocabularyItem[] = [
  {
    example: "Oxygen: Z = 8",
    meaning:
      "The number of protons in the nucleus. For a neutral atom, it also equals the number of electrons.",
    symbol: "Z",
    term: "Atomic number",
  },
  {
    example: "n = 1 is the K shell",
    meaning: "The electron shell or main energy level, numbered from 1 to 7.",
    symbol: "n",
    term: "Principal (shell) quantum number",
  },
  {
    example: "s = 0, p = 1, d = 2, f = 3",
    meaning: "The subshell and general orbital shape within a shell.",
    symbol: "ℓ",
    term: "Azimuthal (subshell) quantum number",
  },
  {
    example: "For p: −1, 0, +1",
    meaning: "The specific orbital orientation inside a subshell.",
    symbol: "m",
    term: "Magnetic quantum number",
  },
  {
    example: "+½ or −½",
    meaning: "The spin direction of an electron.",
    symbol: "s",
    term: "Spin quantum number",
  },
  {
    example: "K (n = 1), L (n = 2), …, Q (n = 7)",
    meaning: "Letter names for the seven electron shells.",
    symbol: "K–Q",
    term: "Shell names",
  },
  {
    example: "Maximum: 2, 6, 10, and 14 electrons",
    meaning:
      "The four subshell types, each containing a different number of orbitals.",
    symbol: "s, p, d, f",
    term: "Subshells",
  },
  {
    example: "One box in the Aufbau diagram",
    meaning:
      "A region that can hold at most two electrons with opposite spins.",
    symbol: "□",
    term: "Orbital",
  },
  {
    example: "↑↓ is a paired orbital",
    meaning: "Electrons and their spin directions inside an orbital.",
    symbol: "↑ / ↓",
    term: "Electron arrows",
  },
  {
    example: "2p⁴ = four electrons in the 2p subshell",
    meaning:
      "A compact description of how an atom's electrons occupy its subshells.",
    symbol: "2p⁴",
    term: "Electron configuration",
  },
  {
    example: "1s → 2s → 2p → 3s",
    meaning:
      "The principle that lower-energy orbitals fill before higher-energy orbitals.",
    symbol: "Aufbau",
    term: "Filling principle",
  },
  {
    example: "8 protons and 8 electrons",
    meaning:
      "An atom whose proton and electron counts are equal, giving no net charge.",
    symbol: "Neutral",
    term: "Neutral atom",
  },
  {
    example: "The configuration shown by this page",
    meaning: "The lowest-energy electron arrangement of an atom.",
    symbol: "Ground state",
    term: "Ground-state configuration",
  },
];

function formatQuantumNumberTuple(
  principalNumber: number,
  azimuthalNumber: number,
  magneticNumber: number,
  spin: "+1/2" | "-1/2"
): string {
  const formattedMagneticNumber =
    magneticNumber > 0 ? `+${magneticNumber}` : String(magneticNumber);
  const formattedSpin = spin === "+1/2" ? "+\\frac{1}{2}" : "-\\frac{1}{2}";

  return `(${principalNumber}, ${azimuthalNumber}, ${formattedMagneticNumber}, ${formattedSpin})`;
}

function getQuantumNumberState(atomicNumber: number) {
  const quantumNumbers = getLastElectronQuantumNumbers(atomicNumber);

  return {
    ...quantumNumbers,
    subshell: SUBSHELLS[quantumNumbers.azimuthalNumber] ?? SUBSHELLS[0],
  };
}

export function QuantumNumbersSummary({
  atomicNumber,
}: {
  atomicNumber: number;
}) {
  const { azimuthalNumber, magneticNumber, principalNumber, spin, subshell } =
    getQuantumNumberState(atomicNumber);

  return (
    <section aria-labelledby="quantum-number-title">
      <h3
        className="text-foreground/70 text-xs font-medium"
        id="quantum-number-title"
      >
        Quantum numbers for the last electron
      </h3>
      <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <span className="text-foreground/70 block text-xs">
            Selected state
          </span>
          <span className="mt-1 block font-mono text-2xl font-semibold">
            {principalNumber}
            {subshell}
            <sup>{spin === "+1/2" ? "↑" : "↓"}</sup>
          </span>
        </div>
        <div>
          <span className="text-foreground/70 block text-xs">(n, ℓ, m, s)</span>
          <span className="mt-1 block text-lg">
            {katexify(
              formatQuantumNumberTuple(
                principalNumber,
                azimuthalNumber,
                magneticNumber,
                spin
              ),
              false
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

export function VocabularyGuide() {
  return (
    <section aria-labelledby="vocabulary-title">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
        <h2
          className="text-foreground text-xl font-semibold"
          id="vocabulary-title"
        >
          Vocabulary
        </h2>
        <p className="text-foreground/70 text-sm">Symbols used on this page</p>
      </div>

      <div className="border-border w-full overflow-hidden rounded-md border">
        <div className="scrollbar-subtle w-full overflow-x-auto">
          <table className="divide-border text-foreground w-full min-w-3xl border-collapse divide-y text-sm">
            <caption className="sr-only">
              Electron configuration and quantum-number vocabulary
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Symbol
                </th>
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Term
                </th>
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Meaning
                </th>
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {VOCABULARY.map((item) => (
                <tr
                  className="divide-border divide-x align-top"
                  key={item.symbol}
                >
                  <th
                    className="px-3 py-2 text-left font-mono font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {item.symbol}
                  </th>
                  <td className="px-3 py-2 font-medium">{item.term}</td>
                  <td className="px-3 py-2">{item.meaning}</td>
                  <td className="px-3 py-2">{item.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
