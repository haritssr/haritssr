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
      {ProjectsData.map((project, index) => (
        <ProjectsCard
          className={
            index >= HOME_PROJECTS_LIMIT ? "hidden! sm:flex!" : undefined
          }
          description={project.about_client.short_about}
          href={project.about_client.website}
          imgSrc={project.about_client.logo_src}
          key={project.project_name}
          title={project.project_name}
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
