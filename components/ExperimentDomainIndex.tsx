import { ClockIcon } from "@heroicons/react/24/outline";

import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import InternalLink from "@/components/InternalLink";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import type { ExperimentEntry } from "@/data/ExperimentsData";
import { getLatestExperimentUpdate } from "@/data/ExperimentsData";
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
    <div className="mx-auto mt-10 min-h-screen w-full sm:px-0">
      <div className="mb-10 space-y-3">
        <div className="flex items-center">
          <ExperimentDomainIcon size={36} src={domain.logoSrc} />
        </div>
        <PageTitle spacing="none">{domain.title}</PageTitle>
        <p className="text-foreground/90 text-lg">{domain.description}</p>
        <div className="text-foreground/70 text-lg">
          {experiments.length} experiments
        </div>
      </div>
      {domain.groups !== undefined && domain.groups.length > 0 ? (
        <div
          className={
            domain.slug === "mathematics"
              ? "grid grid-cols-1 items-start gap-x-10 gap-y-20 lg:grid-cols-2"
              : "space-y-20"
          }
        >
          {domain.groups.map((group) => {
            const entries = experiments.filter(
              (entry) => entry.group === group.id
            );
            return entries.length > 0 ? (
              <Section
                className="min-w-0"
                key={group.id}
                id={group.id}
                title={group.title}
              >
                <ExperimentList
                  domainSlug={domain.slug}
                  experiments={entries}
                />
              </Section>
            ) : null;
          })}
          {experiments.some(
            (entry) =>
              !(domain.groups ?? []).some((group) => group.id === entry.group)
          ) ? (
            <ExperimentList
              domainSlug={domain.slug}
              experiments={experiments.filter(
                (entry) =>
                  !(domain.groups ?? []).some(
                    (group) => group.id === entry.group
                  )
              )}
            />
          ) : null}
        </div>
      ) : (
        <ExperimentList domainSlug={domain.slug} experiments={experiments} />
      )}
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
  const showUpdate = domainSlug !== "physics" && domainSlug !== "mathematics";

  return (
    <ol className="space-y-3">
      {experiments.map((experiment) => {
        const updatedAt = showUpdate
          ? getLatestExperimentUpdate(experiment)
          : null;

        return (
          <li
            className="flex items-center justify-between gap-3"
            key={experiment.slug}
          >
            <span className="min-w-0 truncate" title={experiment.title}>
              <InternalLink
                href={`/experiments/${domainSlug}/${experiment.slug}`}
              >
                {experiment.title}
              </InternalLink>
            </span>
            {updatedAt === null ? null : (
              <span className="text-muted inline-flex shrink-0 items-center gap-1 text-sm font-normal whitespace-nowrap">
                <ClockIcon aria-hidden="true" className="size-4" />
                <span className="sr-only">Last update:</span>
                <time dateTime={updatedAt}>
                  <span aria-hidden="true">
                    {`'${updatedAt.slice(2).replaceAll("-", "/")}`}
                  </span>
                  <span className="sr-only">{updatedAt}</span>
                </time>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
