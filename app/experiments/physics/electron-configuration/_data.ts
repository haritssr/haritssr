export interface ElementData {
  readonly atomicNumber: number;
  readonly name: string;
  readonly symbol: string;
}

export const ELEMENTS: readonly ElementData[] = [
  { atomicNumber: 1, name: "Hydrogen", symbol: "H" },
  { atomicNumber: 2, name: "Helium", symbol: "He" },
  { atomicNumber: 3, name: "Lithium", symbol: "Li" },
  { atomicNumber: 4, name: "Beryllium", symbol: "Be" },
  { atomicNumber: 5, name: "Boron", symbol: "B" },
  { atomicNumber: 6, name: "Carbon", symbol: "C" },
  { atomicNumber: 7, name: "Nitrogen", symbol: "N" },
  { atomicNumber: 8, name: "Oxygen", symbol: "O" },
  { atomicNumber: 9, name: "Fluorine", symbol: "F" },
  { atomicNumber: 10, name: "Neon", symbol: "Ne" },
  { atomicNumber: 11, name: "Sodium", symbol: "Na" },
  { atomicNumber: 12, name: "Magnesium", symbol: "Mg" },
  { atomicNumber: 13, name: "Aluminium", symbol: "Al" },
  { atomicNumber: 14, name: "Silicon", symbol: "Si" },
  { atomicNumber: 15, name: "Phosphorus", symbol: "P" },
  { atomicNumber: 16, name: "Sulfur", symbol: "S" },
  { atomicNumber: 17, name: "Chlorine", symbol: "Cl" },
  { atomicNumber: 18, name: "Argon", symbol: "Ar" },
  { atomicNumber: 19, name: "Potassium", symbol: "K" },
  { atomicNumber: 20, name: "Calcium", symbol: "Ca" },
  { atomicNumber: 21, name: "Scandium", symbol: "Sc" },
  { atomicNumber: 22, name: "Titanium", symbol: "Ti" },
  { atomicNumber: 23, name: "Vanadium", symbol: "V" },
  { atomicNumber: 24, name: "Chromium", symbol: "Cr" },
  { atomicNumber: 25, name: "Manganese", symbol: "Mn" },
  { atomicNumber: 26, name: "Iron", symbol: "Fe" },
  { atomicNumber: 27, name: "Cobalt", symbol: "Co" },
  { atomicNumber: 28, name: "Nickel", symbol: "Ni" },
  { atomicNumber: 29, name: "Copper", symbol: "Cu" },
  { atomicNumber: 30, name: "Zinc", symbol: "Zn" },
  { atomicNumber: 31, name: "Gallium", symbol: "Ga" },
  { atomicNumber: 32, name: "Germanium", symbol: "Ge" },
  { atomicNumber: 33, name: "Arsenic", symbol: "As" },
  { atomicNumber: 34, name: "Selenium", symbol: "Se" },
  { atomicNumber: 35, name: "Bromine", symbol: "Br" },
  { atomicNumber: 36, name: "Krypton", symbol: "Kr" },
  { atomicNumber: 37, name: "Rubidium", symbol: "Rb" },
  { atomicNumber: 38, name: "Strontium", symbol: "Sr" },
  { atomicNumber: 39, name: "Yttrium", symbol: "Y" },
  { atomicNumber: 40, name: "Zirconium", symbol: "Zr" },
  { atomicNumber: 41, name: "Niobium", symbol: "Nb" },
  { atomicNumber: 42, name: "Molybdenum", symbol: "Mo" },
  { atomicNumber: 43, name: "Technetium", symbol: "Tc" },
  { atomicNumber: 44, name: "Ruthenium", symbol: "Ru" },
  { atomicNumber: 45, name: "Rhodium", symbol: "Rh" },
  { atomicNumber: 46, name: "Palladium", symbol: "Pd" },
  { atomicNumber: 47, name: "Silver", symbol: "Ag" },
  { atomicNumber: 48, name: "Cadmium", symbol: "Cd" },
  { atomicNumber: 49, name: "Indium", symbol: "In" },
  { atomicNumber: 50, name: "Tin", symbol: "Sn" },
  { atomicNumber: 51, name: "Antimony", symbol: "Sb" },
  { atomicNumber: 52, name: "Tellurium", symbol: "Te" },
  { atomicNumber: 53, name: "Iodine", symbol: "I" },
  { atomicNumber: 54, name: "Xenon", symbol: "Xe" },
  { atomicNumber: 55, name: "Cesium", symbol: "Cs" },
  { atomicNumber: 56, name: "Barium", symbol: "Ba" },
  { atomicNumber: 57, name: "Lanthanum", symbol: "La" },
  { atomicNumber: 58, name: "Cerium", symbol: "Ce" },
  { atomicNumber: 59, name: "Praseodymium", symbol: "Pr" },
  { atomicNumber: 60, name: "Neodymium", symbol: "Nd" },
  { atomicNumber: 61, name: "Promethium", symbol: "Pm" },
  { atomicNumber: 62, name: "Samarium", symbol: "Sm" },
  { atomicNumber: 63, name: "Europium", symbol: "Eu" },
  { atomicNumber: 64, name: "Gadolinium", symbol: "Gd" },
  { atomicNumber: 65, name: "Terbium", symbol: "Tb" },
  { atomicNumber: 66, name: "Dysprosium", symbol: "Dy" },
  { atomicNumber: 67, name: "Holmium", symbol: "Ho" },
  { atomicNumber: 68, name: "Erbium", symbol: "Er" },
  { atomicNumber: 69, name: "Thulium", symbol: "Tm" },
  { atomicNumber: 70, name: "Ytterbium", symbol: "Yb" },
  { atomicNumber: 71, name: "Lutetium", symbol: "Lu" },
  { atomicNumber: 72, name: "Hafnium", symbol: "Hf" },
  { atomicNumber: 73, name: "Tantalum", symbol: "Ta" },
  { atomicNumber: 74, name: "Tungsten", symbol: "W" },
  { atomicNumber: 75, name: "Rhenium", symbol: "Re" },
  { atomicNumber: 76, name: "Osmium", symbol: "Os" },
  { atomicNumber: 77, name: "Iridium", symbol: "Ir" },
  { atomicNumber: 78, name: "Platinum", symbol: "Pt" },
  { atomicNumber: 79, name: "Gold", symbol: "Au" },
  { atomicNumber: 80, name: "Mercury", symbol: "Hg" },
  { atomicNumber: 81, name: "Thallium", symbol: "Tl" },
  { atomicNumber: 82, name: "Lead", symbol: "Pb" },
  { atomicNumber: 83, name: "Bismuth", symbol: "Bi" },
  { atomicNumber: 84, name: "Polonium", symbol: "Po" },
  { atomicNumber: 85, name: "Astatine", symbol: "At" },
  { atomicNumber: 86, name: "Radon", symbol: "Rn" },
  { atomicNumber: 87, name: "Francium", symbol: "Fr" },
  { atomicNumber: 88, name: "Radium", symbol: "Ra" },
  { atomicNumber: 89, name: "Actinium", symbol: "Ac" },
  { atomicNumber: 90, name: "Thorium", symbol: "Th" },
  { atomicNumber: 91, name: "Protactinium", symbol: "Pa" },
  { atomicNumber: 92, name: "Uranium", symbol: "U" },
  { atomicNumber: 93, name: "Neptunium", symbol: "Np" },
  { atomicNumber: 94, name: "Plutonium", symbol: "Pu" },
  { atomicNumber: 95, name: "Americium", symbol: "Am" },
  { atomicNumber: 96, name: "Curium", symbol: "Cm" },
  { atomicNumber: 97, name: "Berkelium", symbol: "Bk" },
  { atomicNumber: 98, name: "Californium", symbol: "Cf" },
  { atomicNumber: 99, name: "Einsteinium", symbol: "Es" },
  { atomicNumber: 100, name: "Fermium", symbol: "Fm" },
  { atomicNumber: 101, name: "Mendelevium", symbol: "Md" },
  { atomicNumber: 102, name: "Nobelium", symbol: "No" },
  { atomicNumber: 103, name: "Lawrencium", symbol: "Lr" },
  { atomicNumber: 104, name: "Rutherfordium", symbol: "Rf" },
  { atomicNumber: 105, name: "Dubnium", symbol: "Db" },
  { atomicNumber: 106, name: "Seaborgium", symbol: "Sg" },
  { atomicNumber: 107, name: "Bohrium", symbol: "Bh" },
  { atomicNumber: 108, name: "Hassium", symbol: "Hs" },
  { atomicNumber: 109, name: "Meitnerium", symbol: "Mt" },
  { atomicNumber: 110, name: "Darmstadtium", symbol: "Ds" },
  { atomicNumber: 111, name: "Roentgenium", symbol: "Rg" },
  { atomicNumber: 112, name: "Copernicium", symbol: "Cn" },
  { atomicNumber: 113, name: "Nihonium", symbol: "Nh" },
  { atomicNumber: 114, name: "Flerovium", symbol: "Fl" },
  { atomicNumber: 115, name: "Moscovium", symbol: "Mc" },
  { atomicNumber: 116, name: "Livermorium", symbol: "Lv" },
  { atomicNumber: 117, name: "Tennessine", symbol: "Ts" },
  { atomicNumber: 118, name: "Oganesson", symbol: "Og" },
];

export const REPRESENTATIVE_MASS_NUMBERS: readonly number[] = [
  // Period 1
  1, 4,
  // Period 2
  7, 9, 11, 12, 14, 16, 19, 20,
  // Period 3
  23, 24, 27, 28, 31, 32, 35, 40,
  // Period 4
  39, 40, 45, 48, 51, 52, 55, 56, 59, 58, 63, 64, 69, 74, 75, 80, 79, 84,
  // Period 5
  85, 88, 89, 90, 93, 98, 98, 102, 103, 106, 107, 114, 115, 120, 121, 130, 127,
  132,
  // Period 6
  133, 138, 139, 140, 141, 142, 145, 152, 153, 158, 159, 164, 165, 166, 169,
  174, 175, 180, 181, 184, 187, 192, 193, 195, 197, 202, 205, 208, 209, 209,
  210, 222,
  // Period 7
  223, 226, 227, 232, 231, 238, 237, 244, 243, 247, 247, 251, 252, 257, 258,
  259, 266, 267, 268, 269, 270, 277, 278, 281, 282, 285, 286, 289, 290, 293,
  294, 294,
];

export const DEFAULT_ATOMIC_NUMBER = 8;
export const MAX_ATOMIC_NUMBER = ELEMENTS.length;

export function normalizeAtomicNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_ATOMIC_NUMBER;
  }

  return Math.min(MAX_ATOMIC_NUMBER, Math.max(1, Math.round(value)));
}

export function getRepresentativeMassNumber(atomicNumber: number): number {
  const normalizedAtomicNumber = normalizeAtomicNumber(atomicNumber);

  return (
    REPRESENTATIVE_MASS_NUMBERS[normalizedAtomicNumber - 1] ??
    normalizedAtomicNumber
  );
}

export function parseAtomicNumber(value?: string | readonly string[]): number {
  const candidate = typeof value === "string" ? value : value?.[0];

  if (candidate === undefined || !/^\d+$/u.test(candidate)) {
    return DEFAULT_ATOMIC_NUMBER;
  }

  return normalizeAtomicNumber(Number(candidate));
}

export interface OrbitalDefinition {
  readonly capacity: number;
  readonly label: string;
  readonly orbitalCount: number;
  readonly shell: number;
}

export const ORBITALS: readonly OrbitalDefinition[] = [
  { capacity: 2, label: "1s", orbitalCount: 1, shell: 1 },
  { capacity: 2, label: "2s", orbitalCount: 1, shell: 2 },
  { capacity: 6, label: "2p", orbitalCount: 3, shell: 2 },
  { capacity: 2, label: "3s", orbitalCount: 1, shell: 3 },
  { capacity: 6, label: "3p", orbitalCount: 3, shell: 3 },
  { capacity: 2, label: "4s", orbitalCount: 1, shell: 4 },
  { capacity: 10, label: "3d", orbitalCount: 5, shell: 3 },
  { capacity: 6, label: "4p", orbitalCount: 3, shell: 4 },
  { capacity: 2, label: "5s", orbitalCount: 1, shell: 5 },
  { capacity: 10, label: "4d", orbitalCount: 5, shell: 4 },
  { capacity: 6, label: "5p", orbitalCount: 3, shell: 5 },
  { capacity: 2, label: "6s", orbitalCount: 1, shell: 6 },
  { capacity: 14, label: "4f", orbitalCount: 7, shell: 4 },
  { capacity: 10, label: "5d", orbitalCount: 5, shell: 5 },
  { capacity: 6, label: "6p", orbitalCount: 3, shell: 6 },
  { capacity: 2, label: "7s", orbitalCount: 1, shell: 7 },
  { capacity: 14, label: "5f", orbitalCount: 7, shell: 5 },
  { capacity: 10, label: "6d", orbitalCount: 5, shell: 6 },
  { capacity: 6, label: "7p", orbitalCount: 3, shell: 7 },
];

const CONFIGURATION_OVERRIDES: Readonly<
  Record<number, Readonly<Record<number, number>>>
> = {
  24: { 5: 1, 6: 5 },
  29: { 5: 1, 6: 10 },
  41: { 8: 1, 9: 4 },
  42: { 8: 1, 9: 5 },
  44: { 8: 1, 9: 7 },
  45: { 8: 1, 9: 8 },
  46: { 8: 0, 9: 10 },
  47: { 8: 1, 9: 10 },
  57: { 12: 0, 13: 1 },
  58: { 12: 1, 13: 1 },
  64: { 12: 7, 13: 1 },
  78: { 11: 1, 13: 9 },
  79: { 11: 1, 13: 10 },
  89: { 16: 0, 17: 1 },
  90: { 16: 0, 17: 2 },
  91: { 16: 2, 17: 1 },
  92: { 16: 3, 17: 1 },
  93: { 16: 4, 17: 1 },
  96: { 16: 7, 17: 1 },
  103: { 17: 0, 18: 1 },
  110: { 15: 1, 17: 9 },
  111: { 15: 1, 17: 10 },
};

export function isConfigurationException(atomicNumber: number): boolean {
  return atomicNumber in CONFIGURATION_OVERRIDES;
}

export function getElectronCounts(atomicNumber: number): number[] {
  let remaining = atomicNumber;
  const counts = ORBITALS.map(({ capacity }) => {
    const electrons = Math.min(remaining, capacity);
    remaining -= electrons;
    return electrons;
  });

  const overrides = CONFIGURATION_OVERRIDES[atomicNumber];
  if (overrides !== undefined) {
    for (const [orbitalIndex, electrons] of Object.entries(overrides)) {
      counts[Number(orbitalIndex)] = electrons;
    }
  }

  return counts;
}

export interface LastElectronQuantumNumbers {
  readonly azimuthalNumber: number;
  readonly magneticNumber: number;
  readonly principalNumber: number;
  readonly spin: "+1/2" | "-1/2";
}

export function getLastElectronQuantumNumbers(
  atomicNumber: number
): LastElectronQuantumNumbers {
  const electronCounts = getElectronCounts(atomicNumber);
  const lastOrbitalIndex = electronCounts.findLastIndex(
    (electrons) => electrons > 0
  );
  const orbital = ORBITALS[lastOrbitalIndex];

  if (orbital === undefined) {
    throw new Error(`Unsupported atomic number: ${atomicNumber}`);
  }

  const electrons = electronCounts[lastOrbitalIndex] ?? 0;
  const magneticOrbitalCount = orbital.orbitalCount;
  const lastOrbitalPosition =
    electrons <= magneticOrbitalCount
      ? electrons - 1
      : electrons - magneticOrbitalCount - 1;

  return {
    azimuthalNumber: (magneticOrbitalCount - 1) / 2,
    magneticNumber: lastOrbitalPosition - (magneticOrbitalCount - 1) / 2,
    principalNumber: orbital.shell,
    spin: electrons <= magneticOrbitalCount ? "+1/2" : "-1/2",
  };
}
