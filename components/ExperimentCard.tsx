import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import type { ExperimentsData } from "../data/ExperimentsData";

export default function ExperimentCard({
	experiment,
}: {
	experiment: ExperimentsData;
}) {
	return (
		<Link
			href={`/experiments/${experiment.title.toLowerCase().replace(" ", "-")}`}
			key={experiment.id}
			className="group corner-squircle space-y-1 rounded-2xl border border-zinc-300 px-3 py-2.5 hover:bg-zinc-50"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="flex items-center space-x-2">
						<Image
							src={experiment.logoSrc}
							height={18}
							width={18}
							alt={experiment.title}
						/>
					</div>
					<div className="font-medium text-zinc-800 sm:text-lg">
						{experiment.title}
					</div>
				</div>
				<div className="flex items-center space-x-1">
					<div className="font-light text-sm text-zinc-400">
						{experiment.links.length}
					</div>
					<ChevronRightIcon width={2.5} className="h-4 w-4 text-zinc-400" />
				</div>
			</div>
			<div className="font-light text-zinc-500">{experiment.description}</div>
		</Link>
	);
}
