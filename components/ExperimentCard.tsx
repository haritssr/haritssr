import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";

import type { ExperimentDomainData } from "../data/ExperimentsData";

export default function ExperimentCard({
  className,
  experiment,
  headingLevel = 2,
}: {
  className?: string;
  experiment: ExperimentDomainData;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <Link
      className={`group corner-squircle border-border hover:bg-surface-hover hover:border-border-hover space-y-1 rounded-2xl border px-3 py-2.5 ${className ?? ""}`}
      href={`/experiments/${experiment.slug}`}
      key={experiment.id}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ExperimentDomainIcon src={experiment.logoSrc} />
          <Heading className="text-foreground font-medium sm:text-lg">
            {experiment.title}
          </Heading>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-muted text-sm font-light">
            {experiment.experiments.length}
          </div>
          <ChevronRightIcon className="text-muted h-4 w-4 stroke-2" />
        </div>
      </div>
      <div className="text-muted line-clamp-1 sm:line-clamp-none">
        {experiment.description}
      </div>
    </Link>
  );
}
