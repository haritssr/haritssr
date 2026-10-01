export interface UnitDefinition {
  dimension: string;
  quantity: string;
  quantitySymbol: string;
  unit: string;
  unitSymbol: string;
}

export const DESCRIPTION =
  "Besaran pokok dan besaran turunan dalam Sistem Internasional (SI).";

export const BASE_UNITS = [
  {
    dimension: "\\mathrm{T}",
    quantity: "Waktu",
    quantitySymbol: "t",
    unit: "sekon",
    unitSymbol: "\\mathrm{s}",
  },
  {
    dimension: "\\mathrm{L}",
    quantity: "Panjang",
    quantitySymbol: "l",
    unit: "meter",
    unitSymbol: "\\mathrm{m}",
  },
  {
    dimension: "\\mathrm{M}",
    quantity: "Massa",
    quantitySymbol: "m",
    unit: "kilogram",
    unitSymbol: "\\mathrm{kg}",
  },
  {
    dimension: "\\mathrm{I}",
    quantity: "Arus listrik",
    quantitySymbol: "I",
    unit: "ampere",
    unitSymbol: "\\mathrm{A}",
  },
  {
    dimension: "\\Theta",
    quantity: "Suhu",
    quantitySymbol: "T",
    unit: "kelvin",
    unitSymbol: "\\mathrm{K}",
  },
  {
    dimension: "\\mathrm{N}",
    quantity: "Jumlah zat",
    quantitySymbol: "n",
    unit: "mol",
    unitSymbol: "\\mathrm{mol}",
  },
  {
    dimension: "\\mathrm{J}",
    quantity: "Intensitas cahaya",
    quantitySymbol: "I_v",
    unit: "kandela",
    unitSymbol: "\\mathrm{cd}",
  },
] as const;

type PrerequisiteNodeType = "concept" | "quantity";

export interface PrerequisiteNode {
  label: string;
  symbol?: string;
  type: PrerequisiteNodeType;
}

export interface FormulaDefinition {
  condition?: string;
  expression: string;
  name: string;
  prerequisites: readonly PrerequisiteNode[];
}

const quantityNode = (label: string, symbol: string): PrerequisiteNode => ({
  label,
  symbol,
  type: "quantity",
});

const conceptNode = (label: string, symbol?: string): PrerequisiteNode => ({
  label,
  symbol,
  type: "concept",
});

function formula(
  name: string,
  expression: string,
  prerequisites: readonly PrerequisiteNode[],
  condition?: string
): FormulaDefinition {
  return { condition, expression, name, prerequisites };
}

export const DERIVED_FORMULAS: Record<string, readonly FormulaDefinition[]> = {
  Luas: [
    formula("Persegi panjang", "A = p\\cdot l", [
      quantityNode("Panjang", "p"),
      quantityNode("Lebar", "l"),
    ]),
  ],
  Volume: [
    formula("Balok", "V = p\\cdot l\\cdot t", [
      quantityNode("Panjang", "p"),
      quantityNode("Lebar", "l"),
      quantityNode("Tinggi", "t"),
    ]),
  ],
  Kecepatan: [
    formula("Kecepatan rata-rata", "v = \\frac{\\Delta x}{\\Delta t}", [
      quantityNode("Perpindahan", "\\Delta x"),
      quantityNode("Waktu", "\\Delta t"),
    ]),
  ],
  Percepatan: [
    formula("Percepatan rata-rata", "a = \\frac{\\Delta v}{\\Delta t}", [
      quantityNode("Perubahan kecepatan", "\\Delta v"),
      quantityNode("Waktu", "\\Delta t"),
    ]),
  ],
  "Kecepatan sudut": [
    formula(
      "Definisi kecepatan sudut",
      "\\omega = \\frac{\\Delta\\theta}{\\Delta t}",
      [
        quantityNode("Sudut", "\\Delta\\theta"),
        quantityNode("Waktu", "\\Delta t"),
      ]
    ),
  ],
  "Percepatan sudut": [
    formula(
      "Definisi percepatan sudut",
      "\\alpha = \\frac{\\Delta\\omega}{\\Delta t}",
      [
        quantityNode("Kecepatan sudut", "\\Delta\\omega"),
        quantityNode("Waktu", "\\Delta t"),
      ]
    ),
  ],
  Periode: [
    formula("Hubungan dengan frekuensi", "T = \\frac{1}{f}", [
      quantityNode("Frekuensi", "f"),
    ]),
  ],
  Frekuensi: [
    formula("Hubungan dengan periode", "f = \\frac{1}{T}", [
      quantityNode("Periode", "T"),
    ]),
  ],
  Momentum: [
    formula("Definisi momentum", "p = mv", [
      quantityNode("Massa", "m"),
      quantityNode("Kecepatan", "v"),
    ]),
  ],
  Impuls: [
    formula("Gaya konstan", "I = F\\Delta t", [
      quantityNode("Gaya", "F"),
      quantityNode("Waktu", "\\Delta t"),
    ]),
    formula("Perubahan momentum", "I = \\Delta p", [
      quantityNode("Perubahan momentum", "\\Delta p"),
    ]),
  ],
  Gaya: [
    formula("Hukum II Newton", "F = ma", [
      quantityNode("Massa", "m"),
      quantityNode("Percepatan", "a"),
    ]),
  ],
  Berat: [
    formula("Berat dekat permukaan Bumi", "w = mg", [
      quantityNode("Massa", "m"),
      quantityNode("Percepatan gravitasi", "g"),
    ]),
  ],
  "Momen gaya": [
    formula("Gaya terhadap poros", "\\tau = rF\\sin\\theta", [
      quantityNode("Lengan gaya", "r"),
      quantityNode("Gaya", "F"),
      conceptNode("Sudut antara r dan F"),
    ]),
  ],
  "Momen inersia": [
    formula(
      "Partikel titik",
      "I = mr^2",
      [quantityNode("Massa", "m"), quantityNode("Jarak dari poros", "r")],
      "Untuk satu partikel titik"
    ),
    formula(
      "Benda tegar",
      "I = \\sum mr^2",
      [
        quantityNode("Massa tiap elemen", "m"),
        quantityNode("Jarak tiap elemen dari poros", "r"),
      ],
      "Untuk benda dengan distribusi massa"
    ),
  ],
  "Momentum sudut": [
    formula("Gerak rotasi", "L = I\\omega", [
      quantityNode("Momen inersia", "I"),
      quantityNode("Kecepatan sudut", "\\omega"),
    ]),
    formula("Partikel bergerak", "L = rp", [
      quantityNode("Jarak dari poros", "r"),
      quantityNode("Momentum", "p"),
    ]),
  ],
  Usaha: [
    formula("Gaya konstan", "W = Fs\\cos\\theta", [
      quantityNode("Gaya", "F"),
      quantityNode("Perpindahan", "s"),
      conceptNode("Sudut antara gaya dan perpindahan"),
    ]),
  ],
  Energi: [
    formula("Energi kinetik", "E_k = \\frac{1}{2}mv^2", [
      quantityNode("Massa", "m"),
      quantityNode("Kecepatan", "v"),
    ]),
    formula(
      "Energi potensial gravitasi",
      "E_p = mgh",
      [
        quantityNode("Massa", "m"),
        quantityNode("Percepatan gravitasi", "g"),
        quantityNode("Ketinggian", "h"),
      ],
      "Dekat permukaan Bumi dengan g konstan"
    ),
    formula(
      "Energi potensial pegas",
      "E_p = \\frac{1}{2}kx^2",
      [
        quantityNode("Konstanta pegas", "k"),
        quantityNode("Pertambahan panjang", "x"),
      ],
      "Untuk pegas ideal"
    ),
    formula("Hubungan dengan usaha", "E = W", [quantityNode("Usaha", "W")]),
    formula("Energi listrik", "E = VIt", [
      quantityNode("Beda potensial", "V"),
      quantityNode("Arus listrik", "I"),
      quantityNode("Waktu", "t"),
    ]),
    formula("Kesetaraan massa-energi", "E = mc^2", [
      quantityNode("Massa", "m"),
      conceptNode("Kecepatan cahaya"),
    ]),
  ],
  Daya: [
    formula("Usaha per waktu", "P = \\frac{W}{t}", [
      quantityNode("Usaha", "W"),
      quantityNode("Waktu", "t"),
    ]),
    formula("Gaya dan kecepatan", "P = Fv", [
      quantityNode("Gaya", "F"),
      quantityNode("Kecepatan", "v"),
    ]),
    formula("Rangkaian listrik", "P = VI", [
      quantityNode("Beda potensial", "V"),
      quantityNode("Arus listrik", "I"),
    ]),
  ],
  "Konstanta pegas": [
    formula(
      "Hukum Hooke",
      "k = \\frac{F}{\\Delta x}",
      [
        quantityNode("Gaya", "F"),
        quantityNode("Perubahan panjang", "\\Delta x"),
      ],
      "Untuk pegas ideal"
    ),
  ],
  "Koefisien gesek": [
    formula("Gaya gesek", "\\mu = \\frac{f}{N}", [
      quantityNode("Gaya gesek", "f"),
      quantityNode("Gaya normal", "N"),
    ]),
  ],
  "Tegangan mekanik": [
    formula("Gaya per luas penampang", "\\sigma = \\frac{F}{A}", [
      quantityNode("Gaya", "F"),
      quantityNode("Luas penampang", "A"),
    ]),
  ],
  Regangan: [
    formula(
      "Perubahan relatif panjang",
      "\\varepsilon = \\frac{\\Delta L}{L_0}",
      [
        quantityNode("Perubahan panjang", "\\Delta L"),
        quantityNode("Panjang awal", "L_0"),
      ]
    ),
  ],
  "Modulus Young": [
    formula(
      "Perbandingan tegangan dan regangan",
      "Y = \\frac{\\sigma}{\\varepsilon}",
      [
        quantityNode("Tegangan mekanik", "\\sigma"),
        quantityNode("Regangan", "\\varepsilon"),
      ],
      "Pada daerah elastis"
    ),
  ],
  Tekanan: [
    formula("Gaya per luas", "p = \\frac{F}{A}", [
      quantityNode("Gaya", "F"),
      quantityNode("Luas bidang tekan", "A"),
    ]),
  ],
  "Massa jenis": [
    formula("Massa per volume", "\\rho = \\frac{m}{V}", [
      quantityNode("Massa", "m"),
      quantityNode("Volume", "V"),
    ]),
  ],
  "Debit volume": [
    formula("Volume per waktu", "Q = \\frac{V}{t}", [
      quantityNode("Volume", "V"),
      quantityNode("Waktu", "t"),
    ]),
    formula("Aliran seragam", "Q = Av", [
      quantityNode("Luas penampang", "A"),
      quantityNode("Kecepatan aliran", "v"),
    ]),
  ],
  "Viskositas dinamis": [
    formula(
      "Aliran laminar",
      "\\eta = \\frac{F/A}{\\Delta v/\\Delta y}",
      [
        quantityNode("Gaya geser", "F"),
        quantityNode("Luas bidang", "A"),
        quantityNode("Perubahan kecepatan", "\\Delta v"),
        quantityNode("Perubahan jarak", "\\Delta y"),
      ],
      "Untuk fluida Newtonian"
    ),
  ],
  "Tegangan permukaan": [
    formula("Gaya pada permukaan", "\\gamma = \\frac{F}{l}", [
      quantityNode("Gaya", "F"),
      quantityNode("Panjang permukaan", "l"),
    ]),
  ],
  "Panjang gelombang": [
    formula("Hubungan gelombang", "\\lambda = \\frac{v}{f}", [
      quantityNode("Cepat rambat gelombang", "v"),
      quantityNode("Frekuensi", "f"),
    ]),
  ],
  "Bilangan gelombang": [
    formula("Bilangan gelombang sudut", "k = \\frac{2\\pi}{\\lambda}", [
      quantityNode("Panjang gelombang", "\\lambda"),
      conceptNode("Konstanta lingkaran", "\\pi"),
    ]),
  ],
  "Intensitas gelombang": [
    formula("Daya per luas", "I = \\frac{P}{A}", [
      quantityNode("Daya", "P"),
      quantityNode("Luas bidang", "A"),
    ]),
  ],
  "Taraf intensitas bunyi": [
    formula("Skala desibel", "\\beta = 10\\log_{10}\\frac{I}{I_0}", [
      quantityNode("Intensitas bunyi", "I"),
      conceptNode("Intensitas acuan"),
    ]),
  ],
  "Indeks bias": [
    formula("Perbandingan cepat rambat", "n = \\frac{c}{v}", [
      conceptNode("Cepat rambat cahaya di vakum"),
      quantityNode("Cepat rambat cahaya dalam medium", "v"),
    ]),
  ],
  "Kekuatan lensa": [
    formula(
      "Kebalikan jarak fokus",
      "P = \\frac{1}{f}",
      [quantityNode("Jarak fokus", "f")],
      "Jarak fokus dinyatakan dalam meter"
    ),
  ],
  Perbesaran: [
    formula("Perbandingan tinggi bayangan", "M = \\frac{h_i}{h_o}", [
      quantityNode("Tinggi bayangan", "h_i"),
      quantityNode("Tinggi benda", "h_o"),
    ]),
    formula("Lensa tipis", "M = \\frac{v}{u}", [
      quantityNode("Jarak bayangan", "v"),
      quantityNode("Jarak benda", "u"),
    ]),
  ],
  Kalor: [
    formula("Perubahan suhu", "Q = mc\\Delta T", [
      quantityNode("Massa", "m"),
      quantityNode("Kalor jenis", "c"),
      quantityNode("Perubahan suhu", "\\Delta T"),
    ]),
    formula("Perubahan wujud", "Q = mL", [
      quantityNode("Massa", "m"),
      quantityNode("Kalor laten jenis", "L"),
    ]),
  ],
  "Kapasitas kalor": [
    formula("Kalor per perubahan suhu", "C = \\frac{Q}{\\Delta T}", [
      quantityNode("Kalor", "Q"),
      quantityNode("Perubahan suhu", "\\Delta T"),
    ]),
  ],
  "Kalor jenis": [
    formula("Kalor per massa dan perubahan suhu", "c = \\frac{Q}{m\\Delta T}", [
      quantityNode("Kalor", "Q"),
      quantityNode("Massa", "m"),
      quantityNode("Perubahan suhu", "\\Delta T"),
    ]),
  ],
  "Kalor laten jenis": [
    formula(
      "Kalor per massa",
      "L = \\frac{Q}{m}",
      [quantityNode("Kalor", "Q"), quantityNode("Massa", "m")],
      "Saat terjadi perubahan wujud"
    ),
  ],
  "Koefisien muai panjang": [
    formula("Pemuaian panjang", "\\alpha = \\frac{\\Delta L}{L_0\\Delta T}", [
      quantityNode("Perubahan panjang", "\\Delta L"),
      quantityNode("Panjang awal", "L_0"),
      quantityNode("Perubahan suhu", "\\Delta T"),
    ]),
  ],
  "Konduktivitas termal": [
    formula("Hantaran kalor", "k = \\frac{Q\\ell}{A\\Delta T\\Delta t}", [
      quantityNode("Kalor", "Q"),
      quantityNode("Panjang bahan", "\\ell"),
      quantityNode("Luas penampang", "A"),
      quantityNode("Perubahan suhu", "\\Delta T"),
      quantityNode("Waktu", "\\Delta t"),
    ]),
  ],
  Entropi: [
    formula(
      "Proses reversibel",
      "\\Delta S = \\frac{Q_{\\mathrm{rev}}}{T}",
      [
        quantityNode("Kalor reversibel", "Q_{\\mathrm{rev}}"),
        quantityNode("Suhu mutlak", "T"),
      ],
      "Untuk proses reversibel pada suhu tetap"
    ),
  ],
  Efisiensi: [
    formula(
      "Perbandingan energi",
      "\\eta = \\frac{E_{\\mathrm{out}}}{E_{\\mathrm{in}}}",
      [
        quantityNode("Energi keluaran", "E_{\\mathrm{out}}"),
        quantityNode("Energi masukan", "E_{\\mathrm{in}}"),
      ]
    ),
    formula(
      "Perbandingan daya",
      "\\eta = \\frac{P_{\\mathrm{out}}}{P_{\\mathrm{in}}}",
      [
        quantityNode("Daya keluaran", "P_{\\mathrm{out}}"),
        quantityNode("Daya masukan", "P_{\\mathrm{in}}"),
      ]
    ),
  ],
  "Muatan listrik": [
    formula("Arus konstan", "Q = I\\Delta t", [
      quantityNode("Arus listrik", "I"),
      quantityNode("Waktu", "\\Delta t"),
    ]),
  ],
  "Beda potensial": [
    formula("Usaha per muatan", "V = \\frac{W}{Q}", [
      quantityNode("Usaha", "W"),
      quantityNode("Muatan listrik", "Q"),
    ]),
    formula("Hukum Ohm", "V = IR", [
      quantityNode("Arus listrik", "I"),
      quantityNode("Hambatan listrik", "R"),
    ]),
  ],
  "Hambatan listrik": [
    formula("Hukum Ohm", "R = \\frac{V}{I}", [
      quantityNode("Beda potensial", "V"),
      quantityNode("Arus listrik", "I"),
    ]),
    formula("Kawat homogen", "R = \\frac{\\rho\\ell}{A}", [
      quantityNode("Hambatan jenis", "\\rho"),
      quantityNode("Panjang kawat", "\\ell"),
      quantityNode("Luas penampang", "A"),
    ]),
  ],
  "Hambatan jenis": [
    formula("Kawat homogen", "\\rho = \\frac{RA}{\\ell}", [
      quantityNode("Hambatan listrik", "R"),
      quantityNode("Luas penampang", "A"),
      quantityNode("Panjang kawat", "\\ell"),
    ]),
  ],
  Konduktansi: [
    formula("Kebalikan hambatan", "G = \\frac{1}{R}", [
      quantityNode("Hambatan listrik", "R"),
    ]),
    formula("Arus per tegangan", "G = \\frac{I}{V}", [
      quantityNode("Arus listrik", "I"),
      quantityNode("Beda potensial", "V"),
    ]),
  ],
  "Konduktivitas listrik": [
    formula("Kebalikan hambatan jenis", "\\sigma = \\frac{1}{\\rho}", [
      quantityNode("Hambatan jenis", "\\rho"),
    ]),
    formula("Konduktansi bahan", "\\sigma = \\frac{G\\ell}{A}", [
      quantityNode("Konduktansi", "G"),
      quantityNode("Panjang bahan", "\\ell"),
      quantityNode("Luas penampang", "A"),
    ]),
  ],
  Kapasitansi: [
    formula("Muatan per tegangan", "C = \\frac{Q}{V}", [
      quantityNode("Muatan listrik", "Q"),
      quantityNode("Beda potensial", "V"),
    ]),
  ],
  "Medan listrik": [
    formula("Gaya per muatan", "E = \\frac{F}{q}", [
      quantityNode("Gaya listrik", "F"),
      quantityNode("Muatan uji", "q"),
    ]),
    formula("Muatan titik", "E = k\\frac{q}{r^2}", [
      conceptNode("Konstanta Coulomb"),
      quantityNode("Muatan sumber", "q"),
      quantityNode("Jarak dari muatan", "r"),
    ]),
  ],
  "Fluks listrik": [
    formula("Medan seragam", "\\Phi_E = EA\\cos\\theta", [
      quantityNode("Medan listrik", "E"),
      quantityNode("Luas permukaan", "A"),
      conceptNode("Sudut medan terhadap normal permukaan"),
    ]),
  ],
  "Rapat arus": [
    formula("Arus per luas penampang", "J = \\frac{I}{A}", [
      quantityNode("Arus listrik", "I"),
      quantityNode("Luas penampang", "A"),
    ]),
  ],
  "Induksi magnetik": [
    formula("Kawat berarus", "B = \\frac{F}{I\\ell\\sin\\theta}", [
      quantityNode("Gaya magnet", "F"),
      quantityNode("Arus listrik", "I"),
      quantityNode("Panjang kawat", "\\ell"),
      conceptNode("Sudut antara kawat dan medan"),
    ]),
  ],
  "Fluks magnetik": [
    formula("Medan seragam", "\\Phi = BA\\cos\\theta", [
      quantityNode("Induksi magnetik", "B"),
      quantityNode("Luas permukaan", "A"),
      conceptNode("Sudut medan terhadap normal permukaan"),
    ]),
  ],
  Induktansi: [
    formula("Definisi induktansi", "L = \\frac{N\\Phi}{I}", [
      quantityNode("Jumlah lilitan", "N"),
      quantityNode("Fluks magnetik", "\\Phi"),
      quantityNode("Arus listrik", "I"),
    ]),
  ],
  "Permeabilitas magnetik": [
    formula("Hubungan B dan H", "\\mu = \\frac{B}{H}", [
      quantityNode("Induksi magnetik", "B"),
      conceptNode("Kuat medan magnet"),
    ]),
  ],
  "Aktivitas radioaktif": [
    formula("Peluruhan radioaktif", "A = \\lambda N", [
      quantityNode("Konstanta peluruhan", "\\lambda"),
      quantityNode("Jumlah inti radioaktif", "N"),
    ]),
  ],
  "Konstanta peluruhan": [
    formula("Waktu paruh", "\\lambda = \\frac{\\ln 2}{T_{1/2}}", [
      quantityNode("Waktu paruh", "T_{1/2}"),
      conceptNode("Konstanta matematika", "\\ln 2"),
    ]),
  ],
  "Dosis serap": [
    formula("Energi per massa", "D = \\frac{E_{\\mathrm{abs}}}{m}", [
      quantityNode("Energi terserap", "E_{\\mathrm{abs}}"),
      quantityNode("Massa bahan", "m"),
    ]),
  ],
  "Dosis ekuivalen": [
    formula("Faktor bobot radiasi", "H = w_R D", [
      conceptNode("Faktor bobot radiasi"),
      quantityNode("Dosis serap", "D"),
    ]),
  ],
};

export const DERIVED_UNITS = [
  {
    dimension: "\\mathrm{L^2}",
    quantity: "Luas",
    quantitySymbol: "A",
    unit: "meter persegi",
    unitSymbol: "\\mathrm{m^2}",
  },
  {
    dimension: "\\mathrm{L^3}",
    quantity: "Volume",
    quantitySymbol: "V",
    unit: "meter kubik",
    unitSymbol: "\\mathrm{m^3}",
  },
  {
    dimension: "\\mathrm{LT^{-1}}",
    quantity: "Kecepatan",
    quantitySymbol: "v",
    unit: "meter per sekon",
    unitSymbol: "\\mathrm{m/s}",
  },
  {
    dimension: "\\mathrm{LT^{-2}}",
    quantity: "Percepatan",
    quantitySymbol: "a",
    unit: "meter per sekon kuadrat",
    unitSymbol: "\\mathrm{m/s^2}",
  },
  {
    dimension: "\\mathrm{T^{-1}}",
    quantity: "Kecepatan sudut",
    quantitySymbol: "\\omega",
    unit: "radian per sekon",
    unitSymbol: "\\mathrm{rad/s}",
  },
  {
    dimension: "\\mathrm{T^{-2}}",
    quantity: "Percepatan sudut",
    quantitySymbol: "\\alpha",
    unit: "radian per sekon kuadrat",
    unitSymbol: "\\mathrm{rad/s^2}",
  },
  {
    dimension: "\\mathrm{T}",
    quantity: "Periode",
    quantitySymbol: "T",
    unit: "sekon",
    unitSymbol: "\\mathrm{s}",
  },
  {
    dimension: "\\mathrm{T^{-1}}",
    quantity: "Frekuensi",
    quantitySymbol: "f",
    unit: "hertz",
    unitSymbol: "\\mathrm{Hz}",
  },
  {
    dimension: "\\mathrm{MLT^{-1}}",
    quantity: "Momentum",
    quantitySymbol: "p",
    unit: "kilogram meter per sekon",
    unitSymbol: "\\mathrm{kg\\cdot m/s}",
  },
  {
    dimension: "\\mathrm{MLT^{-1}}",
    quantity: "Impuls",
    quantitySymbol: "I",
    unit: "newton sekon",
    unitSymbol: "\\mathrm{N\\cdot s}",
  },
  {
    dimension: "\\mathrm{MLT^{-2}}",
    quantity: "Gaya",
    quantitySymbol: "F",
    unit: "newton",
    unitSymbol: "\\mathrm{N}",
  },
  {
    dimension: "\\mathrm{MLT^{-2}}",
    quantity: "Berat",
    quantitySymbol: "w",
    unit: "newton",
    unitSymbol: "\\mathrm{N}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}}",
    quantity: "Momen gaya",
    quantitySymbol: "\\tau",
    unit: "newton meter",
    unitSymbol: "\\mathrm{N\\cdot m}",
  },
  {
    dimension: "\\mathrm{ML^2}",
    quantity: "Momen inersia",
    quantitySymbol: "I",
    unit: "kilogram meter persegi",
    unitSymbol: "\\mathrm{kg\\cdot m^2}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-1}}",
    quantity: "Momentum sudut",
    quantitySymbol: "L",
    unit: "kilogram meter persegi per sekon",
    unitSymbol: "\\mathrm{kg\\cdot m^2/s}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}}",
    quantity: "Usaha",
    quantitySymbol: "W",
    unit: "joule",
    unitSymbol: "\\mathrm{J}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}}",
    quantity: "Energi",
    quantitySymbol: "E",
    unit: "joule",
    unitSymbol: "\\mathrm{J}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-3}}",
    quantity: "Daya",
    quantitySymbol: "P",
    unit: "watt",
    unitSymbol: "\\mathrm{W}",
  },
  {
    dimension: "\\mathrm{MT^{-2}}",
    quantity: "Konstanta pegas",
    quantitySymbol: "k",
    unit: "newton per meter",
    unitSymbol: "\\mathrm{N/m}",
  },
  {
    dimension: "1",
    quantity: "Koefisien gesek",
    quantitySymbol: "\\mu",
    unit: "tanpa satuan",
    unitSymbol: "1",
  },
  {
    dimension: "\\mathrm{ML^{-1}T^{-2}}",
    quantity: "Tegangan mekanik",
    quantitySymbol: "\\sigma",
    unit: "pascal",
    unitSymbol: "\\mathrm{Pa}",
  },
  {
    dimension: "1",
    quantity: "Regangan",
    quantitySymbol: "\\varepsilon",
    unit: "tanpa satuan",
    unitSymbol: "1",
  },
  {
    dimension: "\\mathrm{ML^{-1}T^{-2}}",
    quantity: "Modulus Young",
    quantitySymbol: "Y",
    unit: "pascal",
    unitSymbol: "\\mathrm{Pa}",
  },
  {
    dimension: "\\mathrm{ML^{-1}T^{-2}}",
    quantity: "Tekanan",
    quantitySymbol: "p",
    unit: "pascal",
    unitSymbol: "\\mathrm{Pa}",
  },
  {
    dimension: "\\mathrm{ML^{-3}}",
    quantity: "Massa jenis",
    quantitySymbol: "\\rho",
    unit: "kilogram per meter kubik",
    unitSymbol: "\\mathrm{kg/m^3}",
  },
  {
    dimension: "\\mathrm{L^3T^{-1}}",
    quantity: "Debit volume",
    quantitySymbol: "Q",
    unit: "meter kubik per sekon",
    unitSymbol: "\\mathrm{m^3/s}",
  },
  {
    dimension: "\\mathrm{ML^{-1}T^{-1}}",
    quantity: "Viskositas dinamis",
    quantitySymbol: "\\eta",
    unit: "pascal sekon",
    unitSymbol: "\\mathrm{Pa\\cdot s}",
  },
  {
    dimension: "\\mathrm{MT^{-2}}",
    quantity: "Tegangan permukaan",
    quantitySymbol: "\\gamma",
    unit: "newton per meter",
    unitSymbol: "\\mathrm{N/m}",
  },
  {
    dimension: "\\mathrm{L}",
    quantity: "Panjang gelombang",
    quantitySymbol: "\\lambda",
    unit: "meter",
    unitSymbol: "\\mathrm{m}",
  },
  {
    dimension: "\\mathrm{L^{-1}}",
    quantity: "Bilangan gelombang",
    quantitySymbol: "k",
    unit: "radian per meter",
    unitSymbol: "\\mathrm{rad/m}",
  },
  {
    dimension: "\\mathrm{MT^{-3}}",
    quantity: "Intensitas gelombang",
    quantitySymbol: "I",
    unit: "watt per meter persegi",
    unitSymbol: "\\mathrm{W/m^2}",
  },
  {
    dimension: "1",
    quantity: "Taraf intensitas bunyi",
    quantitySymbol: "\\beta",
    unit: "desibel",
    unitSymbol: "\\mathrm{dB}",
  },
  {
    dimension: "1",
    quantity: "Indeks bias",
    quantitySymbol: "n",
    unit: "tanpa satuan",
    unitSymbol: "1",
  },
  {
    dimension: "\\mathrm{L^{-1}}",
    quantity: "Kekuatan lensa",
    quantitySymbol: "P",
    unit: "dioptri",
    unitSymbol: "\\mathrm{D}",
  },
  {
    dimension: "1",
    quantity: "Perbesaran",
    quantitySymbol: "M",
    unit: "tanpa satuan",
    unitSymbol: "1",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}}",
    quantity: "Kalor",
    quantitySymbol: "Q",
    unit: "joule",
    unitSymbol: "\\mathrm{J}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}\\Theta^{-1}}",
    quantity: "Kapasitas kalor",
    quantitySymbol: "C",
    unit: "joule per kelvin",
    unitSymbol: "\\mathrm{J/K}",
  },
  {
    dimension: "\\mathrm{L^2T^{-2}\\Theta^{-1}}",
    quantity: "Kalor jenis",
    quantitySymbol: "c",
    unit: "joule per kilogram kelvin",
    unitSymbol: "\\mathrm{J/(kg\\cdot K)}",
  },
  {
    dimension: "\\mathrm{L^2T^{-2}}",
    quantity: "Kalor laten jenis",
    quantitySymbol: "L",
    unit: "joule per kilogram",
    unitSymbol: "\\mathrm{J/kg}",
  },
  {
    dimension: "\\mathrm{\\Theta^{-1}}",
    quantity: "Koefisien muai panjang",
    quantitySymbol: "\\alpha",
    unit: "per kelvin",
    unitSymbol: "\\mathrm{K^{-1}}",
  },
  {
    dimension: "\\mathrm{MLT^{-3}\\Theta^{-1}}",
    quantity: "Konduktivitas termal",
    quantitySymbol: "k",
    unit: "watt per meter kelvin",
    unitSymbol: "\\mathrm{W/(m\\cdot K)}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}\\Theta^{-1}}",
    quantity: "Entropi",
    quantitySymbol: "S",
    unit: "joule per kelvin",
    unitSymbol: "\\mathrm{J/K}",
  },
  {
    dimension: "1",
    quantity: "Efisiensi",
    quantitySymbol: "\\eta",
    unit: "tanpa satuan",
    unitSymbol: "1",
  },
  {
    dimension: "\\mathrm{IT}",
    quantity: "Muatan listrik",
    quantitySymbol: "Q",
    unit: "coulomb",
    unitSymbol: "\\mathrm{C}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-3}I^{-1}}",
    quantity: "Beda potensial",
    quantitySymbol: "V",
    unit: "volt",
    unitSymbol: "\\mathrm{V}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-3}I^{-2}}",
    quantity: "Hambatan listrik",
    quantitySymbol: "R",
    unit: "ohm",
    unitSymbol: "\\Omega",
  },
  {
    dimension: "\\mathrm{ML^3T^{-3}I^{-2}}",
    quantity: "Hambatan jenis",
    quantitySymbol: "\\rho",
    unit: "ohm meter",
    unitSymbol: "\\mathrm{\\Omega\\cdot m}",
  },
  {
    dimension: "\\mathrm{M^{-1}L^{-2}T^3I^2}",
    quantity: "Konduktansi",
    quantitySymbol: "G",
    unit: "siemens",
    unitSymbol: "\\mathrm{S}",
  },
  {
    dimension: "\\mathrm{M^{-1}L^{-3}T^3I^2}",
    quantity: "Konduktivitas listrik",
    quantitySymbol: "\\sigma",
    unit: "siemens per meter",
    unitSymbol: "\\mathrm{S/m}",
  },
  {
    dimension: "\\mathrm{M^{-1}L^{-2}T^4I^2}",
    quantity: "Kapasitansi",
    quantitySymbol: "C",
    unit: "farad",
    unitSymbol: "\\mathrm{F}",
  },
  {
    dimension: "\\mathrm{MLT^{-3}I^{-1}}",
    quantity: "Medan listrik",
    quantitySymbol: "E",
    unit: "newton per coulomb",
    unitSymbol: "\\mathrm{N/C}",
  },
  {
    dimension: "\\mathrm{ML^3T^{-3}I^{-1}}",
    quantity: "Fluks listrik",
    quantitySymbol: "\\Phi_E",
    unit: "newton meter persegi per coulomb",
    unitSymbol: "\\mathrm{N\\cdot m^2/C}",
  },
  {
    dimension: "\\mathrm{IL^{-2}}",
    quantity: "Rapat arus",
    quantitySymbol: "J",
    unit: "ampere per meter persegi",
    unitSymbol: "\\mathrm{A/m^2}",
  },
  {
    dimension: "\\mathrm{MT^{-2}I^{-1}}",
    quantity: "Induksi magnetik",
    quantitySymbol: "B",
    unit: "tesla",
    unitSymbol: "\\mathrm{T}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}I^{-1}}",
    quantity: "Fluks magnetik",
    quantitySymbol: "\\Phi",
    unit: "weber",
    unitSymbol: "\\mathrm{Wb}",
  },
  {
    dimension: "\\mathrm{ML^2T^{-2}I^{-2}}",
    quantity: "Induktansi",
    quantitySymbol: "L",
    unit: "henry",
    unitSymbol: "\\mathrm{H}",
  },
  {
    dimension: "\\mathrm{MLT^{-2}I^{-2}}",
    quantity: "Permeabilitas magnetik",
    quantitySymbol: "\\mu",
    unit: "henry per meter",
    unitSymbol: "\\mathrm{H/m}",
  },
  {
    dimension: "\\mathrm{T^{-1}}",
    quantity: "Aktivitas radioaktif",
    quantitySymbol: "A",
    unit: "becquerel",
    unitSymbol: "\\mathrm{Bq}",
  },
  {
    dimension: "\\mathrm{T^{-1}}",
    quantity: "Konstanta peluruhan",
    quantitySymbol: "\\lambda",
    unit: "per sekon",
    unitSymbol: "\\mathrm{s^{-1}}",
  },
  {
    dimension: "\\mathrm{L^2T^{-2}}",
    quantity: "Dosis serap",
    quantitySymbol: "D",
    unit: "gray",
    unitSymbol: "\\mathrm{Gy}",
  },
  {
    dimension: "\\mathrm{L^2T^{-2}}",
    quantity: "Dosis ekuivalen",
    quantitySymbol: "H",
    unit: "sievert",
    unitSymbol: "\\mathrm{Sv}",
  },
] as const;

export const GRAPH_PREREQUISITE_ALIASES: Record<string, string> = {
  "Cepat rambat gelombang": "Kecepatan",
  "Daya keluaran": "Daya",
  "Daya masukan": "Daya",
  "Energi keluaran": "Energi",
  "Energi masukan": "Energi",
  "Energi terserap": "Energi",
  "Gaya gesek": "Gaya",
  "Gaya listrik": "Gaya",
  "Gaya magnet": "Gaya",
  "Gaya normal": "Gaya",
  "Gaya geser": "Gaya",
  "Jarak dari muatan": "Panjang",
  "Jarak dari poros": "Panjang",
  "Jarak fokus": "Panjang",
  "Jarak benda": "Panjang",
  "Jarak bayangan": "Panjang",
  "Jarak tiap elemen dari poros": "Panjang",
  "Kalor reversibel": "Kalor",
  Ketinggian: "Panjang",
  "Kecepatan aliran": "Kecepatan",
  "Konduktivitas termal": "Konduktivitas termal",
  "Lengan gaya": "Panjang",
  Lebar: "Panjang",
  "Luas bidang tekan": "Luas",
  "Luas bidang": "Luas",
  "Luas penampang": "Luas",
  "Luas permukaan": "Luas",
  "Massa bahan": "Massa",
  "Massa tiap elemen": "Massa",
  "Muatan sumber": "Muatan listrik",
  "Muatan uji": "Muatan listrik",
  "Panjang awal": "Panjang",
  "Panjang bahan": "Panjang",
  "Panjang kawat": "Panjang",
  "Panjang permukaan": "Panjang",
  "Percepatan gravitasi": "Percepatan",
  "Perubahan jarak": "Panjang",
  "Perubahan kecepatan": "Kecepatan",
  "Perubahan panjang": "Panjang",
  "Perubahan momentum": "Momentum",
  "Perubahan suhu": "Suhu",
  "Pertambahan panjang": "Panjang",
  "Suhu mutlak": "Suhu",
  Tinggi: "Panjang",
  "Tinggi awal": "Panjang",
  "Tinggi bayangan": "Panjang",
  "Tinggi benda": "Panjang",
  "Waktu paruh": "Waktu",
};
