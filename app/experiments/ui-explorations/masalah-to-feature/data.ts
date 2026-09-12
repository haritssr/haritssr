export const NOTION_DATABASE_URL =
  "https://app.notion.com/p/c1bbdf75e8ae4deab2a9fc5159dbf66a";

export const LAST_SYNCED = "2026-08-22";

export const FEATURE_GROUPS = [
  "Referensi",
  "Analisis",
  "Tes",
  "Bimbel",
  "Kalkulator",
  "Statistik",
  "Pencarian",
] as const;

export type FeatureGroup = (typeof FEATURE_GROUPS)[number];

export interface ProblemFeatureMapping {
  id: string;
  problem: string;
  features: string[];
  transformation: string;
  mappingUrl: string;
  linkedPageUrl: string;
}

export const problemFeatureMappings: ProblemFeatureMapping[] = [
  {
    id: "3c49ba5e-fe15-81e4-9dd3-feccf12dd399",
    problem:
      "Pelajar yang sudah bisa tetap harus mengulang latihan dasar terlalu banyak",
    features: ["Tes", "Referensi/PetaMateri/Prerequisite"],
    transformation:
      "Menggunakan tes mastery yang lebih pendek dan lebih sulit untuk membuktikan kompetensi dengan cepat.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581e49dd3feccf12dd399",
    linkedPageUrl: "https://app.notion.com/p/3bb9ba5efe1580f79f45d6a933766b17",
  },
  {
    id: "3c49ba5e-fe15-8169-8c65-e227d938b6e3",
    problem: "Pelajaran jarang dipakai sehingga mudah lupa",
    features: ["Tes/Flashcard", "Tes", "Referensi", "Statistik"],
    transformation:
      "Memunculkan kembali materi melalui review, latihan, dan retrieval berkala.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581698c65e227d938b6e3",
    linkedPageUrl: "https://app.notion.com/p/b795782e41804e528d6de34598f461cf",
  },
  {
    id: "3c49ba5e-fe15-8196-abd6-c6a20b14f30e",
    problem: "Catatan hilang",
    features: ["Analisis/Autosave"],
    transformation:
      "Menyimpan pekerjaan dan progres secara otomatis agar tidak perlu menulis ulang dari awal.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe158196abd6c6a20b14f30e",
    linkedPageUrl: "https://app.notion.com/p/2059ba5efe1580f2bbb3ed0c5135fb47",
  },
  {
    id: "3c49ba5e-fe15-81d0-a39b-cb241be1c025",
    problem: "Sering salah hitung",
    features: [
      "Analisis/MAKI/Kalkulasi",
      "Kalkulator",
      "Analisis/MAKI/Intellisense",
    ],
    transformation:
      "Menghitung nilai dari formula dan parameter terstruktur sehingga human error aritmetika berkurang.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581d0a39bcb241be1c025",
    linkedPageUrl: "https://app.notion.com/p/a4853601ed2240b59dab47905e2ea1b2",
  },
  {
    id: "3c49ba5e-fe15-8134-95e4-fb640d5fab21",
    problem: "Lupa rumus",
    features: [
      "Referensi",
      "Referensi/KVRP",
      "Pencarian",
      "Analisis/MAKI/Intellisense",
    ],
    transformation:
      "Rumus dapat dicari dan dipanggil kembali berdasarkan materi atau konteks tanpa harus recall sempurna.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15813495e4fb640d5fab21",
    linkedPageUrl: "https://app.notion.com/p/61e37da8fc6e4f3fa653f4fea7f02707",
  },
  {
    id: "3c49ba5e-fe15-8199-b800-dc0664667fee",
    problem: "Lupa materi yang pernah dipelajari",
    features: ["Statistik", "Referensi", "Pencarian", "Tes/Flashcard"],
    transformation:
      "Menyimpan jejak belajar dan membuat materi lama mudah ditemukan serta diulang.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe158199b800dc0664667fee",
    linkedPageUrl: "https://app.notion.com/p/b795782e41804e528d6de34598f461cf",
  },
  {
    id: "3c49ba5e-fe15-813a-b859-d978f4d6debf",
    problem: "Kalkulasi manual melelahkan",
    features: ["Analisis/MAKI", "Analisis/MAKI/Kalkulasi", "Kalkulator"],
    transformation:
      "Pelajar menentukan model dan langkah, sementara komputer menangani operasi hitung yang redundan.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15813ab859d978f4d6debf",
    linkedPageUrl: "https://app.notion.com/p/a4853601ed2240b59dab47905e2ea1b2",
  },
  {
    id: "3c49ba5e-fe15-81bd-8ab3-c27e231f55cf",
    problem: "Malas membaca buku paket",
    features: ["Referensi", "Referensi/KVRP", "Kalkulator", "Tes"],
    transformation:
      "Mengubah materi statis menjadi referensi interaktif dengan navigasi, formula, contoh, kalkulator, dan asesmen.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581bd8ab3c27e231f55cf",
    linkedPageUrl: "https://app.notion.com/p/61e37da8fc6e4f3fa653f4fea7f02707",
  },
  {
    id: "3c49ba5e-fe15-81a0-8bd9-e5206cd07c58",
    problem: "Sulit mencari sumber belajar",
    features: ["Pencarian", "Referensi"],
    transformation:
      "Menyediakan pencarian terpusat terhadap materi dan fitur dari seluruh aplikasi.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581a08bd9e5206cd07c58",
    linkedPageUrl: "https://app.notion.com/p/54cc3d1f008a4c1b9b0b0d3fd69fa693",
  },
  {
    id: "3c49ba5e-fe15-814c-9b3d-cc46bebee662",
    problem: "Pengerjaan soal belum selesai lalu hilang",
    features: ["Analisis/MAKI", "Analisis/Autosave"],
    transformation:
      "Menyimpan pengerjaan sebagai draft yang dapat diteruskan di lain waktu.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15814c9b3dcc46bebee662",
    linkedPageUrl: "https://app.notion.com/p/2059ba5efe1580f2bbb3ed0c5135fb47",
  },
  {
    id: "3c49ba5e-fe15-8182-803c-d329973e40c0",
    problem: "Tidak tahu progres belajar sendiri",
    features: ["Statistik", "Tes"],
    transformation:
      "Mengubah aktivitas belajar menjadi data progres yang dapat divisualisasikan.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe158182803cd329973e40c0",
    linkedPageUrl: "https://app.notion.com/p/a826566f3e884ab988a59af7af0763a6",
  },
  {
    id: "3c49ba5e-fe15-819b-8719-f40132d23157",
    problem: "Tes online hanya terbatas pada pilihan ganda",
    features: ["Tes", "Analisis/MAKI", "Tes/Flashcard"],
    transformation:
      "Mendukung beberapa bentuk asesmen sesuai kompetensi yang ingin diukur.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15819b8719f40132d23157",
    linkedPageUrl: "https://app.notion.com/p/3bb9ba5efe1580f79f45d6a933766b17",
  },
  {
    id: "3c49ba5e-fe15-8155-853d-e2564f87ca08",
    problem: "Takut lupa terakhir membaca sampai mana",
    features: ["Referensi", "Analisis/Autosave"],
    transformation:
      "Menyimpan posisi atau section terakhir dan memulihkan state saat kembali.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe158155853de2564f87ca08",
    linkedPageUrl: "https://app.notion.com/p/274b478ceb354f17a0e2a43f479f5f82",
  },
  {
    id: "3c49ba5e-fe15-818c-b769-dfb5750d2f2e",
    problem: "Sudah mencoba sendiri tetapi tetap stuck",
    features: ["Referensi", "Bimbel"],
    transformation:
      "Memberi jalur eskalasi dari self-learning pada materi yang sama ke bantuan tutor manusia.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15818cb769dfb5750d2f2e",
    linkedPageUrl: "https://app.notion.com/p/669edc535bb948e2be77c8662257cd83",
  },
  {
    id: "3c49ba5e-fe15-8141-9f5d-f26fd19e7f48",
    problem: "Belajar materi lanjut padahal prasyarat belum kuat",
    features: [
      "Referensi/PetaMateri/Prerequisite",
      "Tes",
      "Statistik",
      "Referensi/PetaMateri",
    ],
    transformation:
      "Memodelkan dependency antar materi dan memeriksa mastery prerequisite sebelum maju.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581419f5df26fd19e7f48",
    linkedPageUrl: "https://app.notion.com/p/33ca3be14db941b9a9168cb618fae403",
  },
  {
    id: "3c49ba5e-fe15-819a-9e2b-ddf9c254fd20",
    problem: "Catatan tidak teratur",
    features: [
      "Referensi",
      "Referensi/KVRP",
      "Pencarian",
      "Referensi/Bookmark",
    ],
    transformation:
      "Menaruh pengetahuan ke struktur materi yang konsisten dan dapat dicari daripada catatan fisik bebas.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15819a9e2bddf9c254fd20",
    linkedPageUrl: "https://app.notion.com/p/61e37da8fc6e4f3fa653f4fea7f02707",
  },
  {
    id: "3c49ba5e-fe15-81c4-aafd-e8fe25e4fa00",
    problem: "Bingung soal ini masuk bab apa",
    features: ["Pencarian", "Referensi", "Referensi/PetaMateri"],
    transformation:
      "Membantu mengenali dan menavigasi dari masalah ke konsep atau bab yang relevan.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581c4aafde8fe25e4fa00",
    linkedPageUrl: "https://app.notion.com/p/61e37da8fc6e4f3fa653f4fea7f02707",
  },
  {
    id: "3c49ba5e-fe15-81aa-991d-e8a06c2f0166",
    problem: "Artikel panjang terasa overwhelming",
    features: ["Referensi", "Referensi/PetaMateri"],
    transformation:
      "Persistent table of contents dan struktur halaman membuat materi panjang mudah dipindai dan dilanjutkan.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581aa991de8a06c2f0166",
    linkedPageUrl: "https://app.notion.com/p/274b478ceb354f17a0e2a43f479f5f82",
  },
  {
    id: "3c49ba5e-fe15-8183-9628-fb85eeb5c28d",
    problem: "Memasukkan nilai ke rumus yang salah",
    features: [
      "Analisis/MAKI",
      "Analisis/MAKI/Kalkulasi",
      "Analisis/MAKI/Intellisense",
    ],
    transformation:
      "Memvalidasi parameter formula dan memberi feedback saat input tidak lengkap atau tidak sesuai.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581839628fb85eeb5c28d",
    linkedPageUrl: "https://app.notion.com/p/a4853601ed2240b59dab47905e2ea1b2",
  },
  {
    id: "3c49ba5e-fe15-81c6-aeee-d2dec69c3ab1",
    problem: "Tidak tahu apakah jawaban akhir masuk akal",
    features: ["Analisis/MAKI", "Analisis/MAKI/Interpretasi"],
    transformation:
      "Menghubungkan hasil kalkulasi kembali ke apa yang ditanya dan konteks fisik masalah.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581c6aeeed2dec69c3ab1",
    linkedPageUrl: "https://app.notion.com/p/a4853601ed2240b59dab47905e2ea1b2",
  },
  {
    id: "3c49ba5e-fe15-8190-9617-d0da91d15788",
    problem: "Bingung harus pakai rumus yang mana",
    features: [
      "Analisis/MAKI",
      "Analisis/MAKI/Abstraksi",
      "Analisis/MAKI/Intellisense",
      "Referensi/KVRP",
    ],
    transformation:
      "Menyarankan formula berdasarkan variabel, data diketahui, dan konteks masalah.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581909617d0da91d15788",
    linkedPageUrl: "https://app.notion.com/p/61e37da8fc6e4f3fa653f4fea7f02707",
  },
  {
    id: "3c49ba5e-fe15-8184-bdb8-c42c2ab899a9",
    problem: "Langsung mencari jawaban tanpa menunjukkan cara berpikir",
    features: ["Analisis/MAKI"],
    transformation:
      "Menyimpan workflow langkah demi langkah sebagai bukti proses berpikir, bukan hanya final answer.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe158184bdb8c42c2ab899a9",
    linkedPageUrl: "https://app.notion.com/p/3bb9ba5efe1580f79f45d6a933766b17",
  },
  {
    id: "3c49ba5e-fe15-81ee-8908-d5a1091b086e",
    problem: "Punya beberapa ide penyelesaian tetapi sulit membandingkannya",
    features: ["Analisis/MAKI"],
    transformation:
      "Menyediakan beberapa workflow solusi yang dapat disimpan dan dibandingkan.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe1581ee8908d5a1091b086e",
    linkedPageUrl: "https://app.notion.com/p/3bb9ba5efe1580f79f45d6a933766b17",
  },
  {
    id: "3c49ba5e-fe15-8198-ae83-c74a9f3c42e8",
    problem: "Belajar hanya karena tugas sehingga pengetahuan sepotong-potong",
    features: [
      "Referensi",
      "Referensi/PetaMateri",
      "Referensi/PetaMateri/Prerequisite",
      "Statistik",
    ],
    transformation:
      "Menampilkan hubungan antar konsep, bab, dan prerequisite sehingga materi tidak terlihat sebagai tugas terisolasi.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe158198ae83c74a9f3c42e8",
    linkedPageUrl: "https://app.notion.com/p/61e37da8fc6e4f3fa653f4fea7f02707",
  },
  {
    id: "3c49ba5e-fe15-810c-8a51-e9c6d6dce9cb",
    problem: "Sulit mengerjakan soal bersama teman",
    features: ["Analisis/MAKI", "Analisis/Collaboration"],
    transformation:
      "Pengerjaan berbasis web dapat dibagikan dan dikerjakan secara kolaboratif.",
    mappingUrl: "https://app.notion.com/p/3c49ba5efe15810c8a51e9c6d6dce9cb",
    linkedPageUrl: "https://app.notion.com/p/3bb9ba5efe1580f79f45d6a933766b17",
  },
];

export const TOTAL_CONNECTIONS = problemFeatureMappings.reduce(
  (total, mapping) => total + mapping.features.length,
  0
);
