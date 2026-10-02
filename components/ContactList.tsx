import Image from "next/image";

import { SITE_URL } from "@/utils/site";

// Matches an HTTP(S) URL prefix and captures the optional "www." subdomain.
// Example: "https://www.example.com" becomes "example.com" after replacement.
const urlPrefixPattern = /^https?:\/\/(?<www>www\.)?/u;

const data = {
  description: "My preferable communication channels.",
  points: [
    // {
    //   icon: "/icons/linkedin.jpg",
    //   link: "https://www.linkedin.com/in/haritssr",
    //   name: "LinkedIn",
    // },
    { icon: "/icons/gmail.jpg", link: "haritssr@gmail.com", name: "GMail" },
    {
      icon: "/icons/github.jpg",
      link: "https://www.github.com/haritssr",
      name: "GitHub",
    },
    {
      icon: "/icons/x.png",
      link: "https://x.com/intent/follow?screen_name=haritssr",
      name: "X",
    },

    {
      icon: "/icons/haritssr.svg",
      link: SITE_URL,
      name: "Website",
    },
  ],
  section: "Contacts",
};

export default function ContactList() {
  return (
    <div className="space-y-2.5 bg-white px-4 pt-3 pb-2.5 lg:border-l">
      <h2 className="text-foreground font-semibold">Contacts</h2>
      <ul className="space-y-2.5">
        {data.points.map((contact) => (
          <li className="cursor-pointer" key={contact.link}>
            {renderContact(contact)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function highlightSiteName(text: string, siteName = "haritssr") {
  return text
    .replace(siteName, `§§${siteName}§§`)
    .split("§§")
    .map((chunk) =>
      chunk === siteName ? (
        <span className="text-foreground/90" key={`u-${text.indexOf(chunk)}`}>
          {siteName}
        </span>
      ) : (
        chunk
      )
    );
}

function renderContact(contact: { link: string; icon: string }) {
  if (contact.link.startsWith("http")) {
    const displayedLink = contact.link.includes("x.com/intent/follow")
      ? "x.com/haritssr"
      : contact.link.replace(urlPrefixPattern, "");

    return (
      <a
        className="focus-visible:outline-action flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={contact.link}
        rel="noreferrer noopener"
        target="_blank"
        title={contact.link}
      >
        <Image
          alt=""
          aria-hidden="true"
          className={`h-4 w-4 object-contain ${contact.icon === "/icons/x.png" ? "rounded" : ""}`}
          height={20}
          src={contact.icon}
          width={20}
        />
        <span className="text-foreground/60">
          {highlightSiteName(displayedLink)}
        </span>
      </a>
    );
  }

  if (contact.link.includes("@")) {
    return (
      <a
        className="focus-visible:outline-action flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={`mailto:${contact.link}`}
        title={contact.link}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-4 w-4 object-contain"
          height={20}
          src={contact.icon}
          width={20}
        />
        <span className="text-foreground/60">
          {highlightSiteName(contact.link)}
        </span>
      </a>
    );
  }

  return null;
}
