import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import type { ExperimentsData } from "../data/ExperimentsData";
import { GitHubIcon } from "./Icons";
import Layout from "./Layout";

export default function ExperimentIndexPage({ experiment }: { experiment: ExperimentsData }) {
  const lastThreeSegmentRoute = useRouter().asPath;
  const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages${lastThreeSegmentRoute}.tsx`;
  const { ref, inView } = useInView({ rootMargin: "-90px" });

  return (
    <Layout browserTitle={experiment.title} description={experiment.description}>
      {/* SubNavigation */}
      <section
        className={`sticky top-0 -mx-5 border-b sm:top-[44.5px] sm:mx-auto sm:mt-10 sm:max-w-5xl ${
          inView ? "border-zinc-200" : "border-b bg-white/70 saturate-150 backdrop-blur-lg"
        } z-40 mb-5 bg-white py-2.5 sm:border-none`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-3.5">
          <BackToExperiments inView={inView} />
          <PageTitleCenter inView={inView} title={experiment.title} />
          <PageSource href={githubRoute} inView={inView} />
        </div>
      </section>
      {/* mx-auto min-h-screen w-full max-w-5xl px-6 xl:px-0 */}
      <div className="mx-auto mt-10 min-h-screen w-full sm:px-0">
        <div className="mb-10 space-y-2">
          <div className="flex items-center space-x-2">
            <Image alt={experiment.title} height={36} src={experiment.logoSrc} width={36} />
          </div>
          <div className="font-semibold text-2xl sm:text-3xl" ref={ref}>
            {experiment.title}
          </div>
          <div className="text-lg text-zinc-800">{experiment.description}</div>
          <div className="text-lg text-zinc-400">{experiment.links.length} experiments</div>
        </div>
        <ol className="-ml-[3.5] grid grid-cols-1 gap-3 px-3.5 py-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {experiment.links?.map((link) => (
            <li key={link}>
              <Link
                className="group flex items-center justify-between rounded-md border border-zinc-300 py-2 pr-3.5 pl-3 hover:bg-zinc-50"
                href={`/experiments/${experiment.title.toLowerCase().replace(" ", "-")}/${link
                  .toLowerCase()
                  // /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
                  .replace(/\s/g, "-")}`}
                key={link}
              >
                <div className="text-zinc-700">{link}</div>
                <ChevronRightIcon className="h-5 w-5 text-zinc-500 group-hover:text-zinc-800" width={2} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}

const BackToExperiments = ({ inView }: { inView: unknown }) => {
  return (
    <Link
      className={`-ml-1 flex w-1/3 cursor-pointer items-center sm:w-1/6 ${inView ? "w-1/2 sm:-ml-5" : "w-1/4"}`}
      href="/experiments"
    >
      <span className="inline-block w-full">
        <span className="group flex items-center">
          <ChevronLeftIcon className="h-5 w-5 text-action sm:group-hover:text-action/90" strokeWidth={2} />
          <span
            className={`-ml-0.5 truncate text-action text-base sm:group-hover:text-action/90 sm:group-hover:underline ${
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

const PageTitleCenter = ({ title, inView }: { title: string; inView: unknown }) => {
  return (
    <div className={`sm:2/4 -mr-2 inline ${inView ? "w-0" : "w-1/2"}`}>
      <div className="flex justify-center py-0.5">
        <div
          className={`truncate text-center font-semibold ${inView ? "hidden text-transparent" : "block text-zinc-800"}`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

const PageSource = ({ href, inView }: { href: string; inView: unknown }) => {
  return (
    <div className={`flex justify-end sm:w-1/6 ${inView ? "w-1/2 sm:-mr-3.5" : "w-1/4"}`}>
      <cite className="group not-italic">
        <a
          className="flex w-fit cursor-pointer items-center text-action hover:text-[#2563eb]/90"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          title="This page source code"
        >
          <span className="mr-2 hidden text-action group-hover:text-action/90 sm:inline-block">Source</span>{" "}
          <GitHubIcon className="h-5 w-5 cursor-pointer text-action group-hover:text-action/90" />
        </a>
      </cite>
    </div>
  );
};
