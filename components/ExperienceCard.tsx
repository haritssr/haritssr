import Image from "next/image";
import Link from "next/link";
import ExternalLink from "./ExternalLink";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface ExperienceCardTypes {
  href: string;
  title: string;
  description: string;
  period: string | null;
  status: string[];
  imgSrc: string;
  industry: string;
  hrefCaseStudy: string;
}

export default function ExperienceCard({
  href,
  title,
  description,
  period,
  status,
  imgSrc,
  industry,
  hrefCaseStudy,
}: ExperienceCardTypes) {
  return (
    <div className="flex w-full flex-col justify-between overflow-hidden rounded-lg border border-zinc-400/70 selection:mx-auto ">
      <section className=" flex flex-col justify-between  bg-white p-3 space-y-2">
        <Image
          src={imgSrc}
          alt={title}
          width={30}
          height={30}
          blurDataURL={imgSrc}
          className="aspect-auto mb-1.5"
          // placeholder='blur'
        />
        <div className="truncate font-semibold text-zinc-700 ">{title}</div>

        <div className="text-zinc-600">{description}</div>
      </section>
      <cite className="group px-3 py-2 border-t border-zinc-400/70 not-italic">
        <a
          title={href}
          href={`https://${href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block w-fit cursor-pointer items-center text-zinc-600 hover:underline group-hover:text-zinc-800"
        >
          <span className="flex items-center">
            <span className={`text-base`}>{href.slice(4)}</span>
            {/* External Link Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1  text-zinc-600 group-hover:text-zinc-800 mt-0.5`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </a>
      </cite>
      <section className="flex flex-col space-y-1.5 border-t border-b border-zinc-400/70 bg-zinc-50/40 px-3 py-2 text-zinc-600 sm:text-sm">
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
      <section className="bg-zinc-100 px-3 py-2 hover:bg-zinc-200/80">
        <Link
          passHref
          href={`/case-studies/${hrefCaseStudy}`}
          className="text-blue-600 sm:text-sm hover:text-blue-700 flex justify-center"
        >
          More Details
        </Link>
      </section>
    </div>
  );
}
