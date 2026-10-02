"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import Section from "@/components/Section";
import katexify from "@/utils/katexify";

import { getElectronCounts, ORBITALS } from "../_lib/electron-configuration";
import {
  BOHR_RADIUS_PM,
  makeOrbitalSurface,
  radialProbabilityRadius,
  REAL_ORBITAL_SHAPES,
  sampleOrbital,
} from "../_lib/orbital-model";
import { OrbitalCanvas, PHYSICAL_UNITS } from "./OrbitalCanvas";

import styles from "./orbital-illustration.module.css";

const SUBSHELL_TYPES = "spdf";
const UPPER_P_LOBE = lobePath(-Math.PI / 2, Math.PI / 2);
const LOWER_P_LOBE = lobePath(Math.PI / 2, (3 * Math.PI) / 2);

export default function OrbitalIllustration({
  atomicNumber,
  elementName,
}: {
  atomicNumber: number;
  elementName: string;
}) {
  const [selectedLabel, setSelectedLabel] = useState("2p");
  const [selectedOrientation, setSelectedOrientation] = useState(0);
  const [showAxes, setShowAxes] = useState(true);
  const [showSurface, setShowSurface] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const electronCounts = getElectronCounts(atomicNumber);
  const selectedIndex = ORBITALS.findIndex(
    (orbital, index) =>
      orbital.label === selectedLabel && electronCounts[index] > 0
  );
  const activeIndex =
    selectedIndex === -1
      ? electronCounts.findLastIndex((electrons) => electrons > 0)
      : selectedIndex;
  const orbital = ORBITALS[activeIndex] ?? ORBITALS[0];
  const electrons = electronCounts[activeIndex] ?? 0;
  const azimuthal = SUBSHELL_TYPES.indexOf(orbital.label.slice(-1));
  const orientation = Math.min(
    selectedOrientation,
    Math.min(electrons, orbital.orbitalCount) - 1
  );
  const shape = REAL_ORBITAL_SHAPES.find(
    (candidate) =>
      candidate.family === azimuthal &&
      candidate.order === orientation - azimuthal
  );
  const selectedOrbitalTex = `${orbital.shell}${shape?.tex ?? orbital.label.slice(-1)}`;
  const selectedOrbitalLabel = `${orbital.shell}${shape?.label ?? orbital.label.slice(-1)}`;
  const points = useMemo(
    () => sampleOrbital(orbital.shell, azimuthal, orientation - azimuthal),
    [orbital.shell, azimuthal, orientation]
  );
  const surface = useMemo(
    () => makeOrbitalSurface(orbital.shell, azimuthal, orientation - azimuthal),
    [orbital.shell, azimuthal, orientation]
  );
  const selectedRadius = radialProbabilityRadius(orbital.shell, azimuthal, 0.9);
  const fitRadius = radialProbabilityRadius(orbital.shell, azimuthal, 0.98);
  const description = `Hydrogen-like model of an occupied subshell in ${elementName}: ${selectedOrbitalLabel}, ${occupancy(electrons, orbital.orbitalCount, orientation)} electrons`;

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  async function toggleFullscreen() {
    try {
      await (document.fullscreenElement === viewerRef.current
        ? document.exitFullscreen()
        : viewerRef.current?.requestFullscreen());
      setFullscreenError(false);
    } catch {
      setFullscreenError(true);
    }
  }

  return (
    <section aria-labelledby="orbital-illustration-title">
      <Section id="orbital-illustration-title" name="Electron Orbital in 3D" />
      <div className="border-border overflow-hidden rounded-xl border">
        <div className="border-border flex flex-wrap items-start gap-x-6 gap-y-4 border-b p-4">
          <div className="min-w-0 flex-[1_1_16rem]">
            <p className="text-foreground/70 mb-2 text-xs font-medium">
              Occupied subshell
            </p>
            <fieldset
              aria-label="Occupied subshells"
              className="flex flex-wrap gap-2"
            >
              {ORBITALS.map((candidate, index) =>
                electronCounts[index] > 0 ? (
                  <button
                    aria-pressed={index === activeIndex}
                    className={`focus-visible:outline-action hover:bg-interface-hover hover:text-foreground cursor-pointer rounded-md border px-2.5 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${index === activeIndex ? "border-action bg-action text-white" : "border-border"}`}
                    key={candidate.label}
                    onClick={() => {
                      setSelectedLabel(candidate.label);
                      setSelectedOrientation(0);
                    }}
                    type="button"
                  >
                    {katexify(
                      `${candidate.label}^{${electronCounts[index]}}`,
                      false
                    )}
                  </button>
                ) : null
              )}
            </fieldset>
          </div>
          {orbital.orbitalCount > 1 ? (
            <div className="ml-auto max-w-full min-w-0">
              <p className="text-foreground/70 mb-2 text-xs font-medium">
                Orbital orientation
              </p>
              <fieldset
                aria-label="Occupied orbital orientations"
                className="flex flex-wrap gap-2"
              >
                {Array.from({ length: orbital.orbitalCount }, (_, index) => {
                  const count = occupancy(
                    electrons,
                    orbital.orbitalCount,
                    index
                  );
                  if (count === 0) {
                    return null;
                  }
                  const candidateShape = REAL_ORBITAL_SHAPES.find(
                    (candidate) =>
                      candidate.family === azimuthal &&
                      candidate.order === index - azimuthal
                  );
                  return (
                    <button
                      aria-label={`${orbital.shell}${candidateShape?.label ?? orbital.label.slice(-1)}, ${count} electron${count === 1 ? "" : "s"}`}
                      aria-pressed={index === orientation}
                      className={`focus-visible:outline-action hover:bg-interface-hover hover:text-foreground cursor-pointer rounded-md border px-2.5 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${index === orientation ? "border-action bg-action text-white" : "border-border"}`}
                      key={index}
                      onClick={() => {
                        setSelectedOrientation(index);
                      }}
                      type="button"
                    >
                      {katexify(
                        candidateShape?.tex ?? String(index + 1),
                        false
                      )}
                      <span aria-hidden="true" className="ml-2 opacity-70">
                        {katexify(
                          count === 2 ? "\\uparrow\\downarrow" : "\\uparrow",
                          false
                        )}
                      </span>
                    </button>
                  );
                })}
              </fieldset>
            </div>
          ) : null}
        </div>
        <div className={styles.viewer} ref={viewerRef}>
          <OrbitalCanvas
            azimuthal={azimuthal}
            description={description}
            fitRadius={fitRadius}
            points={points}
            showAxes={showAxes}
            showSurface={showSurface}
            surface={surface}
          />
          <div className="border-border text-foreground flex flex-wrap items-center justify-between gap-3 border-t bg-white p-3 pl-4 text-sm">
            <span className="inline-flex items-center gap-2">
              {katexify(selectedOrbitalTex, false)}
              <span className="text-muted">·</span>
              <span>
                {occupancy(electrons, orbital.orbitalCount, orientation)}{" "}
                {occupancy(electrons, orbital.orbitalCount, orientation) === 1
                  ? "electron"
                  : "electrons"}
              </span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                aria-checked={showSurface}
                className="focus-visible:outline-action inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => {
                  setShowSurface((visible) => !visible);
                }}
                role="switch"
                type="button"
              >
                Shape
                <span
                  aria-hidden="true"
                  className={`block w-11 rounded-full p-1 transition-colors ${showSurface ? "bg-action" : "bg-border"}`}
                >
                  <span
                    className={`block size-4 rounded-full bg-white shadow-sm transition-transform ${showSurface ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </button>
              <button
                aria-checked={showAxes}
                className="focus-visible:outline-action inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => {
                  setShowAxes((visible) => !visible);
                }}
                role="switch"
                type="button"
              >
                Axes
                <span
                  aria-hidden="true"
                  className={`block w-11 rounded-full p-1 transition-colors ${showAxes ? "bg-action" : "bg-border"}`}
                >
                  <span
                    className={`block size-4 rounded-full bg-white shadow-sm transition-transform ${showAxes ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </button>
              <button
                className="border-border focus-visible:outline-action cursor-pointer rounded-md border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => {
                  void toggleFullscreen();
                }}
                type="button"
              >
                {isFullscreen ? "Exit full screen" : "Full screen"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-foreground/70 mt-3 space-y-2 text-sm leading-6">
        <p>
          The shaded lobes illustrate angular probability. Turn off Shape to
          explore dots sampled from {katexify("|\\psi|^2", false)}. Blue and
          orange show opposite wavefunction phases, not electric charge. The
          surface omits radial nodes and is not a probability boundary.
        </p>
        <p>
          The scale uses Bohr radii (
          {katexify(
            `1a_0 \\approx ${BOHR_RADIUS_PM.toFixed(1)}\\,\\mathrm{pm}`,
            false
          )}
          ). For this hydrogen-like orbital, 90% of radial probability lies
          within{" "}
          {katexify(
            `${selectedRadius.toFixed(1)}a_0 \\approx ${PHYSICAL_UNITS.format(selectedRadius * BOHR_RADIUS_PM)}\\,\\mathrm{pm}`,
            false
          )}{" "}
          of the nucleus. These model sizes are not measured sizes of{" "}
          {elementName}. Real orbital orientations can combine magnetic states,
          so axis names do not correspond one-to-one with Aufbau{" "}
          {katexify("m_l", false)} labels.
        </p>
      </div>
      <OrbitalShapeExplanation />
      {fullscreenError ? (
        <p className="mt-2 text-sm text-red-700">
          Full screen is unavailable in this browser.
        </p>
      ) : null}
    </section>
  );
}

function lobePath(start: number, end: number) {
  const points = Array.from({ length: 91 }, (_, index) => {
    const theta = start + ((end - start) * index) / 90;
    const radius = 78 * Math.cos(theta) ** 2;
    const x = 180 + radius * Math.sin(theta);
    const y = 105 - radius * Math.cos(theta);
    return `L${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `M180,105 ${points.join(" ")} Z`;
}

function OrbitalShapeExplanation() {
  const [family, setFamily] = useState<"s" | "p">("p");
  const [angle, setAngle] = useState(45);
  const radians = (angle * Math.PI) / 180;
  const amplitude = family === "s" ? 1 : Math.cos(radians);

  return (
    <div className="border-border mt-8 rounded-xl border p-4 sm:p-5">
      <h3 className="text-foreground text-base font-semibold">
        Why are {katexify("s", false)} orbitals round and {katexify("p", false)}{" "}
        orbitals two-lobed?
      </h3>
      <p className="text-foreground/70 mt-2 text-sm leading-6">
        The wave separates into a distance factor {katexify("R", false)} and a
        direction factor {katexify("Y", false)}. For {katexify("s", false)},{" "}
        {katexify("Y", false)} is constant in every direction. For the pictured{" "}
        {katexify("p_y", false)}, {katexify("Y \\propto \\cos\\theta", false)}:
        it changes sign across the horizontal nodal plane and is zero there. The
        lobes plot {katexify("|Y|^2", false)} in each direction.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
        <svg
          aria-label={`${family === "s" ? "Round s orbital angular shape" : "Two-lobed p-y orbital angular shape"}. Probe angle ${angle} degrees; relative signed angular amplitude ${amplitude.toFixed(2)}.`}
          className="h-auto w-full"
          viewBox="0 0 360 210"
        >
          <line stroke="#a1a1aa" x1="180" x2="180" y1="12" y2="198" />
          <line stroke="#a1a1aa" x1="78" x2="282" y1="105" y2="105" />
          {family === "s" ? (
            <circle cx="180" cy="105" fill="#2563eb" opacity="0.45" r="78" />
          ) : (
            <>
              <path d={UPPER_P_LOBE} fill="#2563eb" opacity="0.55" />
              <path d={LOWER_P_LOBE} fill="#f97316" opacity="0.55" />
            </>
          )}
          <line
            stroke="#18181b"
            strokeWidth="2"
            x1="180"
            x2={180 + 90 * Math.sin(radians)}
            y1="105"
            y2={105 - 90 * Math.cos(radians)}
          />
          <circle cx="180" cy="105" fill="#18181b" r="4" />
          <foreignObject height="24" width="32" x="188" y="7">
            <span className="text-foreground/70 text-xs">
              {katexify("+y", false)}
            </span>
          </foreignObject>
        </svg>
        <div>
          <fieldset>
            <legend className="text-sm font-medium">Compare the shape</legend>
            <div className="mt-2 flex gap-2">
              {(["s", "p"] as const).map((option) => (
                <button
                  aria-pressed={family === option}
                  className={`focus-visible:outline-action cursor-pointer rounded-md border px-4 py-1.5 text-sm focus-visible:outline-2 ${family === option ? "border-action bg-action text-white" : "border-border hover:bg-interface-hover"}`}
                  key={option}
                  onClick={() => {
                    setFamily(option);
                  }}
                  type="button"
                >
                  {katexify(option, false)}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-4 block text-sm" htmlFor="shape-probe-angle">
            Angle from {katexify("+y", false)}:{" "}
            <strong>{katexify(`${angle}^{\\circ}`, false)}</strong>
          </label>
          <input
            className="accent-action focus-visible:outline-action w-full cursor-pointer focus-visible:outline-2"
            id="shape-probe-angle"
            max="180"
            min="0"
            onChange={(event) => {
              setAngle(Number(event.target.value));
            }}
            step="5"
            type="range"
            value={angle}
          />
          <p className="text-foreground/70 mt-2 text-sm">
            {katexify(
              family === "s"
                ? "Y_0^0 = \\mathrm{constant}"
                : "Y_1^0 \\propto \\cos\\theta",
              false
            )}{" "}
            · signed amplitude {katexify(amplitude.toFixed(2), false)}
          </p>
          <p className="text-foreground/70 mt-3 text-sm">
            <Link
              className="text-action hover:text-action-hover underline"
              href="/experiments/physics/atomic-orbitals"
            >
              Follow the equation to all orbital shapes
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function occupancy(electrons: number, orbitalCount: number, index: number) {
  return Number(index < electrons) + Number(index < electrons - orbitalCount);
}
