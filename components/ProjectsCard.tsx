import Image from "next/image";
import Link from "next/link";

interface ProjectsCardType {
  className?: string;
  href: string;
  title: string;
  description: string;
  period: string | null;
  status: string[];
  imgSrc: string;
  industry: string;
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
      className={`group corner-squircle flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-zinc-300 selection:mx-auto ${className ?? ""}`}
    >
      {/* Header + Title + Explanation */}
      <section className="flex flex-col justify-between space-y-2 p-3">
        <div className="flex items-center space-x-2">
          <Image
            alt={title}
            blurDataURL={imgSrc}
            className="h-5.5 w-5.5 shrink-0 self-center object-contain"
            height={30}
            src={imgSrc}
            width={30}
          />
          <div className="truncate text-lg font-medium text-zinc-800">
            {title}
          </div>
        </div>

        <div className="text-zinc-600">{description}</div>

        {/* Site Link (Text Only) */}
        <cite className="group not-italic">
          <span className="text-base text-zinc-500">
            {href.startsWith("https://www.") ? href.slice(12) : href.slice(8)}
          </span>
        </cite>
      </section>

      <section className="flex space-x-2 px-3 pb-3">
        <a
          className="corner-squircle inline-flex w-1/2 items-center justify-center rounded-xl bg-zinc-700 py-1.25 text-center text-sm text-zinc-100 select-none hover:bg-zinc-700/95"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit
        </a>
        <Link
          className="corner-squircle inline-flex w-1/2 items-center justify-center rounded-xl border border-zinc-300 py-1.25 text-center text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-700"
          href={`/projects/${title.toLowerCase().split(" ").join("-")}`}
        >
          Details
        </Link>
      </section>
    </div>
  );
}
