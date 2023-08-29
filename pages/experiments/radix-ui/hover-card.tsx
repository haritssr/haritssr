import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import ExplanationList from "@/components/ExplanationList";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import * as HoverCard from "@radix-ui/react-hover-card";

export default function ExportedHoverCard() {
	return (
		<LayoutToExperiments title="Hover Card" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/hover-card"
					name="Radix UI Hover Card"
				/>
				<ExplanationList>
					<li>For sighted users to preview content available behind a link.</li>
					<li>
						Hover over the card and the box will appear and ready to click to
						another page.
					</li>
				</ExplanationList>
			</SubTitle>
			<HoverCard.Root>
				<HoverCard.Trigger
					className="rounded-md bg-white px-3 py-1.5 font-medium text-zinc-800 border border-zinc-400 hover:cursor-pointer hover:bg-zinc-100"
					target="_blank"
					rel="noopener noreferrer"
					href="https://twitter.com/haritssr"
				>
					@haritssr
				</HoverCard.Trigger>
				<HoverCard.Content>
					<div className="w-auto rounded-md bg-white p-3 text-white shadow-xl border border-zinc-400">
						<div className="font-semibold text-zinc-800 mb-2">Harits Syah</div>

						<div className="flex flex-col">
							<ExternalLink
								name="@haritssr"
								href="https://www.twitter.com/haritssr"
							/>
							<ExternalLink
								name="haritssr.com"
								href="https://www.haritssr.com"
							/>
						</div>
						<div className="text-zinc-600">22</div>
						<div className="text-zinc-700">South Tangerang</div>
					</div>
					<HoverCard.Arrow offset={20} className="fill-[#fff]" />
				</HoverCard.Content>
			</HoverCard.Root>
		</LayoutToExperiments>
	);
}
