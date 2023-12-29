import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ExperimentsData } from "../data/ExperimentsData";
import Link from "next/link";

export default function ExperimentsCard({ experiment }: { experiment: ExperimentsData }) {
	return (
		<Link
			passHref
			href={`/experiments/${experiment.title.toLowerCase().replace(" ", "-")}`}
			key={experiment.id}
			className="space-y-1 p-3.5 hover:bg-zinc-50 border border-zinc-400/70 rounded-lg group"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="flex items-center space-x-2">
						<Image src={experiment.logoSrc} height={18} width={18} alt={experiment.title} />
					</div>
					<div className="sm:text-lg text-zinc-700 font-semibold">{experiment.title}</div>
				</div>
				<ChevronRightIcon width={2} className="w-5 h-5 text-zinc-400 group-hover:text-action" />
			</div>
			<div className="text-zinc-700">{experiment.description}</div>
			<div className="text-zinc-500/60">{experiment.links.length} experiments</div>
		</Link>
	);
}
