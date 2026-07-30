import { ProjectsData, type ProjectsDataType } from "data/ProjectsData";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LoadingFigma from "./LoadingFigma";

export const metadata: Metadata = {
  title: "Experience",
  description: "something",
};

export function generateStaticParams() {
  return ProjectsData.map(({ project_name }) => {
    return {
      project: project_name.toLowerCase().split(" ").join("-"),
    };
  });
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const FoundProjectObject: ProjectsDataType | undefined = ProjectsData.find(
    (e) => e.project_name.toLowerCase().split(" ").join("-") === project
  );

  if (!FoundProjectObject) {
    notFound();
  }

  return (
    <div className="bg-white">
      <main className="mx-auto min-h-screen w-full max-w-3xl">
        <div className="pt-10 sm:pt-20">
          <BackButton href="/projects" name="All Projects" />
        </div>
        {/* Title */}
        <section className="my-8 flex items-center justify-between rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 sm:my-10 sm:px-5 sm:py-4">
          <div className="">
            <div className="wrap-break-words font-bold text-2xl sm:text-3xl">
              {FoundProjectObject.project_name}
            </div>
            <div className="text-lg text-zinc-500">
              {FoundProjectObject.about_client.website.slice(8)}
            </div>
          </div>
          <Image
            alt={FoundProjectObject.project_name}
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
            <h2 className="mb-5 border-zinc-300 border-b pb-4 font-semibold text-xl text-zinc-800">
              About The Client
            </h2>
            <div className="mt-5 font-medium text-zinc-800">Company Name</div>
            <p className="text-zinc-500">
              {FoundProjectObject.about_client.company_name}
            </p>

            <div className="mt-5 font-medium text-zinc-800">Brand Name</div>
            <p className="text-zinc-500">
              {FoundProjectObject.about_client.brand_name}
            </p>

            <div className="mt-5 font-medium text-zinc-800">About</div>
            <p className="text-zinc-500">
              {FoundProjectObject.about_client.long_about}
            </p>

            <div className="mt-5 font-medium text-zinc-800">Phone Number</div>
            <p className="text-zinc-500">
              {FoundProjectObject.about_client.phone_number}
            </p>

            <div className="mt-5 font-medium text-zinc-800">Website</div>
            <ExternalLink
              href={FoundProjectObject.about_client.website}
              name={FoundProjectObject.about_client.website.slice(8)}
            />
            <div className="mt-5 font-medium text-zinc-800">
              Office Location
            </div>
            <p className="text-zinc-500">
              {FoundProjectObject.about_client.office_location}
            </p>
          </section>

          {/* About The Project */}
          <section>
            <h2 className="mb-5 border-zinc-300 border-b pb-4 font-semibold text-xl text-zinc-800">
              About The Project
            </h2>

            <div className="mt-5 font-medium text-zinc-800">My Role</div>
            <ExplanationList>
              {FoundProjectObject.about_project.my_role.map((a: string) => (
                <li className="text-zinc-500" key={a}>
                  {a}
                </li>
              ))}
            </ExplanationList>

            <div className="mt-5 font-medium text-zinc-800">Working Period</div>
            <p className="text-zinc-500">
              {FoundProjectObject.about_project.working_period}
            </p>

            <div className="mt-5 font-medium text-zinc-800">Website Status</div>
            <ExplanationList>
              {FoundProjectObject.about_project.website_status.map(
                (a: string) => (
                  <li className="text-zinc-500" key={a}>
                    {a}
                  </li>
                )
              )}
            </ExplanationList>

            <div className="mt-5 font-medium text-zinc-800">Website Routes</div>
            <ExplanationList>
              {FoundProjectObject.about_project.routes.map((a: string) => (
                <li className="text-zinc-500" key={a}>
                  {a}
                </li>
              ))}
            </ExplanationList>

            <div className="mt-5 font-medium text-zinc-800">
              Website Features
            </div>
            <ExplanationList>
              {FoundProjectObject.about_project.features.map((a: string) => (
                <li className="text-zinc-500" key={a}>
                  {a}
                </li>
              ))}
            </ExplanationList>
          </section>
        </section>

        {/* Design */}
        <section className="mt-10">
          <h2 className="mb-5 font-semibold text-xl text-zinc-800">
            Design (at Figma)
          </h2>
          <LoadingFigma project={FoundProjectObject} />
        </section>
      </main>
    </div>
  );
}
