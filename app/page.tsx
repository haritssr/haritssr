import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  CodeBracketIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import BlogGrid from "@/components/BlogGrid";
import ContactList from "@/components/ContactList";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import ExternalLink from "@/components/ExternalLink";
import HomeSearch from "@/components/HomeSearch";
import MoreItemsLink from "@/components/MoreItemsLink";
import ProjectsCard from "@/components/ProjectsCard";
import { PageStructuredData } from "@/components/StructuredData";
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
    <div className="space-y-20 sm:mt-10">
      <PageStructuredData
        name={profileName}
        description={homeDescription}
        path="/"
      />
      <ProfileSection />
      <HomeSearch />
      <HomeProjects />

      <Section id="experiments" title="Experiments">
        <ExperimentsGrid headingLevel={3} mobileLimit={4} />
      </Section>

      <Section className="grid grid-cols-1" id="blog" title="Blog">
        <BlogGrid headingLevel={3} mobileLimit={5} />
      </Section>

      <MoreDetails />
    </div>
  );
}

function ProfileSection() {
  return (
    <section aria-labelledby="profile-heading" className="pt-5" id="Identity">
      <div className="corner-squircle border-border divide-border bg-border-interface-hover lg:bg-surface-hover grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:divide-x">
        <div className="flex flex-col items-center justify-center gap-2.5 bg-white py-5">
          <Image
            alt={profileName}
            blurDataURL="/images/blur.jpg"
            className="z-10 h-25 w-25 rounded-full"
            height="100"
            priority
            src="/images/blur.jpg"
            width="100"
          />
          <h1 className="text-foreground font-semibold" id="profile-heading">
            {profileName}
          </h1>
        </div>
        <div className="text-foreground/70 space-y-2.5 bg-white px-4 pt-3 pb-2.5 text-left lg:border-l">
          <h2 className="text-foreground font-semibold">Profile</h2>
          <ProfileRow
            icon={
              <CodeBracketIcon
                aria-hidden="true"
                className="size-4 shrink-0 stroke-2"
              />
            }
          >
            <p>Web Product Engineer</p>
          </ProfileRow>
          <ProfileRow
            icon={
              <AcademicCapIcon
                aria-hidden="true"
                className="size-4 shrink-0 stroke-2"
              />
            }
          >
            <p>Math-Physics Teacher</p>
          </ProfileRow>
          <ProfileRow
            icon={
              <BuildingOffice2Icon
                aria-hidden="true"
                className="size-4 shrink-0 stroke-2"
              />
            }
          >
            <a
              className="focus-visible:outline-action hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="https://www.harimaki.com"
              rel="noopener noreferrer"
              target="_blank"
              title="Harimaki Studio"
            >
              Harimaki Studio
            </a>
          </ProfileRow>
          <ProfileRow
            icon={
              <MapPinIcon
                aria-hidden="true"
                className="size-4 shrink-0 stroke-2"
              />
            }
          >
            <p>Tangerang, Indonesia</p>
          </ProfileRow>
        </div>
        <ContactList />
        <div className="space-y-2 bg-white px-4 pt-3 pb-2.5 lg:border-l">
          <h2 className="text-foreground font-semibold">Interests</h2>
          <p className="text-foreground/70 -mt-1 leading-8">
            Web, JS, TS, Effect, React, Next.js, Functional Programming, Math,
            Physics, and Education.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProfileRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {children}
    </div>
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

function MoreDetails() {
  return (
    <Section id="misc" title="More">
      <ul className="text-foreground/70 list-outside list-disc space-y-1 pl-4">
        <li>
          <a
            className="text-action hover:underline"
            download="cv-dec-2024.pdf"
            href="/cv-dec-2024.pdf"
            title="Download CV"
          >
            Download CV
          </a>
        </li>
        <li>Touch typist, around 90 WPM.</li>
        <li>Constraints give shape.</li>
        <li>
          <ExternalLink
            href="https://youtu.be/H7Sfo3lMB8c?t=60"
            name="Eudaimonic over hedonic"
          />
        </li>
        <li>
          <ExternalLink
            href="https://beff.substack.com/p/notes-on-eacc-principles-and-tenets"
            name="Effective accelerationism"
          />
          (
          <ExternalLink
            href="https://effectiveaccelerationism.substack.com/p/what-the-f-is-eacc"
            name="e/acc"
          />
          ).
        </li>
        <li>
          <span className="text-foreground underline">haritssr</span> ={" "}
          <span className="text-foreground underline">harits</span>{" "}
          <span className="text-foreground underline">s</span>yah{" "}
          <span className="text-foreground underline">r</span>ahmatullah
        </li>
        <li>
          Press <kbd className="text-foreground">⌘P</kbd> (or{" "}
          <kbd className="text-foreground">Ctrl+P</kbd>) to search the site.
        </li>
        <li>I develop with Codex CLI in Zed.</li>
        <li>Former chess player, rated around 2000 Elo.</li>
      </ul>
    </Section>
  );
}

function Section({
  title,
  className = "",
  children,
  id,
}: {
  title: string;
  className?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id}>
      <h2
        className="text-foreground pb-6 text-2xl font-semibold"
        id={`${id}-heading`}
      >
        {title}
      </h2>
      <div className={className}>{children}</div>
    </section>
  );
}
