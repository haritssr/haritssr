import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  CodeBracketIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import ContactList from "@/components/ContactList";

export default function Contacts() {
  return (
    <section
      aria-labelledby="profile-heading"
      className="mb-20 grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="corner-squircle flex items-center justify-center rounded-2xl border-zinc-300 px-3 pt-3 pb-2.5 select-none sm:border">
        <Image
          alt="Harits Syah"
          blurDataURL="/images/blur.jpg"
          className="z-10 h-25 w-25 rounded-full"
          height="100"
          priority
          src="/images/blur.jpg"
          width="100"
        />
      </div>
      <div
        className="corner-squircle space-y-2.5 rounded-2xl border border-zinc-300 px-3 pt-3 pb-2.5 text-left text-zinc-500"
        id="1234"
      >
        <h1 className="font-semibold text-zinc-800">Harits Syah</h1>
        <div className="flex items-center space-x-2">
          <CodeBracketIcon
            aria-hidden="true"
            className="size-4 shrink-0 stroke-2 text-zinc-600"
          />
          <p>Web Product Engineer</p>
        </div>
        <div className="flex items-center space-x-2">
          <AcademicCapIcon
            aria-hidden="true"
            className="size-4 shrink-0 stroke-2 text-zinc-600"
          />
          <p>Math-Physics Teacher</p>
        </div>
        <div className="flex items-center space-x-2">
          <BuildingOffice2Icon
            aria-hidden="true"
            className="size-4 shrink-0 stroke-2 text-zinc-600"
          />
          <a
            className="hover:text-action focus-visible:outline-action inline-block focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://www.harislab.com"
            rel="noopener noreferrer"
            target="_blank"
            title="Haris Lab"
          >
            Haris Lab
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon
            aria-hidden="true"
            className="size-4 shrink-0 stroke-2 text-zinc-600"
          />
          <p>Tangerang, Indonesia</p>
        </div>
      </div>
      <ContactList />
      <div
        className="corner-squircle space-y-2 rounded-2xl border border-zinc-300 px-3 pt-3 pb-2.5 text-zinc-500"
        id="topics"
      >
        <p className="font-semibold text-zinc-800">Interests</p>
        <p className="-mt-1 leading-8">
          Web, JS, TS, Effect, React, Next.js, Functional Programming, Math,
          Physics, and Education .
        </p>
      </div>
    </section>
  );
}
