import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import katexify from "@/utils/katexify";

export const metadata = getLabMetadata(
  "mathematics",
  "hmmt-2002-calculus-problem-10"
);

export default function HmmtCalculusPage() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          Solve a scaling integral using substitution and interval additivity.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section
          id="problem"
          title="Problem"
          contentClassName="max-w-3xl space-y-5"
        >
          <p className="text-muted">
            Harvard–MIT Mathematics Tournament · March 17, 2002 · Individual
            Subject Test: Calculus · Problem 10. Transcribed from the supplied
            problem image.
          </p>
          <p>A continuous real function {katexify("f", false)} satisfies</p>
          <div className="overflow-x-auto">
            {katexify(
              String.raw`f(2x)=3f(x)\qquad\text{for all }x\in\mathbb{R}.`,
              true
            )}
          </div>
          <p>If {katexify(String.raw`\int_0^1 f(x)\,dx=1`, false)}, find</p>
          <div className="overflow-x-auto">
            {katexify(String.raw`\int_1^2 f(x)\,dx.`, true)}
          </div>
        </Section>

        <Section
          id="solution"
          title="Worked solution"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            We do not need an explicit formula for the function. Its scaling
            identity lets us compare integrals over two intervals directly.
          </p>
          <ol className="list-decimal space-y-8 pl-6">
            <li className="space-y-4">
              <p>
                Integrate over the larger interval and substitute{" "}
                {katexify("x=2u", false)}. Then{" "}
                {katexify(String.raw`dx=2\,du`, false)}, and the bounds become{" "}
                {katexify("u=0", false)} and {katexify("u=1", false)}.
              </p>
              <div className="overflow-x-auto">
                {katexify(
                  String.raw`\int_0^2 f(x)\,dx=2\int_0^1 f(2u)\,du`,
                  true
                )}
              </div>
            </li>
            <li className="space-y-4">
              <p>
                Apply {katexify("f(2u)=3f(u)", false)} and use the given
                integral.
              </p>
              <div className="overflow-x-auto">
                {katexify(
                  String.raw`2\int_0^1 f(2u)\,du=6\int_0^1 f(u)\,du=6`,
                  true
                )}
              </div>
            </li>
            <li className="space-y-4">
              <p>Subtract the integral over the first interval.</p>
              <div className="overflow-x-auto">
                {katexify(
                  String.raw`\int_1^2 f(x)\,dx=\int_0^2 f(x)\,dx-\int_0^1 f(x)\,dx=6-1=\boxed{5}`,
                  true
                )}
              </div>
            </li>
          </ol>
        </Section>

        <Section
          id="key-idea"
          title="Why the factor is six"
          contentClassName="max-w-3xl space-y-5"
        >
          <p>
            Doubling the input multiplies function values by{" "}
            {katexify("3", false)}, while the substitution stretches interval
            widths by {katexify("2", false)}. The integral therefore scales by{" "}
            {katexify(String.raw`2\cdot3=6`, false)}. Using only the factor from
            the function identity would miss the change in the differential.
          </p>
          <p>
            Continuity guarantees the definite integrals exist. The solution
            uses substitution and additivity, so no assumption about a
            particular formula or the sign of the function is needed.
          </p>
          <p>
            Explore signed area and accumulation in the{" "}
            <InternalLink href="/labs/mathematics/integrals" variant="inline">
              Integrals lab
            </InternalLink>
            .
          </p>
        </Section>
      </div>
    </>
  );
}
