import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import type { DiscontinuedExperiment } from "@/data/DiscontinuedExperimentsData";
import type { ExperimentDomainData } from "@/data/ExperimentsData";

const CARD_CLASS_NAME =
  "corner-squircle border-border space-y-1 rounded-2xl border px-3 py-2.5";

type HeadingLevel = 2 | 3 | 4;

export default function ExperimentCard({
  className,
  experiment,
  headingLevel = 2,
}: {
  className?: string;
  experiment: ExperimentDomainData;
  headingLevel?: HeadingLevel;
}) {
  return (
    <Link
      className={`group hover:bg-surface-hover hover:border-border-hover ${CARD_CLASS_NAME} ${className ?? ""}`}
      href={`/experiments/${experiment.slug}`}
    >
      <ExperimentCardContent
        title={experiment.title}
        description={experiment.description}
        logoSrc={experiment.logoSrc}
        count={experiment.experiments.length}
        headingLevel={headingLevel}
        variant="navigation"
      />
    </Link>
  );
}

export function ArchivedExperimentCard({
  experiment,
  headingLevel = 3,
}: {
  experiment: DiscontinuedExperiment;
  headingLevel?: HeadingLevel;
}) {
  return (
    <div className={`h-full ${CARD_CLASS_NAME}`}>
      <ExperimentCardContent
        title={experiment.title}
        description={experiment.description}
        logoSrc={experiment.logoSrc}
        count={experiment.experimentCount}
        headingLevel={headingLevel}
        variant="archive"
      />
    </div>
  );
}

function ExperimentCardContent({
  title,
  description,
  logoSrc,
  count,
  headingLevel,
  variant,
}: {
  title: string;
  description: string;
  logoSrc: string;
  count: number;
  headingLevel: HeadingLevel;
  variant: "navigation" | "archive";
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <ExperimentDomainIcon
            src={logoSrc}
            variant={variant === "archive" ? "muted" : "default"}
          />
          <Heading
            className={`${variant === "archive" ? "text-muted" : "text-foreground"} font-medium sm:text-lg`}
          >
            {title}
          </Heading>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-muted text-sm font-light tabular-nums">
            {count}
            <span className="sr-only"> experiments</span>
          </div>
          {variant === "navigation" ? (
            <ChevronRightIcon
              aria-hidden="true"
              className="text-muted h-4 w-4 stroke-2"
            />
          ) : null}
        </div>
      </div>
      <div className="text-muted line-clamp-1 sm:line-clamp-none">
        {description}
      </div>
    </>
  );
}
