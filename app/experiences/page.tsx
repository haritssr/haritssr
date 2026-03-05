import { ExperiencesData } from "data/ExperiencesData";
import { EXPERIENCES_DESCRIPTION } from "data/PageDescriptions";
import type { Metadata } from "next";
import ExperienceCard from "@/components/ExperienceCard";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Experiences",
  description: EXPERIENCES_DESCRIPTION,
};

export default function ExperiencesPage() {
  return (
    <>
      <PageTitle title="Experiences" />
      <PageDescription description={EXPERIENCES_DESCRIPTION} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {ExperiencesData.map((d) => (
          <ExperienceCard
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
      </div>
    </>
  );
}
