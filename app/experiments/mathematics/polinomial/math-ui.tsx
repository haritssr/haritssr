import { Fragment, memo } from "react";

import katexify from "@/utils/katexify";

import type { ExplanationStep, Question } from "./questions";

function RenderFormula({
  tex,
  display = false,
}: {
  tex: string;
  display?: boolean;
}) {
  return katexify(tex, display);
}

export const Formula = memo(RenderFormula);

export function MathText({ text }: { text: string }) {
  return text
    .split(/(?<polynomial>\b[PQ]\b(?:\(-?\d+\))?)/)
    .map((part, index) => (
      <Fragment key={`${part}-${index}`}>
        {/^[PQ](?:\(-?\d+\))?$/.test(part) ? <Formula tex={part} /> : part}
      </Fragment>
    ));
}

export function Equation({ tex }: { tex: string }) {
  return (
    <div className="overflow-x-auto py-2">
      <Formula tex={tex} display />
    </div>
  );
}

export function Step({ step }: { step: ExplanationStep }) {
  return (
    <div className="min-w-0 space-y-2">
      <p className="text-muted text-sm leading-6">
        <MathText text={step.text} />
      </p>
      {step.tex === undefined ? null : <Equation tex={step.tex} />}
    </div>
  );
}

export function CoefficientComparison({ question }: { question: Question }) {
  if (question.kind !== "equality") {
    return null;
  }
  return (
    <div className="border-border overflow-x-auto rounded-xl border">
      <table className="w-full text-center text-sm">
        <caption className="text-muted px-4 py-3 text-left">
          Bandingkan koefisien pada pangkat yang sama.
        </caption>
        <thead className="bg-interface-hover">
          <tr>
            <th className="px-4 py-3" scope="col">
              Suku
            </th>
            <th className="px-4 py-3" scope="col">
              <Formula tex="P(x)" />
            </th>
            <th className="px-4 py-3" scope="col">
              <Formula tex="Q(x)" />
            </th>
          </tr>
        </thead>
        <tbody>
          {question.comparison.map(([power, left, right]) => (
            <tr className="border-border border-t" key={power}>
              <th className="px-4 py-3 font-normal" scope="row">
                <Formula tex={power} />
              </th>
              <td className="px-4 py-3">
                <Formula tex={left} />
              </td>
              <td className="px-4 py-3">
                <Formula tex={right} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SyntheticDivision({ question }: { question: Question }) {
  if (question.kind !== "division") {
    return null;
  }
  const { coefficients, products, result, root } = question.synthetic;
  return (
    <div className="border-border overflow-x-auto rounded-xl border">
      <table className="w-full text-center text-sm">
        <caption className="text-muted px-4 py-3 text-left">
          Skema Horner: turunkan, kalikan, lalu jumlahkan.
        </caption>
        <thead>
          <tr className="bg-interface-hover">
            <th className="px-4 py-3 text-left" scope="col">
              <Formula tex={`r=${root}`} />
            </th>
            {coefficients.map((_, index) => (
              <th
                className="px-4 py-3 font-normal"
                key={`power-${4 - index}`}
                scope="col"
              >
                <Formula
                  tex={
                    index === 4
                      ? String.raw`\text{Konstanta}`
                      : `x^{${4 - index}}`
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-border border-t">
            <th className="px-4 py-3 text-left font-medium" scope="row">
              Koefisien
            </th>
            {coefficients.map((value, index) => (
              <td className="px-4 py-3" key={`coefficient-${4 - index}`}>
                <Formula tex={String(value)} />
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-4 py-3 text-left font-medium" scope="row">
              Hasil kali
            </th>
            <td className="px-4 py-3">
              <Formula tex={String.raw`\text{—}`} />
            </td>
            {products.map((value, index) => (
              <td className="px-4 py-3" key={`product-${3 - index}`}>
                <Formula tex={String(value)} />
              </td>
            ))}
          </tr>
          <tr className="border-action bg-action/5 border-t-2">
            <th className="px-4 py-3 text-left font-medium" scope="row">
              Hasil
            </th>
            {result.map((value, index) => (
              <td
                className={`px-4 py-3 ${index === 4 ? "bg-action/10 font-semibold" : ""}`}
                key={`result-${4 - index}`}
              >
                <Formula tex={String(value)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="text-muted px-4 pb-3 text-xs">
        Kolom terakhir adalah sisa. Kolom sebelumnya adalah koefisien hasil
        bagi.
      </p>
    </div>
  );
}
