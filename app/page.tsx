import {
  DocumentTextIcon,
  QueueListIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Image from "next/image";

import history from "@/app/commits/changelog.json";
import ExternalLink from "@/components/ExternalLink";
import IndexCard from "@/components/IndexCard";
import Section from "@/components/Section";
import { PageStructuredData } from "@/components/StructuredData";
import Table from "@/components/Table";
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
          <Tools />
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

function Profile() {
  return (
    <div className="min-w-0 p-4">
      <section aria-label="About" id="Identity">
        <ul
          aria-label="Profile details"
          className="text-foreground marker:text-foreground list-outside list-disc space-y-2 pl-5 wrap-break-word"
        >
          <li>Web Product Engineer</li>
          <li>Science Teacher</li>
          <li>
            Build{" "}
            <ExternalLink
              href="https://www.harimaki.com"
              name="Harimaki"
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
        </ul>
        <hr className="border-border my-4" />
        <ul
          aria-label="Contact details"
          className="text-foreground marker:text-foreground list-outside list-disc space-y-2 pl-5 wrap-break-word"
        >
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
          <ul className="text-foreground marker:text-foreground list-outside list-disc space-y-2 pl-5">
            <li>Touch typist, ±90 WPM.</li>
            <li>Former chess player, ±2000 Elo.</li>
            <li>I develop with Codex CLI in Zed.</li>

            <li>JS, TS, Effect, React, Next.js, FP, Math, Phy, and Edu.</li>
          </ul>
          <hr className="border-border my-4" />
          <ul className="text-foreground marker:text-foreground list-outside list-disc space-y-2 pl-5">
            <li>
              <ExternalLink
                href="https://youtu.be/H7Sfo3lMB8c?t=72"
                name="Eudaimonic"
                showArrow={false}
              />{" "}
              &gt; Hedonic
            </li>
            <li>Effective/Accelerationism</li>
            <li>Existence = f(constraints, maintainence, ...)</li>
            <li>100% is easier than 98%</li>
            <li>What gets measured gets managed</li>
          </ul>
        </section>
      </div>
      <div className="corner-squircle bg-interface-hover order-first flex justify-center rounded-xl py-8 sm:order-0 lg:col-start-4 lg:self-start lg:justify-self-end lg:bg-transparent lg:p-0">
        <Image
          alt={profileName}
          className="size-25 rounded-full"
          height={100}
          loading="eager"
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
        <span className="text-danger" key={`u-${text.indexOf(chunk)}`}>
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
