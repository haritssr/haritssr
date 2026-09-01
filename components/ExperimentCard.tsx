import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import type { ExperimentDomainData } from "../data/ExperimentsData";

export default function ExperimentCard({
  experiment,
}: {
  experiment: ExperimentDomainData;
}) {
  return (
    <Link
      className="group corner-squircle space-y-1 rounded-2xl border border-zinc-400 px-3 py-2.5 hover:border-zinc-600 hover:bg-zinc-50"
      href={`/experiments/${experiment.slug}`}
      key={experiment.id}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Image
              alt={experiment.title}
              height={18}
              src={experiment.logoSrc}
              width={18}
            />
          </div>
          <div className="font-medium text-zinc-800 sm:text-lg">
            {experiment.title}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-sm font-light text-zinc-500">
            {experiment.experiments.length}
          </div>
          <ChevronRightIcon className="h-4 w-4 text-zinc-500 stroke-2" />
        </div>
      </div>
      <div className="text-zinc-500">{experiment.description}</div>
    </Link>
  );
}
