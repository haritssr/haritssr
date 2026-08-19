"use client";

import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";

export default function SidebarHierarchyDemo() {
  return (
    <div className="space-y-5 sm:w-2/5">
      <div className="mb-8">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/haris-lab/sidebar-hierarchy"
          name="Source code"
        />
      </div>
      {PhysicsHierarchyData.map((domain) => (
        <details
          aria-label="domain-area"
          className="bg-red-100 p-1"
          key={domain.title}
        >
          <summary
            aria-label="domain-title"
            className="cursor-pointer select-none font-semibold"
          >
            titletitletitle {domain.title}
          </summary>
          <section
            aria-label="chapter-area"
            className="space-y-2 bg-yellow-100 p-1"
          >
            {domain.chapters.map((chapter) => (
              <details
                aria-label="materi-area"
                className="bg-green-100 p-1"
                key={chapter.title}
              >
                <summary>
                  <Link
                    aria-label="chapter-title"
                    className="hover:underline"
                    href={chapter.title}
                  >
                    {chapter.title}
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
  );
}

// each will represent in database table
type PhysicsTable = domain[];
type ChaptersTable = chapter[];
type MateriTable = materi[];

// just a string of materi
type materi = string;

interface domain {
  chapters: ChaptersTable;
  title: string;
}

interface chapter {
  material: MateriTable;
  title: string;
}

const PhysicsHierarchyData: PhysicsTable = [
  {
    chapters: [
      {
        material: ["Pengantar", "Besaran pokok", "Besaran satuan"],
        title: "Besaran",
      },
      {
        material: ["Pengantar", "Daftar satuan", "Konversi satuan"],
        title: "Satuan",
      },
      {
        material: ["Pengantar", "Daftar dimensi", "Analisis dimensi"],
        title: "Dimensi",
      },
      {
        material: ["Pengantar", "Angka penting"],
        title: "Notasi Ilmiah",
      },
      {
        material: [
          "Pengantar",
          "Akurasi",
          "Presisi",
          "Keteledoran",
          "Kesalahan acak",
          "Kesalahan sistematis",
        ],
        title: "Ketepatan",
      },
      {
        material: [
          "Pengantar",
          "Jangka sorong",
          "Miktometer sekrup",
          "Mistar",
          "Tahun Cahaya",
        ],
        title: "Alat Ukur",
      },
    ],
    title: "Pengukuran",
  },
  {
    chapters: [
      {
        material: [
          "Pengantar",
          "Gerak Lurus Beraturan",
          "Gerak Lurus Berubah Beraturan",
        ],
        title: "Gerak Lurus",
      },
      {
        material: [
          "Pengantar",
          "Momentum Sudut",
          "Torsi - Momen Gaya",
          "Momen Inersia",
        ],
        title: "Gerak Rotasi",
      },
      {
        material: [
          "Pengantar",
          "Gerak Parabola Simetri",
          "Gerak Parabola Asimetri",
        ],
        title: "Gerak Parabola",
      },
      {
        material: [
          "Pengantar",
          "Gerak Melingkar Beraturan",
          "Percepatan Setripetal",
          "Momentum Sudut",
          "Hukum Kekekalan Energi",
        ],
        title: "Gerak Melingkar",
      },
    ],
    title: "Gerak",
  },
  {
    chapters: [
      {
        material: ["Gaya Newton", "Gaya Gesek", "Gaya Gravitasi"],
        title: "Gaya",
      },
      {
        material: ["Pengantar Usaha", "Hubungan usaha dengan energi"],
        title: "Usaha",
      },
      {
        material: ["Pengantar momentum", "Hukum kekekalan momentum", "Impuls"],
        title: "Momentum",
      },
      {
        material: [
          "Pengantar",
          "Energi Kinetik",
          "Energi Potensial",
          "Energi Menanik",
        ],
        title: "Energi",
      },
    ],
    title: "Dinamika",
  },
  {
    chapters: [
      {
        material: [
          "Pengantar Fluida Statis",
          "Tekanan",
          "Hukum Pascal",
          "Hukum Archimedes",
        ],
        title: "Fluida Statis",
      },
      {
        material: [
          "Pengantar Fluida Dinamis",
          "Aliran fluida ideal",
          "Debit",
          "Kontinuitas",
          "Hukum Bernoulli",
        ],
        title: "Fluida Dinamis",
      },
    ],
    title: "Fluida",
  },
  {
    chapters: [
      {
        material: [
          "Pengantar",
          "Jenis gelombang",
          "Sifat gelombang",
          "Properti gelombang",
        ],
        title: "Gelombang Dasar",
      },
      {
        material: [
          "Pengantar",
          "Taraf intensitas bunyi",
          "Intensitas bunyi",
          "Pipa organa",
          "Sifat gelombang buyi",
          "Cepat rambat pada medium",
          "Rentang frekuensi",
        ],
        title: "Gelombang Bunyi",
      },
      {
        material: ["Pengantar", "Sifat", "Spektrum", "Energi"],
        title: "Gelombang Elektromagnetik",
      },
    ],
    title: "Gelombang",
  },

  {
    chapters: [
      {
        material: [
          "Pengantar",
          "Hukum termodinamika 0",
          "Hukum termodinamika 1",
          "Hukum termodinamika 2",
          "Hukum termodinamika 3",
        ],
        title: "Hukum termodinamika",
      },
      {
        material: ["Pengantar Suhu", "Alat ukur suhu", "Konversi suhu"],
        title: "Suhu",
      },
      {
        material: [
          "Pengantar",
          "Transfer kalor",
          "Pemuaian kalor",
          "Asas Black",
          "Kalor jenis",
          "Kalor lebur",
          "Kalor laten",
          "Kapasitas kalor",
        ],
        title: "Kalor",
      },
      {
        material: [
          "Pengantar",
          "Isobaris",
          "Isokhoris",
          "Isotermis",
          "Adiabatis",
        ],
        title: "Fenomena Gas",
      },
    ],
    title: "Termodinamika",
  },
  {
    chapters: [
      {
        material: [
          "Pengantar",
          "Muatan listrik",
          "Gaya Listrik",
          "Medan Listrik",
          "Potensial Listrik",
          "Energi Potensial Listrik",
          "Usaha Listrik",
          "Hukum Gauss",
          "Kapasitor",
        ],
        title: "Listrik Statis",
      },
      {
        material: [
          "Pengantar",
          "Arus Listrik",
          "Resistansi Listrik",
          "Tegangan Listrik",
          "Rangkaian Listrik",
          "Energi Listrik",
          "Daya Listrik",
          "Hukum Kirchhoff",
          "Hukum Ohm",
          "Alat Ukur Listrik",
        ],
        title: "Listrik Dinamis",
      },
      {
        material: [
          "Pengantar",
          "Medan Magnet",
          "Gaya Magnet",
          "Fluks Magnet",
          "Momen Kopel",
          "Transformator",
        ],
        title: "Magnet",
      },
    ],
    title: "Listrik",
  },
];
