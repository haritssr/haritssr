import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import Table from "@/components/Table";
import katexify from "@/utils/katexify";

import { notationGroups } from "./_data";
import type { NotationGroup } from "./_data";

export const metadata = getLabMetadata("mathematics", "high-school-symbols");

export default function HighSchoolSymbolsPage() {
  const entryCount = notationGroups.reduce(
    (total, group) => total + group.entries.length,
    0
  );

  return (
    <div className="min-w-0 pb-24" lang="id">
      <LabPageHeader>
        <PageDescription>
          Cari simbol matematika dan fisika SMA.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section
          title="Cara membaca simbol"
          id="cara-membaca"
          description="Makna simbol bergantung pada konteks, bentuk huruf, dan satuannya.
          Perhatikan definisi serta syarat pada setiap contoh."
          contentClassName="max-w-3xl space-y-5"
        >
          <ul className="text-muted max-w-full list-disc space-y-3 pl-5">
            <li>
              {entryCount} entri dalam {notationGroups.length} kelompok,
              mencakup materi umum, matematika tingkat lanjut, dan pengayaan.
              Cakupan serta pilihan simbol dapat berbeda menurut buku dan
              kurikulum. Huruf yang sama bisa memiliki beberapa arti: baca
              definisi dan satuannya pada setiap soal.
            </li>
            <li>
              Gunakan pencarian halaman di peramban untuk mencari istilah. Pada
              layar kecil, tabel dapat digeser ke samping. Untuk mencoba menulis
              rumus sendiri, buka{" "}
              <InternalLink
                href="/labs/mathematics/live-playground"
                variant="inline"
              >
                Live Playground
              </InternalLink>
              .
            </li>
            <li>
              {katexify("m", false)} dapat berarti massa atau gradien, sedangkan{" "}
              {katexify(String.raw`\mathrm m`, false)} adalah satuan meter.
              Huruf besar dan kecil juga berbeda: {katexify("P", false)} bisa
              berarti daya, sedangkan {katexify("p", false)} bisa berarti
              tekanan atau momentum.
            </li>
            <li>
              {katexify("T", false)} bisa berarti periode, suhu, atau tegangan
              tali; {katexify(String.raw`\mathrm T`, false)} adalah satuan
              tesla. Arti huruf dipilih sesuai konteks, bukan bentuk huruf saja.
            </li>
            <li>
              Panah pada {katexify(String.raw`\vec v`, false)} menyatakan
              vektor. Indeks pada {katexify("v_0", false)} menyatakan keadaan
              awal, dan tanda {katexify(String.raw`\Delta`, false)} menyatakan
              perubahan hingga. Contohnya,{" "}
              {katexify(String.raw`\Delta x=x_f-x_0`, false)}.
            </li>
            <li>
              Koma desimal Indonesia ditulis seperti{" "}
              {katexify(String.raw`3{,}14`, false)}. Simbol{" "}
              {katexify(String.raw`\approx`, false)} menandai pendekatan; tanda{" "}
              {katexify("=", false)} menyatakan kesamaan.
            </li>
          </ul>
        </Section>

        {notationGroups.map((group) => (
          <Section
            className="min-w-0 scroll-mt-24"
            description={group.description}
            id={group.id}
            key={group.id}
            title={group.title}
          >
            <NotationTable group={group} />
          </Section>
        ))}

        <Section
          title="Rujukan dan bacaan lanjutan"
          id="rujukan"
          description="Panduan mata pelajaran untuk cakupan belajar, rujukan SI untuk satuan, dan dokumentasi KaTeX untuk penulisan rumus. Pilihan simbol dapat berbeda antar buku."
          contentClassName="max-w-3xl space-y-5"
        >
          <ul className="space-y-3">
            <li>
              <ExternalLink
                href="https://repositori.kemendikdasmen.go.id/33608/"
                name="Kemendikdasmen · Panduan Matematika dan Matematika Tingkat Lanjut (2025)"
              />
            </li>
            <li>
              <ExternalLink
                href="https://repositori.kemendikdasmen.go.id/33601/"
                name="Kemendikdasmen · Panduan Fisika Fase F (2025)"
              />
            </li>
            <li>
              <ExternalLink
                href="https://www.bipm.org/en/measurement-units/si-base-units"
                name="BIPM · Satuan pokok SI"
              />
            </li>
            <li>
              <ExternalLink
                href="https://www.bipm.org/en/measurement-units/si-prefixes"
                name="BIPM · Awalan SI lengkap"
              />
            </li>
            <li>
              <ExternalLink
                href="https://katex.org/docs/supported.html"
                name="KaTeX · Notasi dan perintah yang didukung"
              />
            </li>
            <li>
              <InternalLink
                href="/labs/physics/quantities-and-units"
                variant="navigation"
              >
                Besaran, satuan, dan rumus fisika
              </InternalLink>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

function NotationTable({ group }: { group: NotationGroup }) {
  return (
    <Table className="min-w-160 leading-6">
      <caption className="sr-only">
        {group.title}: simbol, arti, dan contoh penggunaan
      </caption>
      <thead>
        <tr className="divide-border bg-foreground/5 divide-x">
          <th className="px-3 text-left font-medium" scope="col">
            Simbol
          </th>
          <th className="px-3 text-left font-medium" scope="col">
            Arti dan cara membaca
          </th>
          <th className="px-3 text-left font-medium" scope="col">
            {group.id === "huruf-yunani" ? "Bentuk kecil / varian" : "Contoh"}
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {group.entries.map((entry) => (
          <tr className="divide-border divide-x align-top" key={entry.symbol}>
            <th
              className="px-3 py-3 text-left font-normal whitespace-nowrap"
              scope="row"
            >
              {katexify(String.raw`\displaystyle ${entry.symbol}`, false)}
            </th>
            <td className="min-w-64 px-3 py-3">{entry.meaning}</td>
            <td className="px-3 py-3 whitespace-nowrap">
              {katexify(String.raw`\displaystyle ${entry.example}`, false)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
