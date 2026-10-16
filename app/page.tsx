import { ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import InternalLink from "@/components/InternalLink";
import { PageStructuredData } from "@/components/StructuredData";
import history from "@/data/changelog.json";
import { createPageMetadata } from "@/utils/pageMetadata";

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
        <Profile />
        <Tools />
      </div>
    </>
  );
}

function Profile() {
  return (
    <section
      aria-label="About Harits Syah"
      className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-start lg:grid-cols-4"
      id="Identity"
    >
      <Image
        alt={profileName}
        blurDataURL="/images/blur.jpg"
        className="size-25 rounded-full sm:col-start-2 sm:row-start-1 sm:self-start sm:justify-self-end lg:col-start-4"
        height="100"
        priority
        src="/images/blur.jpg"
        width="100"
      />
      <ul
        aria-label="Profile and contact details"
        className="text-foreground/70 marker:text-muted list-outside list-disc space-y-2 pl-5 wrap-break-word sm:col-start-1 sm:row-start-1 lg:col-span-3"
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

function Tools() {
  return (
    <nav
      aria-label="Tools"
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <IndexCard
        title="Timer"
        description="A simple timer for focused work and everyday tasks."
        href="/timer"
        headingLevel={3}
        icon={
          <ClockIcon
            aria-hidden="true"
            className="text-foreground size-4.5 shrink-0"
            strokeWidth={1.5}
          />
        }
      />
      <IndexCard
        title="Commits"
        description="Recent code changes and updates across this site."
        count={history.commits.length}
        countLabel="commits"
        href="/commits"
        headingLevel={3}
        icon={
          <DocumentTextIcon
            aria-hidden="true"
            className="text-foreground size-4.5 shrink-0"
            strokeWidth={1.5}
          />
        }
      />
    </nav>
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
