import LabDomainIcon from "@/app/labs/_components/LabDomainIcon";
import type { LabEntry } from "@/app/labs/data";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { getAvailableLabDomain } from "@/utils/discovery/labCatalog";

interface LabDomainIndexProps {
  domainSlug: string;
}

export default function LabDomainIndex({ domainSlug }: LabDomainIndexProps) {
  const domain = getAvailableLabDomain(domainSlug);
  const labs = domain.labs.toSorted((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  return (
    <div className="mx-auto w-full sm:px-0">
      <PageHeader
        back={{ href: "/labs", name: "Labs" }}
        path={`/labs/${domain.slug}`}
      >
        <div className="flex items-center gap-3">
          <PageTitle>{domain.title}</PageTitle>
          <LabDomainIcon className="size-4.5 sm:size-7" src={domain.logoSrc} />
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
  const columnLength = Math.ceil(labs.length / 2);
  const columns = [labs.slice(0, columnLength), labs.slice(columnLength)];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((column, columnIndex) =>
        column.length === 0 ? null : (
          <ol
            className="marker:text-muted list-outside list-decimal space-y-3 pl-7"
            key={column[0].slug}
            start={columnIndex * columnLength + 1}
          >
            {column.map((lab) => (
              <li className="min-w-0 pl-1" key={lab.slug}>
                <InternalLink href={`/labs/${domainSlug}/${lab.slug}`}>
                  {lab.title}
                </InternalLink>
              </li>
            ))}
          </ol>
        )
      )}
    </div>
  );
}
