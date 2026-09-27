import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  CodeBracketIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import type { ReactNode } from "react";

import BlogGrid from "@/components/BlogGrid";
import ContactList from "@/components/ContactList";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import MoreItemsLink from "@/components/MoreItemsLink";
import ProjectsCard from "@/components/ProjectsCard";
import { ProjectsData } from "@/data/ProjectsData";

const HOME_PROJECTS_LIMIT = 4;

function Section({
  section,
  className = "",
  children,
  id,
}: {
  section: string;
  className?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id}>
      <div className="flex items-center justify-between">
        <h2
          className="text-foreground mb-6 text-2xl font-semibold select-none"
          id={`${id}-heading`}
        >
          {section}
        </h2>
      </div>
      <div className={className}>{children}</div>
    </section>
  );
}

export default function Home() {
  const remainingProjects = Math.max(
    ProjectsData.length - HOME_PROJECTS_LIMIT,
    0
  );
  return (
    <div className="mt-5 space-y-16 sm:mt-10">
      <section
        aria-labelledby="profile-heading"
        className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-4"
        id="contacts"
      >
        <div className="corner-squircle border-border flex items-center justify-center rounded-2xl px-3 pt-3 pb-2.5 select-none sm:border">
          <Image
            alt="Harits Syah"
            blurDataURL="/images/blur.jpg"
            className="z-10 h-25 w-25 rounded-full"
            height="100"
            priority
            src="/images/blur.jpg"
            width="100"
          />
        </div>
        <div
          className="corner-squircle border-border text-foreground/90 space-y-2.5 rounded-2xl border px-4 pt-3 pb-2.5 text-left"
          id="1234"
        >
          <h1 className="text-foreground/90 font-semibold" id="profile-heading">
            Harits Syah
          </h1>
          <div className="flex items-center space-x-2">
            <CodeBracketIcon
              aria-hidden="true"
              className="text-foreground/70 size-4 shrink-0 stroke-2"
            />
            <p>Web Product Engineer</p>
          </div>
          <div className="flex items-center space-x-2">
            <AcademicCapIcon
              aria-hidden="true"
              className="text-foreground/70 size-4 shrink-0 stroke-2"
            />
            <p>Math-Physics Teacher</p>
          </div>
          <div className="flex items-center space-x-2">
            <BuildingOffice2Icon
              aria-hidden="true"
              className="text-foreground/70 size-4 shrink-0 stroke-2"
            />
            <a
              className="hover:text-action focus-visible:outline-action inline-block focus-visible:outline-2 focus-visible:outline-offset-2"
              href="https://www.harislab.com"
              rel="noopener noreferrer"
              target="_blank"
              title="Haris Lab"
            >
              Haris Lab
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon
              aria-hidden="true"
              className="text-foreground/70 size-4 shrink-0 stroke-2"
            />
            <p>Tangerang, Indonesia</p>
          </div>
        </div>
        <ContactList />
        <div
          className="corner-squircle border-border text-foreground space-y-2 rounded-2xl border px-4 pt-3 pb-2.5"
          id="sections"
        >
          <p className="text-foreground font-semibold">Interests</p>
          <p className="text-foreground/70 -mt-1 leading-8">
            Web, JS, TS, Effect, React, Next.js, Functional Programming, Math,
            Physics, and Education .
          </p>
        </div>
      </section>
      <div className="space-y-16">
        <Section
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-0 lg:grid-cols-4"
          id="projects"
          section="Projects"
        >
          {ProjectsData.map((project, index) => (
            <ProjectsCard
              headingLevel={3}
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
        </Section>

        <Section id="experiments" section="Experiments">
          <ExperimentsGrid mobileLimit={4} />
        </Section>

        <Section className="grid grid-cols-1" id="blog" section="Blog">
          <BlogGrid headingLevel={3} mobileLimit={5} />
        </Section>

        <Section className="space-y-5" id="misc" section="More">
          <ul className="text-foreground/70 list-outside list-disc space-y-1 pl-4">
            <li>Touch typist (±90 WPM)</li>

            <li>
              <span className="text-foreground underline">haritssr</span> ={" "}
              <span className="text-foreground underline">harits</span>{" "}
              <span className="text-foreground underline">s</span>yah{" "}
              <span className="text-foreground underline">r</span>ahmatullah
            </li>
            <li>Former chess player, peaked at around 2000 Elo.</li>
            <li>Prefer eudaimonic to hedonic.</li>
            <li>Constraints give shape.</li>
            <li>
              Press <kbd className="text-foreground">⌘P</kbd> (or{" "}
              <kbd className="text-foreground">ctrl+P</kbd>) to search the site.
            </li>
            <li>
              <a
                className="text-action hover:underline"
                download="cv-dec-2024.pdf"
                href="/cv-dec-2024.pdf"
                title="Download CV"
              >
                CV
              </a>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
