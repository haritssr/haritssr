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
        className="flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-action focus-visible:outline-offset-2"
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
          alt=""
          aria-hidden="true"
          className={`h-4 w-4 object-contain ${each.icon === "/Icons/x.png" ? "rounded" : ""}`}
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
        className="flex items-center space-x-2.5 hover:underline focus-visible:outline-2 focus-visible:outline-action focus-visible:outline-offset-2"
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
    <ul className="corner-squircle space-y-2.5 rounded-2xl border border-zinc-300 p-3">
      {data.points.map((each) => (
        <li className="cursor-pointer" key={each.link}>
          {renderContact(each)}
        </li>
      ))}
    </ul>
  );
}

const data = {
  description: "My preferable communication channels.",
  points: [
    {
      icon: "/Icons/linkedin.jpg",
      link: "https://www.linkedin.com/in/haritssr",
      name: "LinkedIn",
    },
    { icon: "/Icons/gmail.jpg", link: "haritssr@gmail.com", name: "GMail" },
    {
      icon: "/Icons/github.jpg",
      link: "https://www.github.com/haritssr",
      name: "GitHub",
    },
    {
      icon: "/Icons/x.png",
      link: "https://x.com/intent/follow?screen_name=haritssr",
      name: "X",
    },

    {
      icon: "/Icons/haritssr.svg",
      link: "https://www.haritssr.com",
      name: "Website",
    },
  ],
  section: "Contacts",
};
