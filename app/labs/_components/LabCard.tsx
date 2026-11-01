import LabDomainIcon from "@/app/labs/_components/LabDomainIcon";
import type { LabDomainData } from "@/app/labs/data";
import type { DiscontinuedLab } from "@/app/labs/discontinued-data";
import IndexCard from "@/components/IndexCard";

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
      className={`bg-interface-hover [&:hover]:bg-middle-hover/70 [&:hover>div>div:last-child>svg]:text-foreground [&>p]:text-foreground/60 border-0 px-3.5 py-3 sm:[&_:is(h2,h3,h4)]:text-base [&:active]:scale-99 lg:[&:active]:scale-100 ${className ?? ""}`}
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
