import MoreItemsLink from "@/components/MoreItemsLink";
import ProjectsCard from "@/components/ProjectsCard";
import { ProjectsData } from "@/data/ProjectsData";

import HomeSectionWrapper from "./HomeSectionWrapper";

const HOME_PROJECTS_LIMIT = 4;

export default function Projects() {
  const remainingProjects = Math.max(
    ProjectsData.length - HOME_PROJECTS_LIMIT,
    0
  );

  return (
    <HomeSectionWrapper
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4"
      id="projects"
      topic="Projects"
    >
      {ProjectsData.map((d, index) => (
        <ProjectsCard
          className={
            index >= HOME_PROJECTS_LIMIT ? "hidden! sm:flex!" : undefined
          }
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
      {remainingProjects > 0 ? (
        <MoreItemsLink
          className="sm:hidden!"
          count={remainingProjects}
          href="/projects"
          itemName="project"
        />
      ) : null}
    </HomeSectionWrapper>
  );
}
