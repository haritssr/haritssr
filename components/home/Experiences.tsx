import { ExperiencesData } from "data/ExperiencesData";
import ExperienceCard from "@/components/ExperienceCard";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Experiences() {
  return (
    <HomeSectionWrapper
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4"
      explanation="Detail informations on how projects I belong to being handled."
      id="experiences"
      topic="Experiences"
    >
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
    </HomeSectionWrapper>
  );
}
