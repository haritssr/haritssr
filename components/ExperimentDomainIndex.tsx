import Image from "next/image";

import InternalLink from "@/components/InternalLink";
import { getExperimentDomain } from "@/data/ExperimentsData";
import { isExperimentAvailable } from "@/utils/databaseExperiments";

interface ExperimentDomainIndexProps {
  domainSlug: string;
}

export default function ExperimentDomainIndex({
  domainSlug,
}: ExperimentDomainIndexProps) {
  const domain = getExperimentDomain(domainSlug);
  const experiments = domain.experiments.filter((experiment) =>
    isExperimentAvailable(domain.slug, experiment.slug)
  );

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
          </li>
        ))}
      </ol>
    </div>
  );
}
