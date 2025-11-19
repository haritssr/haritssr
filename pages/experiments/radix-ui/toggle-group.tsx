import * as ToggleGroup from "@radix-ui/react-toggle-group";
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
					className="rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 hover:border-blue-600 hover:text-action  rdx-state-on:text-white text-zinc-800 rounded-full px-4 py-1.5 sm:py-1 border border-zinc-500"
				>
					Button
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="center"
					aria-label="center"
					className="rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 hover:border-blue-600 hover:text-action  rdx-state-on:text-white text-zinc-800 rounded-full px-4 py-1.5 sm:py-1 border border-zinc-500"
				>
					Button
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="right"
					aria-label="right"
					className="rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 hover:border-blue-600 hover:text-action  rdx-state-on:text-white text-zinc-800 rounded-full px-4 py-1.5 sm:py-1 border border-zinc-500"
				>
					Button
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		</LayoutToExperiments>
	);
}
