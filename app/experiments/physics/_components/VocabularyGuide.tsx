import type { ReactNode } from "react";

import Section from "@/components/Section";
import Table from "@/components/Table";
import katexify from "@/utils/katexify";

interface VocabularyItem {
  readonly example: ReactNode;
  readonly meaning: ReactNode;
  readonly symbol: ReactNode;
  readonly term: string;
}

const VOCABULARY: readonly VocabularyItem[] = [
  {
    example: <>Oxygen: {katexify("Z = 8", false)}</>,
    meaning:
      "The number of protons in the nucleus. For a neutral atom, it also equals the number of electrons.",
    symbol: katexify("Z", false),
    term: "Atomic number",
  },
  {
    example: <>{katexify("n = 1", false)} is the K shell</>,
    meaning: "The electron shell or main energy level, numbered from 1 to 7.",
    symbol: katexify("n", false),
    term: "Principal (shell) quantum number",
  },
  {
    example: katexify(
      String.raw`\mathrm{s}:\ell=0,\quad\mathrm{p}:\ell=1,\quad\mathrm{d}:\ell=2,\quad\mathrm{f}:\ell=3`,
      false
    ),
    meaning: "The subshell and general orbital shape within a shell.",
    symbol: katexify(String.raw`\ell`, false),
    term: "Azimuthal (subshell) quantum number",
  },
  {
    example: (
      <>
        For {katexify("p", false)}: {katexify("-1, 0, +1", false)}
      </>
    ),
    meaning: (
      <>
        The orbital angular-momentum component along a chosen axis. Real orbital
        shapes can combine different {katexify("m_l", false)} states.
      </>
    ),
    symbol: katexify("m_l", false),
    term: "Magnetic quantum number",
  },
  {
    example: katexify(String.raw`+\frac{1}{2}\text{ or }-\frac{1}{2}`, false),
    meaning: "The electron's spin component along a chosen axis.",
    symbol: katexify("m_s", false),
    term: "Spin-projection quantum number",
  },
  {
    example: katexify(
      String.raw`\mathrm{K}\,(n=1),\;\mathrm{L}\,(n=2),\;\ldots,\;\mathrm{Q}\,(n=7)`,
      false
    ),
    meaning: "Letter names for the seven electron shells.",
    symbol: "K–Q",
    term: "Shell names",
  },
  {
    example: "Maximum: 2, 6, 10, and 14 electrons",
    meaning:
      "The four subshell types, each containing a different number of orbitals.",
    symbol: katexify("s, p, d, f", false),
    term: "Subshells",
  },
  {
    example: "One box in the Aufbau diagram",
    meaning:
      "A region that can hold at most two electrons with opposite spins.",
    symbol: katexify(String.raw`\square`, false),
    term: "Orbital",
  },
  {
    example: (
      <>{katexify(String.raw`\uparrow\downarrow`, false)} is a paired orbital</>
    ),
    meaning: "Electrons and their spin directions inside an orbital.",
    symbol: katexify(String.raw`\uparrow\;/\;\downarrow`, false),
    term: "Electron arrows",
  },
  {
    example: (
      <>
        {katexify("2p^4", false)} = four electrons in the{" "}
        {katexify("2p", false)} subshell
      </>
    ),
    meaning:
      "A compact description of how an atom's electrons occupy its subshells.",
    symbol: katexify("2p^4", false),
    term: "Electron configuration",
  },
  {
    example: katexify(String.raw`1s\to 2s\to 2p\to 3s`, false),
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

export function VocabularyGuide() {
  return (
    <section aria-labelledby="vocabulary-title">
      <Section id="vocabulary-title" name="Vocabulary" />
      <Table className="min-w-3xl">
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
            <tr className="divide-border divide-x align-top" key={item.term}>
              <th
                className="px-3 py-2 text-left font-medium whitespace-nowrap"
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
      </Table>
    </section>
  );
}
