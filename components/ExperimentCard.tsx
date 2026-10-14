import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import IndexCard from "@/components/IndexCard";
import type { DiscontinuedExperiment } from "@/data/DiscontinuedExperimentsData";
import type { ExperimentDomainData } from "@/data/ExperimentsData";

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
    <IndexCard
      className={className}
      href={`/experiments/${experiment.slug}`}
      title={experiment.title}
      description={experiment.description}
      icon={<ExperimentDomainIcon src={experiment.logoSrc} />}
      count={experiment.experiments.length}
      countLabel="experiments"
      headingLevel={headingLevel}
    />
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
    <IndexCard
      title={experiment.title}
      description={experiment.description}
      icon={<ExperimentDomainIcon src={experiment.logoSrc} variant="muted" />}
      count={experiment.experimentCount}
      countLabel="historical experiments"
      headingLevel={headingLevel}
    />
  );
}
