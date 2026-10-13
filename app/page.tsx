import type { Metadata } from "next";
import Image from "next/image";

import ContactList from "@/components/ContactList";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import ExternalLink from "@/components/ExternalLink";
import HomeSearch from "@/components/HomeSearch";
import MoreItemsLink from "@/components/MoreItemsLink";
import ProjectsCard from "@/components/ProjectsCard";
import Section from "@/components/Section";
import { PageStructuredData } from "@/components/StructuredData";
import WritingTable from "@/components/WritingTable";
import { ProjectsData } from "@/data/ProjectsData";
import { createPageMetadata } from "@/utils/pageMetadata";

const HOME_PROJECTS_LIMIT = 4;

const profileName = "Harits Syah";
const homeDescription =
  "Explore Harits Syah's projects, interactive experiments, and writing on web development, math, physics, and education. Developer, teacher, and founder.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: profileName,
    description: homeDescription,
    socialDescription:
      "Projects, experiments, and writing by Harits Syah, a web product engineer and math-physics teacher.",
    path: "/",
  }),
  title: { absolute: profileName },
};

export default function Home() {
  return (
    <>
      <PageStructuredData
        name={profileName}
        description={homeDescription}
        path="/"
      />
      <div className="space-y-16">
        <ProfileSection />
        {/*<HomeSearch />*/}
        <HomeProjects />

        <Section id="experiments" title="Experiments">
          <ExperimentsGrid headingLevel={3} mobileLimit={4} />
        </Section>

        <Section id="writing" title="Writing">
          <WritingTable />
        </Section>
      </div>
    </>
  );
}

function ProfileSection() {
  return (
    <section aria-label="About Harits Syah" id="Identity">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0">
          <Image
            alt={profileName}
            blurDataURL="/images/blur.jpg"
            className="size-20 rounded-full"
            height="100"
            priority
            src="/images/blur.jpg"
            width="100"
          />
        </div>
        <ul
          aria-label="Profile details"
          className="text-foreground/70 marker:text-muted min-w-0 list-outside list-disc space-y-2 pl-5"
        >
          <li>Web Product Engineer</li>
          <li>Math-Physics Teacher</li>
          <li>
            <ExternalLink
              href="https://www.harimaki.com"
              name="Harimaki Studio"
            />
          </li>
          <li>Tangerang, Indonesia</li>
          <li>
            <a
              className="text-action focus-visible:outline-action hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              download="cv-dec-2024.pdf"
              href="/cv-dec-2024.pdf"
              title="Download CV"
            >
              Download CV
            </a>
          </li>
          <li>
            Interests: Web, JS, TS, Effect, React, Next.js, Functional
            Programming, Math, Physics, and Education.
          </li>
        </ul>
        <ul
          aria-label="Personal notes"
          className="text-foreground/70 marker:text-muted min-w-0 list-outside list-disc space-y-2 pl-5"
        >
          <li id="misc">Touch typist, ±90 WPM.</li>
          <li>Former chess player, ±2000 Elo.</li>
          <li>
            <span className="text-foreground">haritssr</span> ={" "}
            <span className="text-foreground">harits</span>{" "}
            <span className="text-foreground">s</span>yah{" "}
            <span className="text-foreground">r</span>ahmatullah
          </li>
          <li>I develop with Codex CLI in Zed.</li>
        </ul>
        <ul
          aria-label="Contact links"
          className="text-foreground/70 marker:text-muted min-w-0 list-outside list-disc space-y-2 pl-5 wrap-break-word"
        >
          <ContactList />
        </ul>
      </div>
    </section>
  );
}

function HomeProjects() {
  const remainingProjects = Math.max(
    ProjectsData.length - HOME_PROJECTS_LIMIT,
    0
  );
  return (
    <Section id="projects" title="Projects">
      <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {ProjectsData.map((project, index) => (
          <li
            className={
              index >= HOME_PROJECTS_LIMIT ? "hidden! sm:flex!" : "flex"
            }
            key={project.project_name}
          >
            <ProjectsCard
              headingLevel={3}
              description={project.about_client.short_about}
              href={project.about_client.website}
              imgSrc={project.about_client.logo_src}
              title={project.project_name}
            />
          </li>
        ))}
        {remainingProjects > 0 ? (
          <li className="sm:hidden">
            <MoreItemsLink
              count={remainingProjects}
              href="/projects"
              itemName="project"
            />
          </li>
        ) : null}
      </ul>
    </Section>
  );
}
