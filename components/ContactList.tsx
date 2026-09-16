import Image from "next/image";

import { SITE_URL } from "@/utils/site";

// Matches an HTTP(S) URL prefix and captures the optional "www." subdomain.
// Example: "https://www.example.com" becomes "example.com" after replacement.
const urlPrefixPattern = /^https?:\/\/(?<www>www\.)?/u;

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
        className="focus-visible:outline-action flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={each.link}
        rel="noreferrer noopener"
        target="_blank"
        title={each.link}
      >
        <Image
          alt=""
          aria-hidden="true"
          className={`h-4 w-4 object-contain ${each.icon === "/icons/x.png" ? "rounded" : ""}`}
          height={20}
          src={each.icon}
          width={20}
        />
        <span className="text-zinc-500">{boldharitssr(displayedLink)}</span>
      </a>
    );
  }

  if (each.link.includes("@")) {
    return (
      <a
        className="focus-visible:outline-action flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        href={`mailto:${each.link}`}
        title={each.link}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-4 w-4 object-contain"
          height={20}
          src={each.icon}
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
    <div className="corner-squircle space-y-2.5 rounded-2xl border border-zinc-300 px-4 pt-3 pb-2.5">
      <p className="font-semibold text-zinc-800">Contacts</p>
      <ul className="space-y-2.5">
        {data.points.map((each) => (
          <li className="cursor-pointer" key={each.link}>
            {renderContact(each)}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
