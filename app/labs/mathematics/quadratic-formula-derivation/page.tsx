import "katex/dist/katex.min.css";
import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import katexify from "@/utils/katexify";

import QuadraticProperties from "./QuadraticProperties";

export const metadata = getLabMetadata(
  "mathematics",
  "quadratic-formula-derivation"
);

const diagramEquations = [
  String.raw`ax^2+bx+c=0,\quad a\ne0`,
  String.raw`4a^2x^2+4abx+4ac=0`,
  String.raw`4a^2x^2+4abx=-4ac`,
  String.raw`4a^2x^2+4abx+b^2=b^2-4ac`,
  String.raw`(2ax+b)^2=b^2-4ac`,
  String.raw`2ax+b=\pm\sqrt{b^2-4ac}`,
  String.raw`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`,
];

const mathLabels = Object.fromEntries(
  diagramEquations.map((equation) => [equation, katexify(equation, true)])
);

const definition = `flowchart TD
  A["$$${diagramEquations[0]}$$"] -->|Multiply by four times the leading coefficient| B["$$${diagramEquations[1]}$$"]
  B -->|Move the constant term| C["$$${diagramEquations[2]}$$"]
  C -->|Complete the square| D["$$${diagramEquations[3]}$$"]
  D -->|Factor| E["$$${diagramEquations[4]}$$"]
  E -->|Take both square roots| F["$$${diagramEquations[5]}$$"]
  F -->|Isolate the unknown| G["$$${diagramEquations[6]}$$"]`;

const steps = [
  {
    title: "Start with the general equation",
    equation: String.raw`ax^2+bx+c=0,\qquad a\ne0`,
    explanation:
      "The leading coefficient must be nonzero. Otherwise, the equation is not quadratic.",
  },
  {
    title: "Multiply both sides",
    equation: String.raw`4a^2x^2+4abx+4ac=0`,
    explanation:
      "Multiplying by four times the leading coefficient prepares the first two terms for a perfect square.",
  },
  {
    title: "Move the constant term",
    equation: String.raw`4a^2x^2+4abx=-4ac`,
    explanation: "Subtract the constant term from both sides.",
  },
  {
    title: "Complete the square",
    equation: String.raw`4a^2x^2+4abx+b^2=b^2-4ac`,
    explanation:
      "Add the square of the linear coefficient to both sides. The left side now has the three terms of a perfect square.",
  },
  {
    title: "Recognize the perfect square",
    equation: String.raw`(2ax+b)^2=b^2-4ac`,
    explanation:
      "Expanding the square recovers the previous line. This is the key transformation: the unknown now appears inside a single squared expression.",
  },
  {
    title: "Take both roots and isolate the unknown",
    equation: String.raw`2ax+b=\pm\sqrt{b^2-4ac}\qquad\Longrightarrow\qquad x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`,
    explanation:
      "Include both signs, subtract the linear coefficient, and divide by twice the leading coefficient. This gives every root, including a repeated root when the square root is zero.",
  },
];

export default function QuadraticFormulaDerivationPage() {
  return (
    <div className="pb-24">
      <LabPageHeader>
        <PageDescription>
          Derive the quadratic formula by completing the square, following each
          transformation in a Pele flowchart.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section
          title="Follow the derivation"
          description="Follow the arrows, then match each stage to the equations below. Zoom or expand the diagram to inspect it."
        >
          <FlowDiagram
            definition={definition}
            mathLabels={mathLabels}
            title="Quadratic formula derivation"
          />
        </Section>

        <Section title="Why each step works" contentClassName="max-w-3xl">
          <ol className="list-outside list-decimal space-y-8 pl-6">
            {steps.map((step) => (
              <li className="space-y-3 pl-1" key={step.title}>
                <p className="font-medium">{step.title}</p>
                <div className="border-border overflow-x-auto rounded-xl border px-5 py-4">
                  {katexify(step.equation, true)}
                </div>
                <p className="text-muted">{step.explanation}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          title="What the discriminant tells us"
          contentClassName="max-w-3xl space-y-5"
        >
          <p className="text-muted">
            For real coefficients, the expression under the square root is the
            discriminant, {katexify(String.raw`\Delta=b^2-4ac`, false)}. Its
            sign determines the kind of roots.
          </p>
          <ul className="text-muted list-outside list-disc space-y-3 pl-5">
            <li>
              {katexify(String.raw`\Delta>0`, false)}: two distinct real roots,
              because the positive and negative square roots give different
              answers.
            </li>
            <li>
              {katexify(String.raw`\Delta=0`, false)}: one repeated real root,{" "}
              {katexify(String.raw`x=-\frac{b}{2a}`, false)}.
            </li>
            <li>
              {katexify(String.raw`\Delta<0`, false)}: no real roots; over the
              complex numbers, the roots form a conjugate pair.
            </li>
          </ul>
        </Section>

        <QuadraticProperties />

        <Section title="Try an example" contentClassName="max-w-3xl space-y-5">
          <p className="text-muted">
            For {katexify(String.raw`x^2-5x+6=0`, false)}, substitute{" "}
            {katexify(String.raw`a=1,\ b=-5,\ c=6`, false)} into the formula.
          </p>
          <div className="border-border overflow-x-auto rounded-xl border px-5 py-4">
            {katexify(
              String.raw`x=\frac{5\pm\sqrt{25-24}}{2}=\frac{5\pm1}{2}\quad\Longrightarrow\quad x=2\ \text{or}\ x=3`,
              true
            )}
          </div>
          <p className="text-muted">
            Check by factoring: {katexify(String.raw`(x-2)(x-3)=0`, false)}{" "}
            gives the same roots.
          </p>
        </Section>
      </div>
    </div>
  );
}
