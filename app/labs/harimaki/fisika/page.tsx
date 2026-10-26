import { getLabMetadata } from "@/app/labs/data";
import ReferencePage from "@/app/labs/harimaki/_components/ReferencePage";

import reference from "./reference.json";

export const metadata = getLabMetadata("harimaki", "fisika");

const observations = [
  "Pengukuran, ketidakpastian, dan analisis data menjadi landasan eksperimen; domain ini memisahkan metode dari teori fenomena.",
  "Domain terlebar, dengan delapan bab: vektor, gerak, gaya, energi, momentum, rotasi, dan gravitasi.",
  "Dua bab membedakan fluida statis dan dinamis; keduanya memiliki jumlah materi yang sama.",
  "Getaran, gelombang mekanik, dan bunyi disusun berdekatan sehingga pola osilasi dan perambatan mudah dibandingkan.",
  "Suhu dan kalor, teori kinetik, serta hukum termodinamika menghubungkan pengamatan makroskopis dengan model mikroskopis.",
  "Cakupan terbesar kedua: dari muatan dan rangkaian sampai induksi dan gelombang elektromagnetik.",
  "Memisahkan optika geometris, alat optik, dan optika gelombang; lensa muncul sebagai konsep sekaligus dasar alat.",
  "Tiga bab membagi relativitas, kuantum dan atom, serta inti; satu domain menaungi beberapa kerangka teori yang berbeda.",
];

const analysis = [
  [
    "Konsistensi",
    "Semua jalur mengikuti empat tingkat: Subjek → Domain → Bab → Materi. Materi adalah daun; domain dan bab hanya mengelompokkan isinya.",
  ],
  [
    "Keseimbangan",
    "Mekanika memiliki delapan bab, sedangkan Fluida hanya dua. Kedalaman seragam tidak berarti cakupan seragam; jumlah bab dan materi membantu membaca kepadatan setiap domain.",
  ],
  [
    "Keterkaitan",
    "Gelombang Mekanik, Gelombang Elektromagnetik, dan Optika Gelombang berada pada cabang berbeda. Struktur menonjolkan konteks fisiknya, tetapi tidak menampilkan konsep gelombang yang dipakai bersama.",
  ],
  [
    "Granularitas",
    "Sebagian daun menggabungkan beberapa konsep, seperti Energi dan Daya Listrik atau Proses Isotermal, Isobarik, Isokhorik, dan Adiabatik. Jumlah materi tidak dapat langsung dipakai sebagai beban belajar.",
  ],
  [
    "Penggunaan",
    "Pohon merupakan indeks topik, bukan peta ketergantungan. Vektor, grafik, energi, dan pengukuran digunakan lintas bab; relasi prasyarat dan rujukan matematika sebaiknya dimodelkan terpisah.",
  ],
];

export default function FisikaPage() {
  return (
    <ReferencePage
      analysis={analysis}
      observations={observations}
      reference={reference}
      slug="fisika"
      subject="Fisika"
    />
  );
}
