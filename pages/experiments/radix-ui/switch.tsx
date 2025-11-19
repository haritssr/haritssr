import { Switch } from "radix-ui";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedSwitch() {
	return (
		<LayoutToExperiments title="Switch" domain="Radix UI">
			<SubTitle>
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/switch"
					name="Radix UI Switch"
				/>
				<ExplanationList>
					<li>
						A control that allows the user to toggle between checked and not
						checked.
					</li>
					<li>Click to change state.</li>
				</ExplanationList>
			</SubTitle>
			<form>
				<Switch.Root
					defaultChecked
					id="s1"
					className="block w-11 p-1 border border-zinc-300 rounded-full hover:bg-zinc-50 rdx-state-checked:bg-green-600 rdx-state-checked:border-green-700"
				>
					<Switch.Thumb className="block h-4 w-4 rounded-full bg-zinc-800 will-change-transform rdx-state-checked:translate-x-[18px] shadow border border-zinc-400 rdx-state-checked:bg-white duration-100" />
				</Switch.Root>
			</form>
		</LayoutToExperiments>
	);
}
