import Accordion, { AccordionItem } from "@/components/Accordion";
import ExternalLink from "@/components/ExternalLink";
import {
  DiscontinuedExperimentsData,
  discontinuedExperimentHistory,
} from "@/data/DiscontinuedExperimentsData";
import { getAvailableExperimentDomains } from "@/utils/experimentCatalog";

import ExperimentCard, { ArchivedExperimentCard } from "./ExperimentCard";
import MoreItemsLink from "./MoreItemsLink";

const GRID_CLASS_NAME =
  "grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4";

export default function ExperimentsGrid({
  mobileLimit,
  headingLevel = 2,
}: {
  mobileLimit?: number;
  headingLevel?: 2 | 3;
}) {
  const domains = getAvailableExperimentDomains();
  const remainingDomains = Math.max(
    domains.length - (mobileLimit ?? domains.length),
    0
  );
  const archivedCount = DiscontinuedExperimentsData.reduce(
    (total, record) => total + record.experimentCount,
    0
  );
  const { removalCommitSha } = discontinuedExperimentHistory;

  return (
    <div className="space-y-4 sm:space-y-5">
      <ul className={GRID_CLASS_NAME}>
        {domains.map((experiment, index) => (
          <li
            className={
              mobileLimit !== undefined && index >= mobileLimit
                ? "hidden! sm:block!"
                : undefined
            }
            key={experiment.slug}
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
      <Accordion
        className={
          mobileLimit !== undefined && domains.length >= mobileLimit
            ? "hidden! w-full sm:block!"
            : "w-full"
        }
      >
        <AccordionItem
          title="Discontinued"
          triggerClassName="lg:w-[calc((100%_-_var(--spacing)*15)/4)] lg:data-panel-open:rounded-b-lg"
          trailing={
            <span className="text-muted shrink-0 font-normal tabular-nums">
              {archivedCount}
              <span className="sr-only"> historical experiments</span>
            </span>
          }
          value="discontinued"
          panelClassName="bg-transparent lg:mt-3 lg:rounded-lg lg:border-t"
        >
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
              {DiscontinuedExperimentsData.map((experiment) => (
                <li key={experiment.slug}>
                  <ArchivedExperimentCard
                    experiment={experiment}
                    headingLevel={headingLevel === 2 ? 3 : 4}
                  />
                </li>
              ))}
            </ul>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
