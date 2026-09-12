import { ExperimentsData } from "../data/ExperimentsData";
import { isExperimentAvailable } from "../utils/databaseExperiments";
import ExperimentCard from "./ExperimentCard";
import MoreItemsLink from "./MoreItemsLink";

export default function ExperimentsGrid({
  mobileLimit,
}: {
  mobileLimit?: number;
}) {
  const visibleDomains = ExperimentsData.map((domain) => ({
    ...domain,
    experiments: domain.experiments.filter((experiment) =>
      isExperimentAvailable(domain.slug, experiment.slug)
    ),
  }));
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
