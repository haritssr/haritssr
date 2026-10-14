import BackButton from "@/components/BackButton";
import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import type { ExperimentEntry } from "@/data/ExperimentsData";
import { isDatabaseExperiment } from "@/utils/databaseExperiments";
import { getAvailableExperimentDomain } from "@/utils/experimentCatalog";

interface ExperimentDomainIndexProps {
  domainSlug: string;
}

export default function ExperimentDomainIndex({
  domainSlug,
}: ExperimentDomainIndexProps) {
  const domain = getAvailableExperimentDomain(domainSlug);
  const experiments =
    domain.slug === "physics"
      ? domain.experiments.toSorted((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        )
      : domain.experiments;

  return (
    <div className="mx-auto w-full sm:px-0">
      <PageHeader
        navigation={<BackButton href="/experiments" name="Experiments" />}
        path={`/experiments/${domain.slug}`}
      >
        <div className="flex items-start gap-3">
          <PageTitle>{domain.title}</PageTitle>
          <ExperimentDomainIcon size={36} src={domain.logoSrc} />
        </div>
        <PageDescription>{domain.description}</PageDescription>
      </PageHeader>
      <ExperimentList domainSlug={domain.slug} experiments={experiments} />
    </div>
  );
}

function ExperimentList({
  domainSlug,
  experiments,
}: {
  domainSlug: string;
  experiments: readonly ExperimentEntry[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
      {experiments.map((experiment) => (
        <li
          className="flex items-center justify-between gap-3"
          key={experiment.slug}
        >
          <span className="min-w-0 truncate" title={experiment.title}>
            <InternalLink
              href={`/experiments/${domainSlug}/${experiment.slug}`}
              variant={
                isDatabaseExperiment(domainSlug, experiment.slug)
                  ? "database"
                  : "navigation"
              }
            >
              {experiment.title}
            </InternalLink>
          </span>
        </li>
      ))}
    </ol>
  );
}
