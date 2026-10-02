import { getAvailableExperimentDomains } from "@/utils/experimentCatalog";

import ExperimentCard from "./ExperimentCard";
import MoreItemsLink from "./MoreItemsLink";

export default function ExperimentsGrid({
  mobileLimit,
  headingLevel = 2,
}: {
  mobileLimit?: number;
  headingLevel?: 2 | 3;
}) {
  const visibleDomains = getAvailableExperimentDomains();
  const remainingDomains = Math.max(
    visibleDomains.length - (mobileLimit ?? visibleDomains.length),
    0
  );

  return (
    <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {visibleDomains.map((experiment, index) => (
        <li
          className={
            mobileLimit !== undefined && index >= mobileLimit
              ? "hidden! sm:block!"
              : undefined
          }
          key={experiment.id}
        >
          <ExperimentCard
            className="block h-full"
            experiment={experiment}
            headingLevel={headingLevel}
          />
        </li>
      ))}
      {remainingDomains > 0 ? (
        <li className="sm:hidden">
          <MoreItemsLink
            count={remainingDomains}
            href="/experiments"
            itemName="experiment"
          />
        </li>
      ) : null}
    </ul>
  );
}
