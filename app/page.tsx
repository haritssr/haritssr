import {
  BeakerIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import InternalLink from "@/components/InternalLink";
import { PageStructuredData } from "@/components/StructuredData";
import { ProjectsData } from "@/data/ProjectsData";
import { getAvailableLabCount } from "@/utils/labCatalog";
import { createPageMetadata } from "@/utils/pageMetadata";
import { allWritingPosts } from "@/utils/writing-posts";

// Matches an HTTP(S) URL prefix and captures the optional "www." subdomain.
// Example: "https://www.example.com" becomes "example.com" after replacement.
const urlPrefixPattern = /^https?:\/\/(?<www>www\.)?/u;

const contacts = [
  { link: "haritssr@gmail.com", name: "GMail" },
  {
    link: "https://www.x.com/haritssr",
    name: "X",
  },
  {
    link: "https://www.github.com/haritssr",
    name: "GitHub",
  },
];

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
    href: "/labs",
    title: "Labs",
    count: getAvailableLabCount(),
    countLabel: "labs",
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
  "Explore Harits Syah's projects, interactive labs, and writing on web development, math, physics, and education. Developer, teacher, and founder.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: profileName,
    description: homeDescription,
    socialDescription:
      "Projects, labs, and writing by Harits Syah, a web product engineer and math-physics teacher.",
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
          <IndexCard
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
      className="mt-6 md:grid md:grid-cols-4 md:items-start md:gap-5"
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
        className="text-foreground/70 marker:text-muted list-outside list-disc space-y-2 pl-5 wrap-break-word md:col-span-3 md:col-start-1 md:row-start-1"
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
        {contacts.map((contact, index) => (
          <li id={index === 0 ? "contacts" : undefined} key={contact.link}>
            {renderContact(contact)}
          </li>
        ))}
        <li>
          <InternalLink href="/more" variant="inline">
            More
          </InternalLink>
        </li>
      </ul>
    </section>
  );
}

function highlightSiteName(text: string, siteName = "haritssr") {
  return text
    .replace(siteName, `§§${siteName}§§`)
    .split("§§")
    .map((chunk) =>
      chunk === siteName ? (
        <span className="text-foreground" key={`u-${text.indexOf(chunk)}`}>
          {siteName}
        </span>
      ) : (
        chunk
      )
    );
}

function renderContact(contact: { link: string; name: string }) {
  if (contact.link.startsWith("http")) {
    const displayedLink = contact.link.replace(urlPrefixPattern, "");

    return (
      <a
        className="focus-visible:outline-action hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={contact.link}
        rel="noreferrer noopener"
        target="_blank"
      >
        <span>{highlightSiteName(displayedLink)}</span>
      </a>
    );
  }

  if (contact.link.includes("@")) {
    return (
      <a
        className="focus-visible:outline-action hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={`mailto:${contact.link}`}
        title={contact.link}
      >
        <span>{highlightSiteName(contact.link)}</span>
      </a>
    );
  }

  return null;
}
