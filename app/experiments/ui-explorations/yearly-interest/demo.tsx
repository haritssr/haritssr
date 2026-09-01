"use client";

import { useState } from "react";

import PageDescription from "@/components/PageDescription";
import SourceCodeLink from "@/components/SourceCodeLink";

// Matches every non-digit character.
// Example: "Rp 12,000" becomes "12000" after replacement.
const nonDigitCharacterPattern = /\D/g;

function Section({ name }: { name: string }) {
  return (
    <h2 className="mt-10 mb-4 text-xl font-semibold text-zinc-800">{name}</h2>
  );
}

export default function YearlyInterest() {
  const [initial, setInitial] = useState<number>(0);
  const [initialInput, setInitialInput] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  // Converts a formatted input string into a number by stripping non-digits.
  function parseNumericInput(value: string): number {
    // Strip all non-digit characters.
    const digitsOnly = value.replace(nonDigitCharacterPattern, "");
    // Empty input after stripping becomes zero.
    if (!digitsOnly) {
      return 0;
    }
    // Convert the digits-only string into a number.
    return Number(digitsOnly);
  }

  function formatNumber(value: number): string {
    //fallback to empty string if the number is NaN, Infinity, -Infinity, etc
    if (!Number.isFinite(value)) {
      return "";
    }

    return new Intl.NumberFormat("id-ID").format(value);
  }

  return (
    <div>
      <PageDescription description="Calculation of yearly save interest" />
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <form>
        <label className="block w-fit text-zinc-500" htmlFor="Initial">
          Initial (Rp)
        </label>
        <input
          className="mb-4 rounded-md border px-1.5 py-0.5"
          id="Initial"
          inputMode="numeric"
          onChange={(e) => {
            const nextValue: string = e.target.value;
            if (!nextValue) {
              setInitial(0);
              setInitialInput("");
              return;
            }

            const numericValue: number = parseNumericInput(nextValue);
            setInitial(numericValue);
            setInitialInput(formatNumber(numericValue));
          }}
          required={true}
          type="text"
          value={initialInput}
        />
        <label className="block w-fit text-zinc-500" htmlFor="Percent">
          Percent (%)
        </label>
        <input
          className="mb-4 rounded-md border px-1.5 py-0.5"
          id="Percent"
          onChange={(e) => {
            setPercent(Number(e.target.value));
          }}
          required={true}
          type="number"
        />
        <label className="block w-fit text-zinc-500" htmlFor="Year">
          Year
        </label>
        <input
          className="mb-4 rounded-md border px-1.5 py-0.5"
          id="Year"
          onChange={(e) => {
            setYear(Number(e.target.value));
          }}
          required={true}
          type="number"
        />
      </form>
      <Section name="Yearly Simple Interest" />
      <div className="text-green-700">
        Result:{" "}
        {Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(Math.floor(initial * (1 + (percent / 100) * year)))}
      </div>
      <Section name="Yearly Compound Interest" />
      <div className="text-green-700">
        Result:{" "}
        {Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(Math.floor(initial * (1 + percent / 100) ** year))}
      </div>
    </div>
  );
}
