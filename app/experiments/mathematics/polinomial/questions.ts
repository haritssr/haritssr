export interface MathOption {
  readonly id: string;
  readonly tex?: string;
  readonly label?: string;
}

interface FieldBase {
  readonly id: string;
  readonly labelTex: string;
  readonly accessibleLabel: string;
}

export type AnswerField = FieldBase &
  (
    | { readonly kind: "number"; readonly expected: string }
    | {
        readonly kind: "choice";
        readonly expected: string;
        readonly options: readonly MathOption[];
      }
  );

export interface AnswerGroup {
  readonly id: string;
  readonly title: string;
  readonly fields: readonly AnswerField[];
  /** Each field is the coefficient of the corresponding TeX monomial. */
  readonly monomials?: readonly string[];
  readonly previewName?: string;
}

export interface ExplanationStep {
  readonly text: string;
  readonly tex?: string;
}

interface QuestionBase {
  readonly id: number;
  readonly topic: string;
  readonly prompt: string;
  readonly expression?: string;
  readonly groups: readonly AnswerGroup[];
  readonly hints: readonly [ExplanationStep, ExplanationStep];
  readonly solution: readonly ExplanationStep[];
}

export type Question = QuestionBase &
  (
    | { readonly kind: "classification" }
    | { readonly kind: "grouping"; readonly buckets: readonly MathOption[] }
    | { readonly kind: "coefficients" | "degree" | "evaluation" }
    | {
        readonly kind: "division";
        readonly synthetic: {
          readonly root: number;
          readonly coefficients: readonly number[];
          readonly products: readonly number[];
          readonly result: readonly number[];
        };
      }
    | {
        readonly kind: "equality";
        readonly comparison: readonly (readonly string[])[];
      }
  );

export const topics = [
  {
    id: "A",
    title: "Jenis persamaan",
    description: "Kenali pangkat dan posisi variabel.",
    rule: String.raw`a_nx^n+\cdots+a_1x+a_0,\quad n\in\mathbb{Z}_{\ge0}`,
  },
  {
    id: "B",
    title: "Penjumlahan",
    description: "Jumlahkan koefisien suku sejenis.",
    rule: String.raw`ax^n+bx^n=(a+b)x^n`,
  },
  {
    id: "C",
    title: "Pengurangan",
    description: "Sebarkan tanda minus ke semua suku.",
    rule: String.raw`A-(B+C)=A-B-C`,
  },
  {
    id: "D",
    title: "Perkalian",
    description: "Kalikan setiap suku, lalu kelompokkan.",
    rule: String.raw`(ax^m)(bx^n)=abx^{m+n}`,
  },
  {
    id: "E",
    title: "Penyederhanaan",
    description: "Kelompokkan, gabungkan, dan urutkan.",
    rule: String.raw`-2x^3+7x^3=(-2+7)x^3`,
  },
  {
    id: "F",
    title: "Derajat",
    description: "Cari pangkat tertinggi dengan koefisien tak nol.",
    rule: String.raw`\deg(4x^3+2x-1)=3`,
  },
  {
    id: "G",
    title: "Koefisien",
    description: "Pertahankan tanda setiap koefisien.",
    rule: String.raw`-ex^2\quad\longrightarrow\quad\text{koefisien }x^2=-e`,
  },
  {
    id: "H",
    title: "Substitusi",
    description: "Ganti variabel dengan nilai yang diminta.",
    rule: String.raw`P(r)=a_nr^n+\cdots+a_1r+a_0`,
  },
  {
    id: "I",
    title: "Pembagian",
    description: "Temukan hasil bagi dan sisa dengan Horner.",
    rule: String.raw`P(x)=(x-r)H(x)+P(r)`,
  },
  {
    id: "J",
    title: "Kesamaan polinomial",
    description: "Samakan koefisien pada pangkat yang sama.",
    rule: String.raw`P(x)\equiv Q(x)\ \Longrightarrow\ a_k=b_k`,
  },
] as const;

export const originalPTex = String.raw`P(x)=-3x^3+4x+x^4-5+5x^3-3x^2`;
export const originalQTex = String.raw`Q(x)=-ex^2+bx^3+ax-fx^3-c+dx^4`;
export const parameterTex =
  "a=4,\\quad b=5,\\quad c=5,\\quad d=1,\\quad e=3,\\quad f=3";
const simplifiedPTex = "P(x)=x^4+2x^3-3x^2+4x-5";
const simplifiedQTex = "Q(x)=dx^4+(b-f)x^3-ex^2+ax-c";
const pCoefficients = [1, 2, -3, 4, -5];
const parameters = ["a", "b", "c", "d", "e", "f"];

function parameterGroup(
  id: string,
  name: string,
  values: readonly number[]
): AnswerGroup {
  return {
    id,
    title: `Pengali parameter pada ${name}`,
    monomials: parameters,
    previewName: name,
    fields: parameters.map((labelTex, index) => ({
      id: `${id}-${index}`,
      kind: "number",
      labelTex,
      accessibleLabel: `${name}, pengali parameter ${labelTex}`,
      expected: String(values[index]),
    })),
  };
}

function powerTex(power: number): string {
  if (power === 0) {
    return "1";
  }
  return power === 1 ? "x" : `x^{${power}}`;
}

function coefficientLabel(power: number): string {
  return power === 0 ? String.raw`\text{Konstanta}` : powerTex(power);
}

function polynomialTex(coefficients: readonly number[]): string {
  let expression = "";
  for (const [index, value] of coefficients.entries()) {
    if (value === 0) {
      continue;
    }
    const monomial = powerTex(coefficients.length - index - 1);
    const suffix = monomial === "1" ? "" : monomial;
    const coefficient =
      Math.abs(value) === 1 && suffix !== "" ? "" : String(Math.abs(value));
    let sign = expression.length === 0 ? "" : "+";
    if (value < 0) {
      sign = "-";
    }
    expression += `${sign}${coefficient}${suffix}`;
  }
  return expression || "0";
}

function numericGroup(
  id: string,
  title: string,
  values: readonly number[],
  previewName?: string
): AnswerGroup {
  return {
    id,
    title,
    previewName,
    monomials: values.map((_, index) => powerTex(values.length - index - 1)),
    fields: values.map((value, index) => {
      const power = values.length - index - 1;
      return {
        id: `${id}-${index}`,
        kind: "number",
        labelTex: coefficientLabel(power),
        accessibleLabel: `${title}, koefisien pangkat ${power}`,
        expected: String(value),
      };
    }),
  };
}

function valueGroup(
  id: string,
  title: string,
  values: readonly (readonly [string, number])[]
): AnswerGroup {
  return {
    id,
    title,
    fields: values.map(([labelTex, expected], index) => ({
      id: `${id}-${index}`,
      kind: "number",
      labelTex,
      accessibleLabel: `${title}, nilai ${index + 1}`,
      expected: String(expected),
    })),
  };
}

const symbolicOptions = [
  "0",
  "1",
  "a",
  "-a",
  "b",
  "-b",
  "c",
  "-c",
  "d",
  "-d",
  "e",
  "-e",
  "f",
  "-f",
  "b-f",
  "b+f",
  "f-b",
].map((tex) => ({ id: tex, tex }));

function symbolicGroup(
  id: string,
  title: string,
  terms: readonly string[],
  expected: readonly string[],
  previewName?: string
): AnswerGroup {
  return {
    id,
    title,
    previewName,
    monomials: previewName === undefined ? undefined : terms,
    fields: terms.map((labelTex, index) => ({
      id: `${id}-${index}`,
      kind: "choice",
      labelTex: labelTex === "1" ? String.raw`\text{Konstanta}` : labelTex,
      accessibleLabel: `${title}, koefisien ${index + 1}`,
      expected: expected[index],
      options: symbolicOptions,
    })),
  };
}

function coefficientQuestion(
  id: number,
  topic: string,
  expression: string,
  answer: readonly number[],
  working: string,
  hint: string
): Question {
  return {
    id,
    topic,
    kind: "coefficients",
    prompt: "Sederhanakan bentuk berikut.",
    expression,
    groups: [
      numericGroup(
        "hasil",
        "Koefisien hasil",
        answer,
        String.raw`\text{Hasil}`
      ),
    ],
    hints: [
      { text: hint },
      {
        text: "Tulis hasil menurut pangkat tertinggi. Isi nol jika suatu pangkat tidak muncul.",
        tex: working,
      },
    ],
    solution: [
      { text: hint, tex: working },
      {
        text: "Gabungkan koefisien untuk setiap pangkat.",
        tex: polynomialTex(answer),
      },
    ],
  };
}

const classificationExamples = [
  {
    expression: "3x^2-5x+2=0",
    yes: true,
    reason: "Semua pangkat variabel adalah bilangan bulat tak negatif.",
    detail: "2,1,0\\in\\mathbb{Z}_{\\ge0}",
  },
  {
    expression: "2x^{-1}+x-4=0",
    yes: false,
    reason: "Ada variabel berpangkat negatif.",
    detail: "x^{-1}=\\frac1x",
  },
  {
    expression: "x^4-7x^2+6=0",
    yes: true,
    reason: "Pangkat yang tidak muncul boleh memiliki koefisien nol.",
    detail: "x^4+0x^3-7x^2+0x+6=0",
  },
  {
    expression: String.raw`\sqrt{x}+2x-3=0`,
    yes: false,
    reason: "Akar dari variabel memiliki pangkat pecahan.",
    detail: String.raw`\sqrt{x}=x^{1/2}`,
  },
  {
    expression: String.raw`\frac12x^3-\frac34x+5=0`,
    yes: true,
    reason:
      "Koefisien boleh berupa pecahan. Yang dibatasi adalah pangkat variabel.",
    detail: String.raw`\frac12,\ -\frac34,\ 5\in\mathbb{R}`,
  },
  {
    expression: String.raw`\frac3x+x^2-1=0`,
    yes: false,
    reason: "Variabel pada penyebut memberi pangkat negatif.",
    detail: String.raw`\frac3x=3x^{-1}`,
  },
  {
    expression: String.raw`\sqrt2\,x^2+\pi x-4=0`,
    yes: true,
    reason:
      "Koefisien irasional tetap merupakan bilangan real; variabelnya berpangkat bulat tak negatif.",
    detail: String.raw`\sqrt2,\ \pi,\ -4\in\mathbb{R}`,
  },
  {
    expression: "2^x+x-5=0",
    yes: false,
    reason:
      "Variabel menjadi eksponen, bukan basis dengan pangkat bulat tetap.",
    detail: String.raw`2^x\ \text{adalah fungsi eksponensial}`,
  },
  {
    expression: "5x^7-x^3+2x=0",
    yes: true,
    reason:
      "Semua pangkat variabel memenuhi syarat, meskipun pangkat tertingginya tujuh.",
    detail: "7,3,1\\in\\mathbb{Z}_{\\ge0}",
  },
  {
    expression: String.raw`x^2+\sin x-1=0`,
    yes: false,
    reason: "Fungsi trigonometri variabel bukan suku polinomial.",
    detail: String.raw`\sin x\ \text{bukan suku polinomial}`,
  },
];

const buckets: readonly MathOption[] = [4, 3, 2, 1, 0].map((power) => ({
  id: String(power),
  tex: coefficientLabel(power),
}));
const originalTerms = [
  {
    id: "p",
    title: "Suku pada P",
    terms: ["-3x^3", "4x", "x^4", "-5", "5x^3", "-3x^2"],
    powers: [3, 1, 4, 0, 3, 2],
  },
  {
    id: "q",
    title: "Suku pada Q",
    terms: ["-ex^2", "bx^3", "ax", "-fx^3", "-c", "dx^4"],
    powers: [2, 3, 1, 3, 0, 4],
  },
];
const groupingGroups: readonly AnswerGroup[] = originalTerms.map(
  ({ id, title, terms, powers }) => ({
    id,
    title,
    fields: terms.map((labelTex, index) => ({
      id: `${id}-${index}`,
      kind: "choice",
      labelTex,
      accessibleLabel: `${title}, suku ${index + 1}`,
      expected: String(powers[index]),
      options: buckets,
    })),
  })
);

export const questions: readonly Question[] = [
  ...classificationExamples.map((example, index): Question => ({
    id: index + 1,
    topic: "A",
    kind: "classification",
    prompt:
      "Tentukan apakah persamaan berikut merupakan persamaan polinomial atau bukan.",
    expression: example.expression,
    groups: [
      {
        id: "jenis",
        title: "Jenis persamaan",
        fields: [
          {
            id: "jenis",
            kind: "choice",
            labelTex: String.raw`\text{Jenis persamaan}`,
            accessibleLabel: "Jenis persamaan",
            expected: example.yes ? "polynomial" : "other",
            options: [
              { id: "polynomial", label: "Polinomial" },
              { id: "other", label: "Bukan polinomial" },
            ],
          },
        ],
      },
    ],
    hints: [
      {
        text: "Periksa pangkat variabel. Koefisien boleh berupa bilangan real apa pun.",
      },
      {
        text: "Cari pangkat negatif, akar variabel, variabel sebagai eksponen, atau fungsi trigonometri.",
        tex: example.detail,
      },
    ],
    solution: [
      {
        text: example.yes
          ? "Persamaan ini merupakan persamaan polinomial."
          : "Persamaan ini bukan persamaan polinomial.",
      },
      { text: example.reason, tex: example.detail },
    ],
  })),
  coefficientQuestion(
    11,
    "B",
    "(3x^2+5x-4)+(2x^2-3x+7)",
    [5, 2, 3],
    "(3+2)x^2+(5-3)x+(-4+7)",
    "Jumlahkan koefisien pada pangkat yang sama."
  ),
  coefficientQuestion(
    12,
    "B",
    "(4x^3-2x^2+x-6)+(x^3+5x^2-4x+2)",
    [5, 3, -3, -4],
    "(4+1)x^3+(-2+5)x^2+(1-4)x+(-6+2)",
    "Pasangkan suku sejenis sebelum menjumlahkan."
  ),
  coefficientQuestion(
    13,
    "C",
    "(5x^2+2x-3)-(2x^2-4x+6)",
    [3, 6, -9],
    "5x^2+2x-3-2x^2+4x-6",
    "Ubah tanda setiap suku di dalam kurung kedua."
  ),
  coefficientQuestion(
    14,
    "C",
    "(6x^3-x^2+3x-5)-(2x^3+4x^2-2x+1)",
    [4, -5, 5, -6],
    "6x^3-x^2+3x-5-2x^3-4x^2+2x-1",
    "Sebarkan tanda minus ke seluruh kurung kedua, lalu gabungkan."
  ),
  coefficientQuestion(
    15,
    "D",
    "(2x^2+3x-1)(x^2-2x+4)",
    [2, -1, 1, 14, -4],
    "2x^4-4x^3+8x^2+3x^3-6x^2+12x-x^2+2x-4",
    "Kalikan masing-masing dari tiga suku pertama dengan ketiga suku kedua."
  ),
  coefficientQuestion(
    16,
    "D",
    "(x^2-2x+3)(3x^2+x-5)",
    [3, -5, 2, 13, -15],
    "3x^4+x^3-5x^2-6x^3-2x^2+10x+9x^2+3x-15",
    "Gunakan distributivitas. Tambahkan pangkat saat mengalikan variabel."
  ),
  {
    id: 17,
    topic: "E",
    kind: "grouping",
    prompt: "Kelompokkan suku-suku sejenis pada kedua polinomial.",
    groups: groupingGroups,
    buckets,
    hints: [
      {
        text: "Suku sejenis memiliki variabel dan pangkat yang sama; koefisiennya boleh berbeda.",
      },
      {
        text: "Tanda minus tidak mengubah kelompok pangkat.",
        tex: String.raw`-3x^3\ \text{dan}\ 5x^3\ \text{sejenis}`,
      },
    ],
    solution: [
      {
        text: "Kelompokkan suku asli pada P menurut pangkatnya.",
        tex: "P(x)=x^4+(-3x^3+5x^3)-3x^2+4x-5",
      },
      {
        text: "Lakukan hal yang sama pada Q, tanpa menghilangkan parameter.",
        tex: "Q(x)=dx^4+(bx^3-fx^3)-ex^2+ax-c",
      },
    ],
  },
  {
    id: 18,
    topic: "E",
    kind: "coefficients",
    prompt:
      "Sederhanakan kedua polinomial, lalu urutkan sukunya dari pangkat tertinggi ke terendah.",
    groups: [
      numericGroup("p", "Koefisien P", pCoefficients, "P(x)"),
      symbolicGroup(
        "q",
        "Koefisien Q",
        ["x^4", "x^3", "x^2", "x", "1"],
        ["d", "b-f", "-e", "a", "-c"],
        "Q(x)"
      ),
    ],
    hints: [
      { text: "Gabungkan suku berpangkat tiga pada masing-masing polinomial." },
      {
        text: "Pada Q, koefisien suku berpangkat tiga merupakan selisih dua parameter.",
        tex: "bx^3-fx^3=(b-f)x^3",
      },
    ],
    solution: [
      { text: "Jumlahkan koefisien suku sejenis pada P.", tex: simplifiedPTex },
      {
        text: "Pertahankan parameter pada Q dan tulis dalam urutan menurun.",
        tex: simplifiedQTex,
      },
    ],
  },
  {
    id: 19,
    topic: "F",
    kind: "degree",
    prompt: "Tentukan derajat P setelah disederhanakan.",
    groups: [
      valueGroup("derajat", "Derajat polinomial", [[String.raw`\deg P`, 4]]),
    ],
    hints: [
      {
        text: "Derajat ditentukan oleh pangkat tertinggi yang koefisiennya tidak nol.",
      },
      {
        text: "Kelompokkan suku sejenis dahulu. Suku berpangkat tiga tidak memengaruhi suku berpangkat empat.",
      },
    ],
    solution: [
      {
        text: "Koefisien pangkat tertinggi adalah satu, bukan nol.",
        tex: `${simplifiedPTex},\\qquad\\deg P=4`,
      },
    ],
  },
  {
    id: 20,
    topic: "F",
    kind: "degree",
    prompt: "Tentukan derajat Q dengan nilai parameter berikut.",
    expression: parameterTex,
    groups: [
      valueGroup("derajat", "Derajat polinomial", [[String.raw`\deg Q`, 4]]),
    ],
    hints: [
      { text: "Sederhanakan dahulu, lalu masukkan nilai parameter." },
      {
        text: "Periksa apakah koefisien pangkat tertinggi menjadi nol.",
        tex: "dx^4=1x^4",
      },
    ],
    solution: [
      {
        text: "Substitusi parameter menghasilkan polinomial berderajat empat.",
        tex: "Q(x)=x^4+(5-3)x^3-3x^2+4x-5",
      },
      { text: "Koefisien pangkat empat tidak nol.", tex: String.raw`\deg Q=4` },
    ],
  },
  {
    id: 21,
    topic: "G",
    kind: "coefficients",
    prompt:
      "Tentukan koefisien setiap suku pada kedua polinomial sebelum disederhanakan.",
    groups: [
      {
        id: "p",
        title: "Koefisien suku asli P",
        fields: originalTerms[0].terms.map((labelTex, index) => ({
          id: `p-${index}`,
          kind: "number",
          labelTex,
          accessibleLabel: `Koefisien suku asli P nomor ${index + 1}`,
          expected: String([-3, 4, 1, -5, 5, -3][index]),
        })),
      },
      symbolicGroup("q", "Koefisien suku asli Q", originalTerms[1].terms, [
        "-e",
        "b",
        "a",
        "-f",
        "-c",
        "d",
      ]),
    ],
    hints: [
      {
        text: "Baca setiap suku dalam urutan asli; jangan gabungkan suku sejenis dulu.",
      },
      {
        text: "Sertakan tanda. Suku tanpa angka tertulis memiliki koefisien satu.",
        tex: "x^4=1x^4,\\qquad -ex^2=(-e)x^2",
      },
    ],
    solution: [
      {
        text: "Koefisien P sesuai urutan suku aslinya.",
        tex: "-3,\\ 4,\\ 1,\\ -5,\\ 5,\\ -3",
      },
      {
        text: "Koefisien Q sesuai urutan suku aslinya.",
        tex: "-e,\\ b,\\ a,\\ -f,\\ -c,\\ d",
      },
    ],
  },
  {
    id: 22,
    topic: "G",
    kind: "coefficients",
    prompt:
      "Setelah disederhanakan, tentukan koefisien setiap pangkat serta suku konstantanya pada kedua polinomial.",
    groups: [
      numericGroup("p", "Koefisien P", pCoefficients, "P(x)"),
      symbolicGroup(
        "q",
        "Koefisien Q",
        ["x^4", "x^3", "x^2", "x", "1"],
        ["d", "b-f", "-e", "a", "-c"],
        "Q(x)"
      ),
    ],
    hints: [
      {
        text: "Bedakan koefisien suku asli dengan koefisien setelah penggabungan.",
      },
      {
        text: "Koefisien konstanta juga menyertakan tanda.",
        tex: String.raw`-c=(-c)x^0`,
      },
    ],
    solution: [
      {
        text: "Koefisien P dari pangkat empat hingga konstanta.",
        tex: "1,\\ 2,\\ -3,\\ 4,\\ -5",
      },
      {
        text: "Koefisien Q dari pangkat empat hingga konstanta.",
        tex: "d,\\ b-f,\\ -e,\\ a,\\ -c",
      },
    ],
  },
  {
    id: 23,
    topic: "H",
    kind: "evaluation",
    prompt: "Hitung nilai P pada kedua masukan berikut.",
    expression: "P(1),\\qquad P(-2)",
    groups: [
      valueGroup("nilai", "Nilai substitusi", [
        ["P(1)", -1],
        ["P(-2)", -25],
      ]),
    ],
    hints: [
      {
        text: "Gunakan bentuk yang sudah disederhanakan, lalu ganti setiap variabel dengan masukan.",
      },
      {
        text: "Gunakan tanda kurung pada masukan negatif: pangkat genap positif, pangkat ganjil negatif.",
        tex: "(-2)^4=16,\\qquad(-2)^3=-8",
      },
    ],
    solution: [
      { text: "Substitusi masukan pertama.", tex: "P(1)=1+2-3+4-5=-1" },
      {
        text: "Substitusi masukan kedua dengan mempertahankan semua tanda.",
        tex: "P(-2)=16-16-12-8-5=-25",
      },
    ],
  },
  {
    id: 24,
    topic: "H",
    kind: "evaluation",
    prompt:
      "Nyatakan kedua nilai Q dalam parameter. Isi pengali setiap parameter, termasuk nol jika tidak muncul.",
    expression: "Q(1),\\qquad Q(-2)",
    groups: [
      parameterGroup("satu", "Q(1)", [1, 1, -1, 1, -1, -1]),
      parameterGroup("negatif", "Q(-2)", [-2, -8, -1, 16, -4, 8]),
    ],
    hints: [
      {
        text: "Substitusikan masukan, tetapi jangan mengganti parameter dengan angka.",
      },
      {
        text: "Pada masukan negatif, perhatikan tanda pangkat tiga dan tanda minus di depan parameter.",
        tex: "-f(-2)^3=8f,\\qquad -e(-2)^2=-4e",
      },
    ],
    solution: [
      {
        text: "Masukan satu mempertahankan pengali semua pangkat.",
        tex: "Q(1)=a+b-c+d-e-f",
      },
      {
        text: "Masukan negatif dua memberi pengali berbeda untuk setiap pangkat.",
        tex: "Q(-2)=-2a-8b-c+16d-4e+8f",
      },
    ],
  },
  {
    id: 25,
    topic: "I",
    kind: "division",
    prompt: "Tentukan hasil bagi dan sisa pembagian P oleh pembagi berikut.",
    expression: "x-2",
    groups: [
      numericGroup("hasil", "Koefisien hasil bagi", [1, 4, 5, 14], "H(x)"),
      valueGroup("sisa", "Sisa pembagian", [["s", 23]]),
    ],
    synthetic: {
      root: 2,
      coefficients: pCoefficients,
      products: [2, 8, 10, 28],
      result: [1, 4, 5, 14, 23],
    },
    hints: [
      {
        text: "Untuk Horner, gunakan akar pembagi dan koefisien dalam urutan pangkat menurun.",
        tex: String.raw`x-2=0\ \Longrightarrow\ r=2`,
      },
      {
        text: "Turunkan koefisien pertama. Kalikan dengan akar pembagi, lalu jumlahkan dengan koefisien berikutnya.",
      },
    ],
    solution: [
      {
        text: "Empat angka pertama baris hasil menjadi koefisien hasil bagi; angka terakhir adalah sisa.",
        tex: "H(x)=x^3+4x^2+5x+14,\\qquad s=23",
      },
      {
        text: "Verifikasi dengan identitas pembagian dan teorema sisa.",
        tex: "P(x)=(x-2)(x^3+4x^2+5x+14)+23,\\qquad P(2)=23",
      },
    ],
  },
  {
    id: 26,
    topic: "I",
    kind: "division",
    prompt:
      "Dengan nilai parameter berikut, tentukan hasil bagi dan sisa pembagian Q.",
    expression: `${parameterTex}\\qquad\\text{Pembagi: }x+1`,
    groups: [
      numericGroup("hasil", "Koefisien hasil bagi", [1, 1, -4, 8], "H(x)"),
      valueGroup("sisa", "Sisa pembagian", [["s", -13]]),
    ],
    synthetic: {
      root: -1,
      coefficients: pCoefficients,
      products: [-1, -1, 4, -8],
      result: [1, 1, -4, 8, -13],
    },
    hints: [
      { text: "Masukkan parameter untuk memperoleh koefisien numerik pada Q." },
      {
        text: "Akar pembagi adalah negatif satu, bukan positif satu.",
        tex: "x+1=x-(-1),\\qquad r=-1",
      },
    ],
    solution: [
      {
        text: "Dengan parameter yang diberikan, Q sama dengan bentuk sederhana P.",
        tex: simplifiedPTex.replace("P", "Q"),
      },
      {
        text: "Gunakan Horner dengan akar negatif satu.",
        tex: "H(x)=x^3+x^2-4x+8,\\qquad s=-13",
      },
      {
        text: "Periksa hasil melalui identitas pembagian.",
        tex: "Q(x)=(x+1)(x^3+x^2-4x+8)-13,\\qquad Q(-1)=-13",
      },
    ],
  },
  {
    id: 27,
    topic: "J",
    kind: "equality",
    prompt:
      "Diketahui dua polinomial berderajat empat. Jika keduanya sama untuk setiap nilai variabel, tentukan parameter dengan menyamakan koefisien suku sejenis.",
    expression: String.raw`\begin{aligned}P(x)&=(2a+b)x^4+(b+c)x^3+(a-c)x^2-2x+5\\Q(x)&=11x^4+5x^3+2x^2-2x+5\end{aligned}`,
    groups: [
      valueGroup("parameter", "Nilai parameter", [
        ["a", 4],
        ["b", 3],
        ["c", 2],
      ]),
    ],
    comparison: [
      ["x^4", "2a+b", "11"],
      ["x^3", "b+c", "5"],
      ["x^2", "a-c", "2"],
      ["x", "-2", "-2"],
      ["1", "5", "5"],
    ],
    hints: [
      {
        text: "Kesamaan untuk semua masukan berarti koefisien pada setiap pangkat harus sama.",
      },
      {
        text: "Susun tiga persamaan. Dua koefisien terakhir sudah cocok.",
        tex: String.raw`\begin{cases}2a+b=11\\b+c=5\\a-c=2\end{cases}`,
      },
    ],
    solution: [
      {
        text: "Nyatakan dua parameter melalui parameter ketiga.",
        tex: "a=c+2,\\qquad b=5-c",
      },
      {
        text: "Substitusikan ke persamaan pertama.",
        tex: String.raw`2(c+2)+(5-c)=11\ \Longrightarrow\ c+9=11\ \Longrightarrow\ c=2`,
      },
      {
        text: "Kembalikan ke dua persamaan lainnya, lalu periksa semua koefisien.",
        tex: "a=4,\\qquad b=3,\\qquad c=2",
      },
    ],
  },
];
