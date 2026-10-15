export interface OrbitalPoint {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly phase: 1 | -1;
}

export interface OrbitalSurface {
  readonly vertices: OrbitalPoint[];
  readonly triangles: readonly (readonly [number, number, number])[];
}

export const BOHR_RADIUS_PM = 52.9177;

// The y axis is the polar axis in both viewers. Nonzero orders are real
// sine/cosine combinations, not individual magnetic-quantum-number states.
export const REAL_ORBITAL_SHAPES = [
  { family: 0, label: "s", tex: "s", order: 0 },
  { family: 1, label: "pₓ", tex: "p_x", order: 1 },
  { family: 1, label: "pᵧ", tex: "p_y", order: 0 },
  { family: 1, label: "p_z", tex: "p_z", order: -1 },
  { family: 2, label: "dₓᵧ", tex: "d_{xy}", order: 1 },
  { family: 2, label: "dᵧz", tex: "d_{yz}", order: -1 },
  { family: 2, label: "dₓz", tex: "d_{xz}", order: -2 },
  { family: 2, label: "dₓ²₋z²", tex: "d_{x^2-z^2}", order: 2 },
  { family: 2, label: "d₃ᵧ²₋r²", tex: "d_{3y^2-r^2}", order: 0 },
  { family: 3, label: "f₀", tex: "f_0", order: 0 },
  { family: 3, label: "f₁c", tex: "f_{1c}", order: 1 },
  { family: 3, label: "f₁s", tex: "f_{1s}", order: -1 },
  { family: 3, label: "f₂c", tex: "f_{2c}", order: 2 },
  { family: 3, label: "f₂s", tex: "f_{2s}", order: -2 },
  { family: 3, label: "f₃c", tex: "f_{3c}", order: 3 },
  { family: 3, label: "f₃s", tex: "f_{3s}", order: -3 },
] as const;

interface RadialDistribution {
  cdf: Float64Array;
  step: number;
  total: number;
}

const radialCache = new Map<string, RadialDistribution>();

function laguerre(degree: number, alpha: number, x: number): number {
  if (degree === 0) {
    return 1;
  }

  let previous = 1;
  let current = 1 + alpha - x;
  for (let index = 2; index <= degree; index += 1) {
    const next =
      ((2 * index - 1 + alpha - x) * current - (index - 1 + alpha) * previous) /
      index;
    previous = current;
    current = next;
  }
  return current;
}

function associatedLegendre(l: number, m: number, x: number): number {
  let diagonal = 1;
  for (let index = 1; index <= m; index += 1) {
    diagonal *= -(2 * index - 1) * Math.sqrt(1 - x * x);
  }
  if (l === m) {
    return diagonal;
  }

  let previous = diagonal;
  let current = x * (2 * m + 1) * diagonal;
  for (let index = m + 2; index <= l; index += 1) {
    const next =
      ((2 * index - 1) * x * current - (index + m - 1) * previous) /
      (index - m);
    previous = current;
    current = next;
  }
  return current;
}

function factorial(value: number): number {
  let result = 1;
  for (let index = 2; index <= value; index += 1) {
    result *= index;
  }
  return result;
}

/** Unnormalized hydrogenic radial amplitude at distance r in Bohr radii. */
export function radialAmplitude(
  principal: number,
  azimuthal: number,
  radius: number
): number {
  const rho = (2 * radius) / principal;
  return (
    Math.exp(-rho / 2) *
    rho ** azimuthal *
    laguerre(principal - azimuthal - 1, 2 * azimuthal + 1, rho)
  );
}

function realHarmonic(l: number, m: number, cosine: number, phi: number) {
  const order = Math.abs(m);
  const normalization = Math.sqrt(
    ((2 * l + 1) / (4 * Math.PI)) *
      (factorial(l - order) / factorial(l + order)) *
      (order === 0 ? 1 : 2)
  );
  let direction = 1;
  if (m > 0) {
    direction = Math.cos(order * phi);
  } else if (m < 0) {
    direction = Math.sin(order * phi);
  }
  return normalization * associatedLegendre(l, order, cosine) * direction;
}

function makeRandom(seed: number): () => number {
  let state = seed % 4_294_967_296;
  return () => {
    state = (state * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return state / 4_294_967_296;
  };
}

function radialDistribution(
  principal: number,
  azimuthal: number
): RadialDistribution {
  const cacheKey = `${principal}-${azimuthal}`;
  const cached = radialCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const degree = principal - azimuthal - 1;
  const alpha = 2 * azimuthal + 1;
  const bins = 900;
  // The outer hydrogenic lobes scale roughly with n², not n.
  const step = (4 * principal * principal + 10) / bins;
  const cdf = new Float64Array(bins + 1);

  for (let index = 1; index <= bins; index += 1) {
    const radius = (index - 0.5) * step;
    const rho = (2 * radius) / principal;
    const polynomial = laguerre(degree, alpha, rho);
    cdf[index] =
      cdf[index - 1] +
      Math.exp(-rho) *
        rho ** (2 * azimuthal) *
        radius *
        radius *
        polynomial *
        polynomial;
  }

  const distribution = { cdf, total: cdf[bins], step };
  radialCache.set(cacheKey, distribution);
  return distribution;
}

/** Radius of the ball containing the requested hydrogenic radial probability, in a₀. */
export function radialProbabilityRadius(
  principal: number,
  azimuthal: number,
  fraction: number
): number {
  const { cdf, total, step } = radialDistribution(principal, azimuthal);
  const target = Math.min(1, Math.max(0, fraction)) * total;
  let low = 1;
  let high = cdf.length - 1;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (cdf[middle] < target) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  const previous = cdf[low - 1];
  const withinBin = (target - previous) / (cdf[low] - previous || 1);
  return (low - 1 + withinBin) * step;
}

/** Samples a hydrogen-like |ψ|² distribution in Bohr radii. */
export function sampleOrbital(
  principal: number,
  azimuthal: number,
  orientation: number,
  count = 2600
): OrbitalPoint[] {
  const random = makeRandom(
    principal * 73_856_093 +
      azimuthal * 19_349_663 +
      (orientation + 4) * 83_492_791
  );
  const degree = principal - azimuthal - 1;
  const alpha = 2 * azimuthal + 1;
  const { cdf, total, step } = radialDistribution(principal, azimuthal);
  const bins = cdf.length - 1;
  const samples: OrbitalPoint[] = [];
  const harmonicUpperBound = (2 * azimuthal + 1) / (4 * Math.PI);

  while (samples.length < count) {
    const target = random() * total;
    let low = 1;
    let high = bins;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (cdf[middle] < target) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    const radius = (low - 1 + random()) * step;
    const cosine = random() * 2 - 1;
    const phi = random() * Math.PI * 2;
    const harmonic = realHarmonic(azimuthal, orientation, cosine, phi);
    if (random() * harmonicUpperBound > harmonic * harmonic) {
      continue;
    }

    const sine = Math.sqrt(1 - cosine * cosine);
    const radialPhase =
      laguerre(degree, alpha, (2 * radius) / principal) >= 0 ? 1 : -1;
    samples.push({
      x: radius * sine * Math.cos(phi),
      y: radius * cosine,
      z: radius * sine * Math.sin(phi),
      phase: harmonic * radialPhase >= 0 ? 1 : -1,
    });
  }

  return samples;
}

/** An angular-probability envelope; radial nodes and density contours are omitted. */
export function makeOrbitalSurface(
  principal: number,
  azimuthal: number,
  orientation: number
): OrbitalSurface {
  const latitudeSteps = 40;
  const longitudeSteps = 80;
  const displayRadius = radialProbabilityRadius(principal, azimuthal, 0.98);
  const radialPhase =
    radialAmplitude(principal, azimuthal, displayRadius) >= 0 ? 1 : -1;
  const directions: { x: number; y: number; z: number; harmonic: number }[] =
    [];
  let maximum = 0;

  for (let latitude = 0; latitude <= latitudeSteps; latitude += 1) {
    const theta = (latitude / latitudeSteps) * Math.PI;
    const cosine = Math.cos(theta);
    const sine = Math.sin(theta);
    for (let longitude = 0; longitude <= longitudeSteps; longitude += 1) {
      const phi = (longitude / longitudeSteps) * Math.PI * 2;
      const harmonic = realHarmonic(azimuthal, orientation, cosine, phi);
      maximum = Math.max(maximum, Math.abs(harmonic));
      directions.push({
        x: sine * Math.cos(phi),
        y: cosine,
        z: sine * Math.sin(phi),
        harmonic,
      });
    }
  }

  const vertices: OrbitalPoint[] = directions.map((direction) => {
    const radius =
      0.88 * displayRadius * (Math.abs(direction.harmonic) / maximum) ** 2;
    return {
      x: direction.x * radius,
      y: direction.y * radius,
      z: direction.z * radius,
      phase: direction.harmonic * radialPhase >= 0 ? 1 : -1,
    };
  });
  const triangles: [number, number, number][] = [];
  for (let latitude = 0; latitude < latitudeSteps; latitude += 1) {
    for (let longitude = 0; longitude < longitudeSteps; longitude += 1) {
      const upper = latitude * (longitudeSteps + 1) + longitude;
      const lower = upper + longitudeSteps + 1;
      triangles.push([upper, lower, upper + 1], [upper + 1, lower, lower + 1]);
    }
  }

  return { vertices, triangles };
}
