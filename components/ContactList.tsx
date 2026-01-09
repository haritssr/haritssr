"use client";

import { ContactData } from "data/AboutData";
import Image from "next/image";

function boldUsername(text: string, username = "haritssr") {
  return (
    <>
      {text
        .replaceAll(username, `§§${username}§§`)
        .split("§§")
        .map((chunk) =>
          chunk === username ? (
            <span className="text-zinc-800" key={`u-${text.indexOf(chunk)}`}>
              {username}
            </span>
          ) : (
            chunk
          )
        )}
    </>
  );
}

function renderContact(each: { link: string; icon: string }) {
  const isHttp = each.link.startsWith("http");
  const isEmail = each.link.includes("@");

  if (isHttp) {
    return (
      <a
        className="corner-squircle flex items-center space-x-2 rounded-xl border border-zinc-300 px-2 py-1.5 sm:mr-1.5 sm:py-1 sm:hover:bg-zinc-100"
        href={each.link}
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
        <span className="text-zinc-500">
          {boldUsername(each.link.replace(/^https?:\/\/(www\.)?/, ""))}
        </span>
      </a>
    );
  }

  if (isEmail) {
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
        <span className="text-zinc-500">{boldUsername(each.link)}</span>
      </a>
    );
  }

  return null;
}

export default function ContactList() {
  return (
    <div className="justify-center self-center">
      <ul className="space-y-1.5">
        {ContactData.points.map((each) => (
          <li className="cursor-pointer" key={each.link}>
            {renderContact(each)}
          </li>
        ))}
      </ul>
    </div>
  );
}
