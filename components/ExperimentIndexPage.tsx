import Image from "next/image";
import InternalLink from "./InternalLink";
import type { ExperimentsData } from "../data/ExperimentsData";
import Layout from "./Layout";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";

export default function ExperimentIndexPage({
  experiment,
}: {
  experiment: ExperimentsData;
}) {
  const { ref, inView } = useInView({ rootMargin: "-90px" });
  return (
    <Layout
      browserTitle={experiment.title}
      description={experiment.description}
    >
      <div className="div max-w-4xl mx-auto mt-14">
        <Link
          passHref
          href="/experiments"
          className="flex sm:-ml-5 items-center w-fit mb-12 text-zinc-800 hover:text-zinc-400"
        >
          <ChevronLeftIcon className="h-5 w-5" strokeWidth={2} />
          <span>Experiments</span>
        </Link>

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
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-3.5 py-2 -ml-4">
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
