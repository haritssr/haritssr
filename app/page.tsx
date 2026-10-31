import {
  DocumentTextIcon,
  QueueListIcon,
  ClockIcon,
  MusicalNoteIcon,
  LinkIcon,
  CodeBracketIcon,
  RssIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";

import Accordion, { AccordionItem } from "@/components/Accordion";
import { ButtonLink } from "@/components/Button";
import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import Section from "@/components/Section";
import { PageStructuredData } from "@/components/StructuredData";
import { apiRoute, musicRoute, urlRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";
import { RSS_PATH } from "@/utils/metadata/site";

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
      <div className="space-y-16 sm:pt-2 lg:pt-6">
        <PersonalDetails />
        <Section title="Tools">
          <Tools />
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
      className="corner-squircle border-hairline border-border/40 bg-interface-hover min-w-0 space-y-4 rounded-3xl p-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <p className="text-foreground">
              <span className="block">Web Product Engineer</span>
              <span className="block">Science Teacher</span>
            </p>
          </div>
        </div>
        <div className="border-border before:border-border relative hidden min-w-0 border-l border-dashed pl-4 before:absolute before:-top-4 before:-left-px before:h-4 before:border-l before:border-dashed md:col-span-2 md:block">
          <ProfileInvitation />
        </div>
      </div>
      <div className="md:before:border-border relative grid gap-4 md:grid-cols-3 md:before:absolute md:before:-top-3 md:before:-right-4 md:before:left-[calc((100%+1rem)/3)] md:before:border-t md:before:border-dashed">
        <ul
          aria-label="Profile and contacts"
          className="text-muted marker:text-muted min-w-0 list-outside list-disc space-y-2 pl-5 wrap-break-word"
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
            <span className="text-accent">haritssr</span> ={" "}
            <span className="text-accent">harits</span>{" "}
            <span className="text-accent">s</span>yah{" "}
            <span className="text-accent">r</span>ahmatullah
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
        <div className="border-border border-y border-dashed py-4 md:hidden">
          <ProfileInvitation />
        </div>
        <Accordion className="md:hidden">
          <AccordionItem
            excludeFromContents
            title="More about me"
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
    <div className="flex h-full flex-col gap-4 lg:flex-row lg:items-start">
      <p className="text-foreground min-w-0 font-medium lg:flex-1">
        Need a design or private lesson?
      </p>
      <ProfileActions />
    </div>
  );
}

function ProfileActions() {
  return (
    <div className="flex shrink-0 flex-col gap-3 lg:flex-row-reverse">
      <div className="flex flex-col gap-1 text-left">
        <ButtonLink
          href="mailto:haritssr@gmail.com?subject=Design%20consultation"
          size="profile"
        >
          Request a Design Consultation
        </ButtonLink>
        <p className="text-muted pl-0.5 text-xs">UI/UX for web or mobile.</p>
      </div>
      <div className="flex flex-col gap-1 text-left">
        <ButtonLink
          href="mailto:haritssr@gmail.com?subject=Lesson%20inquiry"
          size="profile"
          variant="secondary"
        >
          Request a Private Lesson
        </ButtonLink>
        <p className="text-muted pl-0.5 text-xs">
          Math, physics, or chemistry.
        </p>
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
        className="border-border text-muted marker:text-muted md:after:border-border relative min-w-0 list-outside list-disc space-y-2 pl-5 wrap-break-word md:-mt-4 md:border-l md:border-dashed md:pt-4 md:pl-9 md:after:absolute md:after:-bottom-4 md:after:-left-px md:after:h-4 md:after:border-l md:after:border-dashed"
      >
        <li>Touch typist, ±90 WPM.</li>
        <li>Former chess player, ±2000 Elo.</li>
        <li>I develop with Codex CLI in Zed.</li>
        <li>Background in Physics</li>
        <li>
          JS, TS, Effect, React, Next.js, FP, Math, Physics, Edu, and Design.
        </li>
      </ul>
      <ul
        aria-label="Principles"
        className="border-border text-muted marker:text-muted md:before:border-border md:after:border-border relative min-w-0 list-outside list-disc space-y-2 border-t border-dashed pt-4 pl-5 wrap-break-word md:border-t-0 md:border-l md:pt-0 md:pl-9 md:before:absolute md:before:-top-3 md:before:-left-px md:before:h-3 md:before:border-l md:before:border-dashed md:after:absolute md:after:-bottom-4 md:after:-left-px md:after:h-4 md:after:border-l md:after:border-dashed"
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
        <li>100% is easier than 98%</li>
        <li>What gets measured gets managed</li>
        <li>Existence = f(constraints, maintenance)</li>
      </ul>
    </>
  );
}

function Tools() {
  return (
    <nav
      aria-label="Tools"
      className="[&>a]:border-hairline [&>a]:border-border/40 [&>a]:bg-interface-hover [&>a:hover]:border-border [&>a:hover]:bg-middle-hover/70 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 sm:[&_h3]:text-base [&>a]:rounded-2xl [&>a]:px-3 [&>a]:py-2.5 [&>a:active]:scale-98 [&>a>div>div:first-child>svg]:stroke-2 [&>a>div>div:first-child>svg]:opacity-75"
    >
      <IndexCard
        title="Design"
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
        title="Timer"
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
        title={musicRoute.title}
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
        title="Commits"
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
        title={urlRoute.title}
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
      <IndexCard
        title={apiRoute.title}
        href={apiRoute.route}
        headingLevel={3}
        icon={
          <CodeBracketIcon
            aria-hidden="true"
            className="text-foreground size-4.5 shrink-0"
            strokeWidth={1.5}
          />
        }
      />
      <IndexCard
        title="RSS"
        href={RSS_PATH}
        headingLevel={3}
        icon={
          <RssIcon
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
        <span className="text-success" key={`u-${text.indexOf(chunk)}`}>
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
