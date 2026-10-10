import Box from "@/components/Box";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import { chapterTopics, sharedConcepts } from "./_data";

export const metadata = getExperimentMetadata("mathematics", "math-notation");

function ChapterTable() {
  return (
    <Table className="min-w-240 leading-6">
      <caption className="sr-only">
        High-school chapters, supported math notation, calculation limits, and
        additional tools
      </caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="w-64 px-3 py-3 text-left font-medium" scope="col">
            Chapter
          </th>
          <th className="px-3 py-3 text-left font-medium" scope="col">
            Display notation?
          </th>
          <th className="w-36 px-3 py-3 text-left font-medium" scope="col">
            Calculate or solve?
          </th>
          <th className="w-72 px-3 py-3 text-left font-medium" scope="col">
            What needs another tool?
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {chapterTopics.map((topic) => (
          <tr className="divide-border divide-x align-top" key={topic.chapter}>
            <th className="px-3 py-3 text-left font-medium" scope="row">
              {topic.chapter}
            </th>
            <td className="space-y-2 px-3 py-3">
              <p className="font-medium">Yes</p>
              <div className="whitespace-nowrap [&_.katex-display]:my-0">
                {katexify(topic.tex, true)}
              </div>
            </td>
            <td className="px-3 py-3">No</td>
            <td className="px-3 py-3">{topic.needs}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function SharedConceptTable() {
  return (
    <Table className="min-w-240 leading-6">
      <caption className="sr-only">
        Math capabilities shared across chapters and the tools required to
        implement them
      </caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="w-52 px-3 py-3 text-left font-medium" scope="col">
            Concept or capability
          </th>
          <th className="px-3 py-3 text-left font-medium" scope="col">
            What can be displayed?
          </th>
          <th className="px-3 py-3 text-left font-medium" scope="col">
            Can the renderer perform the task?
          </th>
          <th className="px-3 py-3 text-left font-medium" scope="col">
            Additional support
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {sharedConcepts.map((concept) => (
          <tr
            className="divide-border divide-x align-top"
            key={concept.concept}
          >
            <th className="px-3 py-3 text-left font-medium" scope="row">
              {concept.concept}
            </th>
            <td className="px-3 py-3">{concept.notation}</td>
            <td className="px-3 py-3">{concept.task}</td>
            <td className="px-3 py-3">{concept.tool}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function MathNotationPage() {
  return (
    <div className="text-foreground min-w-0 space-y-20 pb-24">
      <div className="max-w-3xl space-y-5">
        <SubTitle>
          Explore which notation from Indonesian SMA/MA and SMK mathematics can
          be displayed with KaTeX or similar renderers, and which operations
          need calculation, graphing, or geometry tools.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        className="max-w-3xl"
        title="How notation becomes a math page"
        id="typesetting-vs-calculation"
        description={
          <>
            LaTeX-style notation describes how an expression should look. KaTeX
            and MathJax typeset that expression. A React app can combine the
            renderer with calculation and visualization code to make the
            expression interactive.
          </>
        }
        contentClassName="grid gap-5 sm:grid-cols-2"
      >
        <Box title="Display an operation">
          <p className="text-muted text-sm leading-7">
            KaTeX can show {katexify("2+3", false)}. The addition sign is
            supported notation; displaying it does not evaluate the sum.
          </p>
          <div className="border-border overflow-x-auto rounded-lg border px-3 py-3 [&_.katex-display]:my-0">
            {katexify("2+3", true)}
          </div>
        </Box>
        <Box title="Perform an operation">
          <p className="text-muted text-sm leading-7">
            Calculation code finds the answer. The page then supplies the result
            to KaTeX for display. The same division of work applies to solving
            equations, differentiating, and multiplying matrices.
          </p>
          <div className="border-border overflow-x-auto rounded-lg border px-3 py-3 [&_.katex-display]:my-0">
            {katexify("2+3=5", true)}
          </div>
        </Box>
      </Section>

      <Section
        title="Chapter coverage"
        id="high-school-examples"
        description={
          <>
            These chapters include common and advanced high-school topics;
            course coverage varies by programme. Each example below uses
            notation supported by this site&apos;s KaTeX renderer. Similar
            renderers such as MathJax support these standard forms, with command
            support depending on their configuration. “Yes” means the notation
            can be displayed. Calculation and solving require additional logic
            in every row.
          </>
        }
      >
        <ChapterTable />
      </Section>

      <Section
        title="Capabilities shared across chapters"
        id="shared-math-concepts"
        description={
          <>
            Some requirements belong to many chapters. Use this table when you
            need a graph, an input field, worked steps, answer checking, or a
            complete document rather than a single formula.
          </>
        }
      >
        <SharedConceptTable />
      </Section>

      <Section
        className="max-w-3xl"
        title="When a TeX command is unsupported"
        id="unsupported-notation"
        description={
          <>
            Support is determined by the exact command, environment, and
            renderer configuration. KaTeX implements a documented set of TeX
            math commands. MathJax has its own commands and optional extensions.
            Full LaTeX document compilation uses a separate engine and its
            installed packages.
          </>
        }
      >
        <p className="text-muted">
          A formula can use familiar school mathematics and still contain a
          command unavailable in the chosen renderer. Check the command, rewrite
          it using supported notation, or use a renderer with the required
          extension.
        </p>
        <p className="text-muted">
          This site&apos;s KaTeX setup displays unsupported input with an error
          treatment. That indicates a rendering problem; successful rendering
          also does not establish that an equation or proof is mathematically
          correct. A React wrapper follows the capabilities of the renderer it
          uses.
        </p>
      </Section>

      <Section
        className="max-w-3xl"
        title="Try the notation and check support"
        id="try-the-notation"
        description={
          <>
            Experiment in the{" "}
            <InternalLink
              href="/experiments/mathematics/live-playground"
              variant="inline"
            >
              live TeX playground
            </InternalLink>
            . Check exact syntax in{" "}
            <ExternalLink
              href="https://katex.org/docs/supported"
              name="KaTeX supported functions"
              size="inherit"
            />{" "}
            and its{" "}
            <ExternalLink
              href="https://katex.org/docs/support_table"
              name="support table"
              size="inherit"
            />
            . Compare other renderer options in the{" "}
            <ExternalLink
              href="https://docs.mathjax.org/en/latest/input/tex/index.html"
              name="MathJax TeX documentation"
              size="inherit"
            />
            .
          </>
        }
      />
    </div>
  );
}
