"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { OrbitalDefinition } from "./_data";
import { getElectronCounts, ORBITALS } from "./_data";
import { makeOrbitalSurface, sampleOrbital } from "./orbital-model";
import type { OrbitalPoint, OrbitalSurface } from "./orbital-model";

import styles from "./orbital-illustration.module.css";

const SUBSHELL_TYPES = "spdf";
const CARTESIAN_AXES = [
  { label: "X", x: 1, y: 0, z: 0, color: "#b83243" },
  { label: "Y", x: 0, y: 1, z: 0, color: "#137a49" },
  { label: "Z", x: 0, y: 0, z: 1, color: "#6744b5" },
] as const;
const ORBITAL_PALETTES = [
  { positive: [230, 72, 91], negative: [244, 135, 149] },
  { positive: [229, 184, 32], negative: [238, 145, 57] },
  { positive: [40, 179, 204], negative: [76, 118, 211] },
  { positive: [43, 184, 105], negative: [61, 165, 141] },
] as const;

function drawOrbitalSurface({
  context,
  surface,
  palette,
  project,
  width,
  height,
  scale,
}: {
  context: CanvasRenderingContext2D;
  surface: OrbitalSurface;
  palette: (typeof ORBITAL_PALETTES)[number];
  project: (
    x: number,
    y: number,
    z: number
  ) => {
    x: number;
    y: number;
    depth: number;
  };
  width: number;
  height: number;
  scale: number;
}) {
  const vertices = surface.vertices.map((vertex) =>
    project(vertex.x, vertex.y, vertex.z)
  );
  const phases = [
    { path: new Path2D(), color: palette.positive, depth: 0, count: 0 },
    { path: new Path2D(), color: palette.negative, depth: 0, count: 0 },
  ];

  for (const [firstIndex, secondIndex, thirdIndex] of surface.triangles) {
    const first = vertices[firstIndex];
    const second = vertices[secondIndex];
    const third = vertices[thirdIndex];
    const signedArea =
      (second.x - first.x) * (third.y - first.y) -
      (second.y - first.y) * (third.x - first.x);
    if (Math.abs(signedArea) < 0.01) {
      continue;
    }
    const phase = phases[surface.vertices[firstIndex].phase > 0 ? 0 : 1];
    phase.path.moveTo(first.x, first.y);
    phase.path.lineTo(
      signedArea > 0 ? second.x : third.x,
      signedArea > 0 ? second.y : third.y
    );
    phase.path.lineTo(
      signedArea > 0 ? third.x : second.x,
      signedArea > 0 ? third.y : second.y
    );
    phase.path.closePath();
    phase.depth += (first.depth + second.depth + third.depth) / 3;
    phase.count += 1;
  }

  context.save();
  for (const phase of phases.toSorted(
    (a, b) =>
      (a.count ? a.depth / a.count : 0) - (b.count ? b.depth / b.count : 0)
  )) {
    if (phase.count === 0) {
      continue;
    }
    const [red, green, blue] = phase.color;
    const gradient = context.createRadialGradient(
      width / 2 - scale * 0.25,
      height / 2 - scale * 0.3,
      scale * 0.05,
      width / 2,
      height / 2,
      scale * 1.2
    );
    gradient.addColorStop(
      0,
      `rgb(${Math.round(red * 0.55 + 255 * 0.45)}, ${Math.round(green * 0.55 + 255 * 0.45)}, ${Math.round(blue * 0.55 + 255 * 0.45)})`
    );
    gradient.addColorStop(0.55, `rgb(${red}, ${green}, ${blue})`);
    gradient.addColorStop(
      1,
      `rgb(${Math.round(red * 0.72)}, ${Math.round(green * 0.72)}, ${Math.round(blue * 0.72)})`
    );
    context.globalAlpha = 0.55;
    context.fillStyle = gradient;
    context.fill(phase.path);
  }
  context.restore();
}

function OrbitalCanvas({
  points,
  surface,
  azimuthal,
  description,
  showAxes,
  showSurface,
}: {
  points: OrbitalPoint[];
  surface: OrbitalSurface;
  azimuthal: number;
  description: string;
  showAxes: boolean;
  showSurface: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewRef = useRef({ yaw: -0.6, pitch: 0.35, zoom: 1 });

  useEffect(() => {
    const candidateCanvas = canvasRef.current;
    const candidateContext = candidateCanvas?.getContext("2d");
    if (!candidateCanvas || !candidateContext) {
      return () => {
        // No canvas resources were created.
      };
    }
    const canvas = candidateCanvas;
    const context = candidateContext;

    let width = 0;
    let height = 0;

    function draw() {
      if (width === 0 || height === 0) {
        return;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.round(width * ratio);
      const pixelHeight = Math.round(height * ratio);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const { yaw, pitch, zoom } = viewRef.current;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const scale = Math.min(width, height) * 0.39 * zoom;
      const palette = ORBITAL_PALETTES[azimuthal] ?? ORBITAL_PALETTES[0];
      function project(x: number, y: number, z: number) {
        const rotatedX = x * cy + z * sy;
        const rotatedZ = -x * sy + z * cy;
        const rotatedY = y * cp - rotatedZ * sp;
        const depth = y * sp + rotatedZ * cp;
        const perspective = 3 / (3 - depth * 0.55);
        return {
          x: width / 2 + rotatedX * scale * perspective,
          y: height / 2 - rotatedY * scale * perspective,
          depth,
          perspective,
        };
      }

      const origin = project(0, 0, 0);
      const axes = showAxes
        ? CARTESIAN_AXES.map((axis) => ({
            ...axis,
            positive: project(axis.x, axis.y, axis.z),
            negative: project(-axis.x, -axis.y, -axis.z),
          }))
        : [];

      const projected = points.map((point) => {
        const { x, y, depth, perspective } = project(point.x, point.y, point.z);
        return {
          x,
          y,
          depth,
          phase: point.phase,
          size: Math.max(0.8, 1.45 * perspective),
        };
      });
      projected.sort((a, b) => a.depth - b.depth);

      for (const point of projected) {
        const opacity = showSurface
          ? Math.min(0.52, Math.max(0.2, 0.34 + point.depth * 0.12))
          : Math.min(0.68, Math.max(0.15, 0.3 + point.depth * 0.16));
        const color = point.phase > 0 ? palette.positive : palette.negative;
        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      }

      if (showSurface) {
        drawOrbitalSurface({
          context,
          surface,
          palette,
          project,
          width,
          height,
          scale,
        });
      }

      for (const axis of axes) {
        context.lineWidth = 1.5;
        context.strokeStyle = axis.color;
        context.globalAlpha = 0.45;
        context.setLineDash([4, 5]);
        context.beginPath();
        context.moveTo(axis.negative.x, axis.negative.y);
        context.lineTo(origin.x, origin.y);
        context.stroke();
        context.globalAlpha = 0.7;
        context.setLineDash([]);
        context.beginPath();
        context.moveTo(origin.x, origin.y);
        context.lineTo(axis.positive.x, axis.positive.y);
        context.stroke();
      }
      context.globalAlpha = 1;

      context.font = "600 13px ui-monospace, SFMono-Regular, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (const axis of axes) {
        const dx = axis.positive.x - origin.x;
        const dy = axis.positive.y - origin.y;
        const length = Math.hypot(dx, dy);
        const directionX = length > 0 ? dx / length : 0;
        const directionY = length > 0 ? dy / length : 0;
        context.strokeStyle = axis.color;
        context.fillStyle = axis.color;
        if (length > 8) {
          context.beginPath();
          context.moveTo(axis.positive.x, axis.positive.y);
          context.lineTo(
            axis.positive.x - directionX * 10 - directionY * 4,
            axis.positive.y - directionY * 10 + directionX * 4
          );
          context.moveTo(axis.positive.x, axis.positive.y);
          context.lineTo(
            axis.positive.x - directionX * 10 + directionY * 4,
            axis.positive.y - directionY * 10 - directionX * 4
          );
          context.stroke();
        }
        context.fillText(
          axis.label,
          axis.positive.x + directionX * 16,
          axis.positive.y + directionY * 16
        );
      }

      context.fillStyle = "rgba(75, 85, 99, 0.8)";
      context.beginPath();
      context.arc(width / 2, height / 2, 2.5, 0, Math.PI * 2);
      context.fill();
    }

    const resizeObserver = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      ({ width, height } = bounds);
      draw();
    });
    resizeObserver.observe(canvas);

    const pointers = new Map<number, { x: number; y: number }>();
    let previousDistance = 0;

    function onPointerDown(event: PointerEvent) {
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2) {
        const [first, second] = [...pointers.values()];
        previousDistance = Math.hypot(first.x - second.x, first.y - second.y);
      }
      canvas.setPointerCapture(event.pointerId);
    }
    function onPointerMove(event: PointerEvent) {
      const previous = pointers.get(event.pointerId);
      if (!previous) {
        return;
      }
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2) {
        const [first, second] = [...pointers.values()];
        const distance = Math.hypot(first.x - second.x, first.y - second.y);
        if (previousDistance > 0) {
          viewRef.current.zoom = Math.min(
            2.5,
            Math.max(0.6, viewRef.current.zoom * (distance / previousDistance))
          );
        }
        previousDistance = distance;
      } else {
        viewRef.current.yaw += (event.clientX - previous.x) * 0.008;
        viewRef.current.pitch += (event.clientY - previous.y) * 0.008;
      }
      draw();
    }
    function onPointerUp(event: PointerEvent) {
      pointers.delete(event.pointerId);
      previousDistance = 0;
    }
    function onWheel(event: WheelEvent) {
      event.preventDefault();
      viewRef.current.zoom = Math.min(
        2.5,
        Math.max(0.6, viewRef.current.zoom * Math.exp(-event.deltaY * 0.001))
      );
      draw();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        viewRef.current.yaw += event.key === "ArrowLeft" ? -0.15 : 0.15;
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        viewRef.current.pitch += event.key === "ArrowUp" ? -0.15 : 0.15;
      } else if (event.key === "+" || event.key === "=") {
        viewRef.current.zoom = Math.min(2.5, viewRef.current.zoom * 1.15);
      } else if (event.key === "-" || event.key === "_") {
        viewRef.current.zoom = Math.max(0.6, viewRef.current.zoom / 1.15);
      } else {
        return;
      }
      event.preventDefault();
      draw();
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("keydown", onKeyDown);
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("keydown", onKeyDown);
    };
  }, [azimuthal, points, showAxes, showSurface, surface]);

  return (
    <canvas
      aria-label={`${description}. ${showSurface ? "Shaded orbital shape shown." : "Shaded orbital shape hidden."} ${showAxes ? "Cartesian X, Y, and Z axes shown." : "Cartesian axes hidden."} Drag to rotate; scroll or use plus and minus keys to zoom. Arrow keys rotate.`}
      className={styles.canvas}
      ref={canvasRef}
      tabIndex={0}
    >
      {description}
    </canvas>
  );
}

function occupancy(electrons: number, orbitalCount: number, index: number) {
  return Number(index < electrons) + Number(index < electrons - orbitalCount);
}

function orbitalDescription(orbital: OrbitalDefinition, orientation: number) {
  return `${orbital.label} orbital, orientation ${orientation + 1} of ${orbital.orbitalCount}`;
}

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
  const points = useMemo(
    () => sampleOrbital(orbital.shell, azimuthal, orientation - azimuthal),
    [orbital.shell, azimuthal, orientation]
  );
  const surface = useMemo(
    () => makeOrbitalSurface(orbital.shell, azimuthal, orientation - azimuthal),
    [orbital.shell, azimuthal, orientation]
  );
  const description = `${elementName}: ${orbitalDescription(orbital, orientation)}, ${occupancy(electrons, orbital.orbitalCount, orientation)} electrons`;

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
      <h2
        className="text-foreground mb-2 text-xl font-semibold"
        id="orbital-illustration-title"
      >
        Electron Orbital in 3D
      </h2>
      <p className="text-foreground/70 mb-4 text-sm">
        Explore the occupied orbitals of {elementName}. Shaded lobes show their
        characteristic shapes; the dots show sampled electron probability.
      </p>
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
                    className={`focus-visible:outline-action hover:bg-interface-hover hover:text-foreground cursor-pointer rounded-md border px-2.5 py-1 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${index === activeIndex ? "border-action bg-action text-white" : "border-border"}`}
                    key={candidate.label}
                    onClick={() => {
                      setSelectedLabel(candidate.label);
                      setSelectedOrientation(0);
                    }}
                    type="button"
                  >
                    {candidate.label}
                    <sup>{electronCounts[index]}</sup>
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
                  return (
                    <button
                      aria-label={`Orientation ${index + 1}, ${count} electron${count === 1 ? "" : "s"}`}
                      aria-pressed={index === orientation}
                      className={`focus-visible:outline-action hover:bg-interface-hover hover:text-foreground cursor-pointer rounded-md border px-2.5 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${index === orientation ? "border-action bg-action text-white" : "border-border"}`}
                      key={index}
                      onClick={() => {
                        setSelectedOrientation(index);
                      }}
                      type="button"
                    >
                      {index + 1}{" "}
                      <span aria-hidden="true">{count === 2 ? "↑↓" : "↑"}</span>
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
            points={points}
            showAxes={showAxes}
            showSurface={showSurface}
            surface={surface}
          />
          <div className="border-border text-foreground flex flex-wrap items-center justify-between gap-3 border-t bg-white p-3 pl-4 text-sm">
            <span className="font-mono">
              {orbital.label} · orientation {orientation + 1} ·{" "}
              {occupancy(electrons, orbital.orbitalCount, orientation)} e⁻
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
      {fullscreenError ? (
        <p className="mt-2 text-sm text-red-700">
          Full screen is unavailable in this browser.
        </p>
      ) : null}
    </section>
  );
}
