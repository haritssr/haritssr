import Image from "next/image";
import Link from "next/link";
import ExternalLink from "./ExternalLink";
import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface ExperienceCardTypes {
  href: string;
  title: string;
  description: string;
  period: string | null;
  status: string[];
  imgSrc: string;
  industry: string;
}

export default function ExperienceCard({
  href,
  title,
  description,
  period,
  status,
  imgSrc,
  industry,
}: ExperienceCardTypes) {
  return (
    <Link
      passHref
      href={`/experiences/${title.toLowerCase().split(" ").join("-")}`}
      className="flex w-full flex-col justify-between overflow-hidden rounded-lg border border-zinc-400/60 selection:mx-auto"
    >
      {/* Header + Title + Explanation */}
      <section className=" flex flex-col justify-between p-3 space-y-2">
        <div className="flex justify-between items-center">
          <Image
            src={imgSrc}
            alt={title}
            width={30}
            height={30}
            blurDataURL={imgSrc}
            className="mb-1.5 h-7 w-7"
            // placeholder='blur'
          />
          <ChevronRightIcon className="w-5 h-5 text-zinc-400 stroke-2" />
        </div>
        <div className="truncate font-semibold text-zinc-700 sm:text-lg">
          {title}
        </div>

        <div className="text-zinc-600">{description}</div>
      </section>
      {/* Details */}
      <section className=" flex flex-col space-y-1.5 border-t border-b border-zinc-400/60 px-3 py-2 text-zinc-600 text-sm">
        <article className="flex items-center justify-between">
          <div className="flex w-1/3 items-center justify-between">
            <div>Period</div>
            <div>:</div>
          </div>
          <div>{period}</div>
        </article>
        <article className="flex items-center justify-between">
          <div className="flex w-1/3 items-center justify-between">
            <div>Status</div>
            <div>:</div>
          </div>
          <div>{status[0]}</div>
        </article>
        <article className="flex items-center justify-between">
          <div className="flex w-1/3 items-center justify-between">
            <div>Industry</div>
            <div>:</div>
          </div>
          <div>{industry}</div>
        </article>
      </section>
      {/* Site Link */}
      <cite className="group px-3 py-2 not-italic">
        <span className={`text-base`}>{href.slice(4)}</span>
      </cite>
    </Link>
  );
}

{
  /* Details  Link
<section className="px-3 py-2 hover:bg-zinc-100">
  
    
  </Link>
</section> */
}
