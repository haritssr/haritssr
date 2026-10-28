import {
  DocumentTextIcon,
  QueueListIcon,
  ClockIcon,
  MusicalNoteIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { TASK_LAYOUT } from "@/app/(tools)/timer/_components/taskPresentation";
import Accordion, { AccordionItem } from "@/components/Accordion";
import { ButtonLink } from "@/components/Button";
import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import Section from "@/components/Section";
import { PageStructuredData } from "@/components/StructuredData";
import { musicRoute, urlRoute } from "@/data/routes";
import { getCommitCount } from "@/utils/commits/commitHistory";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import Features from "./Features";

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
      <div className="space-y-16 pt-2">
        <PersonalDetails />
        <Section title="Tools">
          <Suspense fallback={<Tools />}>
            <LiveTools />
          </Suspense>
        </Section>
        <Section title="Features">
          <Features />
        </Section>
      </div>
    </>
  );
}

function PersonalDetails() {
  return (
    <section
      aria-label="About"
      id="Identity"
      className={`${TASK_LAYOUT.surface} border-border-hover/50 min-w-0 space-y-4 p-4!`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <div className="flex shrink-0 items-center gap-4">
          <Image
            alt={profileName}
            className="size-[3lh] shrink-0 rounded-full"
            height={100}
            loading="eager"
            src="/images/blur.jpg"
            width={100}
          />
          <div className="min-w-0">
            <p className="text-lg font-medium">{profileName}</p>
            <p className="text-secondary-foreground">
              <span className="block">Web Product Engineer</span>
              <span className="block">Science Teacher</span>
            </p>
          </div>
        </div>
        <div className="border-border hidden min-w-0 flex-1 border-l border-dashed pl-4 md:block">
          <ProfileInvitation />
        </div>
      </div>
      <div className="border-border grid gap-4 border-t border-dashed pt-4 md:grid-cols-3">
        <ul
          aria-label="Profile and contacts"
          className="text-secondary-foreground marker:text-muted min-w-0 list-outside list-disc space-y-1.5 pl-5 wrap-break-word"
        >
          <li>
            At{" "}
            <ExternalLink
              href="https://www.harimaki.com"
              name="harimaki.com"
              showArrow={false}
            />
            {" & "}
            <ExternalLink
              href="https://haritssr.com"
              name="haritssr.com"
              showArrow={false}
            />
          </li>
          <li>Tangerang, Indonesia</li>
          <li>
            <span className="text-identity-accent">haritssr</span> ={" "}
            <span className="text-identity-accent">harits</span>{" "}
            <span className="text-identity-accent">s</span>yah{" "}
            <span className="text-identity-accent">r</span>ahmatullah
          </li>
          {contacts.map((contact, index) => (
            <li id={index === 0 ? "contacts" : undefined} key={contact.link}>
              {renderContact(contact)}
            </li>
          ))}
        </ul>
        <div className="hidden md:contents">
          <PersonalNotes />
        </div>
        <div className="border-border border-t border-dashed pt-4 md:hidden">
          <ProfileInvitation />
        </div>
        <Accordion className="md:hidden">
          <AccordionItem
            excludeFromContents
            title="More info about me"
            value="personal-notes"
            variant="profile"
          >
            <div className="space-y-4">
              <PersonalNotes mobile />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function ProfileInvitation() {
  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-secondary-foreground">
        Need UI design or a high school lesson? Get in touch.
      </p>
      <ProfileActions />
    </div>
  );
}

function ProfileActions() {
  return (
    <div className="flex shrink-0 flex-col gap-3 lg:flex-row">
      <div className="flex flex-col gap-1 text-center lg:text-left">
        <ButtonLink
          href="mailto:haritssr@gmail.com?subject=Design%20consultation"
          size="profile"
        >
          Request a Design Consultation
        </ButtonLink>
        <p className="text-muted text-xs">UI/UX for web or mobile</p>
      </div>
      <div className="flex flex-col gap-1 text-center lg:text-left">
        <ButtonLink
          href="mailto:haritssr@gmail.com?subject=Lesson%20inquiry"
          size="profile"
          variant="profile-secondary"
        >
          Request a Private Lesson
        </ButtonLink>
        <p className="text-muted text-xs">Math, physics, or chemistry</p>
      </div>
    </div>
  );
}

function PersonalNotes({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <ul
        aria-label="Background and tools"
        id={mobile ? "personal-notes-mobile" : "personal-notes"}
        className="border-border text-secondary-foreground marker:text-muted min-w-0 list-outside list-disc space-y-1.5 pl-5 wrap-break-word md:border-l md:border-dashed md:pl-9"
      >
        <li>Touch typist, ±90 WPM.</li>
        <li>Former chess player, ±2000 Elo.</li>
        <li>I develop with Codex CLI in Zed.</li>
        <li>
          JS, TS, Effect, React, Next.js, FP, Math, Physics, Edu, and Design.
        </li>
        <li>Background in Physics</li>
      </ul>
      <ul
        aria-label="Principles"
        className="border-border text-secondary-foreground marker:text-muted min-w-0 list-outside list-disc space-y-1.5 border-t border-dashed pt-4 pl-5 wrap-break-word md:border-t-0 md:border-l md:pt-0 md:pl-9"
      >
        <li>
          <ExternalLink
            href="https://youtu.be/H7Sfo3lMB8c?t=72"
            name="Eudaimonia"
            showArrow={false}
            variant="muted"
          />{" "}
          &gt; Hedonia
        </li>
        <li>Effective Accelerationism (e/acc)</li>
        <li>Existence = f(constraints, maintainence)</li>
        <li>100% is easier than 98%</li>
        <li>What gets measured gets managed</li>
      </ul>
    </>
  );
}

async function LiveTools() {
  let count: number | undefined;
  try {
    count = await getCommitCount();
  } catch {
    console.error("Homepage commit count could not be loaded.");
  }
  return <Tools count={count} />;
}

function Tools({ count }: { count?: number }) {
  return (
    <nav
      aria-label="Tools"
      className="[&>a]:border-border-hover/50 [&>a:hover]:border-border-hover grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
    >
      <IndexCard
        title="Timer"
        badge="DB"
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
        badge="DB"
        description="Recent code changes and updates across this site."
        count={count}
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
      <IndexCard
        title={musicRoute.title}
        description={musicRoute.description}
        href={musicRoute.route}
        headingLevel={3}
        icon={
          <MusicalNoteIcon
            aria-hidden="true"
            className="text-foreground size-4.5 shrink-0"
            strokeWidth={1.5}
          />
        }
      />
      <IndexCard
        title={urlRoute.title}
        description={urlRoute.description}
        href={urlRoute.route}
        headingLevel={3}
        icon={
          <LinkIcon
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
        <span className="text-contact-accent" key={`u-${text.indexOf(chunk)}`}>
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
