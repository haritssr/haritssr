import Image from "next/image";
import Link from "next/link";

import { getProjectSlug } from "@/utils/projectSlug";

interface ProjectsCardType {
  className?: string;
  href: string;
  title: string;
  description: string;
  imgSrc: string;
}

export default function ProjectsCard({
  className,
  href,
  title,
  description,
  imgSrc,
}: ProjectsCardType) {
  return (
    <div
      className={`group corner-squircle border-border flex w-full flex-col justify-between overflow-hidden rounded-3xl border selection:mx-auto ${className ?? ""}`}
    >
      {/* Header + Title + Explanation */}
      <section className="flex flex-col justify-between space-y-2 p-3">
        <div className="flex items-center space-x-2">
          <Image
            alt=""
            blurDataURL={imgSrc}
            className="h-5.5 w-5.5 shrink-0 self-center object-contain"
            height={30}
            src={imgSrc}
            width={30}
          />
          <div className="text-foreground/90 truncate text-lg font-medium">
            {title}
          </div>
        </div>

        <div className="text-foreground/70">{description}</div>

        {/* Site Link (Text Only) */}
        <cite className="group not-italic">
          <span className="text-foreground/50 text-base">
            {href.startsWith("https://www.") ? href.slice(12) : href.slice(8)}
          </span>
        </cite>
      </section>

      <section className="flex space-x-2 px-3 pb-3">
        <a
          className="corner-squircle bg-foreground/90 text-background hover:bg-foreground/80 inline-flex w-1/2 items-center justify-center rounded-xl py-1.25 text-center text-sm select-none"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit
        </a>
        <Link
          className="corner-squircle border-border text-foreground/90 hover:bg-surface-hover hover:border-border-hover inline-flex w-1/2 items-center justify-center rounded-xl border py-1.25 text-center text-sm"
          href={`/projects/${getProjectSlug(title)}`}
        >
          Details
        </Link>
      </section>
    </div>
  );
}
