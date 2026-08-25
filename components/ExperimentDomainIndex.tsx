import Image from "next/image";
import InternalLink from "@/components/InternalLink";
import { getExperimentDomain } from "@/data/ExperimentsData";

interface ExperimentDomainIndexProps {
  domainSlug: string;
}

export default function ExperimentDomainIndex({
  domainSlug,
}: ExperimentDomainIndexProps) {
  const domain = getExperimentDomain(domainSlug);

  return (
    <div className="mx-auto mt-10 min-h-screen w-full sm:px-0">
      <div className="mb-10 space-y-2">
        <div className="flex items-center space-x-2">
          <Image
            alt={domain.title}
            height={36}
            src={domain.logoSrc}
            width={36}
          />
        </div>
        <div className="font-semibold text-2xl sm:text-3xl">{domain.title}</div>
        <div className="text-lg text-zinc-800">{domain.description}</div>
        <div className="font-light text-lg text-zinc-400">
          {domain.experiments.length} experiments
        </div>
      </div>
      <ol className="space-y-3">
        {domain.experiments.map((experiment) => (
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
