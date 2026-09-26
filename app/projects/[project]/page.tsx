import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import BackButton from "@/components/BackButton";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import { getProjectSlug } from "@/utils/projectSlug";

import { ProjectsData } from "../../../data/ProjectsData";
import type { ProjectsDataType } from "../../../data/ProjectsData";
import LoadingFigma from "./LoadingFigma";

function getProject(projectSlug: string) {
  return ProjectsData.find(
    ({ project_name: projectName }) =>
      getProjectSlug(projectName) === projectSlug
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project: projectSlug } = await params;
  const project = getProject(projectSlug);

  return project
    ? {
        description: project.about_client.short_about,
        title: project.project_name,
      }
    : {};
}

export function generateStaticParams() {
  return ProjectsData.map(({ project_name }) => ({
    project: getProjectSlug(project_name),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectSlug } = await params;
  const project: ProjectsDataType | undefined = getProject(projectSlug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto min-h-screen w-full max-w-3xl">
        <div className="pt-10 sm:pt-20">
          <BackButton href="/projects" name="All Projects" />
        </div>
        {/* Title */}
        <section className="border-border bg-foreground/5 my-8 flex items-center justify-between rounded-md border px-3 py-2 sm:my-10 sm:px-5 sm:py-4">
          <div>
            <h1 className="text-2xl font-bold wrap-break-word sm:text-3xl">
              {project.project_name}
            </h1>
            <div className="text-foreground/60 text-lg">
              {project.about_client.website.slice(8)}
            </div>
          </div>
          <Image
            alt=""
            blurDataURL={project.about_client.logo_src}
            className="h-12 w-12"
            height="40"
            src={project.about_client.logo_src}
            width="40"
            // placeholder='blur'
          />
        </section>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
          {/* About The Client */}
          <section>
            <h2 className="border-border text-foreground/90 mb-5 border-b pb-4 text-xl font-semibold">
              About The Client
            </h2>
            <dl>
              <dt className="text-foreground/90 mt-5 font-medium">
                Company Name
              </dt>
              <dd className="text-foreground/60">
                {project.about_client.company_name}
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">
                Brand Name
              </dt>
              <dd className="text-foreground/60">
                {project.about_client.brand_name}
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">About</dt>
              <dd className="text-foreground/60">
                {project.about_client.long_about}
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">
                Phone Number
              </dt>
              <dd className="text-foreground/60">
                {project.about_client.phone_number}
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">Website</dt>
              <dd>
                <ExternalLink
                  href={project.about_client.website}
                  name={project.about_client.website.slice(8)}
                />
              </dd>
              <dt className="text-foreground/90 mt-5 font-medium">
                Office Location
              </dt>
              <dd className="text-foreground/60">
                {project.about_client.office_location}
              </dd>
            </dl>
          </section>

          {/* About The Project */}
          <section>
            <h2 className="border-border text-foreground/90 mb-5 border-b pb-4 text-xl font-semibold">
              About The Project
            </h2>
            <dl>
              <dt className="text-foreground/90 mt-5 font-medium">My Role</dt>
              <dd>
                <ExplanationList>
                  {project.about_project.my_role.map((role: string) => (
                    <li className="text-foreground/60" key={role}>
                      {role}
                    </li>
                  ))}
                </ExplanationList>
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">
                Working Period
              </dt>
              <dd className="text-foreground/60">
                {project.about_project.working_period}
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">
                Website Status
              </dt>
              <dd>
                <ExplanationList>
                  {project.about_project.website_status.map(
                    (status: string) => (
                      <li className="text-foreground/60" key={status}>
                        {status}
                      </li>
                    )
                  )}
                </ExplanationList>
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">
                Website Routes
              </dt>
              <dd>
                <ExplanationList>
                  {project.about_project.routes.map((route: string) => (
                    <li className="text-foreground/60" key={route}>
                      {route}
                    </li>
                  ))}
                </ExplanationList>
              </dd>

              <dt className="text-foreground/90 mt-5 font-medium">
                Website Features
              </dt>
              <dd>
                <ExplanationList>
                  {project.about_project.features.map((feature: string) => (
                    <li className="text-foreground/60" key={feature}>
                      {feature}
                    </li>
                  ))}
                </ExplanationList>
              </dd>
            </dl>
          </section>
        </div>

        {/* Design */}
        <section className="mt-10">
          <h2 className="text-foreground/90 mb-5 text-xl font-semibold">
            Design (at Figma)
          </h2>
          <LoadingFigma project={project} />
        </section>
      </div>
    </div>
  );
}

export const dynamicParams = false;
