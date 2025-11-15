import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ExperimentsData } from "../data/ExperimentsData";
import Link from "next/link";

export default function ExperimentCard({
	experiment,
}: { experiment: ExperimentsData }) {
	return (
		<Link
			href={`/experiments/${experiment.title.toLowerCase().replace(" ", "-")}`}
			key={experiment.id}
			className="space-y-1 px-3 py-2.5 hover:bg-zinc-100 bg-zinc-50 border border-zinc-300 rounded-xl group"
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
					<div className="sm:text-lg text-zinc-800 font-medium">
						{experiment.title}
					</div>
				</div>
				<div className="flex items-center space-x-1">
					<div className="text-zinc-400 font-light text-sm">
						{experiment.links.length}
					</div>
					<ChevronRightIcon width={2.5} className="w-4 h-4 text-zinc-400" />
				</div>
			</div>
			<div className="text-zinc-500 font-light">{experiment.description}</div>
		</Link>
	);
}
