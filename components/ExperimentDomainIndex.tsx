import Image from "next/image";

import InternalLink from "@/components/InternalLink";
import { getExperimentDomain } from "@/data/ExperimentsData";
import { isExperimentAvailable } from "@/utils/databaseExperiments";

interface ExperimentDomainIndexProps {
  domainSlug: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export default function ExperimentDomainIndex({
  domainSlug,
}: ExperimentDomainIndexProps) {
  const domain = getExperimentDomain(domainSlug);
  const availableExperiments = domain.experiments.filter((experiment) =>
    isExperimentAvailable(domain.slug, experiment.slug)
  );
  const experiments =
    domain.slug === "ui-explorations"
      ? availableExperiments.toSorted((first, second) =>
          first.createdAt.localeCompare(second.createdAt)
        )
      : availableExperiments;

  return (
    <div className="mx-auto mt-10 min-h-screen w-full sm:px-0">
      <div className="mb-10 space-y-3">
        <div className="flex items-center">
          <Image alt="" height={36} src={domain.logoSrc} width={36} />
        </div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{domain.title}</h1>
        <div className="text-foreground/90 text-lg">{domain.description}</div>
        <div className="text-foreground/70 text-lg">
          {experiments.length} experiments
        </div>
      </div>
      <ol className="space-y-3">
        {experiments.map((experiment) => (
          <li key={experiment.slug}>
            <InternalLink
              href={`/experiments/${domain.slug}/${experiment.slug}`}
            >
              {experiment.title}
            </InternalLink>
            {domain.slug === "ui-explorations" && (
              <span className="text-foreground/55 ml-2 text-xs">
                Added {formatDate(experiment.createdAt)} · Edited{" "}
                {formatDate(experiment.updatedAt)}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
