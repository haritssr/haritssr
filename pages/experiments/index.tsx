import ExperimentsGrid from "@/components/ExperimentsGrid";
import Layout from "@/components/Layout";
import { PageTitle } from "@/components/SubTitle";
import { ExperimentsData } from "data/ExperimentsData";

export default function ExperimentsPage() {
	let totalExperiment = 0;
	for (let i = 0; i < ExperimentsData.length; i++) {
		totalExperiment += ExperimentsData[i].links.length;
	}

	return (
		<Layout browserTitle="Experiments" description="Home">
			<PageTitle
				title="Experiments"
				description={
					<>
						{`${totalExperiment} unique individual (per page) experiments across Javascript-React ecosystem stack`}
					</>
				}
			>
				<ExperimentsGrid />
			</PageTitle>
		</Layout>
	);
}
