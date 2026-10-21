export interface NextjsStudent {
  readonly address: {
    readonly city: string;
  };
  readonly email: string;
  readonly id: number;
  readonly name: string;
  readonly website: string;
}

export const NextjsStudentsData = [
  {
    address: { city: "South Tangerang" },
    email: "amira@example.test",
    id: 1,
    name: "Amira Wijaya",
    website: "amira.example.test",
  },
  {
    address: { city: "Bandung" },
    email: "bima@example.test",
    id: 2,
    name: "Bima Pratama",
    website: "bima.example.test",
  },
  {
    address: { city: "Jakarta" },
    email: "citra@example.test",
    id: 3,
    name: "Citra Lestari",
    website: "citra.example.test",
  },
  {
    address: { city: "Yogyakarta" },
    email: "dimas@example.test",
    id: 4,
    name: "Dimas Santoso",
    website: "dimas.example.test",
  },
  {
    address: { city: "Surabaya" },
    email: "elena@example.test",
    id: 5,
    name: "Elena Putri",
    website: "elena.example.test",
  },
  {
    address: { city: "Semarang" },
    email: "farhan@example.test",
    id: 6,
    name: "Farhan Hakim",
    website: "farhan.example.test",
  },
  {
    address: { city: "Malang" },
    email: "gita@example.test",
    id: 7,
    name: "Gita Maharani",
    website: "gita.example.test",
  },
  {
    address: { city: "Makassar" },
    email: "hadi@example.test",
    id: 8,
    name: "Hadi Nugraha",
    website: "hadi.example.test",
  },
  {
    address: { city: "Medan" },
    email: "intan@example.test",
    id: 9,
    name: "Intan Sari",
    website: "intan.example.test",
  },
  {
    address: { city: "Denpasar" },
    email: "johan@example.test",
    id: 10,
    name: "Johan Kurniawan",
    website: "johan.example.test",
  },
] as const satisfies readonly NextjsStudent[];

export function getNextjsStudent(id: string): NextjsStudent | undefined {
  const numericId = Number(id);

  return Number.isInteger(numericId)
    ? NextjsStudentsData.find((student) => student.id === numericId)
    : undefined;
}
