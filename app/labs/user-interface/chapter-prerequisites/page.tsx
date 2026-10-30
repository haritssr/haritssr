import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";

import { prerequisiteMaps } from "./maps";

export const metadata = getLabMetadata(
  "user-interface",
  "chapter-prerequisites"
);

export default function ChapterPrerequisitesPage() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          Explore how high-school mathematics and physics chapters build on
          earlier knowledge.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-16">
        <div className="space-y-5">
          <p className="text-muted max-w-3xl">
            Follow each arrow from prior knowledge to a chapter that uses it.
            Multiple incoming arrows mean you should review each connected
            topic. These maps suggest a study sequence; chapter names and
            coverage vary by school. Earlier prerequisites are inherited along
            each path, and independent branches can be studied in parallel.
          </p>
          <ul
            aria-label="Diagram legend"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="border-action bg-action/10 size-3 rounded-sm border-2"
              />
              Foundations
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="border-border bg-interface-hover size-3 rounded-sm border-2"
              />
              Core chapters
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="border-progress bg-progress/10 size-3 rounded-sm border-2"
              />
              Extensions
            </li>
          </ul>
          <p className="text-muted text-sm">
            Drag or scroll to explore. Use the zoom controls or expand a diagram
            for a larger view. A text version is available below each map.
          </p>
        </div>
        {prerequisiteMaps.map((map) => {
          const labels = new Map(
            map.chapters.map((chapter) => [chapter.id, chapter.title])
          );
          return (
            <Section
              description={map.description}
              id={map.id}
              key={map.id}
              title={map.title}
            >
              <FlowDiagram
                definition={map.definition}
                title={`${map.title} prerequisites`}
              />
              <details className="border-border rounded-xl border p-4">
                <summary className="focus-visible:outline-action cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-offset-2">
                  Read chapter prerequisites
                </summary>
                <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {map.chapters.map((chapter) => {
                    const prerequisites = map.dependencies
                      .filter(([, to]) => to === chapter.id)
                      .map(([from]) => labels.get(from));
                    return (
                      <div className="min-w-0 space-y-1" key={chapter.id}>
                        <dt className="text-foreground text-sm font-medium">
                          {chapter.title}
                        </dt>
                        <dd className="text-muted text-sm">
                          {prerequisites.length > 0
                            ? `Review first: ${prerequisites.join("; ")}.`
                            : "Start here. Review earlier-school basics as needed."}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </details>
              <div className="text-muted max-w-3xl space-y-2 text-sm">
                <p>
                  Chapter coverage draws on the references below. The
                  prerequisite arrows are our suggested connections, rather than
                  an official curriculum or a sequence prescribed by the
                  textbooks.
                </p>
                <ul className="space-y-1">
                  {map.sources.map((source) => (
                    <li key={source.href}>
                      <ExternalLink
                        href={source.href}
                        name={source.title}
                        size="inherit"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          );
        })}
      </div>
    </>
  );
}
