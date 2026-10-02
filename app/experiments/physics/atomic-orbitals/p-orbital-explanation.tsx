import type { ReactNode } from "react";

import katexify from "@/utils/katexify";

import { FactorExplorer, PotentialExplorer } from "./interactions";

export function POrbitalPattern() {
  return (
    <>
      <section
        aria-labelledby="the-shape-in-one-picture"
        className="border-border bg-surface-hover mt-12 overflow-hidden rounded-3xl border"
      >
        <div className="grid gap-2 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
          <div>
            <p className="text-foreground/55 text-sm font-medium tracking-wide uppercase">
              The equation, drawn
            </p>
            <h2
              className="text-foreground mt-2 scroll-mt-28 text-2xl font-semibold text-balance sm:text-3xl"
              id="the-shape-in-one-picture"
            >
              The <InlineMath expression="p" /> orbital is the probability
              pattern
            </h2>
            <p className="text-foreground/75 mt-4 leading-7">
              For <InlineMath expression="p_z" />, the angular wave is
              proportional to <InlineMath expression={String.raw`\cos\theta`} />
              . It is positive above the nucleus, negative below, and zero all
              across the middle plane.
            </p>
            <p className="text-foreground/75 mt-3 leading-7">
              Squaring the wave removes the sign but keeps the zero. Probability
              is concentrated on either side of the nodal plane, creating two
              lobes.
            </p>
          </div>
          <POrbitalDiagram />
        </div>
        <div className="border-border grid gap-4 border-t px-5 py-4 text-sm sm:grid-cols-2 sm:px-8">
          <p className="text-foreground/70">
            <span className="text-foreground font-semibold">
              Color = wave phase.
            </span>{" "}
            The two sides have opposite signs; neither lobe is a different kind
            of charge.
          </p>
          <p className="text-foreground/70">
            <span className="text-foreground font-semibold">
              Density = <InlineMath expression={String.raw`|\psi|^2`} />.
            </span>{" "}
            Both lobes have positive probability density, with zero at the nodal
            plane.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="same-shape-three-directions"
        className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
      >
        <div>
          <p className="text-action text-sm font-semibold tracking-[0.18em] uppercase">
            Rotate the axis
          </p>
          <h2
            className="text-foreground mt-2 scroll-mt-28 text-3xl font-bold text-balance"
            id="same-shape-three-directions"
          >
            Three orientations, same pattern
          </h2>
          <p className="text-foreground/70 mt-3 leading-7">
            The three diagrams show the same two-lobed pattern aimed along
            different axes. For an isolated atom without an external field,
            these orientations have equal energy; the labels choose a coordinate
            direction.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <OrientationDiagram axis="x" />
          <OrientationDiagram axis="y" />
          <OrientationDiagram axis="z" />
        </div>
      </section>

      <p className="text-foreground/65 mt-8 text-sm leading-6">
        The drawings are schematic cross-sections of probability density, not
        hard surfaces. An orbital is a quantum state; the electron does not
        trace out the pictured dumbbell.
      </p>
    </>
  );
}

export function OrbitalSymbolGuide() {
  return (
    <section aria-labelledby="symbol-guide" className="scroll-mt-28">
      <h2
        className="text-foreground scroll-mt-28 text-xl font-semibold"
        id="symbol-guide"
      >
        Symbol guide: what is inside Schrödinger&apos;s equation?
      </h2>
      <div className="border-border mt-5 w-full overflow-hidden rounded-md border">
        <div className="scrollbar-subtle w-full overflow-x-auto">
          <table className="divide-border text-foreground w-full min-w-160 border-collapse divide-y text-sm">
            <caption className="sr-only">
              Symbols and SI units in the hydrogen orbital derivation
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Symbol
                </th>
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Term
                </th>
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  Meaning
                </th>
                <th className="px-3 py-2 text-left font-medium" scope="col">
                  SI unit
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression={String.raw`\psi`} />
                </th>
                <td className="px-3 py-2">Wavefunction</td>
                <td className="px-3 py-2">
                  The quantum state whose spatial shape we solve for.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{m}^{-3/2}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression={String.raw`\hbar`} />
                </th>
                <td className="px-3 py-2">Reduced Planck constant</td>
                <td className="px-3 py-2">
                  Sets the scale of quantum effects.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{J}\,\mathrm{s}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression="m_e" />
                </th>
                <td className="px-3 py-2">Electron mass</td>
                <td className="px-3 py-2">
                  Sets the kinetic-energy scale of the electron.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{kg}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression={String.raw`\nabla^2`} />
                </th>
                <td className="px-3 py-2">Laplacian</td>
                <td className="px-3 py-2">
                  Measures how the wave bends through space.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{m}^{-2}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression="V(r)" />
                </th>
                <td className="px-3 py-2">Potential energy</td>
                <td className="px-3 py-2">
                  The electron&apos;s electric potential energy, set by distance{" "}
                  <InlineMath expression="r" />.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{J}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression="e" />
                </th>
                <td className="px-3 py-2">Elementary charge</td>
                <td className="px-3 py-2">
                  Sets the strength of the electron–nucleus attraction.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{C}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression={String.raw`\varepsilon_0`} />
                </th>
                <td className="px-3 py-2">Vacuum permittivity</td>
                <td className="px-3 py-2">
                  Relates electric charge to the Coulomb potential.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{F}/\mathrm{m}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression="r" />
                </th>
                <td className="px-3 py-2">Radial distance</td>
                <td className="px-3 py-2">
                  Distance from the nucleus to the electron.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{m}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression="E" />
                </th>
                <td className="px-3 py-2">Energy eigenvalue</td>
                <td className="px-3 py-2">
                  An allowed energy of the stationary quantum state.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{J}`} />
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th
                  className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  scope="row"
                >
                  <InlineMath expression="a_0" />
                </th>
                <td className="px-3 py-2">Bohr radius</td>
                <td className="px-3 py-2">
                  Sets the radial scale in hydrogen.
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <InlineMath expression={String.raw`\mathrm{m}`} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-foreground/65 mt-3 text-sm leading-6">
        The wavefunction unit assumes a normalized three-dimensional spatial
        wavefunction. The Laplacian&apos;s unit describes the operator, before
        it acts on the wavefunction.
      </p>
    </section>
  );
}

export function POrbitalDerivation() {
  return (
    <section aria-labelledby="from-schrodinger-to-shape" className="mt-6">
      <div className="max-w-3xl">
        <p className="text-action text-sm font-semibold tracking-[0.18em] uppercase">
          Follow the arrows
        </p>
        <h3
          className="text-foreground mt-2 scroll-mt-28 text-xl font-semibold text-balance"
          id="from-schrodinger-to-shape"
        >
          Worked example: where a p orbital gets its two lobes
        </h3>
        <p className="text-foreground/70 mt-3 leading-7">
          We solve the stationary Schrödinger equation for an electron attracted
          to a nucleus. Each arrow shows the next mathematical choice and what
          it tells us about the shape.
        </p>
      </div>

      <ol className="mt-7">
        <li>
          <DerivationStep number="01" title="Start with the governing equation">
            <p>
              For hydrogen, treat the nucleus as fixed and use its Coulomb
              potential:
            </p>
            <MathDisplay
              expression={String.raw`\begin{aligned} -\frac{\hbar^2}{2m_e}\nabla^2\psi + V(r)\psi &= E\psi \\ V(r) &= -\frac{e^2}{4\pi\varepsilon_0 r} \end{aligned}`}
            />
            <p>
              This equation balances the wave&apos;s kinetic energy against its
              electric attraction to the nucleus. Solving it gives the allowed
              wavefunctions <InlineMath expression={String.raw`\psi`} />.
            </p>
            <PotentialExplorer />
          </DerivationStep>
          <FlowArrow>
            The potential depends only on distance <InlineMath expression="r" />
            , so the problem has spherical symmetry.
          </FlowArrow>
        </li>

        <li>
          <DerivationStep number="02" title="Separate distance from direction">
            <p>
              Spherical symmetry lets the solution split into a radial part and
              an angular part:
            </p>
            <MathDisplay
              expression={String.raw`\psi(r,\theta,\phi)=R_{n\ell}(r)Y_{\ell}^{m}(\theta,\phi)`}
            />
            <p>
              <InlineMath expression="R" /> controls how the wave changes with
              distance. <InlineMath expression="Y" />, a spherical harmonic,
              describes how it changes from one direction to another.
            </p>
            <p>
              The quantum numbers obey{" "}
              <InlineMath expression={String.raw`n \ge 1`} />,
              <InlineMath expression={String.raw`0 \le \ell < n`} />, and
              <InlineMath expression={String.raw`-\ell \le m \le \ell`} />. The
              real orbitals in the viewer combine complex
              magnetic-quantum-number states when <InlineMath expression="m" />{" "}
              is nonzero.
            </p>
            <FactorExplorer />
            <p className="text-foreground/65 text-sm">
              This probe uses <InlineMath expression="2p_y" /> with its polar
              angle measured from the viewer&apos;s vertical{" "}
              <InlineMath expression="+y" />
              axis. The worked example below uses{" "}
              <InlineMath expression="2p_z" />
              and measures the polar angle from <InlineMath expression="+z" />.
              Rotating the coordinates gives the same two-lobed pattern.
            </p>
          </DerivationStep>
          <FlowArrow>
            The separated angular equation is an angular-momentum eigenvalue
            problem; its solutions are spherical harmonics.
          </FlowArrow>
        </li>

        <li>
          <DerivationStep number="03" title="Select the p pattern">
            <p>
              The letter p means <InlineMath expression={String.raw`\ell=1`} />.
              The angular-momentum equation gives its allowed angular pattern;
              for the orientation called <InlineMath expression="p_z" />:
            </p>
            <MathDisplay
              expression={String.raw`\begin{aligned} \hat{L}^2Y_{\ell}^{m} &= \ell(\ell+1)\hbar^2Y_{\ell}^{m} \\ Y_1^0(\theta,\phi) &\propto \cos\theta \end{aligned}`}
            />
            <p>
              The cosine is positive on one side of the nucleus and negative on
              the other. At{" "}
              <InlineMath expression={String.raw`\theta=\frac{\pi}{2}`} />, it
              is zero: that is the plane <InlineMath expression="z=0" />.
            </p>
          </DerivationStep>
          <FlowArrow>
            For hydrogen&apos;s <InlineMath expression="2p" /> state, the radial
            solution supplies the size and falloff with distance.
          </FlowArrow>
        </li>

        <li>
          <DerivationStep
            number="04"
            title="Combine the radial and angular waves"
          >
            <p>
              The hydrogen <InlineMath expression="2p" /> radial solution is{" "}
              <InlineMath
                expression={String.raw`R_{21}(r)\propto re^{-r/(2a_0)}`}
              />
              . Multiplying by the angular solution gives:
            </p>
            <MathDisplay
              expression={String.raw`\psi_{2p_z}(r,\theta)\propto re^{-r/(2a_0)}\cos\theta`}
            />
            <p>
              The radial factor sets how far the cloud extends; the cosine
              factor sets its direction and the nodal plane.
            </p>
          </DerivationStep>
          <FlowArrow>
            The Born rule says measurement probability density is the absolute
            square of the wave.
          </FlowArrow>
        </li>

        <li>
          <DerivationStep number="05" title="Square the wave: the lobes appear">
            <MathDisplay
              expression={String.raw`|\psi_{2p_z}|^2\propto r^2e^{-r/a_0}\cos^2\theta`}
            />
            <p>
              At <InlineMath expression={String.raw`\theta=\frac{\pi}{2}`} />,{" "}
              <InlineMath expression={String.raw`\cos\theta=0`} />, so the
              probability density vanishes across the whole{" "}
              <InlineMath expression="z=0" /> plane. At a given nonzero
              distance, <InlineMath expression={String.raw`\cos^2\theta`} /> is
              largest along <InlineMath expression="+z" /> and{" "}
              <InlineMath expression="-z" />. The high-probability regions on
              those two sides are the lobes of a <InlineMath expression="p" />{" "}
              orbital.
            </p>
          </DerivationStep>
        </li>
      </ol>
    </section>
  );
}

function DerivationStep({
  children,
  number,
  title,
}: {
  children: ReactNode;
  number: string;
  title: string;
}) {
  return (
    <div className="border-border rounded-2xl border p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <StepNumber>{number}</StepNumber>
        <h4 className="text-foreground text-lg font-semibold">{title}</h4>
      </div>
      <div className="text-foreground/70 mt-4 space-y-3 leading-7">
        {children}
      </div>
    </div>
  );
}

function MathDisplay({ expression }: { expression: string }) {
  return (
    <div className="border-border bg-surface-hover text-foreground overflow-x-auto rounded-xl border px-4 py-3 text-sm sm:text-base">
      {katexify(expression, true)}
    </div>
  );
}

function InlineMath({ expression }: { expression: string }) {
  return (
    <span className="whitespace-nowrap">{katexify(expression, false)}</span>
  );
}

function FlowArrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-3 pl-5 sm:pl-7">
      <span aria-hidden="true" className="text-action text-2xl leading-none">
        ↓
      </span>
      <p className="text-foreground/60 text-sm leading-6">{children}</p>
    </div>
  );
}

function POrbitalDiagram() {
  return (
    <figure className="mx-auto w-full max-w-xl">
      <svg
        aria-labelledby="p-orbital-title p-orbital-description"
        className="h-auto w-full"
        viewBox="0 0 560 400"
      >
        <title id="p-orbital-title">
          A cross-section through a p orbital oriented along the z axis
        </title>
        <desc id="p-orbital-description">
          Two diffuse lobes lie above and below the nucleus. They have opposite
          wave phase, and a dashed nodal plane passes through the nucleus.
        </desc>
        <defs>
          <radialGradient cx="50%" cy="42%" id="upper-lobe" r="65%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.88" />
            <stop offset="72%" stopColor="#38bdf8" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient cx="50%" cy="58%" id="lower-lobe" r="65%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.88" />
            <stop offset="72%" stopColor="#a78bfa" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.05" />
          </radialGradient>
          <marker
            id="axis-arrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto-start-reverse"
            refX="6"
            refY="4"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>

        <path
          d="M280 30 C224 50 197 102 212 145 C223 174 249 185 280 188 C311 185 337 174 348 145 C363 102 336 50 280 30Z"
          fill="url(#upper-lobe)"
        />
        <path
          d="M280 370 C224 350 197 298 212 255 C223 226 249 215 280 212 C311 215 337 226 348 255 C363 298 336 350 280 370Z"
          fill="url(#lower-lobe)"
        />
        <line
          className="text-foreground/45"
          markerEnd="url(#axis-arrow)"
          stroke="currentColor"
          strokeWidth="1.5"
          x1="280"
          x2="280"
          y1="196"
          y2="18"
        />
        <line
          className="text-foreground/45"
          markerEnd="url(#axis-arrow)"
          stroke="currentColor"
          strokeWidth="1.5"
          x1="280"
          x2="492"
          y1="200"
          y2="200"
        />
        <line
          className="text-foreground/65"
          stroke="currentColor"
          strokeDasharray="5 6"
          strokeWidth="1.5"
          x1="86"
          x2="474"
          y1="200"
          y2="200"
        />
        <circle cx="280" cy="200" fill="var(--color-background)" r="5" />
        <circle cx="280" cy="200" fill="currentColor" r="2.5" />

        <text
          className="fill-foreground text-sm font-semibold"
          textAnchor="middle"
          x="280"
          y="94"
        >
          positive phase
        </text>
        <text
          className="fill-foreground text-sm font-semibold"
          textAnchor="middle"
          x="280"
          y="316"
        >
          negative phase
        </text>
        <text
          className="fill-foreground/70 text-xs"
          textAnchor="start"
          x="375"
          y="190"
        >
          nodal plane
        </text>
        <text
          className="fill-foreground/70 text-xs"
          textAnchor="middle"
          x="280"
          y="394"
        >
          probability density · cross-section
        </text>
      </svg>
      <figcaption className="text-foreground/55 mt-1 text-center text-xs">
        The <InlineMath expression="p_z" /> state shown in an{" "}
        <InlineMath expression={String.raw`\text{x--z}`} /> slice; in 3D, the
        nodal plane extends around the nucleus.
      </figcaption>
    </figure>
  );
}

function OrientationDiagram({ axis }: { axis: "x" | "y" | "z" }) {
  const rotation = { x: 0, y: -30, z: 90 }[axis];
  const orbitalExpression = { x: "p_x", y: "p_y", z: "p_z" }[axis];

  return (
    <figure className="border-border rounded-2xl border p-2 text-center sm:p-4">
      <svg
        aria-label={`Two-lobed p orbital oriented along the ${axis} axis`}
        className="text-action mx-auto h-auto w-full"
        viewBox="0 0 160 100"
      >
        <g transform={`rotate(${rotation} 80 50)`}>
          <line
            className="text-foreground/25"
            stroke="currentColor"
            strokeDasharray="3 4"
            strokeWidth="1"
            x1="18"
            x2="142"
            y1="50"
            y2="50"
          />
          <ellipse
            cx="46"
            cy="50"
            fill="currentColor"
            opacity="0.42"
            rx="28"
            ry="22"
          />
          <ellipse
            cx="114"
            cy="50"
            fill="currentColor"
            opacity="0.42"
            rx="28"
            ry="22"
          />
        </g>
        <circle cx="80" cy="50" fill="var(--color-background)" r="3.5" />
        <circle cx="80" cy="50" fill="currentColor" r="1.75" />
      </svg>
      <figcaption className="text-foreground mt-2 text-sm">
        <InlineMath expression={orbitalExpression} />
      </figcaption>
    </figure>
  );
}

function StepNumber({ children }: { children: string }) {
  return (
    <span className="text-action inline-flex h-9 w-9 items-center justify-center rounded-full border border-current text-sm font-semibold">
      {children}
    </span>
  );
}
