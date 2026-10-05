import Image from "next/image";

import CopyContactButton from "@/components/CopyContactButton";
import { SITE_URL } from "@/utils/site";

// Matches an HTTP(S) URL prefix and captures the optional "www." subdomain.
// Example: "https://www.example.com" becomes "example.com" after replacement.
const urlPrefixPattern = /^https?:\/\/(?<www>www\.)?/u;

const contacts = [
  { icon: "/icons/gmail.jpg", link: "haritssr@gmail.com", name: "GMail" },
  {
    icon: "/icons/github.jpg",
    link: "https://www.github.com/haritssr",
    name: "GitHub",
  },
  {
    icon: "/icons/x.png",
    link: "https://www.x.com/haritssr",
    name: "X",
  },
  {
    icon: "/icons/haritssr.svg",
    link: SITE_URL,
    name: "Website",
  },
];

export default function ContactList() {
  return (
    <section
      aria-labelledby="contacts-heading"
      id="contacts"
      className="text-foreground/70 space-y-2.5 bg-white pt-3 pr-1 pb-2.5 pl-4 lg:border-l"
    >
      <h2 className="text-foreground font-semibold" id="contacts-heading">
        Contacts
      </h2>
      <ul>
        {contacts.map((contact) => (
          <li
            className="flex cursor-pointer items-center justify-between"
            key={contact.link}
          >
            {renderContact(contact)}
            <CopyContactButton label={contact.name} value={contact.link} />
          </li>
        ))}
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
        <span key={`u-${text.indexOf(chunk)}`}>{siteName}</span>
      ) : (
        chunk
      )
    );
}

function renderContact(contact: { icon: string; link: string; name: string }) {
  if (contact.link.startsWith("http")) {
    const displayedLink = contact.link.replace(urlPrefixPattern, "");

    return (
      <a
        className="focus-visible:outline-action flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={contact.link}
        rel="noreferrer noopener"
        target="_blank"
      >
        <Image
          alt=""
          aria-hidden="true"
          className={`h-4 w-4 object-contain ${contact.icon === "/icons/x.png" ? "rounded" : ""}`}
          height={20}
          src={contact.icon}
          width={20}
        />
        <span>{highlightSiteName(displayedLink)}</span>
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
        <span>{highlightSiteName(contact.link)}</span>
      </a>
    );
  }

  return null;
}
