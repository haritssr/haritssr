import { PageTitle } from "@/components/SubTitle";
import { IncrementButton } from "./IncrementButton";

export default function TimesTable() {
	return (
		<div>
			<PageTitle
				title="Times Table"
				description="Self-corrected 10x10 times table with statistics."
			/>

			<IncrementButton />
			<TimesTable />
		</div>
	);
}
