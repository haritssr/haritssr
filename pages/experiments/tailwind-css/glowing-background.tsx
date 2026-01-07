import { BeakerIcon } from "@heroicons/react/24/outline";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function GlowingBackground() {
	return (
		<LayoutToExperiments title="Glowing Background" domain="Tailwind CSS">
			<SubTitle>
				Hover on the button to see the glowing effect.{" "}
				<ExternalLink
					name="Source"
					href="https://www.youtube.com/watch?v=5W6kEP65AH4"
				/>
			</SubTitle>

			<div className="h-auto rounded-lg bg-black px-2 py-6 sm:px-8 sm:py-16">
				<div className="grid items-start justify-center gap-8">
					<div className="group relative">
						<div className="-inset-0.5 absolute animate-tilt rounded-lg bg-linear-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
						<button
							type="button"
							className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-gray-800 px-3 py-3 leading-none sm:px-7 sm:py-4"
						>
							<span className="flex items-center space-x-2 sm:space-x-5">
								<BeakerIcon
									className="-rotate-6 h-4 w-4 text-pink-600 sm:h-6 sm:w-6"
									strokeWidth="1.5"
								/>
								<span className="pr-2 text-gray-100 text-xs sm:pr-6 sm:text-base">
									Labs Release 2021.09
								</span>
							</span>
							<span className="pl-2 text-indigo-400 text-xs transition duration-200 group-hover:text-gray-100 sm:pl-6 sm:text-base">
								See what&apos;s new &rarr;
							</span>
						</button>
					</div>
				</div>
			</div>
		</LayoutToExperiments>
	);
}
