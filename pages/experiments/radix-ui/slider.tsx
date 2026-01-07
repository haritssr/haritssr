import { Slider } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedSlider() {
	return (
		<LayoutToExperiments title="Slider" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/slider"
					name="Radix UI Slider"
				/>
				<ExplanationList>
					<li>
						An input where the user selects a value from within a given range.
					</li>
					<li>
						Click the button with name and icon and the explanation box will
						appear
					</li>
				</ExplanationList>
			</SubTitle>
			<form action="">
				<Slider.Root
					defaultValue={[50]}
					orientation="horizontal"
					// step={10}
					className="relative flex w-full select-none items-center"
				>
					<Slider.Track
						aria-orientation="horizontal"
						className="h-2 flex-1 rounded-full bg-zinc-800"
					>
						<Slider.Range className="absolute h-full rounded-ful bg-zinc-100" />
					</Slider.Track>
					<Slider.Thumb className="block h-5 w-5 cursor-pointer rounded-full border border-zinc-300 bg-white shadow-lg hover:border-zinc-400 hover:bg-zinc-50 focus:border focus:border-zinc-500 focus:outline-hidden focus:ring-4 focus:ring-zinc-400/50" />
				</Slider.Root>
			</form>
		</LayoutToExperiments>
	);
}
