import Accordion, { AccordionItem } from "@/components/Accordion";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import { logarithmExercises, logarithmRules } from "./_data";
import LogarithmLab from "./logarithm-lab";

export const metadata = getExperimentMetadata("mathematics", "logarithms");

function Equation({ tex }: { tex: string }) {
  return (
    <div className="text-foreground border-border overflow-x-auto rounded-xl border px-4 py-3">
      {katexify(tex, true)}
    </div>
  );
}

export default function LogarithmsPage() {
  return (
    <div className="text-foreground space-y-20 pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          Find the exponent, understand why logarithms are useful, and derive
          their rules from the laws of powers. Explore the graph and check your
          understanding with worked examples.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        className="max-w-3xl"
        title="What is a logarithm?"
        id="definition-heading"
        description={
          <>
            A logarithm answers: to what power must we raise a given base to get
            this number? Exponentiation starts with a base and an exponent;
            logarithms recover the exponent from the result.
          </>
        }
      >
        <Equation
          tex={String.raw`{}^{a}\!\log x=t\quad\Longleftrightarrow\quad a^t=x`}
        />
        <p className="text-muted">
          Here {katexify("a", false)} is the base, {katexify("x", false)} is the
          argument, and {katexify("t", false)} is the exponent. For example:
        </p>
        <Equation
          tex={String.raw`2^3=8\quad\Longleftrightarrow\quad {}^{2}\!\log 8=3`}
        />
        <p className="text-muted">
          This page uses Indonesian notation, with the base at the upper left.
          International notation writes the same base as a subscript:
        </p>
        <Equation tex={String.raw`{}^{a}\!\log x=\log_a x`} />
        <h3 className="text-lg font-semibold">
          Conditions for real logarithms
        </h3>
        <Equation tex={String.raw`a>0,\qquad a\ne1,\qquad x>0`} />
        <p className="text-muted">
          A valid positive base has positive powers, so a real logarithm cannot
          take zero or a negative number as its argument. Base one always
          produces one and cannot identify a unique exponent. Negative bases do
          not give a real exponential function for every real exponent. The
          logarithm’s output can be any real number, including zero and negative
          values.
        </p>
        <Equation
          tex={String.raw`{}^{2}\!\log 1=0,\qquad {}^{2}\!\log\frac14=-2`}
        />
      </Section>

      <Section
        className="max-w-3xl"
        title="Why do logarithms exist?"
        id="purpose-heading"
        description={
          <>
            Logarithms fill the gap when the unknown is an exponent. They also
            convert multiplication into addition and make quantities spanning
            many orders of magnitude easier to compare.
          </>
        }
        contentClassName="grid grid-cols-1 gap-4"
      >
        <article className="border-border space-y-3 rounded-xl border p-5">
          <h3 className="font-semibold">Find time in a growth model</h3>
          <p className="text-muted text-sm leading-6">
            If a population doubles each period, logarithms tell us how many
            periods it takes to reach ten times its starting size.
          </p>
          <Equation tex={String.raw`2^t=10`} />
          <Equation tex={String.raw`t={}^{2}\!\log 10\approx3.322`} />
        </article>
        <article className="border-border space-y-3 rounded-xl border p-5">
          <h3 className="font-semibold">Turn products into sums</h3>
          <p className="text-muted text-sm leading-6">
            Before electronic calculators, logarithm tables turned long
            multiplication and division into addition and subtraction. Exponent
            laws explain why this works.
          </p>
          <Equation tex={String.raw`10^2\cdot10^3=10^{2+3}`} />
        </article>
        <article className="border-border space-y-3 rounded-xl border p-5">
          <h3 className="font-semibold">Compare multiplicative changes</h3>
          <p className="text-muted text-sm leading-6">
            Equal ratios become equal differences. Sound levels use this idea:
            multiplying intensity by ten adds ten decibels, relative to a fixed
            positive reference intensity.
          </p>
          <Equation tex={String.raw`L=10\log\frac{I}{I_0}`} />
        </article>
      </Section>

      <Section
        className="max-w-3xl"
        title="Common logarithms and natural logarithms"
        id="bases-heading"
        description={
          <>
            In this lesson, a logarithm without a written base means base ten.
            The natural logarithm uses Euler’s number as its base and is written
            with its own symbol. Base two is useful for repeated doubling and
            binary information.
          </>
        }
      >
        <Equation
          tex={String.raw`\log x={}^{10}\!\log x,\qquad \ln x={}^{e}\!\log x`}
        />
        <Equation tex={String.raw`e\approx2.71828,\qquad \ln e=1`} />
        <p className="text-muted">
          Always check the base convention in the context you are reading.
          Changing the base changes the output, but every valid base follows the
          same rules.
        </p>
      </Section>

      <LogarithmLab />

      <Section
        title="Common rules"
        id="properties-heading"
        description={
          <>
            Every rule below comes from the definition and exponent laws. Unless
            stated otherwise, {katexify(String.raw`a,b>0`, false)} and{" "}
            {katexify(String.raw`a,b\ne1`, false)} whenever used as bases,
            arguments {katexify(String.raw`x,y,c>0`, false)}, and powers are
            real. Open any derivation to follow the steps.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {logarithmRules.map((rule, index) => (
            <li
              className="border-border flex min-w-0 flex-col gap-4 rounded-xl border p-5"
              key={rule.title}
            >
              <h3 className="font-semibold">
                {index + 1}. {rule.title}
              </h3>
              <Equation tex={rule.formula} />
              <p className="text-muted text-sm leading-6">{rule.explanation}</p>
              <Accordion className="mt-auto w-full">
                <AccordionItem
                  panelClassName="bg-transparent"
                  excludeFromContents
                  title="Show derivation"
                  value={`rule-${index + 1}-derivation`}
                >
                  <ol
                    className="space-y-3"
                    aria-label={`Derivation of ${rule.title}`}
                  >
                    {rule.steps.map((step) => (
                      <li key={step}>
                        <Equation tex={step} />
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 text-sm font-medium">Example</p>
                  <div className="mt-2">
                    <Equation tex={rule.example} />
                  </div>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        className="max-w-3xl"
        title="Order and logarithmic inequalities"
        id="inequalities-heading"
        description={
          <>
            For a base greater than one, exponential powers grow as the exponent
            increases. Their logarithmic inverse therefore preserves order. A
            base between zero and one gives decreasing powers, so its inverse
            reverses order. Both arguments must be positive.
          </>
        }
      >
        <Equation
          tex={String.raw`a>1:\quad x<y\ \Longleftrightarrow\ {}^{a}\!\log x<{}^{a}\!\log y`}
        />
        <Equation
          tex={String.raw`0<a<1:\quad x<y\ \Longleftrightarrow\ {}^{a}\!\log x>{}^{a}\!\log y`}
        />
        <p className="text-muted">
          For example, the decreasing base reverses the inequality below.
          Combine the resulting bound with the original domain condition.
        </p>
        <Equation
          tex={String.raw`{}^{1/2}\!\log x>2\quad\Longleftrightarrow\quad 0<x<\frac14`}
        />
      </Section>

      <Section
        className="max-w-3xl"
        title="Common mistakes"
        id="mistakes-heading"
        contentClassName="space-y-8"
      >
        <div className="min-w-0 space-y-5">
          <h3 className="text-lg font-semibold">
            A sum inside a logarithm does not split
          </h3>
          <p className="text-muted">
            The product rule follows from multiplying powers. There is no
            matching exponent law that turns a sum of arguments into a sum of
            logarithms. A counterexample is enough to show why that proposed
            rule fails.
          </p>
          <Equation
            tex={String.raw`{}^{2}\!\log(4+4)=3\ne4={}^{2}\!\log4+{}^{2}\!\log4`}
          />
        </div>
        <div className="min-w-0 space-y-5">
          <h3 className="text-lg font-semibold">
            Check the original domain before combining
          </h3>
          <p className="text-muted">
            A positive product does not guarantee that each factor is positive.
            Keep the separate domain conditions when combining logarithms. Also,
            the power rule above assumes a positive argument; for a squared
            nonzero real value the correct expansion uses absolute value.
          </p>
          <Equation
            tex={String.raw`{}^{a}\!\log(x^2)=2\,{}^{a}\!\log|x|,\qquad x\ne0`}
          />
        </div>
        <div className="min-w-0 space-y-5">
          <h3 className="text-lg font-semibold">
            A logarithm is not a factor you can cancel
          </h3>
          <p className="text-muted">
            Logarithms are functions. Use change of base for a quotient of
            logarithms; dividing their arguments gives a different expression.
          </p>
          <Equation
            tex={String.raw`\frac{\log100}{\log10}=2,\qquad \log\frac{100}{10}=1`}
          />
        </div>
      </Section>

      <Section
        title="Try it yourself"
        id="practice-heading"
        description={<>Work out each answer, then reveal the solution.</>}
      >
        <ol className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {logarithmExercises.map((exercise, index) => (
            <li
              className="border-border flex min-w-0 flex-col gap-4 rounded-xl border p-5"
              key={exercise.title}
            >
              <h3 className="font-semibold">
                {index + 1}. {exercise.title}
              </h3>
              <Equation tex={exercise.expression} />
              <Accordion className="mt-auto w-full">
                <AccordionItem
                  panelClassName="bg-transparent"
                  excludeFromContents
                  title="Show solution"
                  value={`exercise-${index + 1}-solution`}
                >
                  <ol className="space-y-3">
                    {exercise.steps.map((step) => (
                      <li key={step}>
                        <Equation tex={step} />
                      </li>
                    ))}
                  </ol>
                  <p className="text-muted mt-4 text-sm leading-6">
                    {exercise.explanation}
                  </p>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
