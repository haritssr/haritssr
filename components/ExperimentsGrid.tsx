import { getAvailableExperimentDomains } from "@/utils/experimentCatalog";

import ExperimentCard from "./ExperimentCard";
import MoreItemsLink from "./MoreItemsLink";

export default function ExperimentsGrid({
  mobileLimit,
}: {
  mobileLimit?: number;
}) {
  const visibleDomains = getAvailableExperimentDomains();
  const remainingDomains = Math.max(
    visibleDomains.length - (mobileLimit ?? visibleDomains.length),
    0
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {visibleDomains.map((experiment, index) => (
        <ExperimentCard
          className={
            mobileLimit !== undefined && index >= mobileLimit
              ? "hidden! sm:block!"
              : undefined
          }
          experiment={experiment}
          key={experiment.id}
        />
      ))}
      {remainingDomains > 0 ? (
        <MoreItemsLink
          className="sm:hidden!"
          count={remainingDomains}
          href="/experiments"
          itemName="experiment"
        />
      ) : null}
    </div>
  );
}
