import {
  BeakerIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";

import ContactList from "@/components/ContactList";
import ExternalLink from "@/components/ExternalLink";
import InternalLinkCardWithNumber from "@/components/InternalLinkCardWithNumber";
import { PageStructuredData } from "@/components/StructuredData";
import { ProjectsData } from "@/data/ProjectsData";
import { getAvailableExperimentCount } from "@/utils/experimentCatalog";
import { createPageMetadata } from "@/utils/pageMetadata";
import { allWritingPosts } from "@/utils/writing-posts";

const homeNavigation = [
  {
    href: "/projects",
    title: "Projects",
    count: ProjectsData.length,
    countLabel: "projects",
    icon: BriefcaseIcon,
    description: "Websites and products I’ve designed and built.",
  },
  {
    href: "/experiments",
    title: "Experiments",
    count: getAvailableExperimentCount(),
    countLabel: "experiments",
    icon: BeakerIcon,
    description: "Interactive lessons and tools for exploration.",
  },
  {
    href: "/writing",
    title: "Writing",
    count: allWritingPosts.length,
    countLabel: "writing posts",
    icon: DocumentTextIcon,
    description: "Notes and ideas about the things I’m learning.",
  },
  {
    href: "/design",
    title: "Design",
    count: 36,
    countLabel: "design examples",
    icon: RectangleGroupIcon,
    description: "Components and patterns used across this site.",
  },
];

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
        <HomeNavigation />
      </div>
    </>
  );
}

function HomeNavigation() {
  return (
    <nav
      aria-label="Explore the site"
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
    >
      {homeNavigation.map(
        ({ href, title, description, icon: Icon, count, countLabel }) => (
          <InternalLinkCardWithNumber
            href={href}
            key={href}
            title={title}
            description={description}
            count={count}
            countLabel={countLabel}
            icon={
              <Icon
                aria-hidden="true"
                className="text-foreground size-4.5 shrink-0"
                strokeWidth={1.5}
              />
            }
          />
        )
      )}
    </nav>
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
