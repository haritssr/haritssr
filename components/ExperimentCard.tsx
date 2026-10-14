import ExperimentDomainIcon from "@/components/ExperimentDomainIcon";
import InternalLinkCardNumber from "@/components/InternalLinkCardNumber";
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
    <InternalLinkCardNumber
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
    <InternalLinkCardNumber
      title={experiment.title}
      description={experiment.description}
      icon={<ExperimentDomainIcon src={experiment.logoSrc} variant="muted" />}
      count={experiment.experimentCount}
      countLabel="historical experiments"
      headingLevel={headingLevel}
    />
  );
}
