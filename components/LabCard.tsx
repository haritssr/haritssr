import type { LabDomainData } from "@/app/labs/data";
import type { DiscontinuedLab } from "@/app/labs/discontinued-data";
import IndexCard from "@/components/IndexCard";
import LabDomainIcon from "@/components/LabDomainIcon";

type HeadingLevel = 2 | 3 | 4;

export default function LabCard({
  className,
  lab,
  headingLevel = 2,
}: {
  className?: string;
  lab: LabDomainData;
  headingLevel?: HeadingLevel;
}) {
  return (
    <IndexCard
      className={className}
      href={`/labs/${lab.slug}`}
      title={lab.title}
      description={lab.description}
      icon={<LabDomainIcon src={lab.logoSrc} />}
      count={lab.labs.length}
      countLabel="labs"
      headingLevel={headingLevel}
    />
  );
}

export function ArchivedLabCard({
  lab,
  headingLevel = 3,
}: {
  lab: DiscontinuedLab;
  headingLevel?: HeadingLevel;
}) {
  return (
    <IndexCard
      title={lab.title}
      description={lab.description}
      icon={<LabDomainIcon src={lab.logoSrc} variant="muted" />}
      count={lab.labCount}
      countLabel="historical labs"
      headingLevel={headingLevel}
    />
  );
}
