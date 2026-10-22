import {
  DocumentTextIcon,
  QueueListIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";

import history from "@/app/commits/changelog.json";
import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import { PageStructuredData } from "@/components/StructuredData";
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
        <PersonalDetails />
        <Tools />
      </div>
    </>
  );
}

function Profile() {
  return (
    <div className="min-w-0 p-4">
      <section aria-label="About" id="Identity">
        <ul
          aria-label="Profile and contact details"
          className="text-foreground/70 marker:text-muted list-outside list-disc space-y-2 pl-5 wrap-break-word"
        >
          <li>Product Engineer</li>
          <li>Science Teacher</li>
          <li>
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
        </ul>
      </section>
    </div>
  );
}

function PersonalDetails() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="corner-squircle bg-interface-hover rounded-xl">
        <Profile />
      </div>
      <div className="corner-squircle bg-interface-hover min-w-0 rounded-xl p-4 lg:col-span-2">
        <section aria-label="Personal notes and words" id="personal-notes">
          <ul className="marker:text-muted list-outside list-disc space-y-2 pl-5">
            <li>Touch typist, ±90 WPM.</li>
            <li>Former chess player, ±2000 Elo.</li>
            <li>
              <span className="text-foreground">haritssr</span> ={" "}
              <span className="text-foreground">harits</span>{" "}
              <span className="text-foreground">s</span>yah{" "}
              <span className="text-foreground">r</span>ahmatullah
            </li>
            <li>I develop with Codex CLI in Zed.</li>
            <li>Effective/Accelerationism</li>
            <li>
              Web, JS, TS, Effect, React, Next.js, Functional Programming, Math,
              Physics, and Education.
            </li>
            <li>Existence = f(constraints, maintainence, ...)</li>
            <li>100% is easier than 98%</li>
            <li>
              <ExternalLink
                href="https://youtu.be/H7Sfo3lMB8c?t=72"
                name="Eudaimonic"
                showArrow={false}
              />{" "}
              &gt; Hedonic
            </li>
          </ul>
        </section>
      </div>
      <div className="corner-squircle bg-interface-hover order-first flex justify-center rounded-xl py-8 sm:order-none lg:col-start-4 lg:self-start lg:justify-self-end lg:bg-transparent lg:p-0">
        <Image
          alt={profileName}
          className="size-25 rounded-full"
          height={100}
          src="/images/blur.jpg"
          width={100}
        />
      </div>
    </div>
  );
}

function Tools() {
  return (
    <nav
      aria-label="Tools"
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <IndexCard
        title="Design"
        description="Components and patterns used across this site."
        href="/design"
        headingLevel={3}
        icon={
          <SquaresPlusIcon
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
      <IndexCard
        title="Tree"
        description="Tree views of site map information architecture"
        href="/tree"
        headingLevel={3}
        icon={
          <QueueListIcon
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
