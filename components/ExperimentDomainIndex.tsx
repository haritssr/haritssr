import { ClockIcon } from "@heroicons/react/24/outline";

import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import InternalLink from "@/components/InternalLink";
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
  const { experiments } = domain;

  return (
    <div className="mx-auto mt-10 min-h-screen w-full sm:px-0">
      <div className="mb-10 space-y-3">
        <div className="flex items-center">
          <ExperimentDomainIcon size={36} src={domain.logoSrc} />
        </div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{domain.title}</h1>
        <p className="text-foreground/90 text-lg">{domain.description}</p>
        <div className="text-foreground/70 text-lg">
          {experiments.length} experiments
        </div>
      </div>
      {domain.groups !== undefined && domain.groups.length > 0 ? (
        <div className="space-y-20">
          {domain.groups.map((group) => {
            const entries = experiments.filter(
              (entry) => entry.group === group.id
            );
            return entries.length > 0 ? (
              <Section key={group.id} id={group.id} title={group.title}>
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
  return (
    <ol className="space-y-3.5">
      {experiments.map((experiment) => {
        const updatedAt = getLatestExperimentUpdate(experiment);

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
            <span className="text-muted inline-flex shrink-0 items-center gap-1 text-sm whitespace-nowrap tabular-nums">
              <ClockIcon aria-hidden="true" className="size-4 sm:hidden" />
              <span className="sr-only sm:not-sr-only">Last update:</span>
              <time dateTime={updatedAt}>{updatedAt}</time>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
