import { referenceDiagram } from "@/app/labs/harimaki/referenceDiagram";
import ExternalLink from "@/components/ExternalLink";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import ToggleList from "@/components/ToggleList";
import type { ToggleListNode } from "@/components/ToggleList";

interface ReferenceChapter extends ToggleListNode {
  readonly children: readonly ToggleListNode[];
}

interface ReferenceDomain extends ToggleListNode {
  readonly children: readonly ReferenceChapter[];
}

interface ReferenceRoot extends ToggleListNode {
  readonly children: readonly ReferenceDomain[];
}

interface ReferenceSource {
  readonly source: string;
  readonly sourceEditedAt: string;
  readonly tree: ReferenceRoot;
}

export default function ReferencePage({
  slug,
  subject,
  reference,
  observations,
  analysis,
}: {
  slug: string;
  subject: string;
  reference: ReferenceSource;
  observations: readonly string[];
  analysis: readonly (readonly string[])[];
}) {
  const domains = reference.tree.children;
  const chapters = domains.flatMap((domain) => domain.children);
  const materials = chapters.flatMap((chapter) => chapter.children);

  return (
    <div lang="id">
      <PageHeader
        back={{ href: "/labs/harimaki", name: "Harimaki" }}
        path={`/labs/harimaki/${slug}`}
      >
        <PageTitle>Struktur Referensi — {subject}</PageTitle>
        <PageDescription>
          Usulan taksonomi Referensi Harimaki. Materi adalah unit paling kecil
          dan menjadi daun pada struktur.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section title="Analisis hierarki" contentClassName="space-y-5">
          <AnalysisTable
            caption="Tingkat dan peran dalam hierarki"
            headings={["Tingkat", "Jumlah", "Peran"]}
            rows={[
              ["Subjek", "1", `Akar referensi ${subject}.`],
              [
                "Domain",
                String(domains.length),
                "Kelompok besar bidang kajian.",
              ],
              [
                "Bab",
                String(chapters.length),
                "Kelompok konsep dalam satu domain.",
              ],
              [
                "Materi",
                String(materials.length),
                "Unit terkecil; tidak memiliki anak.",
              ],
            ]}
          />
          <AnalysisTable
            caption="Sebaran bab dan materi per domain"
            headings={["Domain", "Bab", "Materi", "Analisis cakupan"]}
            rows={domains.map((domain, index) => [
              domain.label.replace("Domain: ", ""),
              String(domain.children.length),
              String(
                domain.children.reduce(
                  (total, chapter) => total + chapter.children.length,
                  0
                )
              ),
              observations[index],
            ])}
          />
          <AnalysisTable
            caption="Interpretasi dan batasan struktur"
            headings={["Aspek", "Analisis"]}
            rows={analysis}
          />
          <p className="text-muted max-w-3xl text-sm">
            Jumlah dihitung dari pohon di bawah. Analisis merupakan interpretasi
            editorial atas usulan struktur, bukan urutan prasyarat yang
            ditetapkan sumber. Label dan urutan mengikuti{" "}
            <ExternalLink
              href={reference.source}
              name="halaman Notion sumber"
              size="inherit"
            />
            . Salinan lokal ini tidak tersinkron otomatis dengan Notion.
          </p>
        </Section>
        <Section title="Tree">
          <ToggleList
            label={`Struktur referensi ${subject}`}
            nodes={[reference.tree]}
          />
        </Section>
        <Section title="Diagram">
          <FlowDiagram
            definition={referenceDiagram(reference.tree)}
            title={`Struktur referensi ${subject}`}
          />
        </Section>
      </div>
    </div>
  );
}

function AnalysisTable({
  caption,
  headings,
  rows,
}: {
  caption: string;
  headings: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <Table className="min-w-140">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          {headings.map((heading) => (
            <th
              className="px-3 text-left font-medium"
              key={heading}
              scope="col"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {rows.map(([heading, ...cells]) => (
          <tr className="divide-border divide-x" key={heading}>
            <th
              className="px-3 py-2 text-left align-top font-medium"
              scope="row"
            >
              {heading}
            </th>
            {cells.map((cell, index) => (
              <td className="px-3 py-2 align-top" key={headings[index + 1]}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
