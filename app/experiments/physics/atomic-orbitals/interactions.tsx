"use client";

import { useMemo, useState } from "react";

import katexify from "@/utils/katexify";

import { OrbitalCanvas } from "../_components/OrbitalCanvas";
import {
  BOHR_RADIUS_PM,
  makeOrbitalSurface,
  radialAmplitude,
  radialProbabilityRadius,
  REAL_ORBITAL_SHAPES,
  sampleOrbital,
} from "../_lib/orbital-model";

import styles from "./accordion.module.css";

const CONTROL_CLASS =
  "accent-action focus-visible:outline-action w-full cursor-pointer focus-visible:outline-2";

const FAMILY_LABELS = ["s", "p", "d", "f"] as const;

export function PotentialExplorer() {
  const [radius, setRadius] = useState(2);
  const markerX = 30 + ((radius - 1) / 5) * 300;
  const markerY = 35 + 105 / radius;
  const curve = Array.from({ length: 101 }, (_, index) => {
    const r = 1 + index * 0.05;
    return `${index === 0 ? "M" : "L"}${(30 + ((r - 1) / 5) * 300).toFixed(1)},${(35 + 105 / r).toFixed(1)}`;
  }).join(" ");

  return (
    <div className="border-border rounded-xl border p-4 sm:p-5">
      <p className="text-sm font-medium">Try moving away from the nucleus</p>
      <svg
        aria-label="Hydrogen's attractive potential is most negative near the nucleus and approaches zero farther away. A marker follows the chosen radius."
        className="mt-4 h-auto w-full"
        viewBox="0 0 360 180"
      >
        <line stroke="#a1a1aa" x1="30" x2="330" y1="35" y2="35" />
        <line stroke="#a1a1aa" x1="30" x2="330" y1="150" y2="150" />
        <path d={curve} fill="none" stroke="#2563eb" strokeWidth="3" />
        <line
          stroke="#a1a1aa"
          strokeDasharray="4 4"
          x1={markerX}
          x2={markerX}
          y1={markerY}
          y2="150"
        />
        <circle cx={markerX} cy={markerY} fill="#1d4ed8" r="6" />
        <foreignObject height="24" width="70" x="34" y="10">
          <span className="text-xs text-zinc-600">
            {katexify("V=0", false)}
          </span>
        </foreignObject>
        <foreignObject height="24" width="120" x="240" y="155">
          <span className="text-xs text-zinc-600">
            Distance {katexify(String.raw`r\to`, false)}
          </span>
        </foreignObject>
      </svg>
      <label className="mt-3 block text-sm" htmlFor="potential-radius">
        Distance from nucleus:{" "}
        <strong>{katexify(`${radius.toFixed(1)}a_0`, false)}</strong>
      </label>
      <input
        className={CONTROL_CLASS}
        id="potential-radius"
        max="6"
        min="1"
        onChange={(event) => {
          setRadius(Number(event.target.value));
        }}
        step="0.1"
        type="range"
        value={radius}
      />
      <p className="text-foreground/65 mt-2 text-sm">
        Only distance matters here. That spherical symmetry lets us split the
        equation into radial and angular parts.
      </p>
    </div>
  );
}

export function FactorExplorer() {
  const [radius, setRadius] = useState(3);
  const [angle, setAngle] = useState(30);
  const theta = (angle * Math.PI) / 180;
  const radial = radius * Math.exp(-radius / 2);
  const angular = Math.cos(theta);
  const x = 180 + radius * 12 * Math.sin(theta);
  const y = 110 - radius * 12 * Math.cos(theta);

  return (
    <div className="border-border rounded-xl border p-4 sm:p-5">
      <p className="text-sm font-medium">
        Probe a {katexify("2p_y", false)} wave at one position
      </p>
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
        <svg
          aria-label={`Cross-section of a 2p-y orbital. Probe at radius ${radius.toFixed(1)} Bohr radii and angle ${angle} degrees from the positive y axis.`}
          className="h-auto w-full"
          viewBox="0 0 360 220"
        >
          <line stroke="#a1a1aa" x1="180" x2="180" y1="10" y2="210" />
          <line stroke="#a1a1aa" x1="70" x2="290" y1="110" y2="110" />
          <ellipse
            cx="180"
            cy="63"
            fill="#2563eb"
            opacity="0.35"
            rx="30"
            ry="42"
          />
          <ellipse
            cx="180"
            cy="157"
            fill="#f97316"
            opacity="0.35"
            rx="30"
            ry="42"
          />
          <line
            stroke="#18181b"
            strokeWidth="2"
            x1="180"
            x2={x}
            y1="110"
            y2={y}
          />
          <circle cx={x} cy={y} fill="#18181b" r="5" />
          <circle cx="180" cy="110" fill="#18181b" r="4" />
          <foreignObject height="24" width="32" x="188" y="6">
            <span className="text-xs text-zinc-600">
              {katexify("+y", false)}
            </span>
          </foreignObject>
          <foreignObject height="24" width="32" x="290" y="91">
            <span className="text-xs text-zinc-600">
              {katexify("x", false)}
            </span>
          </foreignObject>
        </svg>
        <div className="space-y-4">
          <div>
            <label className="block text-sm" htmlFor="factor-radius">
              Radius:{" "}
              <strong>{katexify(`${radius.toFixed(1)}a_0`, false)}</strong>
            </label>
            <input
              className={CONTROL_CLASS}
              id="factor-radius"
              max="8"
              min="0"
              onChange={(event) => {
                setRadius(Number(event.target.value));
              }}
              step="0.1"
              type="range"
              value={radius}
            />
          </div>
          <div>
            <label className="block text-sm" htmlFor="factor-angle">
              Angle from {katexify("+y", false)}:{" "}
              <strong>{katexify(String.raw`${angle}^{\circ}`, false)}</strong>
            </label>
            <input
              className={CONTROL_CLASS}
              id="factor-angle"
              max="180"
              min="0"
              onChange={(event) => {
                setAngle(Number(event.target.value));
              }}
              step="5"
              type="range"
              value={angle}
            />
          </div>
          <div
            className={`${styles.resultBox} bg-interface-hover overflow-x-auto p-3 text-xs leading-6 sm:text-sm`}
          >
            <div>
              {katexify(
                String.raw`\text{radial factor}=r e^{-r/2}=${radial.toFixed(2)}`,
                true
              )}
            </div>
            <div>
              {katexify(
                String.raw`\text{angular factor}=\cos\theta=${angular.toFixed(2)}`,
                true
              )}
            </div>
            <div>
              {katexify(
                String.raw`\text{wave}\propto\text{radial}\times\text{angular}=${(radial * angular).toFixed(2)}`,
                true
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="text-foreground/65 mt-2 text-sm">
        These values omit a shared normalization constant. Crossing{" "}
        {katexify(String.raw`90^{\circ}`, false)} flips the wave’s sign; it does
        not make the electron’s charge change.
      </p>
    </div>
  );
}

function legendreAtZeroOrder(degree: number, cosine: number): number {
  if (degree === 0) {
    return 1;
  }
  if (degree === 1) {
    return cosine;
  }
  if (degree === 2) {
    return (3 * cosine * cosine - 1) / 2;
  }
  return (5 * cosine ** 3 - 3 * cosine) / 2;
}

export function AngularExplorer() {
  const [degree, setDegree] = useState(1);
  const rays = Array.from({ length: 181 }, (_, index) => {
    const angle = (index * Math.PI) / 180;
    const amplitude = legendreAtZeroOrder(degree, Math.cos(angle));
    const distance = 78 * Math.abs(amplitude);
    return {
      x: 180 + Math.sin(angle) * distance,
      y: 105 - Math.cos(angle) * distance,
      oppositeX: 180 - Math.sin(angle) * distance,
      color: amplitude >= 0 ? "#2563eb" : "#f97316",
    };
  });

  return (
    <div className="border-border rounded-xl border p-4 sm:p-5">
      <fieldset>
        <legend className="text-sm font-medium">
          Choose a pattern (angular quantum number{" "}
          {katexify(String.raw`\ell`, false)})
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {FAMILY_LABELS.map((family, index) => (
            <button
              aria-pressed={degree === index}
              className={`focus-visible:outline-action cursor-pointer rounded-lg border px-4 py-1.5 text-sm focus-visible:outline-2 ${degree === index ? "border-action bg-action text-white" : "border-border hover:bg-interface-hover"}`}
              key={family}
              onClick={() => {
                setDegree(index);
              }}
              type="button"
            >
              {katexify(String.raw`${family}\;(\ell=${index})`, false)}
            </button>
          ))}
        </div>
      </fieldset>
      <svg
        aria-label={`Vertical cross-section of the real order-zero ${FAMILY_LABELS[degree]} angular function. It has ${degree} angular node${degree === 1 ? "" : "s"}. Blue and orange indicate opposite wave signs.`}
        className="mt-4 h-auto w-full"
        viewBox="0 0 360 210"
      >
        <line stroke="#a1a1aa" x1="180" x2="180" y1="14" y2="196" />
        <line stroke="#a1a1aa" x1="80" x2="280" y1="105" y2="105" />
        {rays.map((ray, index) => (
          <g key={index}>
            <line
              opacity="0.4"
              stroke={ray.color}
              strokeWidth="2"
              x1="180"
              x2={ray.x}
              y1="105"
              y2={ray.y}
            />
            <line
              opacity="0.4"
              stroke={ray.color}
              strokeWidth="2"
              x1="180"
              x2={ray.oppositeX}
              y1="105"
              y2={ray.y}
            />
          </g>
        ))}
        <circle cx="180" cy="105" fill="#18181b" r="3" />
      </svg>
      <p className="text-foreground/65 text-sm">
        This cut shows how one angular pattern changes with direction. It is not
        the full orbital or a hard boundary.{" "}
        {katexify(String.raw`\ell=${degree}`, false)} gives {degree} angular
        node
        {degree === 1 ? "" : "s"} and {2 * degree + 1} real-basis shape
        {degree === 0 ? "" : "s"}.
      </p>
    </div>
  );
}

export function RadialExplorer() {
  const [principal, setPrincipal] = useState(2);
  const [azimuthal, setAzimuthal] = useState(0);
  const [showProbability, setShowProbability] = useState(false);
  const maximumRadius = 3 * principal * principal;
  const values = Array.from({ length: 241 }, (_, index) => {
    const radius = (index / 240) * maximumRadius;
    const amplitude = radialAmplitude(principal, azimuthal, radius);
    return showProbability
      ? radius * radius * amplitude * amplitude
      : amplitude;
  });
  const maximum = Math.max(...values.map(Math.abs), 0.00001);
  const path = values
    .map((value, index) => {
      const x = 28 + (index / 240) * 310;
      const y = showProbability
        ? 150 - (value / maximum) * 115
        : 95 - (value / maximum) * 65;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="border-border rounded-xl border p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm" htmlFor="radial-n">
          Shell {katexify("n", false)}
          <select
            className="border-border mt-1 block w-full rounded-md border p-2"
            id="radial-n"
            onChange={(event) => {
              const next = Number(event.target.value);
              setPrincipal(next);
              setAzimuthal((current) => Math.min(current, next - 1));
            }}
            value={principal}
          >
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm" htmlFor="radial-l">
          Subshell {katexify(String.raw`\ell`, false)}
          <select
            className="border-border mt-1 block w-full rounded-md border p-2"
            id="radial-l"
            onChange={(event) => {
              setAzimuthal(Number(event.target.value));
            }}
            value={azimuthal}
          >
            {FAMILY_LABELS.slice(0, principal).map((family, index) => (
              <option key={family} value={index}>
                {family} subshell
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm" htmlFor="radial-view">
          Graph
          <select
            className="border-border mt-1 block w-full rounded-md border p-2"
            id="radial-view"
            onChange={(event) => {
              setShowProbability(event.target.value === "probability");
            }}
            value={showProbability ? "probability" : "wave"}
          >
            <option value="wave">Signed radial wave</option>
            <option value="probability">Radial probability</option>
          </select>
        </label>
      </div>
      <svg
        aria-label={`${principal}${FAMILY_LABELS[azimuthal]} ${showProbability ? "radial probability" : "signed radial wave"} versus distance. ${principal - azimuthal - 1} radial nodes.`}
        className="mt-4 h-auto w-full"
        viewBox="0 0 360 180"
      >
        <line
          stroke="#a1a1aa"
          x1="28"
          x2="338"
          y1={showProbability ? 150 : 95}
          y2={showProbability ? 150 : 95}
        />
        <line stroke="#a1a1aa" x1="28" x2="28" y1="20" y2="150" />
        <path d={path} fill="none" stroke="#2563eb" strokeWidth="2.5" />
        <foreignObject height="24" width="150" x="210" y="155">
          <span className="text-xs text-zinc-600">
            Distance {katexify(String.raw`r/a_0\to`, false)}
          </span>
        </foreignObject>
      </svg>
      <p className="text-foreground/65 text-sm">
        {katexify(`${principal}${FAMILY_LABELS[azimuthal]}`, false)} has{" "}
        <strong>
          {principal - azimuthal - 1} radial node
          {principal - azimuthal - 1 === 1 ? "" : "s"}
        </strong>
        . The probability graph is {katexify("r^2|R|^2", false)}, not just{" "}
        {katexify("|R|^2", false)}: larger spherical shells contain more space.
        Curves are rescaled separately for comparison.
      </p>
    </div>
  );
}

export function ProbabilityExplorer() {
  const [showProbability, setShowProbability] = useState(false);
  const dots = Array.from({ length: 221 }, (_, index) => {
    const x = (index % 17) - 8;
    const y = Math.floor(index / 17) - 6;
    const amplitude = y * Math.exp(-Math.hypot(x, y) / 2);
    const intensity = Math.min(1, Math.abs(amplitude) / 1.2);
    return { x: 180 + x * 17, y: 110 - y * 14, amplitude, intensity };
  });

  return (
    <div className="border-border rounded-xl border p-4 sm:p-5">
      <fieldset>
        <legend className="text-sm font-medium">
          Show the same {katexify("2p_y", false)} wave in two ways
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            aria-pressed={!showProbability}
            className={`focus-visible:outline-action cursor-pointer rounded-lg border px-3 py-1.5 text-sm focus-visible:outline-2 ${showProbability ? "border-border" : "border-action bg-action text-white"}`}
            onClick={() => {
              setShowProbability(false);
            }}
            type="button"
          >
            Signed wave {katexify(String.raw`\psi`, false)}
          </button>
          <button
            aria-pressed={showProbability}
            className={`focus-visible:outline-action cursor-pointer rounded-lg border px-3 py-1.5 text-sm focus-visible:outline-2 ${showProbability ? "border-action bg-action text-white" : "border-border"}`}
            onClick={() => {
              setShowProbability(true);
            }}
            type="button"
          >
            Probability {katexify(String.raw`|\psi|^2`, false)}
          </button>
        </div>
      </fieldset>
      <svg
        aria-label={
          showProbability
            ? "Cross-section of 2p-y probability density. Both lobes are positive and the center plane is a node."
            : "Cross-section of the signed 2p-y wave. The upper and lower lobes have opposite signs and the center plane is a node."
        }
        className="mt-4 h-auto w-full"
        viewBox="0 0 360 220"
      >
        <line stroke="#a1a1aa" x1="180" x2="180" y1="10" y2="210" />
        <line stroke="#a1a1aa" x1="25" x2="335" y1="110" y2="110" />
        {dots.map((dot, index) => {
          let color = "#7c3aed";
          if (!showProbability) {
            color = dot.amplitude >= 0 ? "#2563eb" : "#f97316";
          }
          return (
            <circle
              cx={dot.x}
              cy={dot.y}
              fill={color}
              key={index}
              opacity={
                showProbability
                  ? dot.intensity ** 2 * 0.85
                  : dot.intensity * 0.85
              }
              r="6"
            />
          );
        })}
      </svg>
      <p className="text-foreground/65 text-sm">
        {showProbability
          ? "Squaring removes the sign, but the zero-probability nodal plane remains."
          : "Blue and orange mean opposite wave signs, not different charges."}
      </p>
    </div>
  );
}

export function OrbitalExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [principal, setPrincipal] = useState(2);
  const [showAxes, setShowAxes] = useState(true);
  const [showSurface, setShowSurface] = useState(true);
  const shape = REAL_ORBITAL_SHAPES[selectedIndex];
  const points = useMemo(
    () => sampleOrbital(principal, shape.family, shape.order, 1500),
    [principal, shape.family, shape.order]
  );
  const surface = useMemo(
    () => makeOrbitalSurface(principal, shape.family, shape.order),
    [principal, shape.family, shape.order]
  );
  const fitRadius = radialProbabilityRadius(principal, shape.family, 0.98);
  const radius90 = radialProbabilityRadius(principal, shape.family, 0.9);

  function chooseShape(index: number) {
    setSelectedIndex(index);
    setPrincipal((current) =>
      Math.max(current, REAL_ORBITAL_SHAPES[index].family + 1)
    );
  }

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="space-y-4 p-4 sm:p-5">
        <fieldset>
          <legend className="text-sm font-medium">
            Choose an orbital family
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {FAMILY_LABELS.map((family, index) => (
              <button
                aria-pressed={shape.family === index}
                className={`focus-visible:outline-action cursor-pointer rounded-lg border px-4 py-1.5 text-sm focus-visible:outline-2 ${shape.family === index ? "border-action bg-action text-white" : "border-border hover:bg-interface-hover"}`}
                key={family}
                onClick={() => {
                  chooseShape(
                    REAL_ORBITAL_SHAPES.findIndex(
                      (candidate) => candidate.family === index
                    )
                  );
                }}
                type="button"
              >
                {katexify(family, false)} · {2 * index + 1}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">Choose an orientation</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {REAL_ORBITAL_SHAPES.map((candidate, index) =>
              candidate.family === shape.family ? (
                <button
                  aria-pressed={selectedIndex === index}
                  className={`focus-visible:outline-action cursor-pointer rounded-lg border px-3 py-1.5 text-sm focus-visible:outline-2 ${selectedIndex === index ? "border-action bg-action text-white" : "border-border hover:bg-interface-hover"}`}
                  key={candidate.label}
                  onClick={() => {
                    chooseShape(index);
                  }}
                  type="button"
                >
                  {katexify(candidate.tex, false)}
                </button>
              ) : null
            )}
          </div>
          {shape.family === 3 ? (
            <p className="text-foreground/65 mt-2 text-xs">
              The f family has seven distinct patterns. Choose a label to see
              how each pattern arranges its lobes and nodes.
            </p>
          ) : null}
        </fieldset>
        <label className="block max-w-xs text-sm" htmlFor="orbital-shell">
          Shell {katexify("n", false)}: <strong>{principal}</strong> ·{" "}
          {principal - shape.family - 1} radial node
          {principal - shape.family - 1 === 1 ? "" : "s"}
          <input
            className={CONTROL_CLASS}
            id="orbital-shell"
            max="6"
            min={shape.family + 1}
            onChange={(event) => {
              setPrincipal(Number(event.target.value));
            }}
            step="1"
            type="range"
            value={principal}
          />
        </label>
      </div>
      <OrbitalCanvas
        azimuthal={shape.family}
        description={`Hydrogen-like ${principal}${shape.label} real-basis orbital. Points sample electron probability density; color shows the sign of the real wavefunction`}
        fitRadius={fitRadius}
        points={points}
        showAxes={showAxes}
        showSurface={showSurface}
        surface={surface}
      />
      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t p-4 text-sm">
        <span>
          {katexify(
            String.raw`${principal}${shape.tex}\;(\ell=${shape.family})`,
            false
          )}{" "}
          · {2 * shape.family + 1} shapes
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            aria-pressed={showAxes}
            className="border-border focus-visible:outline-action cursor-pointer rounded-md border px-3 py-1.5 focus-visible:outline-2"
            onClick={() => {
              setShowAxes((current) => !current);
            }}
            type="button"
          >
            Axes {showAxes ? "on" : "off"}
          </button>
          <button
            aria-pressed={showSurface}
            className="border-border focus-visible:outline-action cursor-pointer rounded-md border px-3 py-1.5 focus-visible:outline-2"
            onClick={() => {
              setShowSurface((current) => !current);
            }}
            type="button"
          >
            Envelope {showSurface ? "on" : "off"}
          </button>
        </div>
      </div>
      <p className="text-foreground/65 border-border border-t px-4 py-3 text-xs leading-5">
        Rotate by dragging or with the arrow keys; zoom with pinch, scroll, or
        +/−. Denser points show where the electron is more likely to be found.
        Color shows the wave&apos;s sign, not a different charge. The shaded
        envelope is a guide to the shape, not a hard edge.
      </p>
      <details className="border-border border-t">
        <summary className="focus-visible:outline-action cursor-pointer px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4">
          Model limits and physical scale
        </summary>
        <p className="text-foreground/65 px-4 pb-4 text-xs leading-5">
          These are hydrogen-like models, not measured orbitals for neutral
          cerium. The scale bar uses Bohr radii (
          {katexify(String.raw`1a_0\approx 52.9\,\mathrm{pm}`, false)}); 90% of
          this orbital&apos;s radial probability lies within{" "}
          {katexify(
            String.raw`${radius90.toFixed(1)}a_0\approx ${Math.round(radius90 * BOHR_RADIUS_PM)}\,\mathrm{pm}`,
            false
          )}{" "}
          of the nucleus. The camera fits each selection, so compare scale bars
          instead of the on-screen diameters.
        </p>
      </details>
      <details className="border-border border-t">
        <summary className="focus-visible:outline-action cursor-pointer px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4">
          Try subshells occupied in cerium
        </summary>
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "6s^2", family: 0, principal: 6 },
              {
                label: String.raw`5p^6\;\text{(core)}`,
                family: 1,
                principal: 5,
              },
              { label: "5d^1", family: 2, principal: 5 },
              { label: "4f^1", family: 3, principal: 4 },
            ].map((preset) => (
              <button
                className="border-border focus-visible:outline-action hover:bg-interface-hover cursor-pointer rounded-md border px-3 py-1.5 text-sm focus-visible:outline-2"
                key={preset.label}
                onClick={() => {
                  chooseShape(
                    REAL_ORBITAL_SHAPES.findIndex(
                      (candidate) => candidate.family === preset.family
                    )
                  );
                  setPrincipal(preset.principal);
                }}
                type="button"
              >
                {katexify(preset.label, false)}
              </button>
            ))}
          </div>
          <p className="text-foreground/65 mt-2 text-xs leading-5">
            These buttons select representative hydrogen-like shapes for
            occupied subshells. They do not assign cerium&apos;s d or f electron
            to one unique orientation.
          </p>
        </div>
      </details>
    </div>
  );
}
