import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import Table from "@/components/Table";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import { notationGroups } from "./_data";
import type { NotationGroup } from "./_data";

export const metadata = getExperimentMetadata(
  "mathematics",
  "high-school-symbols"
);

export default function HighSchoolSymbolsPage() {
  const entryCount = notationGroups.reduce(
    (total, group) => total + group.entries.length,
    0
  );

  return (
    <div className="min-w-0 space-y-20 pb-24" lang="id">
      <div className="max-w-3xl space-y-5">
        <SubTitle>
          Kamus simbol dan notasi matematika serta fisika SMA/MA di Indonesia.
          Setiap notasi ditampilkan dengan KaTeX, disertai arti dan contoh
          penggunaannya.
        </SubTitle>
        <p className="text-muted leading-8">
          {entryCount} entri dalam {notationGroups.length} kelompok, mencakup
          materi umum, matematika tingkat lanjut, dan pengayaan. Cakupan serta
          pilihan simbol dapat berbeda menurut buku dan kurikulum. Huruf yang
          sama bisa memiliki beberapa arti: baca definisi dan satuannya pada
          setiap soal.
        </p>
        <SourceCodeLink />
      </div>

      <Section title="Jelajahi menurut topik" id="daftar-topik">
        <nav aria-label="Topik simbol dan notasi">
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {notationGroups.map((group) => (
              <li key={group.id}>
                <InternalLink href={`#${group.id}`} variant="navigation">
                  {group.title}
                </InternalLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-muted max-w-3xl">
          Gunakan pencarian halaman di peramban untuk mencari istilah. Pada
          layar kecil, tabel dapat digeser ke samping. Untuk mencoba menulis
          rumus sendiri, buka{" "}
          <InternalLink
            href="/experiments/mathematics/live-playground"
            variant="inline"
          >
            editor TeX
          </InternalLink>
          .
        </p>
      </Section>

      <Section
        title="Cara membaca simbol"
        id="cara-membaca"
        description="Contoh menunjukkan penggunaan notasi, dengan syarat yang dicantumkan. Simbol tidak memiliki satu arti yang berlaku untuk semua topik."
      >
        <ul className="text-muted max-w-3xl list-disc space-y-3 pl-5">
          <li>
            {katexify("m", false)} dapat berarti massa atau gradien, sedangkan{" "}
            {katexify(String.raw`\mathrm m`, false)} adalah satuan meter. Huruf
            besar dan kecil juga berbeda: {katexify("P", false)} bisa berarti
            daya, sedangkan {katexify("p", false)} bisa berarti tekanan atau
            momentum.
          </li>
          <li>
            {katexify("T", false)} bisa berarti periode, suhu, atau tegangan
            tali; {katexify(String.raw`\mathrm T`, false)} adalah satuan tesla.
            Arti huruf dipilih sesuai konteks, bukan bentuk huruf saja.
          </li>
          <li>
            Panah pada {katexify(String.raw`\vec v`, false)} menyatakan vektor.
            Indeks pada {katexify("v_0", false)} menyatakan keadaan awal, dan
            tanda {katexify(String.raw`\Delta`, false)} menyatakan perubahan
            hingga. Contohnya, {katexify(String.raw`\Delta x=x_f-x_0`, false)}.
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
        description="Panduan mata pelajaran menjadi rujukan cakupan belajar; SI menjadi rujukan penulisan satuan. Halaman ini menyatukan konvensi yang umum digunakan, bukan daftar simbol resmi yang diwajibkan pada setiap kelas."
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
              href="/experiments/physics/physical-quantities-and-units"
              variant="navigation"
            >
              Besaran, satuan, dan rumus fisika
            </InternalLink>
          </li>
        </ul>
      </Section>
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
          <th className="px-3 py-3 text-left font-medium" scope="col">
            Simbol / notasi
          </th>
          <th className="px-3 py-3 text-left font-medium" scope="col">
            Arti dan cara membaca
          </th>
          <th className="px-3 py-3 text-left font-medium" scope="col">
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
              {katexify(entry.symbol, false)}
            </th>
            <td className="min-w-64 px-3 py-3">{entry.meaning}</td>
            <td className="px-3 py-3 whitespace-nowrap">
              {katexify(entry.example, false)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
