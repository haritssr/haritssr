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
import InternalLink from "@/components/InternalLink";
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
    <section
      aria-label="About Harits Syah"
      className="space-y-6 md:grid md:grid-cols-4 md:items-start md:gap-8 md:space-y-0"
      id="Identity"
    >
      <Image
        alt={profileName}
        blurDataURL="/images/blur.jpg"
        className="size-25 rounded-full md:col-start-4 md:row-start-1 md:self-start md:justify-self-end"
        height="100"
        priority
        src="/images/blur.jpg"
        width="100"
      />
      <ul
        aria-label="Profile and contact details"
        className="text-foreground/70 marker:text-muted list-outside list-disc space-y-3 pl-5 wrap-break-word md:col-span-3 md:col-start-1 md:row-start-1"
      >
        <li>
          <span className="text-foreground">Product Engineer</span> &{" "}
          <span className="text-foreground">Science Teacher</span> at{" "}
          <ExternalLink
            href="https://www.harimaki.com"
            name="Harimaki"
            showArrow={false}
          />
        </li>
        <li>Tangerang, Indonesia</li>
        <li className="list-none">
          <ul
            aria-label="Contact links"
            className="list-outside list-disc space-y-3"
          >
            <ContactList />
          </ul>
        </li>
        <li>
          <InternalLink href="/more" variant="inline">
            More
          </InternalLink>
        </li>
      </ul>
    </section>
  );
}
