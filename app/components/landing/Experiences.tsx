import { ExperiencesData } from "data/ExperiencesData";
import Wrapper from "./Wrapper";
import ExperienceCard from "@/components/ExperienceCard";

export default function Experiences() {
	return (
		<Wrapper
			id="experiences"
			topic="Experiences"
			className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-0"
			explanation="All of my projects with use cases and details."
			collapsible
		>
			{ExperiencesData.map((d) => (
				<ExperienceCard
					key={d.project_name}
					href={d.about_client.website}
					description={d.about_client.short_about}
					title={d.project_name}
					period={d.about_project.working_period}
					status={d.about_project.website_status}
					imgSrc={d.about_client.logo_src}
					industry={d.about_client.industry}
				/>
			))}
		</Wrapper>
	);
}
