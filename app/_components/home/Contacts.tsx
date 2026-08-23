import Image from "next/image";
import ContactList from "@/components/ContactList";

export default function Contacts() {
  return (
    <section
      aria-labelledby="profile-heading"
      className="mb-20 grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="corner-squircle flex select-none items-center justify-center rounded-2xl border-zinc-300 border-none p-3 sm:border-[1px]">
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
      <div className="corner-squircle space-y-2.5 rounded-2xl border border-zinc-300 p-3 text-left text-zinc-500">
        <h1 className="font-semibold text-zinc-800" id="profile-heading">
          Harits Syah
        </h1>
        <p>Web Product Engineer</p>
        <p>Math-Physics Teacher</p>
        <a
          className="inline-block hover:text-action-hover focus-visible:outline-2 focus-visible:outline-action focus-visible:outline-offset-2"
          href="https://www.harislab.com"
          rel="noopener noreferrer"
          target="_blank"
          title="Haris Lab"
        >
          Haris Lab
        </a>
        <p>Tangerang, Indonesia</p>
      </div>
      <ContactList />
      <div
        className="corner-squircle rounded-2xl border border-zinc-300 p-3 text-zinc-500"
        id="topics"
      >
        <p className="font-semibold text-zinc-800">Interests</p>
        <p className="leading-7" id="desc">
          Web, JavaScript, TypeScript, Effect, React, Next.js, Functional
          Programming, Math, Physics, and Education .
        </p>
      </div>
    </section>
  );
}
