type PhysicsTableSimple = {
	domain: string;
	chapters: {
		title: string;
		material: string[];
	}[];
}[];

// each will represent in database table
type PhysicsTable = domain[];
type ChaptersTable = chapter[];
type MateriTable = materi[];

// just a string of materi
type materi = string;

interface domain {
	domain: string;
	chapters: ChaptersTable;
}

interface chapter {
	title: string;
	material: MateriTable;
}

export const PhysicsHiearchyData: PhysicsTable = [
	{
		domain: "Pengukuran",
		chapters: [
			{
				title: "Besaran",
				material: ["Pengantar", "Besaran pokok", "Besaran satuan"],
			},
			{
				title: "Satuan",
				material: ["Pengantar", "Daftar satuan", "Konversi satuan"],
			},
			{
				title: "Dimensi",
				material: ["Pengantar", "Daftar dimensi", "Analisis dimensi"],
			},
			{
				title: "Notasi Ilmiah",
				material: ["Pengantar", "Angka penting"],
			},
			{
				title: "Ketepatan",
				material: ["Pengantar", "Akurasi", "Presisi", "Keteledoran", "Kesalahan acak", "Kesalahan sistematis"],
			},
			{
				title: "Alat Ukur",
				material: ["Pengantar", "Jangka sorong", "Miktometer sekrup", "Mistar", "Tahun Cahaya"],
			},
		],
	},
	{
		domain: "Gerak",
		chapters: [
			{
				title: "Gerak Lurus",
				material: ["Pengantar", "Gerak Lurus Beraturan", "Gerak Lurus Berubah Beraturan"],
			},
			{
				title: "Gerak Rotasi",
				material: ["Pengantar", "Momentum Sudut", "Torsi - Momen Gaya", "Momen Inersia"],
			},
			{
				title: "Gerak Parabola",
				material: ["Pengantar", "Gerak Parabola Simetri", "Gerak Parabola Asimetri"],
			},
			{
				title: "Gerak Melingkar",
				material: ["Pengantar", "Gerak Melingkar Beraturan", "Percepatan Setripetal", "Momentum Sudut", "Hukum Kekekalan Energi"],
			},
		],
	},
	{
		domain: "Dinamika",
		chapters: [
			{ title: "Gaya", material: ["Gaya Newton", "Gaya Gesek", "Gaya Gravitasi"] },
			{ title: "Usaha", material: ["Pengantar Usaha", "Hubungan usaha dengan energi"] },
			{ title: "Momentum", material: ["Pengantar momentum", "Hukum kekekalan momentum", "Impuls"] },
			{
				title: "Energi",
				material: ["Pengantar", "Energi Kinetik", "Energi Potensial", "Energi Menanik"],
			},
		],
	},
	{
		domain: "Fluida",
		chapters: [
			{
				title: "Fluida Statis",
				material: ["Pengantar Fluida Statis", "Tekanan", "Hukum Pascal", "Hukum Archimedes"],
			},
			{
				title: "Fluida Dinamis",
				material: ["Pengantar Fluida Dinamis", "Aliran fluida ideal", "Debit", "Kontinuitas", "Hukum Bernoulli"],
			},
		],
	},
	{
		domain: "Gelombang",
		chapters: [
			{
				title: "Gelombang Dasar",
				material: ["Pengantar", "Jenis gelombang", "Sifat gelombang", "Properti gelombang"],
			},
			{
				title: "Gelombang Bunyi",
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
				title: "Gelombang Elektromagnetik",
				material: ["Pengantar", "Sifat", "Spektrum", "Energi"],
			},
		],
	},

	{
		domain: "Termodinamika",
		chapters: [
			{
				title: "Hukum termodinamika",
				material: ["Pengantar", "Hukum termodinamika 0", "Hukum termodinamika 1", "Hukum termodinamika 2", "Hukum termodinamika 3"],
			},
			{
				title: "Suhu",
				material: ["Pengantar Suhu", "Alat ukur suhu", "Konversi suhu"],
			},
			{
				title: "Kalor",
				material: ["Pengantar", "Transfer kalor", "Pemuaian kalor", "Asas Black", "Kalor jenis", "Kalor lebur", "Kalor laten", "Kapasitas kalor"],
			},
			{
				title: "Fenomena Gas",
				material: ["Pengantar", "Isobaris", "Isokhoris", "Isotermis", "Adiabatis"],
			},
		],
	},
	{
		domain: "Listrik",
		chapters: [
			{
				title: "Listrik Statis",
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
				title: "Listrik Dinamis",
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
				title: "Magnet",
				material: ["Pengantar", "Medan Magnet", "Gaya Magnet", "Fluks Magnet", "Momen Kopel", "Transformator"],
			},
		],
	},
];
