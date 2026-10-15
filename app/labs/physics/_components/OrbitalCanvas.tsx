"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import katexify from "@/utils/katexify";

import { BOHR_RADIUS_PM } from "../_lib/orbital-model";
import type { OrbitalPoint, OrbitalSurface } from "../_lib/orbital-model";

import styles from "./orbital-illustration.module.css";

const CARTESIAN_AXES = [
  { label: "X", x: 1, y: 0, z: 0, color: "#b83243" },
  { label: "Y", x: 0, y: 1, z: 0, color: "#137a49" },
  { label: "Z", x: 0, y: 0, z: 1, color: "#6744b5" },
] as const;
const ORBITAL_PALETTE = {
  positive: [59, 130, 246],
  negative: [249, 133, 63],
} as const;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 12;
export const PHYSICAL_UNITS = new Intl.NumberFormat("en-US", {
  maximumSignificantDigits: 3,
});
function resizeCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) {
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function drawOrbitalSurface({
  context,
  surface,
  project,
  viewDirection,
  lightDirection,
}: {
  context: CanvasRenderingContext2D;
  surface: OrbitalSurface;
  project: (
    x: number,
    y: number,
    z: number
  ) => { x: number; y: number; depth: number };
  viewDirection: readonly number[];
  lightDirection: readonly number[];
}) {
  const vertices = surface.vertices.map((vertex) =>
    project(vertex.x, vertex.y, vertex.z)
  );
  const faces = surface.triangles.flatMap(([a, b, c]) => {
    const first = surface.vertices[a];
    const second = surface.vertices[b];
    const third = surface.vertices[c];
    const ux = third.x - first.x;
    const uy = third.y - first.y;
    const uz = third.z - first.z;
    const vx = second.x - first.x;
    const vy = second.y - first.y;
    const vz = second.z - first.z;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const length = Math.hypot(nx, ny, nz);
    const facing =
      nx * viewDirection[0] + ny * viewDirection[1] + nz * viewDirection[2];
    if (length < 1e-9 || facing <= 0) {
      return [];
    }
    const diffuse = Math.max(
      0,
      (nx * lightDirection[0] +
        ny * lightDirection[1] +
        nz * lightDirection[2]) /
        length
    );
    const highlight = diffuse ** 18 * 0.24;
    const color =
      first.phase + second.phase + third.phase > 0
        ? ORBITAL_PALETTE.positive
        : ORBITAL_PALETTE.negative;
    const shaded = color.map((channel) =>
      Math.round(
        channel * (0.48 + diffuse * 0.52) + (255 - channel) * highlight
      )
    );
    return [
      {
        a,
        b,
        c,
        depth: (vertices[a].depth + vertices[b].depth + vertices[c].depth) / 3,
        color: `rgb(${shaded.join(",")})`,
      },
    ];
  });
  faces.sort((first, second) => first.depth - second.depth);

  context.save();
  context.lineWidth = 0.65;
  context.lineJoin = "round";
  for (const face of faces) {
    context.fillStyle = face.color;
    context.strokeStyle = face.color;
    context.beginPath();
    context.moveTo(vertices[face.a].x, vertices[face.a].y);
    context.lineTo(vertices[face.b].x, vertices[face.b].y);
    context.lineTo(vertices[face.c].x, vertices[face.c].y);
    context.closePath();
    context.fill();
    // Fill antialiasing seams between adjacent faces.
    context.stroke();
  }
  context.restore();
}

export function OrbitalCanvas({
  points,
  surface,
  description,
  fitRadius,
  showAxes,
  showSurface,
}: {
  points: readonly OrbitalPoint[];
  surface: OrbitalSurface;
  azimuthal: number;
  description: string;
  fitRadius: number;
  showAxes: boolean;
  showSurface: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewRef = useRef({ yaw: -0.6, pitch: 0.35, zoom: 1 });
  const previousFitRadius = useRef(fitRadius);
  const axisLabelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [scaleDistance, setScaleDistance] = useState(1);
  const scaleNotation = useMemo(
    () =>
      katexify(
        `${PHYSICAL_UNITS.format(scaleDistance)}a_0 \\approx ${PHYSICAL_UNITS.format(scaleDistance * BOHR_RADIUS_PM)}\\,\\mathrm{pm}`,
        false
      ),
    [scaleDistance]
  );

  useEffect(() => {
    const candidateCanvas = canvasRef.current;
    const candidateContext = candidateCanvas?.getContext("2d");
    const surfaceLayer = document.createElement("canvas");
    const candidateSurfaceContext = surfaceLayer.getContext("2d");
    if (!candidateCanvas || !candidateContext || !candidateSurfaceContext) {
      return () => {
        // No canvas resources were created.
      };
    }
    const canvas = candidateCanvas;
    const context = candidateContext;
    const surfaceContext = candidateSurfaceContext;
    if (previousFitRadius.current !== fitRadius) {
      viewRef.current.zoom = 1;
      previousFitRadius.current = fitRadius;
    }

    let width = 0;
    let height = 0;

    function draw() {
      if (width === 0 || height === 0) {
        return;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.round(width * ratio);
      const pixelHeight = Math.round(height * ratio);
      resizeCanvas(canvas, pixelWidth, pixelHeight);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const { yaw, pitch, zoom } = viewRef.current;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const scale = (Math.min(width, height) * 0.39 * zoom) / fitRadius;
      const palette = ORBITAL_PALETTE;
      function project(x: number, y: number, z: number) {
        const rotatedX = x * cy + z * sy;
        const rotatedZ = -x * sy + z * cy;
        const rotatedY = y * cp - rotatedZ * sp;
        const depth = y * sp + rotatedZ * cp;
        return {
          x: width / 2 + rotatedX * scale,
          y: height / 2 - rotatedY * scale,
          depth,
        };
      }

      const origin = project(0, 0, 0);
      const axisLength = fitRadius * 0.95;
      const axes = showAxes
        ? CARTESIAN_AXES.map((axis) => ({
            ...axis,
            positive: project(
              axis.x * axisLength,
              axis.y * axisLength,
              axis.z * axisLength
            ),
            negative: project(
              -axis.x * axisLength,
              -axis.y * axisLength,
              -axis.z * axisLength
            ),
          }))
        : [];

      for (const axis of axes) {
        context.strokeStyle = axis.color;
        context.globalAlpha = 0.25;
        context.lineWidth = 1;
        context.setLineDash([3, 5]);
        context.beginPath();
        context.moveTo(axis.negative.x, axis.negative.y);
        context.lineTo(axis.positive.x, axis.positive.y);
        context.stroke();
      }
      context.globalAlpha = 1;
      context.setLineDash([]);

      if (showSurface) {
        resizeCanvas(surfaceLayer, pixelWidth, pixelHeight);
        surfaceContext.setTransform(ratio, 0, 0, ratio, 0, 0);
        surfaceContext.clearRect(0, 0, width, height);
        drawOrbitalSurface({
          context: surfaceContext,
          surface,
          project,
          viewDirection: [-sy * cp, sp, cy * cp],
          lightDirection: [
            -0.35 * cy - sy * (0.45 * sp + 0.82 * cp),
            0.45 * cp + 0.82 * sp,
            -0.35 * sy + cy * (0.45 * sp + 0.82 * cp),
          ],
        });
        // Composite once so overlapping mesh faces do not darken the transparency.
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.globalAlpha = 0.38;
        context.drawImage(surfaceLayer, 0, 0);
        context.restore();
      } else {
        const projected = points.map((point) => ({
          ...project(point.x, point.y, point.z),
          phase: point.phase,
        }));
        projected.sort((a, b) => a.depth - b.depth);
        for (const point of projected) {
          const color = point.phase > 0 ? palette.positive : palette.negative;
          context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`;
          context.beginPath();
          context.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (const axis of axes) {
        context.lineWidth = 1.5;
        context.strokeStyle = axis.color;
        context.globalAlpha = 0.45;
        context.setLineDash([4, 5]);
        context.beginPath();
        const negativeStart = project(
          -axis.x * fitRadius * 0.89,
          -axis.y * fitRadius * 0.89,
          -axis.z * fitRadius * 0.89
        );
        context.moveTo(axis.negative.x, axis.negative.y);
        context.lineTo(negativeStart.x, negativeStart.y);
        context.stroke();
        context.globalAlpha = 0.7;
        context.setLineDash([]);
        context.beginPath();
        const positiveStart = project(
          axis.x * fitRadius * 0.89,
          axis.y * fitRadius * 0.89,
          axis.z * fitRadius * 0.89
        );
        context.moveTo(positiveStart.x, positiveStart.y);
        context.lineTo(axis.positive.x, axis.positive.y);
        context.stroke();
      }
      context.globalAlpha = 1;

      for (const [index, axis] of axes.entries()) {
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
        const label = axisLabelsRef.current[index];
        if (label) {
          label.style.left = `${axis.positive.x + directionX * 16}px`;
          label.style.top = `${axis.positive.y + directionY * 16}px`;
        }
      }

      context.fillStyle = "rgba(75, 85, 99, 0.8)";
      context.beginPath();
      context.arc(width / 2, height / 2, 2.5, 0, Math.PI * 2);
      context.fill();

      const scaleTarget = fitRadius / (2 * zoom);
      const magnitude = 10 ** Math.floor(Math.log10(scaleTarget));
      const multiple = scaleTarget / magnitude;
      let scaleMultiple = 1;
      if (multiple >= 5) {
        scaleMultiple = 5;
      } else if (multiple >= 2) {
        scaleMultiple = 2;
      }
      const distance = scaleMultiple * magnitude;
      setScaleDistance(distance);
      const scalePixels = distance * scale;
      context.strokeStyle = "#3f3f46";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(24, height - 43);
      context.lineTo(24 + scalePixels, height - 43);
      context.moveTo(24, height - 48);
      context.lineTo(24, height - 38);
      context.moveTo(24 + scalePixels, height - 48);
      context.lineTo(24 + scalePixels, height - 38);
      context.stroke();
    }

    let frame = 0;
    function scheduleDraw() {
      if (frame === 0) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          draw();
        });
      }
    }
    const resizeObserver = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      ({ width, height } = bounds);
      scheduleDraw();
    });
    resizeObserver.observe(canvas);
    ({ width, height } = canvas.getBoundingClientRect());
    scheduleDraw();

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
            MAX_ZOOM,
            Math.max(
              MIN_ZOOM,
              viewRef.current.zoom * (distance / previousDistance)
            )
          );
        }
        previousDistance = distance;
      } else {
        viewRef.current.yaw += (event.clientX - previous.x) * 0.008;
        viewRef.current.pitch += (event.clientY - previous.y) * 0.008;
      }
      scheduleDraw();
    }
    function onPointerUp(event: PointerEvent) {
      pointers.delete(event.pointerId);
      previousDistance = 0;
    }
    function onWheel(event: WheelEvent) {
      event.preventDefault();
      viewRef.current.zoom = Math.min(
        MAX_ZOOM,
        Math.max(
          MIN_ZOOM,
          viewRef.current.zoom * Math.exp(-event.deltaY * 0.001)
        )
      );
      scheduleDraw();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        viewRef.current.yaw += event.key === "ArrowLeft" ? -0.15 : 0.15;
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        viewRef.current.pitch += event.key === "ArrowUp" ? -0.15 : 0.15;
      } else if (event.key === "+" || event.key === "=") {
        viewRef.current.zoom = Math.min(MAX_ZOOM, viewRef.current.zoom * 1.15);
      } else if (event.key === "-" || event.key === "_") {
        viewRef.current.zoom = Math.max(MIN_ZOOM, viewRef.current.zoom / 1.15);
      } else {
        return;
      }
      event.preventDefault();
      scheduleDraw();
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("keydown", onKeyDown);
    return () => {
      resizeObserver.disconnect();
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("keydown", onKeyDown);
    };
  }, [fitRadius, points, showAxes, showSurface, surface]);

  return (
    <div className={styles.stage}>
      <canvas
        aria-label={`${description}. Coordinates are Bohr radii; the scale bar updates with zoom. ${showSurface ? "Shaded angular-probability shape shown." : "Probability dots shown."} ${showAxes ? "Cartesian X, Y, and Z axes shown." : "Cartesian axes hidden."} Drag to rotate; scroll or use plus and minus keys to zoom. Arrow keys rotate.`}
        className={styles.canvas}
        ref={canvasRef}
        tabIndex={0}
      >
        {description}
      </canvas>
      {showAxes
        ? CARTESIAN_AXES.map((axis, index) => (
            <span
              aria-hidden="true"
              className={styles.axisLabel}
              key={axis.label}
              ref={(node) => {
                axisLabelsRef.current[index] = node;
              }}
              style={{ color: axis.color }}
            >
              {katexify(axis.label.toLowerCase(), false)}
            </span>
          ))
        : null}
      <div className={styles.phaseLegend}>
        <span>
          <i className={styles.positivePhase} /> Positive phase
        </span>
        <span>
          <i className={styles.negativePhase} /> Negative phase
        </span>
      </div>
      <span className={styles.scaleLabel}>{scaleNotation}</span>
      <span aria-hidden="true" className={styles.gestureHint}>
        Drag to rotate · Scroll to zoom
      </span>
    </div>
  );
}
