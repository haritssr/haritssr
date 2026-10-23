import DiscontinuedLabs from "@/app/labs/_components/DiscontinuedLabs";
import {
  DiscontinuedLabsData,
  discontinuedLabHistory,
} from "@/app/labs/discontinued-data";
import ExternalLink from "@/components/ExternalLink";
import { getAvailableLabDomains } from "@/utils/discovery/labCatalog";

import LabCard, { ArchivedLabCard } from "./LabCard";

const GRID_CLASS_NAME =
  "grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4";

export default function LabsGrid({
  headingLevel = 2,
}: {
  headingLevel?: 2 | 3;
}) {
  const domains = getAvailableLabDomains();
  const archivedCount = DiscontinuedLabsData.reduce(
    (total, record) => total + record.labCount,
    0
  );
  const { removalCommitSha } = discontinuedLabHistory;

  return (
    <div className="space-y-4 sm:space-y-5">
      <ul className={GRID_CLASS_NAME}>
        {domains.map((lab) => (
          <li key={lab.slug}>
            <LabCard
              className="block h-full"
              lab={lab}
              headingLevel={headingLevel}
            />
          </li>
        ))}
      </ul>
      <DiscontinuedLabs count={archivedCount} className="w-full">
        <div className="space-y-5">
          {removalCommitSha === undefined ? null : (
            <p className="text-muted mb-0 pb-2 leading-7">
              <ExternalLink
                href={`https://github.com/haritssr/haritssr/commit/${removalCommitSha}`}
                name="View removal commit"
                size="inherit"
              />
            </p>
          )}
          <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {DiscontinuedLabsData.map((lab) => (
              <li key={lab.slug}>
                <ArchivedLabCard
                  lab={lab}
                  headingLevel={headingLevel === 2 ? 3 : 4}
                />
              </li>
            ))}
          </ul>
        </div>
      </DiscontinuedLabs>
    </div>
  );
}
