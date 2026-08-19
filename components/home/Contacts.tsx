import Image from "next/image";
import ContactList from "../ContactList";

export default function Contacts() {
  return (
    <section
      aria-labelledby="profile-heading"
      className="mb-20 grid grid-cols-1 gap-5 pt-5 sm:grid-cols-4"
    >
      <div className="flex select-none items-center justify-start">
        <Image
          alt="Harits Syah"
          blurDataURL="/images/blur.jpg"
          className="z-10 h-24 w-24 rounded-full"
          height="100"
          priority
          src="/images/blur.jpg"
          width="100"
        />
      </div>
      <div className="space-y-2.5 text-left text-zinc-500">
        <h1 className="font-semibold text-zinc-800" id="profile-heading">
          Harits Syah
        </h1>
        <p>Web Product Engineer</p>
        <p>Math-Physics Teacher</p>
        <a
          className="block hover:text-action focus-visible:outline-2 focus-visible:outline-action focus-visible:outline-offset-2"
          href="https://www.harislab.com"
          rel="noopener noreferrer"
          target="_blank"
          title="Haris Lab"
        >
          Haris Lab
        </a>
        <p>South Tangerang, Indonesia</p>
      </div>
      <ContactList />
    </section>
  );
}
