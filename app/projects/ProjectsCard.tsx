import Image from "next/image";
import Link from "next/link";

import { getProjectSlug } from "@/utils/navigation/projectSlug";

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
      <div className="flex flex-1 flex-col justify-between space-y-2 p-3.5 pt-3 pb-2">
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

        <p className="text-foreground/70 leading-relaxed">{description}</p>

        {/* Site Link (Text Only) */}
        <p className="border-border border-t border-dashed pt-2">
          <span className="text-muted text-base">
            {href.startsWith("https://www.") ? href.slice(12) : href.slice(8)}
          </span>
        </p>
      </div>

      <div className="flex space-x-2.5 px-3.5 pb-3.5">
        <Link
          className="border-border text-foreground hover:bg-interface-hover focus-visible:outline-foreground inline-flex w-1/2 items-center justify-center gap-1.5 rounded-md border bg-white px-3 py-2 text-center text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 sm:py-1.5"
          href={`/projects/${getProjectSlug(title)}`}
        >
          Details
        </Link>
        <a
          className="interactive-elevation bg-foreground/90 text-background hover:bg-foreground inline-flex w-1/2 items-center justify-center rounded-md py-2 text-center text-sm select-none sm:py-1.5"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          Open Site
        </a>
      </div>
    </div>
  );
}
