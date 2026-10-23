import {
  DocumentTextIcon,
  QueueListIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import Section from "@/components/Section";
import { PageStructuredData } from "@/components/StructuredData";
import Table from "@/components/Table";
import { getCommitCount } from "@/utils/commits/commitHistory";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

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
const featureAccess = [
  { name: "Search", key: "K", access: "Search in the top bar" },
  {
    name: "Contents",
    key: "C",
    access: "Toggle Contents on nested pages with headings",
  },
  { name: "Share", key: "S", access: "Copy the current page URL" },
  { name: "Timer", key: "T", access: "Open Timer" },
  { name: "RSS", key: "R", access: "Open the RSS feed" },
  { name: "Install", key: "I", access: "Install the site, when available" },
];
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
        <Section title="Tools">
          <Suspense fallback={<Tools />}>
            <LiveTools />
          </Suspense>
        </Section>
        <Section title="Features">
          <ul className="text-foreground marker:text-foreground list-outside list-disc space-y-2 pl-5">
            <li>
              <span className="font-medium">Search:</span>{" "}
              <span className="text-muted">
                Find pages across the site and run global commands.
              </span>
            </li>
            <li>
              <span className="font-medium">Contents:</span>{" "}
              <span className="text-muted">
                Jump to sections within articles and nested pages.
              </span>
            </li>
            <li>
              <span className="font-medium">Share:</span>{" "}
              <span className="text-muted">
                Copy the current page URL, including its section link.
              </span>
            </li>
            <li>
              <span className="font-medium">Timer:</span>{" "}
              <span className="text-muted">
                Track tasks and keep a timer running across pages.
              </span>
            </li>
            <li>
              <span className="font-medium">RSS:</span>{" "}
              <span className="text-muted">
                Subscribe to new writing in your feed reader.
              </span>
            </li>
            <li>
              <span className="font-medium">Install:</span>{" "}
              <span className="text-muted">
                Add the site to your home screen for quick access.
              </span>
            </li>
          </ul>
        </Section>
        <Section title="Shortcuts">
          <div className="w-fit max-w-full">
            <div className="min-w-0">
              <Table className="w-max! whitespace-nowrap">
                <caption className="sr-only">
                  Feature keyboard shortcuts and access points
                </caption>
                <thead>
                  <tr className="divide-border bg-foreground/5 divide-x">
                    <th className="px-3 text-left font-medium" scope="col">
                      Feature
                    </th>
                    <th className="px-3 text-left font-medium" scope="col">
                      Keyboard shortcut
                    </th>
                    <th className="px-3 text-left font-medium" scope="col">
                      Access
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {featureAccess.map(({ name, key, access }) => (
                    <tr className="divide-border divide-x" key={name}>
                      <th
                        className="px-3 py-2 text-left font-medium"
                        scope="row"
                      >
                        {name}
                      </th>
                      <td className="px-3 py-2">
                        {name === "Search" ? (
                          <span className="whitespace-nowrap">
                            <kbd aria-label="Command K">⌘K</kbd> /{" "}
                            <kbd>Ctrl+K</kbd>
                          </span>
                        ) : (
                          <span className="whitespace-nowrap">
                            <kbd>Option+{key}</kbd> / <kbd>Alt+{key}</kbd>
                          </span>
                        )}
                      </td>
                      <td className="text-muted px-3 py-2">{access}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
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
      className="corner-squircle border-border/75 bg-interface-hover min-w-0 space-y-4 rounded-2xl border p-4"
    >
      <div className="flex items-center gap-4">
        <Image
          alt={profileName}
          className="size-16 shrink-0 rounded-full sm:size-14"
          height={100}
          loading="eager"
          src="/images/blur.jpg"
          width={100}
        />
        <div className="min-w-0">
          <p className="font-medium">{profileName}</p>
          <p className="text-muted">
            <span className="block sm:inline">Web Product Engineer</span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">Science Teacher</span>
          </p>
        </div>
      </div>
      <div className="border-border grid gap-4 border-t border-dashed pt-4 md:grid-cols-3">
        <ul
          aria-label="Profile and contacts"
          className="text-muted marker:text-muted min-w-0 list-outside list-disc space-y-1.5 pl-5 wrap-break-word"
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
            <span className="text-secondary-accent">haritssr</span> ={" "}
            <span className="text-secondary-accent">harits</span>{" "}
            <span className="text-secondary-accent">s</span>yah{" "}
            <span className="text-secondary-accent">r</span>ahmatullah
          </li>
          {contacts.map((contact, index) => (
            <li id={index === 0 ? "contacts" : undefined} key={contact.link}>
              {renderContact(contact)}
            </li>
          ))}
        </ul>
        <ul
          aria-label="Background and tools"
          id="personal-notes"
          className="border-border text-muted marker:text-muted min-w-0 list-outside list-disc space-y-1.5 border-t border-dashed pt-4 pl-5 wrap-break-word md:border-t-0 md:border-l md:pt-0 md:pl-9"
        >
          <li>Touch typist, ±90 WPM.</li>
          <li>Former chess player, ±2000 Elo.</li>
          <li>I develop with Codex CLI in Zed.</li>
          <li>
            JS, TS, Effect, React, Next.js, FP, Math, Physics, and Education.
          </li>
          <li>Background in Physics</li>
        </ul>
        <ul
          aria-label="Principles"
          className="border-border text-muted marker:text-muted min-w-0 list-outside list-disc space-y-1.5 border-t border-dashed pt-4 pl-5 wrap-break-word md:border-t-0 md:border-l md:pt-0 md:pl-9"
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
      </div>
    </section>
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
      className="grid gap-x-5 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
