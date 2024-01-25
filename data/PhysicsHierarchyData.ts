// type PhysicsTableCombine = {
// 	domain_title: string;
// 	chapters: {
// 		title: string;
// 		material: string[];
// 	}[];
// }[];

// each will represent in database table
type PhysicsTable = domain[];
type ChaptersTable = chapter[];
type MateriTable = materi[];

// just a string of materi
type materi = string;

interface domain {
	domain_title: string;
	chapters: ChaptersTable;
}

interface chapter {
	chapter_title: string;
	material: MateriTable;
}

export const PhysicsHierarchyData: PhysicsTable = [
	{
		domain_title: "Pengukuran",
		chapters: [
			{
				chapter_title: "Besaran",
				material: ["Pengantar", "Besaran pokok", "Besaran satuan"],
			},
			{
				chapter_title: "Satuan",
				material: ["Pengantar", "Daftar satuan", "Konversi satuan"],
			},
			{
				chapter_title: "Dimensi",
				material: ["Pengantar", "Daftar dimensi", "Analisis dimensi"],
			},
			{
				chapter_title: "Notasi Ilmiah",
				material: ["Pengantar", "Angka penting"],
			},
			{
				chapter_title: "Ketepatan",
				material: ["Pengantar", "Akurasi", "Presisi", "Keteledoran", "Kesalahan acak", "Kesalahan sistematis"],
			},
			{
				chapter_title: "Alat Ukur",
				material: ["Pengantar", "Jangka sorong", "Miktometer sekrup", "Mistar", "Tahun Cahaya"],
			},
		],
	},
	{
		domain_title: "Gerak",
		chapters: [
			{
				chapter_title: "Gerak Lurus",
				material: ["Pengantar", "Gerak Lurus Beraturan", "Gerak Lurus Berubah Beraturan"],
			},
			{
				chapter_title: "Gerak Rotasi",
				material: ["Pengantar", "Momentum Sudut", "Torsi - Momen Gaya", "Momen Inersia"],
			},
			{
				chapter_title: "Gerak Parabola",
				material: ["Pengantar", "Gerak Parabola Simetri", "Gerak Parabola Asimetri"],
			},
			{
				chapter_title: "Gerak Melingkar",
				material: ["Pengantar", "Gerak Melingkar Beraturan", "Percepatan Setripetal", "Momentum Sudut", "Hukum Kekekalan Energi"],
			},
		],
	},
	{
		domain_title: "Dinamika",
		chapters: [
			{ chapter_title: "Gaya", material: ["Gaya Newton", "Gaya Gesek", "Gaya Gravitasi"] },
			{ chapter_title: "Usaha", material: ["Pengantar Usaha", "Hubungan usaha dengan energi"] },
			{ chapter_title: "Momentum", material: ["Pengantar momentum", "Hukum kekekalan momentum", "Impuls"] },
			{
				chapter_title: "Energi",
				material: ["Pengantar", "Energi Kinetik", "Energi Potensial", "Energi Menanik"],
			},
		],
	},
	{
		domain_title: "Fluida",
		chapters: [
			{
				chapter_title: "Fluida Statis",
				material: ["Pengantar Fluida Statis", "Tekanan", "Hukum Pascal", "Hukum Archimedes"],
			},
			{
				chapter_title: "Fluida Dinamis",
				material: ["Pengantar Fluida Dinamis", "Aliran fluida ideal", "Debit", "Kontinuitas", "Hukum Bernoulli"],
			},
		],
	},
	{
		domain_title: "Gelombang",
		chapters: [
			{
				chapter_title: "Gelombang Dasar",
				material: ["Pengantar", "Jenis gelombang", "Sifat gelombang", "Properti gelombang"],
			},
			{
				chapter_title: "Gelombang Bunyi",
				material: [
					"Pengantar",
					"Taraf intensitas bunyi",
					"Intensitas bunyi",
					"Pipa organa",
					"Sifat gelombang buyi",
					"Cepat rambat pada medium",
					"Rentang frekuensi",
				],
			},
			{
				chapter_title: "Gelombang Elektromagnetik",
				material: ["Pengantar", "Sifat", "Spektrum", "Energi"],
			},
		],
	},

	{
		domain_title: "Termodinamika",
		chapters: [
			{
				chapter_title: "Hukum termodinamika",
				material: ["Pengantar", "Hukum termodinamika 0", "Hukum termodinamika 1", "Hukum termodinamika 2", "Hukum termodinamika 3"],
			},
			{
				chapter_title: "Suhu",
				material: ["Pengantar Suhu", "Alat ukur suhu", "Konversi suhu"],
			},
			{
				chapter_title: "Kalor",
				material: ["Pengantar", "Transfer kalor", "Pemuaian kalor", "Asas Black", "Kalor jenis", "Kalor lebur", "Kalor laten", "Kapasitas kalor"],
			},
			{
				chapter_title: "Fenomena Gas",
				material: ["Pengantar", "Isobaris", "Isokhoris", "Isotermis", "Adiabatis"],
			},
		],
	},
	{
		domain_title: "Listrik",
		chapters: [
			{
				chapter_title: "Listrik Statis",
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
			},
			{
				chapter_title: "Listrik Dinamis",
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
			},
			{
				chapter_title: "Magnet",
				material: ["Pengantar", "Medan Magnet", "Gaya Magnet", "Fluks Magnet", "Momen Kopel", "Transformator"],
			},
		],
	},
];
