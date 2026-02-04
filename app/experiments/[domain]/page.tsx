import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ExperimentsData } from "data/ExperimentsData";
import Image from "next/image";
import Link from "next/link";

export default async function DomainIndexPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  // Find the experiment data for this domain
  const experiment = ExperimentsData.find(
    (exp) => exp.title.toLowerCase().replace(/\s+/g, "-") === domain
  );

  if (!experiment) {
    return <div>Domain not found</div>;
  }

  return (
    <div className="mx-auto mt-10 min-h-screen w-full sm:px-0">
      <div className="mb-10 space-y-2">
        <div className="flex items-center space-x-2">
          <Image
            alt={experiment.title}
            height={36}
            src={experiment.logoSrc}
            width={36}
          />
        </div>
        <div className="font-semibold text-2xl sm:text-3xl">
          {experiment.title}
        </div>
        <div className="text-lg text-zinc-800">{experiment.description}</div>
        <div className="text-lg text-zinc-400">
          {experiment.links.length} experiments
        </div>
      </div>
      <ol className="-ml-[3.5] grid grid-cols-1 gap-3 px-3.5 py-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {experiment.links?.map((link) => (
          <li key={link}>
            <Link
              className="group flex items-center justify-between rounded-md border border-zinc-300 py-2 pr-3.5 pl-3 hover:bg-zinc-50"
              href={`/experiments/${domain}/${link.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="text-zinc-700">{link}</div>
              <ChevronRightIcon
                className="h-5 w-5 text-zinc-500 group-hover:text-zinc-800"
                width={2}
              />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
