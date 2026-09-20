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

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const FoundProjectObject: ProjectsDataType | undefined = getProject(project);

  if (!FoundProjectObject) {
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
            <div className="text-2xl font-bold wrap-break-word sm:text-3xl">
              {FoundProjectObject.project_name}
            </div>
            <div className="text-foreground/60 text-lg">
              {FoundProjectObject.about_client.website.slice(8)}
            </div>
          </div>
          <Image
            alt=""
            blurDataURL={FoundProjectObject.about_client.logo_src}
            className="h-12 w-12"
            height="40"
            src={FoundProjectObject.about_client.logo_src}
            width="40"
            // placeholder='blur'
          />
        </section>
        <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
          {/* About The Client */}
          <section>
            <h2 className="border-border text-foreground/90 mb-5 border-b pb-4 text-xl font-semibold">
              About The Client
            </h2>
            <div className="text-foreground/90 mt-5 font-medium">
              Company Name
            </div>
            <p className="text-foreground/60">
              {FoundProjectObject.about_client.company_name}
            </p>

            <div className="text-foreground/90 mt-5 font-medium">
              Brand Name
            </div>
            <p className="text-foreground/60">
              {FoundProjectObject.about_client.brand_name}
            </p>

            <div className="text-foreground/90 mt-5 font-medium">About</div>
            <p className="text-foreground/60">
              {FoundProjectObject.about_client.long_about}
            </p>

            <div className="text-foreground/90 mt-5 font-medium">
              Phone Number
            </div>
            <p className="text-foreground/60">
              {FoundProjectObject.about_client.phone_number}
            </p>

            <div className="text-foreground/90 mt-5 font-medium">Website</div>
            <ExternalLink
              href={FoundProjectObject.about_client.website}
              name={FoundProjectObject.about_client.website.slice(8)}
            />
            <div className="text-foreground/90 mt-5 font-medium">
              Office Location
            </div>
            <p className="text-foreground/60">
              {FoundProjectObject.about_client.office_location}
            </p>
          </section>

          {/* About The Project */}
          <section>
            <h2 className="border-border text-foreground/90 mb-5 border-b pb-4 text-xl font-semibold">
              About The Project
            </h2>

            <div className="text-foreground/90 mt-5 font-medium">My Role</div>
            <ExplanationList>
              {FoundProjectObject.about_project.my_role.map((a: string) => (
                <li className="text-foreground/60" key={a}>
                  {a}
                </li>
              ))}
            </ExplanationList>

            <div className="text-foreground/90 mt-5 font-medium">
              Working Period
            </div>
            <p className="text-foreground/60">
              {FoundProjectObject.about_project.working_period}
            </p>

            <div className="text-foreground/90 mt-5 font-medium">
              Website Status
            </div>
            <ExplanationList>
              {FoundProjectObject.about_project.website_status.map(
                (a: string) => (
                  <li className="text-foreground/60" key={a}>
                    {a}
                  </li>
                )
              )}
            </ExplanationList>

            <div className="text-foreground/90 mt-5 font-medium">
              Website Routes
            </div>
            <ExplanationList>
              {FoundProjectObject.about_project.routes.map((a: string) => (
                <li className="text-foreground/60" key={a}>
                  {a}
                </li>
              ))}
            </ExplanationList>

            <div className="text-foreground/90 mt-5 font-medium">
              Website Features
            </div>
            <ExplanationList>
              {FoundProjectObject.about_project.features.map((a: string) => (
                <li className="text-foreground/60" key={a}>
                  {a}
                </li>
              ))}
            </ExplanationList>
          </section>
        </section>

        {/* Design */}
        <section className="mt-10">
          <h2 className="text-foreground/90 mb-5 text-xl font-semibold">
            Design (at Figma)
          </h2>
          <LoadingFigma project={FoundProjectObject} />
        </section>
      </div>
    </div>
  );
}

export const dynamicParams = false;
