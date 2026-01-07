import { PhysicsHierarchyData } from "data/PhysicsHierarchyData";
import Link from "next/link";
import LayoutToExperiments from "@/components/LayoutToExperiments";

export default function SidebarHierarchy() {
  return (
    <LayoutToExperiments domain="Haris Lab" title="Sidebar Hieararchy">
      <div className="space-y-5 sm:w-2/5">
        {PhysicsHierarchyData.map((domain) => (
          <details
            aria-label="domain-area"
            className="bg-red-100 p-1"
            key={domain.domain_title}
          >
            <summary
              aria-label="domain-title"
              className="cursor-pointer select-none font-semibold"
            >
              {domain.domain_title}
            </summary>
            <section
              aria-label="chapter-area"
              className="space-y-2 bg-yellow-100 p-1"
            >
              {domain.chapters.map((chapter) => (
                <details
                  aria-label="materi-area"
                  className="bg-green-100 p-1"
                  key={chapter.chapter_title}
                >
                  <summary>
                    <Link
                      aria-label="chapter-title"
                      className="hover:underline"
                      href={chapter.chapter_title}
                    >
                      {chapter.chapter_title}
                    </Link>
                  </summary>
                  <section aria-label="materi-area" className="bg-blue-100 p-1">
                    {chapter.material.map((materi) => (
                      <Link
                        className="ml-2 block bg-blue-100 p-1 hover:underline"
                        href={materi}
                        key={materi}
                      >
                        {materi}
                      </Link>
                    ))}
                  </section>
                </details>
              ))}
            </section>
          </details>
        ))}
      </div>
    </LayoutToExperiments>
  );
}
