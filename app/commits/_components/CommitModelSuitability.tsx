import CommitTable, {
  ModelSuitabilityLegend,
} from "@/app/commits/_components/CommitTable";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import type { ChangelogCommit } from "@/utils/changelog";

export default function CommitModelSuitability({
  commits,
  suitability,
}: {
  commits: readonly ChangelogCommit[];
  suitability: {
    date: string;
    basedOn: string;
    conclusion: string;
    models: Record<string, { model: string; effort: string }>;
  };
}) {
  return (
    <Section
      id="model-suitability"
      title="Model Suitability"
      description={`Estimates based on ${suitability.basedOn} for ${suitability.date}.`}
    >
      <CommitTable
        commits={commits}
        models={suitability.models}
        caption={`Model suitability for ${suitability.date}, newest first`}
      />
      <div className="max-w-3xl space-y-5">
        <ModelSuitabilityLegend />
        <p>{suitability.conclusion}</p>
        <p className="text-muted">
          These are editorial recommendations for the reviewed changes, rather
          than recorded model usage or benchmark results. Validate the choice on
          representative tasks using the official{" "}
          <ExternalLink
            href="https://developers.openai.com/api/docs/guides/model-selection"
            name="model selection guidance"
            size="inherit"
          />
          .
        </p>
      </div>
    </Section>
  );
}
