import type { Metadata } from "next";

import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import ProjectsCard from "@/components/ProjectsCard";
import { createPageMetadata } from "@/utils/pageMetadata";

import { ProjectsData } from "./data";

const PROJECTS_DESCRIPTION =
  "Details about the projects I've worked on and how they were handled.";

export const metadata: Metadata = createPageMetadata({
  path: "/projects",
  title: "Projects",
  description: PROJECTS_DESCRIPTION,
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path="/projects">
        <PageTitle>Projects</PageTitle>
        <PageDescription>{PROJECTS_DESCRIPTION}</PageDescription>
      </PageHeader>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {ProjectsData.map((project) => (
          <ProjectsCard
            description={project.about_client.short_about}
            href={project.about_client.website}
            imgSrc={project.about_client.logo_src}
            key={project.project_name}
            title={project.project_name}
          />
        ))}
      </div>
    </>
  );
}
