import InternalLink from "@/components/InternalLink";
import LabDomainIcon from "@/components/LabDomainIcon";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import type { LabEntry } from "@/data/LabsData";
import { isDatabaseLab } from "@/utils/databaseLabs";
import { getAvailableLabDomain } from "@/utils/labCatalog";

interface LabDomainIndexProps {
  domainSlug: string;
}

export default function LabDomainIndex({ domainSlug }: LabDomainIndexProps) {
  const domain = getAvailableLabDomain(domainSlug);
  const labs =
    domain.slug === "physics"
      ? domain.labs.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
      : domain.labs;

  return (
    <div className="mx-auto w-full sm:px-0">
      <PageHeader
        back={{ href: "/labs", name: "Labs" }}
        path={`/labs/${domain.slug}`}
      >
        <div className="flex items-start gap-3">
          <PageTitle>{domain.title}</PageTitle>
          <LabDomainIcon size={36} src={domain.logoSrc} />
        </div>
        <PageDescription>{domain.description}</PageDescription>
      </PageHeader>
      <LabList domainSlug={domain.slug} labs={labs} />
    </div>
  );
}

function LabList({
  domainSlug,
  labs,
}: {
  domainSlug: string;
  labs: readonly LabEntry[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
      {labs.map((lab) => (
        <li className="flex items-center justify-between gap-3" key={lab.slug}>
          <span className="min-w-0 truncate" title={lab.title}>
            <InternalLink
              href={`/labs/${domainSlug}/${lab.slug}`}
              variant={
                isDatabaseLab(domainSlug, lab.slug) ? "database" : "navigation"
              }
            >
              {lab.title}
            </InternalLink>
          </span>
        </li>
      ))}
    </ol>
  );
}
