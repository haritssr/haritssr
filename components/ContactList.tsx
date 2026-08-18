"use client";

import Image from "next/image";

// Matches an HTTP(S) URL prefix and captures the optional "www." subdomain.
// Example: "https://www.example.com" becomes "example.com" after replacement.
const urlPrefixPattern = /^https?:\/\/(www\.)?/;

function boldharitssr(strippedURL: string, haritssr = "haritssr") {
  return strippedURL
    .replace(haritssr, `§§${haritssr}§§`)
    .split("§§")
    .map((chunk) =>
      chunk === haritssr ? (
        <span className="text-zinc-800" key={`u-${strippedURL.indexOf(chunk)}`}>
          {haritssr}
        </span>
      ) : (
        chunk
      )
    );
}

function renderContact(each: { link: string; icon: string }) {
  if (each.link.startsWith("http")) {
    const displayedLink = each.link.includes("x.com/intent/follow")
      ? "x.com/haritssr"
      : each.link.replace(urlPrefixPattern, "");

    return (
      <a
        className="corner-squircle flex items-center space-x-2 rounded-xl border border-zinc-300 px-2 py-1.5 sm:mr-1.5 sm:py-1 sm:hover:bg-zinc-100"
        href={
          each.link === "https://www.haritssr.com"
            ? "https://haritssr.vercel.app"
            : each.link
        }
        rel="noreferrer noopener"
        target="_blank"
        title={each.link}
      >
        <Image
          alt={each.link}
          className="h-4 w-4"
          height={20}
          src={each.icon}
          title={each.link}
          width={20}
        />
        <span className="text-zinc-500">{boldharitssr(displayedLink)}</span>
      </a>
    );
  }

  if (each.link.includes("@")) {
    return (
      <a
        className="flex items-center space-x-2 rounded border border-zinc-300 px-2 py-1.5 sm:mr-1.5 sm:py-1 sm:hover:bg-zinc-100"
        href={`mailto:${each.link}`}
        title={each.link}
      >
        <Image
          alt={each.link}
          className="h-4 w-4"
          height={20}
          src={each.icon}
          title={each.link}
          width={20}
        />
        <span className="text-zinc-500">{boldharitssr(each.link)}</span>
      </a>
    );
  }

  return null;
}

export default function ContactList() {
  return (
    <div className="justify-center self-center">
      <ul className="space-y-4 md:space-y-1.5">
        {ContactData.points.map((each) => (
          <li className="cursor-pointer" key={each.link}>
            {renderContact(each)}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ContactData = {
  description: "My preferable communication channels.",
  points: [
    {
      icon: "/Icons/linkedin.jpg",
      link: "https://www.linkedin.com/in/haritssr",
      name: "LinkedIn",
    },
    { icon: "/Icons/gmail.jpg", link: "haritssr@gmail.com", name: "GMail" },
    {
      icon: "/Icons/x.png",
      link: "https://x.com/intent/follow?screen_name=haritssr",
      name: "X",
    },
    {
      icon: "/Icons/github.jpg",
      link: "https://www.github.com/haritssr",
      name: "GitHub",
    },
    {
      icon: "/Icons/haritssr.svg",
      link: "https://www.haritssr.com",
      name: "Website",
    },
  ],
  section: "Contacts",
};
