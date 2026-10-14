import Accordion, { AccordionItem } from "@/components/Accordion";
import BackButton from "@/components/BackButton";
import CommitHourlyChart from "@/components/CommitHourlyChart";
import CommitTable, {
  ModelSuitabilityLegend,
  SuitabilityLabel,
} from "@/components/CommitTable";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import history from "@/data/changelog.json";
import modelSuitability from "@/data/model-suitability-2026-10-11.json";
import { modelSuitabilityRoute } from "@/data/routes";
import { commitDay, countCommitTypes } from "@/utils/changelog";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: modelSuitabilityRoute.title,
  description: modelSuitabilityRoute.description,
  path: modelSuitabilityRoute.route,
});

const assessedCommits = history.commits.filter(
  (commit) => commitDay(commit.date) === modelSuitability.date
);
const commitTypeCounts = countCommitTypes(assessedCommits);

export default function ModelSuitabilityPage() {
  const estimatedCostUsd = assessedCommits.length * 0.04;
  const estimatedCostIdr = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(estimatedCostUsd * 17_884);
  return (
    <>
      <PageHeader
        navigation={<BackButton href="/commits" name="Commits" />}
        path={modelSuitabilityRoute.route}
      >
        <PageTitle>{modelSuitabilityRoute.title}</PageTitle>
        <PageDescription>
          Model and reasoning effort estimates for {modelSuitability.date}.
        </PageDescription>
      </PageHeader>
      <Section
        title="Model Suitability"
        description={`This analysis use ${modelSuitability.basedOn} for ${modelSuitability.date}`}
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
        <div className="columns-1 gap-5 space-y-5 sm:columns-2 sm:space-y-0">
          <div className="break-inside-avoid">
            <ModelSuitabilityLegend />
          </div>
          <div className="break-inside-avoid">
            <Table>
              <caption className="sr-only">
                Commit types for {modelSuitability.date}
              </caption>
              <thead>
                <tr className="divide-border bg-foreground/5 divide-x">
                  <th className="px-3 py-2 text-left font-medium" scope="col">
                    Commit type
                  </th>
                  <th className="px-3 py-2 text-right font-medium" scope="col">
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
        <p className="text-muted leading-7">
          Use <SuitabilityLabel type="model" value="6 Sol" /> with{" "}
          <SuitabilityLabel type="effort" value="Medium" /> for everyday tasks,
          or <SuitabilityLabel type="model" value="6.1 Sol" /> with{" "}
          <SuitabilityLabel type="effort" value="High" /> for all tasks.
          Estimated total for {assessedCommits.length} tasks: USD{" "}
          {estimatedCostUsd.toFixed(2)} (IDR {estimatedCostIdr}), assuming
          10,000 uncached input and 2,000 output tokens (including reasoning)
          per task at{" "}
          <ExternalLink
            href="https://developers.openai.com/api/docs/models/gpt-6.1-sol"
            name="standard API rates"
            size="inherit"
          />
          , using{" "}
          <ExternalLink
            href="https://www.bi.go.id/en/statistik/informasi-kurs/jisdor/default.aspx"
            name="IDR 17,884/USD (2026-10-09)"
            size="inherit"
          />
          .
        </p>
      </Section>
    </>
  );
}
