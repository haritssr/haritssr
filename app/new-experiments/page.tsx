import InternalLink from "@/components/InternalLink";
import { PageTitle } from "@/components/SubTitle";

const newExperimentsPages = ["inline maki"];

export default function NewExperimentsPage() {
  return (
    <>
      <PageTitle
        description="Random experiments that using newer version of React following Next.js App Router, the UI Experiments route still in pages router"
        title="New Experiments"
      />
      <div className="my-10 flex flex-col space-y-2">
        {newExperimentsPages.map((page) => (
          <InternalLink
            href={`/new-experiments/${page.split(" ").join("-")}`}
            key={page}
          >
            {page}
          </InternalLink>
        ))}
      </div>
    </>
  );
}
