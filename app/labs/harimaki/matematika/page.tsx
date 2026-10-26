import { getLabMetadata } from "@/app/labs/data";
import ReferencePage from "@/app/labs/harimaki/_components/ReferencePage";

import reference from "./reference.json";

export const metadata = getLabMetadata("harimaki", "matematika");

const observations = [
  "Logika dan himpunan memberi bahasa dasar untuk domain lain; cakupannya paling kecil.",
  "Sistem bilangan, operasi, serta barisan dan deret dikelompokkan sebagai landasan perhitungan.",
  "Cakupan materi terbesar: bentuk simbolik, persamaan, fungsi, dan matriks. Relasi dan Fungsi adalah bab dengan materi terbanyak.",
  "Enam bab menghubungkan bentuk, koordinat, transformasi, vektor, dan sudut; Trigonometri sama padatnya dengan Relasi dan Fungsi.",
  "Mencakup deskripsi data, pencacahan, peluang, distribusi, dan inferensi; satu domain menyatukan pengolahan data dan ketidakpastian.",
  "Lima bab bergerak dari limit ke turunan, integral, dan persamaan diferensial dasar; hubungan antarbab tidak direpresentasikan sebagai prasyarat.",
];

const analysis = [
  [
    "Konsistensi",
    "Semua jalur berakhir pada tingkat keempat: Subjek → Domain → Bab → Materi. Tidak ada materi yang memiliki anak.",
  ],
  [
    "Keseimbangan",
    "Jumlah bab bervariasi dari dua hingga enam per domain. Aljabar dan Geometri dan Trigonometri lebih lebar daripada Fondasi Matematika; panjang cabang berbeda meski kedalamannya sama.",
  ],
  [
    "Keterkaitan",
    "Fungsi Eksponen berada di Aljabar, sedangkan Turunan Fungsi Eksponen dan Logaritma berada di Kalkulus. Pohon menyimpan konteks masing-masing, tetapi tidak menunjukkan hubungan lintas domain.",
  ],
  [
    "Granularitas",
    "Satu materi dapat memuat beberapa gagasan, seperti Elips dan Hiperbola atau Mean, Median, dan Modus. Status daun adalah keputusan taksonomi, bukan ukuran kesulitan atau durasi belajar yang seragam.",
  ],
  [
    "Penggunaan",
    "Struktur cocok sebagai indeks cakupan. Untuk jalur belajar, tambahkan relasi prasyarat terpisah agar topik tetap dapat memiliki lebih dari satu keterkaitan tanpa menduplikasi cabang.",
  ],
];

export default function MatematikaPage() {
  return (
    <ReferencePage
      analysis={analysis}
      observations={observations}
      reference={reference}
      slug="matematika"
      subject="Matematika"
    />
  );
}
