import ProjectsCard from "@/components/ProjectsCard";
import { PROJECTS_DESCRIPTION } from "../../data/PageDescriptions";
import { ProjectsData } from "../../data/ProjectsData";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Projects() {
  return (
    <HomeSectionWrapper
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4"
      explanation={PROJECTS_DESCRIPTION}
      id="projects"
      topic="Projects"
    >
      {ProjectsData.map((d) => (
        <ProjectsCard
          description={d.about_client.short_about}
          href={d.about_client.website}
          imgSrc={d.about_client.logo_src}
          industry={d.about_client.industry}
          key={d.project_name}
          period={d.about_project.working_period}
          status={d.about_project.website_status}
          title={d.project_name}
        />
      ))}
    </HomeSectionWrapper>
  );
}
