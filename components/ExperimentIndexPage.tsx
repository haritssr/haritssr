import Image from "next/image";
import InternalLink from "./InternalLink";
import type { ExperimentsData } from "../data/ExperimentsData";
import Layout from "./Layout";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";

import { useRouter } from "next/router";
import React from "react";
import { GitHubIcon } from "./Icons";

export default function ExperimentIndexPage({
  experiment,
}: {
  experiment: ExperimentsData;
}) {
  const lastThreeSegmentRoute = useRouter().asPath;
  const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages${lastThreeSegmentRoute}.tsx`;
  const { ref, inView } = useInView({ rootMargin: "-90px" });

  return (
    <Layout
      browserTitle={experiment.title}
      description={experiment.description}
    >
      {/* SubNavigation */}
      <section
        className={`sticky -top-0 sm:top-[44.5px] border-b -mx-6 sm:max-w-4xl sm:mx-auto sm:mt-10 ${
          inView
            ? "border-zinc-300"
            : "border-b bg-zinc-100/60 saturate-150 backdrop-blur-lg"
        } z-40 mb-5 bg-white py-2.5 sm:border-none`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-3.5">
          <BackToExperiments inView={inView} />
          <PageTitleCenter inView={inView} title={experiment.title} />
          <PageSource inView={inView} href={githubRoute} />
        </div>
      </section>
      {/* mx-auto min-h-screen w-full max-w-5xl px-6 xl:px-0 */}
      <div className="mt-14 mx-auto min-h-screen w-full max-w-4xl sm:px-0">
        <div className="mb-10 space-y-2">
          <div className="flex items-center space-x-2">
            <Image
              src={experiment.logoSrc}
              height={36}
              width={36}
              alt={experiment.title}
            />
          </div>
          <div ref={ref} className="text-2xl sm:text-3xl font-semibold">
            {experiment.title}
          </div>
          <div className="text-zinc-800">{experiment.description}</div>
          <div className="text-zinc-400">
            {experiment.links.length} experiments
          </div>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-3.5 py-2 -ml-[14px]">
          {experiment.links?.map((link) => (
            <li key={link} className="text-zinc-600">
              <InternalLink
                href={`/experiments/${experiment.title
                  .toLowerCase()
                  .replace(" ", "-")}/${link
                  .toLowerCase()
                  // /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
                  .replace(/\s/g, "-")}`}
                name={link}
              />
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}

const BackToExperiments = ({ inView }: { inView: any }) => {
  return (
    <Link
      passHref
      href="/experiments"
      className={`-ml-1 flex w-1/3 cursor-pointer items-center sm:w-1/6 ${
        inView ? "w-1/2 sm:-ml-8" : "w-1/4"
      }`}
    >
      <span className=" inline-block w-full">
        <span className="group flex items-center">
          <ChevronLeftIcon
            className=" text-blue-600 sm:group-hover:text-blue-400 h-5 w-5"
            strokeWidth={2}
          />
          <span
            className={`-ml-0.5 truncate text-blue-600 sm:group-hover:text-blue-400 text-tiny sm:text-base ${
              inView ? "block" : "hidden"
            }`}
          >
            Experiments
          </span>
        </span>
      </span>
    </Link>
  );
};

const PageTitleCenter = ({ title, inView }: { title: string; inView: any }) => {
  return (
    <div className={`sm:2/4 -mr-2 inline ${inView ? "w-0" : "w-1/2"}`}>
      <div className="flex justify-center py-0.5">
        <div
          className={`truncate text-center font-semibold text-sm sm:text-base ${
            inView ? "text-transparent hidden" : "text-zinc-800 block"
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

const PageSource = ({ href, inView }: { href: string; inView: any }) => {
  return (
    <div
      className={`flex justify-end sm:w-1/6 ${
        inView ? "w-1/2 sm:-mr-3.5" : "w-1/4"
      }`}
    >
      <cite className="not-italic group">
        <a
          title="This page source code"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-fit cursor-pointer items-center text-blue-600 hover:text-blue-400`}
        >
          <span className="mr-2 hidden sm:inline-block text-blue-600 group-hover:text-blue-400">
            Source
          </span>{" "}
          <GitHubIcon className="h-5 w-5 cursor-pointer text-blue-600 group-hover:text-blue-400" />
        </a>
      </cite>
    </div>
  );
};
