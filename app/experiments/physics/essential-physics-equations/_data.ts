export interface PhysicsEquation {
  readonly condition: string;
  readonly explanation: string;
  readonly expression: string;
  readonly id: string;
  readonly source: {
    readonly href: string;
    readonly label: string;
  };
  readonly symbols: readonly {
    readonly meaning: string;
    readonly symbol: string;
    readonly unit: string | null;
    readonly constantValue?: string;
  }[];
  readonly title: string;
  readonly unitsNote?: string;
}

interface PhysicsDomain {
  readonly description: string;
  readonly equations: readonly PhysicsEquation[];
  readonly id: string;
  readonly title: string;
}

const PHYSICAL_CONSTANTS = {
  gravity: {
    symbol: "G",
    meaning: "Newtonian gravitational constant",
    unit: String.raw`\mathrm{m^3\,kg^{-1}\,s^{-2}}`,
    constantValue: String.raw`\approx 6.67430\times10^{-11}`,
  },
  light: {
    symbol: "c",
    meaning: "Speed of light in vacuum",
    unit: String.raw`\mathrm{m\,s^{-1}}`,
    constantValue: String.raw`299\,792\,458`,
  },
  permittivity: {
    symbol: String.raw`\varepsilon_0`,
    meaning: "Vacuum permittivity",
    unit: String.raw`\mathrm{F\,m^{-1}}`,
    constantValue: String.raw`\approx 8.8541878188\times10^{-12}`,
  },
  permeability: {
    symbol: String.raw`\mu_0`,
    meaning: "Vacuum permeability",
    unit: String.raw`\mathrm{N\,A^{-2}}`,
    constantValue: String.raw`\approx 1.25663706127\times10^{-6}`,
  },
  gas: {
    symbol: "R",
    meaning: "Molar gas constant",
    unit: String.raw`\mathrm{J\,mol^{-1}\,K^{-1}}`,
    constantValue: "8.31446261815324",
  },
  boltzmann: {
    symbol: String.raw`k_{\mathrm{B}}`,
    meaning: "Boltzmann constant",
    unit: String.raw`\mathrm{J\,K^{-1}}`,
    constantValue: String.raw`1.380649\times10^{-23}`,
  },
  planck: {
    symbol: "h",
    meaning: "Planck constant",
    unit: String.raw`\mathrm{J\,s}`,
    constantValue: String.raw`6.62607015\times10^{-34}`,
  },
  reducedPlanck: {
    symbol: String.raw`\hbar`,
    meaning: "Reduced Planck constant",
    unit: String.raw`\mathrm{J\,s}`,
    constantValue: String.raw`\approx 1.054571817\times10^{-34}`,
  },
  pi: {
    symbol: String.raw`\pi`,
    meaning: "Ratio of a circle’s circumference to its diameter",
    unit: "1",
    constantValue: String.raw`\approx 3.141592653589793`,
  },
  imaginary: {
    symbol: "i",
    meaning: "Imaginary unit",
    unit: "1",
    constantValue: String.raw`\sqrt{-1}`,
  },
} as const;

export const DESCRIPTION =
  "Explore foundational physics equations, grouped by domain, with explanations, symbol definitions, SI units, constant values, and the conditions in which they apply.";

export const PHYSICS_DOMAINS: readonly PhysicsDomain[] = [
  {
    id: "mechanics",
    title: "Classical mechanics",
    description:
      "How forces change motion, how energy is transferred, and why momentum is conserved.",
    equations: [
      {
        id: "newtons-second-law",
        title: "Newton’s second law",
        expression: String.raw`\sum \mathbf{F} = m\mathbf{a}`,
        explanation:
          "The combined force on an object determines its acceleration. A larger mass needs a larger net force to produce the same acceleration. Forces and acceleration have direction, so forces that oppose each other must be combined as vectors.",
        symbols: [
          {
            symbol: String.raw`\sum \mathbf{F}`,
            meaning: "Net external force",
            unit: String.raw`\mathrm{N}`,
          },
          { symbol: "m", meaning: "Mass", unit: String.raw`\mathrm{kg}` },
          {
            symbol: String.raw`\mathbf{a}`,
            meaning: "Acceleration",
            unit: String.raw`\mathrm{m\,s^{-2}}`,
          },
        ],
        condition:
          "This form assumes constant mass and an inertial reference frame. Use it for motion much slower than light.",
        source: {
          label: "OpenStax · Newton’s second law",
          href: "https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law",
        },
      },
      {
        id: "momentum-conservation",
        title: "Conservation of linear momentum",
        expression: String.raw`\sum_i \mathbf{p}_{i,\mathrm{initial}} = \sum_i \mathbf{p}_{i,\mathrm{final}}`,
        explanation:
          "Objects can exchange momentum during a collision, but their total momentum stays the same when no net external impulse acts on the system. This lets us connect motion before and after a collision without knowing every detail of the impact.",
        symbols: [
          {
            symbol: String.raw`\mathbf{p}_i`,
            meaning:
              "Momentum of the ith object; classically, its mass multiplied by its velocity",
            unit: String.raw`\mathrm{kg\,m\,s^{-1}}`,
          },
          {
            symbol: String.raw`\sum_i`,
            meaning: "Vector sum over all objects in the chosen system",
            unit: null,
          },
        ],
        condition:
          "Choose a system with no mass crossing its boundary and negligible net external impulse during the interval. Kinetic energy need not be conserved.",
        source: {
          label: "OpenStax · Conservation of linear momentum",
          href: "https://openstax.org/books/university-physics-volume-1/pages/9-3-conservation-of-linear-momentum",
        },
      },
      {
        id: "kinetic-energy",
        title: "Kinetic energy",
        expression: String.raw`K = \frac{1}{2}mv^2`,
        explanation:
          "Kinetic energy is the energy associated with motion. Doubling the speed gives four times the kinetic energy at the same mass. That is why stopping a fast vehicle requires much more energy to be removed than stopping a slow one.",
        symbols: [
          {
            symbol: "K",
            meaning: "Translational kinetic energy",
            unit: String.raw`\mathrm{J}`,
          },
          { symbol: "m", meaning: "Mass", unit: String.raw`\mathrm{kg}` },
          {
            symbol: "v",
            meaning: "Speed in the chosen reference frame",
            unit: String.raw`\mathrm{m\,s^{-1}}`,
          },
        ],
        condition:
          "This is the nonrelativistic expression for translational motion. Rotation has its own kinetic energy, and speeds near light require a relativistic expression.",
        source: {
          label: "OpenStax · Kinetic energy",
          href: "https://openstax.org/books/university-physics-volume-1/pages/7-2-kinetic-energy",
        },
      },
      {
        id: "work-energy-theorem",
        title: "Work–energy theorem",
        expression: String.raw`W_{\mathrm{net}} = \Delta K`,
        explanation:
          "The total work done on a particle equals its change in kinetic energy. Positive net work speeds it up; negative net work slows it down. Work counts the part of a force acting along the displacement, rather than force alone.",
        symbols: [
          {
            symbol: String.raw`W_{\mathrm{net}}`,
            meaning: "Work done by all forces along the path",
            unit: String.raw`\mathrm{J}`,
          },
          {
            symbol: String.raw`\Delta K`,
            meaning: "Final kinetic energy minus initial kinetic energy",
            unit: String.raw`\mathrm{J}`,
          },
        ],
        condition:
          "Use the particle model in classical mechanics. For an extended or deforming system, also account for rotation, internal energy, and how the system boundary is chosen.",
        source: {
          label: "OpenStax · Work–energy theorem",
          href: "https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem",
        },
      },
      {
        id: "universal-gravitation",
        title: "Newton’s law of gravitation",
        expression: String.raw`F = G\frac{m_1m_2}{r^2}`,
        explanation:
          "Two masses attract each other with a force that weakens with the square of their separation. The same relationship describes falling objects and much of planetary motion. The force points along the line joining the two masses.",
        symbols: [
          {
            symbol: "F",
            meaning: "Magnitude of the attractive force",
            unit: String.raw`\mathrm{N}`,
          },
          PHYSICAL_CONSTANTS.gravity,
          {
            symbol: String.raw`m_1,\ m_2`,
            meaning: "The two masses",
            unit: String.raw`\mathrm{kg}`,
          },
          {
            symbol: "r",
            meaning: "Distance between the masses’ centres",
            unit: String.raw`\mathrm{m}`,
          },
        ],
        condition:
          "Applies directly to point masses or nonoverlapping spherically symmetric bodies. Strong gravity and relativistic motion require general relativity.",
        source: {
          label: "OpenStax · Universal gravitation",
          href: "https://openstax.org/books/university-physics-volume-1/pages/13-1-newtons-law-of-universal-gravitation",
        },
      },
    ],
  },
  {
    id: "waves-and-optics",
    title: "Oscillations, waves, and optics",
    description:
      "Repeating motion, the propagation of disturbances, and the bending of light.",
    equations: [
      {
        id: "harmonic-motion",
        title: "Simple harmonic motion",
        expression: String.raw`\frac{d^2x}{dt^2} = -\omega^2 x`,
        explanation:
          "Acceleration always points toward equilibrium and is proportional to the displacement. This produces sinusoidal motion, such as an ideal mass on a spring. The negative sign expresses the restoring direction.",
        symbols: [
          {
            symbol: "x",
            meaning: "Displacement from equilibrium",
            unit: String.raw`\mathrm{m}`,
          },
          { symbol: "t", meaning: "Time", unit: String.raw`\mathrm{s}` },
          {
            symbol: String.raw`\omega`,
            meaning: "Angular frequency",
            unit: String.raw`\mathrm{rad\,s^{-1}}`,
          },
          {
            symbol: "d^2x/dt^2",
            meaning: "Second time derivative of displacement: acceleration",
            unit: String.raw`\mathrm{m\,s^{-2}}`,
          },
        ],
        condition:
          "Assumes a linear restoring force with no damping or driving. Pendulums approximate this motion only for small angles.",
        source: {
          label: "OpenStax · Simple harmonic motion",
          href: "https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion",
        },
      },
      {
        id: "wave-speed",
        title: "Wave speed, frequency, and wavelength",
        expression: String.raw`v_{\mathrm{phase}} = f\lambda`,
        explanation:
          "A wave crest travels one wavelength during one cycle. Multiplying the number of cycles per second by the distance per cycle gives the crest’s speed. The relationship connects the spatial and temporal patterns of a periodic wave.",
        symbols: [
          {
            symbol: String.raw`v_{\mathrm{phase}}`,
            meaning: "Phase speed",
            unit: String.raw`\mathrm{m\,s^{-1}}`,
          },
          { symbol: "f", meaning: "Frequency", unit: String.raw`\mathrm{Hz}` },
          {
            symbol: String.raw`\lambda`,
            meaning: "Wavelength",
            unit: String.raw`\mathrm{m}`,
          },
        ],
        condition:
          "Describes a periodic wave. In a dispersive medium, phase speed can differ from the speed of a wave packet or signal.",
        source: {
          label: "OpenStax · Mathematics of waves",
          href: "https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves",
        },
      },
      {
        id: "snells-law",
        title: "Snell’s law of refraction",
        expression: String.raw`n_1\sin\theta_1 = n_2\sin\theta_2`,
        explanation:
          "Light changes direction when it crosses between materials with different refractive indices. Entering a material with a higher index bends the ray toward the surface normal. The law is used to understand lenses and light passing through water or glass.",
        symbols: [
          {
            symbol: String.raw`n_1,\ n_2`,
            meaning: "Refractive indices of the incident and transmitted media",
            unit: "1",
          },
          {
            symbol: String.raw`\theta_1,\ \theta_2`,
            meaning:
              "Incident and refracted angles, both measured from the surface normal",
            unit: String.raw`\mathrm{rad}`,
          },
        ],
        condition:
          "Use for refraction at an interface between ordinary isotropic media. Some incident angles from a higher-index medium produce total internal reflection instead of a transmitted ray.",
        source: {
          label: "OpenStax · Refraction",
          href: "https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction",
        },
      },
    ],
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    description:
      "Charges, currents, and fields. The four Maxwell equations below connect electricity, magnetism, and light.",
    equations: [
      {
        id: "coulombs-law",
        title: "Coulomb’s law",
        expression: String.raw`F = \frac{1}{4\pi\varepsilon_0}\frac{|q_1q_2|}{r^2}`,
        explanation:
          "Electric charges exert forces on each other. Like signs repel and opposite signs attract. The displayed equation gives the force magnitude; its direction lies along the line joining the charges.",
        symbols: [
          {
            symbol: "F",
            meaning: "Electric force magnitude",
            unit: String.raw`\mathrm{N}`,
          },
          {
            symbol: String.raw`q_1,\ q_2`,
            meaning: "Electric charges",
            unit: String.raw`\mathrm{C}`,
          },
          { symbol: "r", meaning: "Separation", unit: String.raw`\mathrm{m}` },
          PHYSICAL_CONSTANTS.permittivity,
          PHYSICAL_CONSTANTS.pi,
        ],
        condition:
          "This is the electrostatic force between point charges in vacuum. For many charges, add their force vectors; material media require additional treatment.",
        source: {
          label: "OpenStax · Coulomb’s law",
          href: "https://openstax.org/books/university-physics-volume-2/pages/5-3-coulombs-law",
        },
      },
      {
        id: "lorentz-force",
        title: "Lorentz force",
        expression: String.raw`\mathbf{F} = q\left(\mathbf{E} + \mathbf{v}\times\mathbf{B}\right)`,
        explanation:
          "Electric and magnetic fields act on a charged particle. The electric part can change its speed. The magnetic part is perpendicular to its velocity, so by itself it changes direction without doing work.",
        symbols: [
          {
            symbol: String.raw`\mathbf{F}`,
            meaning: "Electromagnetic force",
            unit: String.raw`\mathrm{N}`,
          },
          {
            symbol: "q",
            meaning: "Particle charge",
            unit: String.raw`\mathrm{C}`,
          },
          {
            symbol: String.raw`\mathbf{E}`,
            meaning: "Electric field at the particle",
            unit: String.raw`\mathrm{V\,m^{-1}}`,
          },
          {
            symbol: String.raw`\mathbf{B}`,
            meaning: "Magnetic field at the particle",
            unit: String.raw`\mathrm{T}`,
          },
          {
            symbol: String.raw`\mathbf{v}`,
            meaning:
              "Particle velocity; the cross denotes a vector cross product",
            unit: String.raw`\mathrm{m\,s^{-1}}`,
          },
        ],
        condition:
          "Fields and velocity must be measured in the same inertial frame. Treat the particle as a point charge and exclude its own field from the applied fields.",
        source: {
          label: "OpenStax · Maxwell equations and the Lorentz force",
          href: "https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves",
        },
      },
      {
        id: "gauss-electric",
        title: "Gauss’s law for electricity",
        expression: String.raw`\oiint_S \mathbf{E}\cdot d\mathbf{A} = \frac{Q_{\mathrm{enc}}}{\varepsilon_0}`,
        explanation:
          "The net electric flux through a closed surface measures the charge enclosed by it. Charges outside the surface affect the field but contribute no net flux through that surface. Symmetry can make this a powerful way to find electric fields.",
        symbols: [
          {
            symbol: String.raw`\mathbf{E}`,
            meaning: "Electric field",
            unit: String.raw`\mathrm{V\,m^{-1}}`,
          },
          { symbol: "S", meaning: "Closed surface of integration", unit: null },
          {
            symbol: String.raw`d\mathbf{A}`,
            meaning: "Outward-pointing area element",
            unit: String.raw`\mathrm{m^2}`,
          },
          {
            symbol: String.raw`Q_{\mathrm{enc}}`,
            meaning: "Net enclosed charge",
            unit: String.raw`\mathrm{C}`,
          },
          PHYSICAL_CONSTANTS.permittivity,
        ],
        condition:
          "One of Maxwell’s equations in SI units, using total charge and the electric field. It does not require a symmetric surface to be valid.",
        source: {
          label: "OpenStax · Gauss’s law",
          href: "https://openstax.org/books/university-physics-volume-2/pages/6-2-explaining-gausss-law",
        },
      },
      {
        id: "gauss-magnetic",
        title: "Gauss’s law for magnetism",
        expression: String.raw`\oiint_S \mathbf{B}\cdot d\mathbf{A} = 0`,
        explanation:
          "A closed surface has no net magnetic flux. Magnetic field lines have no isolated sources or sinks in ordinary electromagnetism. Cutting a bar magnet creates smaller magnets, each with both poles, rather than separating the poles.",
        symbols: [
          {
            symbol: String.raw`\mathbf{B}`,
            meaning: "Magnetic field",
            unit: String.raw`\mathrm{T}`,
          },
          { symbol: "S", meaning: "Closed surface of integration", unit: null },
          {
            symbol: String.raw`d\mathbf{A}`,
            meaning: "Outward-pointing area element",
            unit: String.raw`\mathrm{m^2}`,
          },
          {
            symbol: String.raw`\oiint_S`,
            meaning:
              "Integral summing the normal component of the field over the closed surface",
            unit: null,
          },
        ],
        condition:
          "The Maxwell equation for a theory without magnetic monopoles. Zero net flux does not mean the magnetic field vanishes everywhere on the surface.",
        source: {
          label: "OpenStax · Magnetic fields and lines",
          href: "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines",
        },
      },
      {
        id: "faradays-law",
        title: "Faraday’s law of induction",
        expression: String.raw`\oint_C \mathbf{E}\cdot d\boldsymbol{\ell} = -\frac{d\Phi_B}{dt}`,
        explanation:
          "A changing magnetic flux produces a circulating electric field. This is the basis of transformers and induction. The negative sign records Lenz’s law: the induced response opposes the change in flux.",
        symbols: [
          {
            symbol: String.raw`\mathbf{E}`,
            meaning: "Electric field",
            unit: String.raw`\mathrm{V\,m^{-1}}`,
          },
          { symbol: "C", meaning: "Closed loop of integration", unit: null },
          {
            symbol: String.raw`d\boldsymbol{\ell}`,
            meaning: "Directed line element along the loop",
            unit: String.raw`\mathrm{m}`,
          },
          {
            symbol: String.raw`\Phi_B`,
            meaning: "Magnetic flux through a surface bounded by the loop",
            unit: String.raw`\mathrm{Wb}`,
          },
          {
            symbol: "t",
            meaning:
              "Time; the loop integral is the induced electromotive force",
            unit: String.raw`\mathrm{s}`,
          },
        ],
        condition:
          "This field form uses a stationary loop with consistent loop and surface orientations. Moving conductors also require the magnetic force contribution to electromotive force.",
        source: {
          label: "OpenStax · Induced electric fields",
          href: "https://openstax.org/books/university-physics-volume-2/pages/13-4-induced-electric-fields",
        },
      },
      {
        id: "ampere-maxwell-law",
        title: "Ampère–Maxwell law",
        expression: String.raw`\oint_C \mathbf{B}\cdot d\boldsymbol{\ell} = \mu_0 I_{\mathrm{enc}} + \mu_0\varepsilon_0\frac{d\Phi_E}{dt}`,
        explanation:
          "Magnetic circulation comes from electric current and changing electric flux. Maxwell’s added flux term makes the law work across a charging capacitor and helps explain how electromagnetic waves propagate.",
        symbols: [
          {
            symbol: String.raw`\mathbf{B}`,
            meaning: "Magnetic field",
            unit: String.raw`\mathrm{T}`,
          },
          { symbol: "C", meaning: "Closed loop of integration", unit: null },
          {
            symbol: String.raw`d\boldsymbol{\ell}`,
            meaning: "Directed line element along the loop",
            unit: String.raw`\mathrm{m}`,
          },
          {
            symbol: String.raw`I_{\mathrm{enc}}`,
            meaning: "Current through a surface bounded by the loop",
            unit: String.raw`\mathrm{A}`,
          },
          {
            symbol: String.raw`\Phi_E`,
            meaning: "Electric flux through that surface",
            unit: String.raw`\mathrm{V\,m}`,
          },
          { symbol: "t", meaning: "Time", unit: String.raw`\mathrm{s}` },
          PHYSICAL_CONSTANTS.permeability,
          PHYSICAL_CONSTANTS.permittivity,
        ],
        condition:
          "SI field form for a fixed loop and surface, using total current. Loop direction, surface normal, current, and flux signs follow the right-hand rule.",
        source: {
          label: "OpenStax · Maxwell’s correction to Ampère’s law",
          href: "https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves",
        },
      },
      {
        id: "ohms-law",
        title: "Ohm’s law",
        expression: String.raw`V = IR`,
        explanation:
          "Across an ohmic component, the voltage is proportional to the current. Resistance sets how much voltage is needed for a given current, making this a starting point for analysing resistor circuits.",
        symbols: [
          {
            symbol: "V",
            meaning: "Potential difference across the component",
            unit: String.raw`\mathrm{V}`,
          },
          {
            symbol: "I",
            meaning: "Current through the component",
            unit: String.raw`\mathrm{A}`,
          },
          {
            symbol: "R",
            meaning: "Resistance",
            unit: String.raw`\mathrm{\Omega}`,
          },
        ],
        condition:
          "Resistance must be effectively constant under the operating conditions. Diodes, lamps with changing temperature, and many other components are not ohmic.",
        source: {
          label: "OpenStax · Ohm’s law",
          href: "https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law",
        },
      },
    ],
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics and statistical physics",
    description:
      "Heat, work, temperature, and the connection between microscopic states and macroscopic behaviour.",
    equations: [
      {
        id: "ideal-gas-law",
        title: "Ideal gas law",
        expression: String.raw`PV = nRT`,
        explanation:
          "Pressure, volume, and temperature are linked for a fixed amount of ideal gas. Heating a sealed, rigid container raises its pressure; allowing expansion can instead increase its volume. The relationship is a model of many particles moving and colliding.",
        symbols: [
          {
            symbol: "P",
            meaning: "Absolute pressure",
            unit: String.raw`\mathrm{Pa}`,
          },
          { symbol: "V", meaning: "Volume", unit: String.raw`\mathrm{m^3}` },
          {
            symbol: "n",
            meaning: "Amount of gas",
            unit: String.raw`\mathrm{mol}`,
          },
          PHYSICAL_CONSTANTS.gas,
          {
            symbol: "T",
            meaning: "Absolute temperature",
            unit: String.raw`\mathrm{K}`,
          },
        ],
        condition:
          "Assumes negligible particle volume and interactions apart from elastic collisions. Real gases approximate it best at low density and away from condensation.",
        source: {
          label: "OpenStax · Molecular model of an ideal gas",
          href: "https://openstax.org/books/university-physics-volume-2/pages/2-1-molecular-model-of-an-ideal-gas",
        },
      },
      {
        id: "first-law",
        title: "First law of thermodynamics",
        expression: String.raw`\Delta U = Q - W`,
        explanation:
          "Energy entering a system as heat can increase its internal energy or leave as work. The first law is an energy balance: heat and work are ways to transfer energy, while internal energy belongs to the system’s state.",
        symbols: [
          {
            symbol: String.raw`\Delta U`,
            meaning: "Change in internal energy",
            unit: String.raw`\mathrm{J}`,
          },
          {
            symbol: "Q",
            meaning: "Heat transferred into the system, positive inward",
            unit: String.raw`\mathrm{J}`,
          },
          {
            symbol: "W",
            meaning:
              "Work done by the system on its surroundings, positive outward",
            unit: String.raw`\mathrm{J}`,
          },
        ],
        condition:
          "This form assumes a closed system with negligible changes in bulk kinetic and gravitational potential energy. A convention that counts work done on the system reverses the work sign.",
        source: {
          label: "OpenStax · First law of thermodynamics",
          href: "https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics",
        },
      },
      {
        id: "second-law",
        title: "Second law of thermodynamics",
        expression: String.raw`\Delta S_{\mathrm{isolated}} \geq 0`,
        explanation:
          "The total entropy of an isolated system cannot decrease in a macroscopic thermodynamic process. This gives processes a preferred direction: heat spontaneously flows from hotter to colder bodies, and dissipated energy cannot all be recovered as useful work in a cycle.",
        symbols: [
          {
            symbol: String.raw`\Delta S_{\mathrm{isolated}}`,
            meaning: "Total entropy change of the isolated system",
            unit: String.raw`\mathrm{J\,K^{-1}}`,
          },
          {
            symbol: String.raw`\geq 0`,
            meaning:
              "Zero for a reversible process; positive for an irreversible process",
            unit: null,
          },
        ],
        condition:
          "Include the surroundings if the chosen subsystem exchanges heat or matter. A subsystem’s entropy can decrease while total entropy increases.",
        source: {
          label: "OpenStax · Entropy and the second law",
          href: "https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy",
        },
      },
      {
        id: "boltzmann-entropy",
        title: "Boltzmann’s entropy formula",
        expression: String.raw`S = k_{\mathrm{B}}\ln\Omega`,
        explanation:
          "A macroscopic state can be realised by many microscopic arrangements. Entropy measures the logarithm of their number. A state compatible with more microscopic arrangements is more likely when those arrangements are equally probable.",
        symbols: [
          {
            symbol: "S",
            meaning: "Entropy",
            unit: String.raw`\mathrm{J\,K^{-1}}`,
          },
          PHYSICAL_CONSTANTS.boltzmann,
          {
            symbol: String.raw`\Omega`,
            meaning:
              "Number of accessible microstates compatible with the macrostate",
            unit: "1",
          },
          { symbol: String.raw`\ln`, meaning: "Natural logarithm", unit: null },
        ],
        condition:
          "This counting form assumes equally probable accessible microstates. Unequal probabilities require the more general statistical entropy expression.",
        source: {
          label: "OpenStax · Entropy on a microscopic scale",
          href: "https://openstax.org/books/university-physics-volume-2/pages/4-7-entropy-on-a-microscopic-scale",
        },
      },
    ],
  },
  {
    id: "relativity",
    title: "Relativity and spacetime",
    description:
      "The relationship between mass and energy, the dependence of elapsed time on motion, and gravity as spacetime geometry.",
    equations: [
      {
        id: "mass-energy-equivalence",
        title: "Mass–energy equivalence",
        expression: String.raw`E_0 = mc^2`,
        explanation:
          "An object has rest energy even when it is not moving. Mass and rest energy are two ways to describe the same physical property. In a nuclear reaction, the difference between initial and final rest masses accounts for energy released; ordinary matter does not readily release all its rest energy.",
        symbols: [
          {
            symbol: "E_0",
            meaning: "Rest energy",
            unit: String.raw`\mathrm{J}`,
          },
          {
            symbol: "m",
            meaning: "Invariant mass, also called rest mass",
            unit: String.raw`\mathrm{kg}`,
          },
          PHYSICAL_CONSTANTS.light,
        ],
        condition:
          "Gives rest energy, not the total energy of a moving object. For a composite system, internal motion and binding energy contribute to its invariant mass.",
        source: {
          label: "OpenStax · Rest energy and relativistic energy",
          href: "https://openstax.org/books/university-physics-volume-3/pages/5-9-relativistic-energy",
        },
      },
      {
        id: "energy-momentum",
        title: "Relativistic energy–momentum relation",
        expression: String.raw`E^2 = p^2c^2 + m^2c^4`,
        explanation:
          "Total energy contains both rest energy and the contribution associated with momentum. The relation also applies to massless particles: a photon has energy and momentum even though it has no rest mass.",
        symbols: [
          {
            symbol: "E",
            meaning: "Total energy in the chosen inertial frame",
            unit: String.raw`\mathrm{J}`,
          },
          {
            symbol: "p",
            meaning: "Magnitude of momentum in that frame",
            unit: String.raw`\mathrm{kg\,m\,s^{-1}}`,
          },
          {
            symbol: "m",
            meaning: "Invariant mass",
            unit: String.raw`\mathrm{kg}`,
          },
          PHYSICAL_CONSTANTS.light,
        ],
        condition:
          "A special-relativistic relation for a free particle or a system’s total energy, total momentum, and invariant mass. It does not treat mass as increasing with speed.",
        source: {
          label: "OpenStax · Energy and momentum in relativity",
          href: "https://openstax.org/books/university-physics-volume-3/pages/5-9-relativistic-energy",
        },
      },
      {
        id: "time-dilation",
        title: "Time dilation",
        expression: String.raw`\Delta t = \frac{\Delta\tau}{\sqrt{1-v^2/c^2}}`,
        explanation:
          "A moving clock accumulates less time between two events than the coordinate time assigned by an observer in an inertial frame. The difference is tiny at everyday speeds but measurable for fast particles and precision clocks.",
        symbols: [
          {
            symbol: String.raw`\Delta t`,
            meaning: "Elapsed coordinate time in the observer’s inertial frame",
            unit: String.raw`\mathrm{s}`,
          },
          {
            symbol: String.raw`\Delta\tau`,
            meaning:
              "Proper time measured by the moving clock between the same events",
            unit: String.raw`\mathrm{s}`,
          },
          {
            symbol: "v",
            meaning: "Clock’s speed relative to the observer",
            unit: String.raw`\mathrm{m\,s^{-1}}`,
          },
          PHYSICAL_CONSTANTS.light,
        ],
        condition:
          "This form assumes constant relative speed below light speed in flat spacetime. Varying motion requires integration, and gravity introduces additional time effects.",
        source: {
          label: "OpenStax · Time dilation",
          href: "https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation",
        },
      },
      {
        id: "einstein-field-equations",
        unitsNote:
          "Tensor units assume coordinates measured in metres, including light speed multiplied by time for the time coordinate, and a dimensionless metric. Other coordinate conventions can change component units. The cosmological constant is model-dependent, with no universal numerical value.",
        title: "Einstein’s field equations",
        expression: String.raw`G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}`,
        explanation:
          "Spacetime geometry is linked to the distribution of energy, momentum, and stress. These equations underpin the description of black holes, gravitational waves, and cosmic expansion. The compact notation represents a coupled set of equations rather than a single arithmetic formula.",
        symbols: [
          {
            symbol: String.raw`G_{\mu\nu}`,
            meaning: "Einstein tensor, built from spacetime curvature",
            unit: String.raw`\mathrm{m^{-2}}`,
          },
          {
            symbol: String.raw`g_{\mu\nu}`,
            meaning: "Metric tensor, describing spacetime intervals",
            unit: "1",
          },
          {
            symbol: String.raw`\Lambda`,
            meaning: "Cosmological constant",
            unit: String.raw`\mathrm{m^{-2}}`,
          },
          {
            symbol: String.raw`T_{\mu\nu}`,
            meaning:
              "Stress–energy tensor, describing energy, momentum, and stresses",
            unit: String.raw`\mathrm{J\,m^{-3}}`,
          },
          PHYSICAL_CONSTANTS.gravity,
          PHYSICAL_CONSTANTS.light,
          {
            symbol: String.raw`\mu,\ \nu`,
            meaning: "Indices labelling spacetime components",
            unit: null,
          },
          PHYSICAL_CONSTANTS.pi,
        ],
        condition:
          "The classical theory of gravity, written here with SI constants. Tensor calculus, a matter model, and initial or boundary data are needed to solve it; quantum gravity lies beyond this description.",
        source: {
          label: "Sean Carroll · Field equations and the cosmological constant",
          href: "https://ned.ipac.caltech.edu/level5/March04/Carroll/Carroll2.html",
        },
      },
    ],
  },
  {
    id: "quantum-physics",
    title: "Quantum physics",
    description:
      "Energy quanta, matter waves, probability amplitudes, and the limits on jointly sharp measurements.",
    equations: [
      {
        id: "photon-energy",
        title: "Photon energy",
        expression: String.raw`E = hf`,
        explanation:
          "Light exchanges energy in quanta called photons. A photon’s energy depends on frequency, so ultraviolet photons carry more energy than visible or infrared photons. Increasing intensity at a fixed frequency increases photon number rather than energy per photon.",
        symbols: [
          {
            symbol: "E",
            meaning: "Energy of one photon",
            unit: String.raw`\mathrm{J}`,
          },
          PHYSICAL_CONSTANTS.planck,
          {
            symbol: "f",
            meaning: "Light frequency",
            unit: String.raw`\mathrm{Hz}`,
          },
        ],
        condition:
          "Describes energy per photon at a given frequency. A light beam can contain many photons and, for broadband light, many frequencies.",
        source: {
          label: "OpenStax · Photons and the photoelectric effect",
          href: "https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect",
        },
      },
      {
        id: "de-broglie-wavelength",
        title: "De Broglie wavelength",
        expression: String.raw`\lambda = \frac{h}{p}`,
        explanation:
          "Matter has wave properties as well as particle properties. A particle with larger momentum has a shorter wavelength. Electron diffraction reveals this behaviour, while the wavelengths of ordinary moving objects are usually too small to notice.",
        symbols: [
          {
            symbol: String.raw`\lambda`,
            meaning: "Matter-wave wavelength",
            unit: String.raw`\mathrm{m}`,
          },
          PHYSICAL_CONSTANTS.planck,
          {
            symbol: "p",
            meaning: "Magnitude of the particle’s momentum",
            unit: String.raw`\mathrm{kg\,m\,s^{-1}}`,
          },
        ],
        condition:
          "Applies directly to a momentum component of a free particle’s state. A localised wave packet contains a range of momenta and wavelengths.",
        source: {
          label: "OpenStax · De Broglie’s matter waves",
          href: "https://openstax.org/books/university-physics-volume-3/pages/6-5-de-broglies-matter-waves",
        },
      },
      {
        id: "schrodinger-equation",
        unitsNote:
          "Wavefunction units assume normalisation over three-dimensional position space. In one or two dimensions, the normalisation gives different units.",
        title: "Time-dependent Schrödinger equation",
        expression: String.raw`i\hbar\frac{\partial\psi}{\partial t} = \left[-\frac{\hbar^2}{2m}\nabla^2 + V\right]\psi`,
        explanation:
          "The wavefunction evolves according to the particle’s kinetic and potential energies. Solving this equation with suitable conditions predicts quantum states and how they change over time. It describes an amplitude whose squared magnitude determines position probabilities, rather than a classical trajectory.",
        symbols: [
          {
            symbol: String.raw`\psi`,
            meaning: "Wavefunction, depending on position and time",
            unit: String.raw`\mathrm{m^{-3/2}}`,
          },
          PHYSICAL_CONSTANTS.imaginary,
          PHYSICAL_CONSTANTS.reducedPlanck,
          {
            symbol: "m",
            meaning: "Particle mass",
            unit: String.raw`\mathrm{kg}`,
          },
          {
            symbol: "V",
            meaning:
              "Potential energy, possibly varying with position and time",
            unit: String.raw`\mathrm{J}`,
          },
          {
            symbol: String.raw`\nabla^2`,
            meaning: "Laplacian: sum of second spatial derivatives",
            unit: String.raw`\mathrm{m^{-2}}`,
          },
          {
            symbol: String.raw`\partial/\partial t`,
            meaning: "Time derivative at fixed position",
            unit: String.raw`\mathrm{s^{-1}}`,
          },
        ],
        condition:
          "This is the nonrelativistic single-particle form for a scalar potential, with spin and magnetic vector potentials omitted. Relativistic particles need a different equation.",
        source: {
          label: "OpenStax · The Schrödinger equation",
          href: "https://openstax.org/books/university-physics-volume-3/pages/7-3-the-schrodinger-equation",
        },
      },
      {
        id: "born-rule",
        title: "Born rule for position",
        expression: String.raw`P(\mathbf{r}\in\mathcal{R}) = \int_{\mathcal{R}} |\psi(\mathbf{r},t)|^2\,d^3r`,
        explanation:
          "The squared magnitude of the wavefunction is a position probability density. Integrating it over a region gives the probability that a position measurement finds the particle there. This connects the mathematical quantum state to observable outcomes.",
        symbols: [
          {
            symbol: "P",
            meaning: "Probability of finding the particle in the chosen region",
            unit: "1",
          },
          {
            symbol: String.raw`\mathbf{r}`,
            meaning: "Position vector",
            unit: String.raw`\mathrm{m}`,
          },
          { symbol: "t", meaning: "Time", unit: String.raw`\mathrm{s}` },
          {
            symbol: String.raw`\mathcal{R}`,
            meaning: "Region of space being measured",
            unit: null,
          },
          {
            symbol: String.raw`\psi`,
            meaning: "Normalised wavefunction",
            unit: String.raw`\mathrm{m^{-3/2}}`,
          },
          {
            symbol: "d^3r",
            meaning: "Volume element in three-dimensional space",
            unit: String.raw`\mathrm{m^3}`,
          },
        ],
        condition:
          "For a single particle in a pure state with the wavefunction normalised over all space. The total position probability is one.",
        source: {
          label: "OpenStax · Wavefunctions and probability",
          href: "https://openstax.org/books/university-physics-volume-3/pages/7-1-wave-functions",
        },
      },
      {
        id: "uncertainty-principle",
        title: "Heisenberg uncertainty principle",
        expression: String.raw`\Delta x\,\Delta p_x \geq \frac{\hbar}{2}`,
        explanation:
          "A quantum state cannot have both perfectly sharp position and perfectly sharp momentum along the same axis. Narrowing the position distribution broadens the range of momenta. This is a property of quantum states, not simply a limit caused by poor measuring equipment.",
        symbols: [
          {
            symbol: String.raw`\Delta x`,
            meaning:
              "Standard deviation of position measurements along one axis",
            unit: String.raw`\mathrm{m}`,
          },
          {
            symbol: String.raw`\Delta p_x`,
            meaning:
              "Standard deviation of momentum measurements along that same axis",
            unit: String.raw`\mathrm{kg\,m\,s^{-1}}`,
          },
          PHYSICAL_CONSTANTS.reducedPlanck,
        ],
        condition:
          "The spreads refer to distributions for identically prepared states, not a classical measurement’s error bars. The inequality gives a lower bound, not a mandatory equality.",
        source: {
          label: "OpenStax · Heisenberg uncertainty principle",
          href: "https://openstax.org/books/university-physics-volume-3/pages/7-2-the-heisenberg-uncertainty-principle",
        },
      },
    ],
  },
];
