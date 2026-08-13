import Image from "next/image";
import InternalLink from "@/components/InternalLink";
import { StatusActionLink, StatusPage } from "@/components/StatusPage";
import { ExperimentsData } from "../../../data/ExperimentsData";

export default async function DomainIndexPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const REGEX_WHITESPACE_COLLAPSE = /\s+/g;
  const REGEX_WHITESPACE_EACH = /\s/g;

  // Find the experiment data for this domain
  const experiment = ExperimentsData.find(
    (exp) =>
      exp.title.toLowerCase().replace(REGEX_WHITESPACE_COLLAPSE, "-") === domain
  );

  if (!experiment) {
    return (
      <StatusPage
        actions={
          <StatusActionLink href="/experiments" variant="secondary">
            Back to Experiments
          </StatusActionLink>
        }
        description="This experiment domain is not available."
        fullScreen
        title="Domain Not Found"
      />
    );
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
        <div className="font-light text-lg text-zinc-400">
          {experiment.links.length} experiments
        </div>
      </div>
      <ol className="space-y-3">
        {experiment.links?.map((link) => (
          <li key={link}>
            <InternalLink
              href={`/experiments/${domain}/${link.toLowerCase().replace(REGEX_WHITESPACE_EACH, "-")}`}
            >
              {link}
            </InternalLink>
          </li>
        ))}
      </ol>
    </div>
  );
}
