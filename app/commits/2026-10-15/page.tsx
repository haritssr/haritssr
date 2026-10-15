import Accordion, { AccordionItem } from "@/components/Accordion";
import CommitHourlyChart from "@/components/CommitHourlyChart";
import CommitTable, { ModelSuitabilityLegend } from "@/components/CommitTable";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import history from "@/data/changelog.json";
import modelSuitability from "@/data/model-suitability-2026-10-15.json";
import { todayModelSuitabilityRoute } from "@/data/routes";
import { commitDay, countCommitTypes } from "@/utils/changelog";
import { createPageMetadata } from "@/utils/pageMetadata";
import { SOURCE_CODE_URL } from "@/utils/site";

export const metadata = createPageMetadata({
  title: todayModelSuitabilityRoute.title,
  description: todayModelSuitabilityRoute.description,
  path: todayModelSuitabilityRoute.route,
});

const assessedCommits = history.commits.filter(
  (commit) =>
    commitDay(commit.date) === modelSuitability.date &&
    Object.hasOwn(modelSuitability.models, commit.hash)
);
const commitTypeCounts = countCommitTypes(assessedCommits);

export default function ModelSuitabilityPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/commits", name: "Commits" }}
        path={todayModelSuitabilityRoute.route}
      >
        <PageTitle>{todayModelSuitabilityRoute.title}</PageTitle>
        <PageDescription>
          {assessedCommits.length} commits assessed for {modelSuitability.date}{" "}
          · Jakarta time (WIB)
        </PageDescription>
      </PageHeader>
      <Section
        title="Model Suitability"
        description={`Estimates based on ${modelSuitability.basedOn} for ${modelSuitability.date}.`}
      >
        <Accordion>
          <AccordionItem
            excludeFromContents
            title="Commits"
            value="model-suitability-commits"
          >
            <CommitTable
              commits={assessedCommits}
              caption={`Model suitability for ${modelSuitability.date}, newest first`}
              models={modelSuitability.models}
            />
          </AccordionItem>
        </Accordion>
        <CommitHourlyChart
          commits={assessedCommits}
          day={modelSuitability.date}
        />
        <div className="grid items-start gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <ModelSuitabilityLegend />
          </div>
          <div className="min-w-0">
            <Table>
              <caption className="sr-only">
                Commit types for {modelSuitability.date}
              </caption>
              <thead>
                <tr className="divide-border bg-foreground/5 divide-x">
                  <th className="px-3 text-left font-medium" scope="col">
                    Commit type
                  </th>
                  <th className="px-3 text-right font-medium" scope="col">
                    Number
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {commitTypeCounts.map(({ value, count }) => (
                  <tr className="divide-border divide-x" key={value}>
                    <th className="px-3 py-2 text-left font-normal" scope="row">
                      {value}
                    </th>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <Section title="Conclusion" headingAs="h3" contentClassName="max-w-3xl">
          <p className="leading-7">
            For this day’s mix of tasks, my preferred overall choice is GPT-6.1
            Sol at High effort, especially for shared UI and navigation changes.
            For smaller, isolated edits, GPT-6 Luna at Low effort is the budget
            choice; use Medium effort when the change includes component logic.
            These are editorial recommendations based on the reviewed commits.
          </p>
          <p className="mt-5 leading-7">
            Estimated total for all {assessedCommits.length} tasks using GPT-6.1
            Sol: USD {(assessedCommits.length * 0.04).toFixed(2)}. This assumes
            one task per commit, with 10,000 uncached input tokens and 2,000
            output tokens, including reasoning, per task, at{" "}
            <ExternalLink
              href="https://developers.openai.com/api/docs/models/gpt-6.1-sol"
              name="standard API rates"
              size="inherit"
            />{" "}
            of USD 2 per million input tokens and USD 10 per million output
            tokens. Following the table’s model mix instead would cost about USD
            0.34, using the same token assumptions and{" "}
            <ExternalLink
              href="https://developers.openai.com/api/docs/models/gpt-6-luna"
              name="Luna rates"
              size="inherit"
            />{" "}
            for its 12 tasks and{" "}
            <ExternalLink
              href="https://developers.openai.com/api/docs/models/gpt-6-sol"
              name="Sol rates"
              size="inherit"
            />{" "}
            for the remaining eight. These are hypothetical token costs; actual
            usage, retries, tool fees, and processing tiers can change the
            total.
          </p>
          <p className="text-muted mt-5 leading-7">
            Covers the assessed commits through{" "}
            <ExternalLink
              href={`${SOURCE_CODE_URL}/commit/${modelSuitability.reviewedThrough}`}
              name={modelSuitability.reviewedThrough.slice(0, 9)}
              size="inherit"
            />
            . Model labels and costs are estimates, not usage or billing
            records.
          </p>
        </Section>
      </Section>
    </>
  );
}
