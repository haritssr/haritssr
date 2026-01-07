"use client";

import { ContactData } from "data/AboutData";
import Image from "next/image";

export default function ContactList() {
  return (
    <div className="justify-center self-center">
      <ul className="space-y-1.5">
        {ContactData.points.map((each) => (
          <li className="cursor-pointer" key={each.link}>
            {each.link.startsWith("https://www.") ||
            each.link.startsWith("https://www.") ? (
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

                <span className="text-zinc-500">{each.link.substring(12)}</span>
              </a>
            ) : each.link.includes("@") ? (
              <a
                className="flex items-center space-x-2 rounded border border-zinc-300 px-2 py-1.5 sm:mr-1.5 sm:py-1 sm:hover:bg-zinc-100"
                href={`mailto:${each.link}`}
              >
                <Image
                  alt={each.link}
                  className="h-4 w-4"
                  height={20}
                  src={each.icon}
                  title={each.link}
                  width={20}
                />
                <span className="text-zinc-500">{each.link}</span>
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
