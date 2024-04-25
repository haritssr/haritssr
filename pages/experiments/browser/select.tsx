import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";

import LayoutToExperiments from "@/components/LayoutToExperiments";

export default function Select() {
	return (
		<LayoutToExperiments title="Select" domain="Browser">
			<SubTitle>
				Browser built in select API.
				<br />
				The chevron down is bad, you can not manipulate that.
				<br />
				Alternative using{" "}
				<ExternalLink
					href="https://headlessui.com/react/listbox"
					name="Headless UI Listbox"
				/>{" "}
				or{" "}
				<ExternalLink
					href="https://www.radix-ui.com/docs/primitives/components/select"
					name="Radix Primitive Select"
				/>
			</SubTitle>
			<select name="pets" id="pet-select" className="w-1/3 px-2 py-2">
				<option value="">Please choose an option</option>
				<option value="dog" disabled>
					Dog
				</option>
				<option value="cat">Cat</option>
				<option value="hamster">Hamster</option>
				<option value="parrot">Parrot</option>
				<option value="spider">Spider</option>
				<option value="goldfish">Goldfish</option>
			</select>
		</LayoutToExperiments>
	);
}
