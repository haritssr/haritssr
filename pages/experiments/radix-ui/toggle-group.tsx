import { ToggleGroup } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedToggle() {
	return (
		<LayoutToExperiments title="Toggle" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/toggle"
					name="Radix UI Toggle"
				/>
				<ExplanationList>
					<li>A two-state button that can be either on or off.</li>
					<li>Click to change.</li>
				</ExplanationList>
			</SubTitle>

			<ToggleGroup.Root type="multiple" className="space-x-2">
				<ToggleGroup.Item
					value="left"
					aria-label="left"
					className="rounded-full border border-zinc-500 rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 px-4 py-1.5 rdx-state-on:text-white text-zinc-800 hover:border-blue-600 hover:text-action sm:py-1"
				>
					Button
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="center"
					aria-label="center"
					className="rounded-full border border-zinc-500 rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 px-4 py-1.5 rdx-state-on:text-white text-zinc-800 hover:border-blue-600 hover:text-action sm:py-1"
				>
					Button
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="right"
					aria-label="right"
					className="rounded-full border border-zinc-500 rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 px-4 py-1.5 rdx-state-on:text-white text-zinc-800 hover:border-blue-600 hover:text-action sm:py-1"
				>
					Button
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		</LayoutToExperiments>
	);
}
