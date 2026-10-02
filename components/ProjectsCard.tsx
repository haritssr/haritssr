import Image from "next/image";
import Link from "next/link";

import { getProjectSlug } from "@/utils/projectSlug";

interface ProjectsCardType {
  className?: string;
  href: string;
  title: string;
  description: string;
  imgSrc: string;
  headingLevel?: 2 | 3;
}

export default function ProjectsCard({
  className,
  href,
  title,
  description,
  imgSrc,
  headingLevel = 2,
}: ProjectsCardType) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <div
      className={`group corner-squircle border-border flex w-full flex-col justify-between overflow-hidden rounded-3xl border selection:mx-auto ${className ?? ""}`}
    >
      {/* Header + Title + Explanation */}
      <div className="flex flex-col justify-between space-y-2 p-3">
        <div className="flex items-center space-x-2">
          <Image
            alt=""
            blurDataURL={imgSrc}
            className="h-5.5 w-5.5 shrink-0 self-center object-contain"
            height={30}
            src={imgSrc}
            width={30}
          />
          <Heading className="text-foreground truncate text-lg font-medium">
            {title}
          </Heading>
        </div>

        <div className="text-foreground/70">{description}</div>

        {/* Site Link (Text Only) */}
        <p>
          <span className="text-foreground/50 text-base">
            {href.startsWith("https://www.") ? href.slice(12) : href.slice(8)}
          </span>
        </p>
      </div>

      <div className="flex space-x-2.5 px-3 pb-3">
        <a
          className="corner-squircle bg-foreground/90 text-background hover:bg-foreground inline-flex w-1/2 items-center justify-center rounded-xl py-1.5 text-center text-sm select-none"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit
        </a>
        <Link
          className="corner-squircle border-border text-foreground/90 hover:bg-surface-hover hover:border-border-hover inline-flex w-1/2 items-center justify-center rounded-xl border py-1.5 text-center text-sm"
          href={`/projects/${getProjectSlug(title)}`}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
