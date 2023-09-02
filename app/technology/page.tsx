import { PageTitle } from "@/components/SubTitle";
import { TechStackData } from "data/TechStackData";
import { TechnologyCard } from "@/components/TechnologyCard";

export default function TechStackPage() {
	return (
		<>
			<PageTitle title="Technology" description="My choosen libraries and framework to build web application." />
			<div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4">
				{TechStackData.map((data) => (
					<TechnologyCard domain={data?.domain} links={data?.links} key={data?.domain} />
				))}
			</div>
		</>
	);
}
