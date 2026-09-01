import type { Metadata } from "next";

import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import ProjectsCard from "@/components/ProjectsCard";

import { ProjectsData } from "../../data/ProjectsData";

const PROJECTS_DESCRIPTION =
  "Detail informations on how projects I belong to being handled.";

export const metadata: Metadata = {
  title: "Experiences",
  description: PROJECTS_DESCRIPTION,
};

export default function ProjecstPage() {
  return (
    <>
      <PageTitle title="Projects" />
      <PageDescription description={PROJECTS_DESCRIPTION} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {ProjectsData.map((project) => (
          <ProjectsCard
            description={project.about_client.short_about}
            href={project.about_client.website}
            imgSrc={project.about_client.logo_src}
            industry={project.about_client.industry}
            key={project.project_name}
            period={project.about_project.working_period}
            status={project.about_project.website_status}
            title={project.project_name}
          />
        ))}
      </div>
    </>
  );
}
