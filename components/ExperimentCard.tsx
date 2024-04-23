import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ExperimentsData } from "../data/ExperimentsData";
import Link from "next/link";

export default function ExperimentCard({ experiment }: { experiment: ExperimentsData }) {
	return (
		<Link
			passHref
			href={`/experiments/${experiment.title.toLowerCase().replace(" ", "-")}`}
			key={experiment.id}
			className="space-y-1 p-3.5 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700/60 border border-zinc-300 dark:border-zinc-700 rounded-lg group"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="flex items-center space-x-2">
						<Image src={experiment.logoSrc} height={18} width={18} alt={experiment.title} />
					</div>
					<div className="sm:text-lg text-zinc-800 dark:text-zinc-200 font-semibold">{experiment.title}</div>
				</div>
				<ChevronRightIcon width={2} className="w-5 h-5 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-500 dark:text-zinc-500" />
			</div>
			<div className="text-zinc-700 dark:text-zinc-400">{experiment.description}</div>
			<div className="text-zinc-500/60 dark:text-zinc-500">{experiment.links.length} experiments</div>
		</Link>
	);
}
