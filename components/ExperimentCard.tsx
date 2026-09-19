import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import type { ExperimentDomainData } from "../data/ExperimentsData";

export default function ExperimentCard({
  className,
  experiment,
}: {
  className?: string;
  experiment: ExperimentDomainData;
}) {
  return (
    <Link
      className={`group corner-squircle border-border hover:bg-surface-hover hover:border-border-hover space-y-1 rounded-2xl border px-3 py-2.5 ${className ?? ""}`}
      href={`/experiments/${experiment.slug}`}
      key={experiment.id}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Image alt="" height={18} src={experiment.logoSrc} width={18} />
          </div>
          <div className="text-foreground font-medium sm:text-lg">
            {experiment.title}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-foreground/60 text-sm font-light">
            {experiment.experiments.length}
          </div>
          <ChevronRightIcon className="text-foreground/60 h-4 w-4 stroke-2" />
        </div>
      </div>
      <div className="text-foreground/60 line-clamp-1 sm:line-clamp-none">
        {experiment.description}
      </div>
    </Link>
  );
}
