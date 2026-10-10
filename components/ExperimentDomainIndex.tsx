import { ClockIcon } from "@heroicons/react/24/outline";

import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import InternalLink from "@/components/InternalLink";
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
      <ol className="space-y-4">
        {experiments.map((experiment) => {
          const updatedAt = getLatestExperimentUpdate(experiment);

          return (
            <li
              className="flex items-center justify-between gap-3"
              key={experiment.slug}
            >
              <span className="min-w-0 truncate" title={experiment.title}>
                <InternalLink
                  href={`/experiments/${domain.slug}/${experiment.slug}`}
                >
                  {experiment.title}
                </InternalLink>
              </span>
              <span className="text-muted inline-flex shrink-0 items-center gap-1 text-sm whitespace-nowrap tabular-nums">
                <ClockIcon aria-hidden="true" className="size-4 sm:hidden" />
                <span className="sr-only sm:not-sr-only">Latest update:</span>
                <time dateTime={updatedAt}>{updatedAt}</time>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
