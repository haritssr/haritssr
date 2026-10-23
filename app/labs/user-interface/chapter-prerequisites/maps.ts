type ChapterLevel = "foundation" | "core" | "extension";

interface Chapter {
  id: string;
  title: string;
  level?: ChapterLevel;
}

interface ChapterMap {
  id: string;
  title: string;
  description: string;
  chapters: readonly Chapter[];
  dependencies: readonly (readonly [string, string])[];
  sources: readonly { title: string; href: string }[];
}

const mathematics: ChapterMap = {
  id: "mathematics",
  title: "Mathematics",
  description:
    "Follow algebra, geometry, and data branches from their foundations. Calculus is an extension for courses that include it.",
  chapters: [
    {
      id: "numbers",
      title: "Numbers, fractions, and ratios",
      level: "foundation",
    },
    {
      id: "algebra",
      title: "Algebraic expressions and powers",
      level: "foundation",
    },
    { id: "geometry", title: "Geometry and similarity", level: "foundation" },
    { id: "equations", title: "Equations and rearranging formulas" },
    { id: "inequalities", title: "Inequalities and intervals" },
    { id: "functions", title: "Functions and graphs" },
    { id: "linear", title: "Linear equations and functions" },
    { id: "systems", title: "Systems of equations" },
    { id: "quadratics", title: "Quadratic equations and functions" },
    { id: "polynomials", title: "Polynomial functions" },
    { id: "rational", title: "Rational functions" },
    { id: "exponentials", title: "Exponential functions" },
    { id: "logarithms", title: "Logarithms" },
    { id: "sequences", title: "Sequences and series" },
    { id: "coordinates", title: "Coordinate geometry and conics" },
    { id: "trigonometry", title: "Right-triangle trigonometry" },
    { id: "trigFunctions", title: "Unit circle and trigonometric functions" },
    { id: "vectors", title: "Vectors" },
    { id: "matrices", title: "Matrices" },
    { id: "transformations", title: "Geometric transformations" },
    { id: "counting", title: "Counting and combinations" },
    { id: "probability", title: "Probability" },
    { id: "statistics", title: "Descriptive statistics" },
    {
      id: "inference",
      title: "Distributions and statistical inference",
      level: "extension",
    },
    { id: "limits", title: "Limits and continuity", level: "extension" },
    {
      id: "derivatives",
      title: "Derivatives and applications",
      level: "extension",
    },
    { id: "integrals", title: "Integrals and area", level: "extension" },
  ],
  dependencies: [
    ["numbers", "algebra"],
    ["numbers", "geometry"],
    ["algebra", "equations"],
    ["algebra", "inequalities"],
    ["algebra", "functions"],
    ["equations", "linear"],
    ["functions", "linear"],
    ["linear", "systems"],
    ["equations", "quadratics"],
    ["functions", "quadratics"],
    ["quadratics", "polynomials"],
    ["polynomials", "rational"],
    ["functions", "exponentials"],
    ["exponentials", "logarithms"],
    ["linear", "sequences"],
    ["exponentials", "sequences"],
    ["geometry", "coordinates"],
    ["linear", "coordinates"],
    ["geometry", "trigonometry"],
    ["equations", "trigonometry"],
    ["trigonometry", "trigFunctions"],
    ["functions", "trigFunctions"],
    ["coordinates", "vectors"],
    ["trigonometry", "vectors"],
    ["systems", "matrices"],
    ["geometry", "transformations"],
    ["vectors", "transformations"],
    ["numbers", "counting"],
    ["counting", "probability"],
    ["numbers", "statistics"],
    ["statistics", "inference"],
    ["probability", "inference"],
    ["functions", "limits"],
    ["rational", "limits"],
    ["limits", "derivatives"],
    ["derivatives", "integrals"],
  ],
  sources: [
    {
      title: "OpenStax Algebra and Trigonometry",
      href: "https://openstax.org/books/algebra-and-trigonometry-2e/pages/preface",
    },
    {
      title: "OpenStax Calculus",
      href: "https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions",
    },
  ],
};

const physics: ChapterMap = {
  id: "physics",
  title: "Physics",
  description:
    "Build from measurement and mathematical tools into mechanics, thermal physics, waves, and electricity. Modern physics forms the extension branch.",
  chapters: [
    {
      id: "measurement",
      title: "Measurement, units, and uncertainty",
      level: "foundation",
    },
    {
      id: "algebraGraphs",
      title: "Algebra, ratios, and graphs",
      level: "foundation",
    },
    {
      id: "vectorsTrig",
      title: "Vectors and trigonometry",
      level: "foundation",
    },
    {
      id: "exponentialDecay",
      title: "Exponents and exponential decay",
      level: "foundation",
    },
    { id: "motion", title: "Motion in one dimension" },
    { id: "projectiles", title: "Motion in two dimensions" },
    { id: "forces", title: "Forces and Newton's laws" },
    { id: "energy", title: "Work, energy, and power" },
    { id: "momentum", title: "Momentum and collisions" },
    { id: "circular", title: "Circular motion" },
    { id: "rotation", title: "Rotation and angular momentum" },
    { id: "gravity", title: "Gravitation and orbits" },
    { id: "equilibrium", title: "Torque and static equilibrium" },
    { id: "fluids", title: "Fluids and pressure" },
    { id: "heat", title: "Temperature, heat, and heat transfer" },
    { id: "gases", title: "Gas laws and kinetic theory" },
    { id: "thermodynamics", title: "Thermodynamics" },
    { id: "oscillations", title: "Oscillations and springs" },
    { id: "waves", title: "Waves and superposition" },
    { id: "sound", title: "Sound and resonance" },
    { id: "light", title: "Light and reflection" },
    { id: "rayOptics", title: "Refraction, lenses, and ray optics" },
    { id: "waveOptics", title: "Interference and diffraction" },
    { id: "charge", title: "Electric charge and force" },
    { id: "fields", title: "Electric fields and potential" },
    { id: "circuits", title: "Current, resistance, and DC circuits" },
    { id: "magnetism", title: "Magnetic fields and forces" },
    { id: "induction", title: "Electromagnetic induction" },
    { id: "emWaves", title: "Electromagnetic waves" },
    { id: "quantum", title: "Photons and quantum ideas", level: "extension" },
    { id: "atoms", title: "Atomic models and spectra", level: "extension" },
    {
      id: "nuclear",
      title: "Nuclear physics and radioactivity",
      level: "extension",
    },
    { id: "relativity", title: "Special relativity", level: "extension" },
  ],
  dependencies: [
    ["algebraGraphs", "vectorsTrig"],
    ["measurement", "motion"],
    ["algebraGraphs", "motion"],
    ["motion", "projectiles"],
    ["vectorsTrig", "projectiles"],
    ["motion", "forces"],
    ["vectorsTrig", "forces"],
    ["forces", "energy"],
    ["forces", "momentum"],
    ["forces", "circular"],
    ["projectiles", "circular"],
    ["circular", "rotation"],
    ["momentum", "rotation"],
    ["energy", "rotation"],
    ["circular", "gravity"],
    ["energy", "gravity"],
    ["forces", "equilibrium"],
    ["vectorsTrig", "equilibrium"],
    ["equilibrium", "fluids"],
    ["energy", "fluids"],
    ["measurement", "heat"],
    ["heat", "gases"],
    ["energy", "gases"],
    ["gases", "thermodynamics"],
    ["energy", "thermodynamics"],
    ["forces", "oscillations"],
    ["energy", "oscillations"],
    ["oscillations", "waves"],
    ["waves", "sound"],
    ["waves", "light"],
    ["light", "rayOptics"],
    ["vectorsTrig", "rayOptics"],
    ["light", "waveOptics"],
    ["waves", "waveOptics"],
    ["forces", "charge"],
    ["charge", "fields"],
    ["energy", "fields"],
    ["fields", "circuits"],
    ["circuits", "magnetism"],
    ["vectorsTrig", "magnetism"],
    ["magnetism", "induction"],
    ["energy", "induction"],
    ["induction", "emWaves"],
    ["waves", "emWaves"],
    ["light", "quantum"],
    ["energy", "quantum"],
    ["quantum", "atoms"],
    ["fields", "atoms"],
    ["atoms", "nuclear"],
    ["exponentialDecay", "nuclear"],
    ["motion", "relativity"],
    ["emWaves", "relativity"],
  ],
  sources: [
    {
      title: "OpenStax High School Physics",
      href: "https://openstax.org/books/physics/pages/preface",
    },
  ],
};

function diagramDefinition(map: ChapterMap) {
  const lines = [
    "flowchart TD",
    `accTitle: High-school ${map.title.toLowerCase()} chapter prerequisites`,
    "accDescr: Arrows point from suggested prior knowledge to a chapter that uses it. Blue nodes are foundations; amber nodes are extensions.",
    ...map.chapters.map((chapter) => `${chapter.id}["${chapter.title}"]`),
    ...map.dependencies.map(([from, to]) => `${from} --> ${to}`),
    "classDef action stroke-width:2px",
    "classDef attention stroke-width:2px",
  ];
  for (const [level, token] of [
    ["foundation", "action"],
    ["extension", "attention"],
  ] as const) {
    const ids = map.chapters
      .filter((chapter) => chapter.level === level)
      .map((chapter) => chapter.id);
    if (ids.length > 0) {
      lines.push(`class ${ids.join(",")} ${token}`);
    }
  }
  return lines.join("\n");
}

export const prerequisiteMaps = [mathematics, physics].map((map) => ({
  ...map,
  definition: diagramDefinition(map),
}));
