import { PageTitle } from "@/components/SubTitle";
import { IncrementButton } from "./IncrementButton";
import TimesTableComponent from "./TimesTable";

export default function TimesTable() {
	return (
		<div>
			<PageTitle
				title="Times Table"
				description="Self-corrected 10x10 times table with statistics."
			/>

			<IncrementButton />
			<TimesTableComponent />
		</div>
	);
}
