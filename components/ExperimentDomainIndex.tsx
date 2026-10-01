import Image from "next/image";

import InternalLink from "@/components/InternalLink";
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
