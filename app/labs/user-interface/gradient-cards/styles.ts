import type { CardRecipe, Motif } from "./catalog";
import { palette as paletteFallbacks } from "./palette";

export function color(token: string, opacity = 100): string {
  const value = `var(--color-${token}, ${paletteFallbacks[token]})`;
  return opacity === 100
    ? value
    : `color-mix(in oklab, ${value} ${opacity}%, transparent)`;
}

export const imagePath = (name: string) =>
  `/images/gradient-cards/${name}.webp`;

interface Layer {
  background?: string;
  inset?: string;
  width?: string;
  height?: string;
  left?: string;
  top?: string;
  "border-radius"?: string;
  transform?: string;
  border?: string;
  "box-shadow"?: string;
  opacity?: string;
  "mix-blend-mode"?: string;
  "backdrop-filter"?: string;
}

const linear = (angle: number, ...stops: string[]) =>
  `linear-gradient(${angle}deg in oklab, ${stops.join(", ")})`;
const radial = (position: string, ...stops: string[]) =>
  `radial-gradient(ellipse at ${position} in oklab, ${stops.join(", ")})`;

export function layersFor(card: CardRecipe): Layer[] {
  const [a, b, c] = card.palette;
  const light = color(card.dark ? "white" : c, 25);
  const edge = color(card.dark ? "white" : c, 40);
  const tilt = (card.seed % 7) * 7 - 21;
  const glow = radial(
    "35% 25%",
    `${color(a, 85)} 0%`,
    `${color(b, 35)} 38%`,
    `${color(c, 0)} 72%`
  );
  const motifs: Record<Motif, () => Layer[]> = {
    orb: () => [
      {
        width: "76%",
        height: "76%",
        left: "36%",
        top: "-12%",
        "border-radius": "50%",
        background: glow,
        "box-shadow": `inset -18px -22px 35px ${color(c, 22)}, 0 25px 60px ${color(c, 20)}`,
      },
      {
        width: "45%",
        height: "45%",
        left: "-15%",
        top: "68%",
        "border-radius": "50%",
        background: radial("30% 30%", color(b, 80), color(a, 0)),
      },
    ],
    horizon: () => [
      {
        inset: "36% -30% -55%",
        "border-radius": "50% 50% 0 0",
        transform: `rotate(${tilt}deg)`,
        background: linear(160, color(a, 70), color(c, 8)),
        "box-shadow": `0 -1px 0 ${light}`,
      },
      {
        inset: "62% -20% -25%",
        "border-radius": "50% 50% 0 0",
        transform: `rotate(${-tilt / 2}deg)`,
        background: linear(180, color(b, 65), color(c, 15)),
      },
    ],
    rings: () =>
      Array.from({ length: 5 }, (_, i) => ({
        width: `${45 + i * 18}%`,
        height: `${45 + i * 18}%`,
        left: `${40 - i * 9}%`,
        top: `${-4 - i * 9}%`,
        "border-radius": "50%",
        border: `1px solid ${edge}`,
        "box-shadow": i === 0 ? `inset 0 0 35px ${light}` : "none",
        transform: "rotate(-25deg) scaleY(.75)",
      })),
    ribbon: () =>
      Array.from({ length: 3 }, (_, i) => ({
        width: "160%",
        height: `${20 + i * 7}%`,
        left: "-25%",
        top: `${12 + i * 22}%`,
        "border-radius": "50%",
        transform: `rotate(${-30 + i * 12 + tilt}deg)`,
        background: linear(
          125,
          color(a, 0),
          color(i % 2 ? c : a, 55),
          color(b, 0)
        ),
        "box-shadow": `0 1px 0 ${light}, 0 20px 40px ${color(c, 15)}`,
      })),
    tiles: () =>
      Array.from({ length: 4 }, (_, i) => ({
        width: "46%",
        height: "45%",
        left: `${46 + (i % 2) * 21}%`,
        top: `${-12 + Math.floor(i / 2) * 34}%`,
        "border-radius": i % 2 ? "50% 0 50% 50%" : "25%",
        transform: `rotate(${45 + tilt}deg)`,
        background: linear(145, color(a, 75), color(b, 20)),
        "box-shadow": `8px 12px 0 ${color(c, 15)}`,
      })),
    waves: () =>
      Array.from({ length: 4 }, (_, i) => ({
        width: "170%",
        height: "85%",
        left: `${-35 + i * 5}%`,
        top: `${12 + i * 17}%`,
        "border-radius": "45% 55% 0 0",
        transform: `rotate(${-18 + i * 7}deg)`,
        border: `1px solid ${light}`,
        background: linear(180, color(i % 2 ? a : b, 28), color(c, 0)),
      })),
    sun: () => [
      {
        width: "66%",
        height: "66%",
        left: "47%",
        top: "-8%",
        "border-radius": "50%",
        background: radial(
          "40% 30%",
          color("amber-50", 95),
          color(a, 80),
          color(b, 0)
        ),
        "box-shadow": `0 0 65px ${color(a, 45)}`,
      },
      { inset: "52% 0 0", background: linear(180, color(b, 0), color(c, 35)) },
    ],
    portal: () =>
      Array.from({ length: 4 }, (_, i) => ({
        width: `${85 - i * 16}%`,
        height: `${130 - i * 18}%`,
        left: `${34 + i * 8}%`,
        top: `${-4 + i * 10}%`,
        "border-radius": "50% 50% 0 0",
        border: `1px solid ${edge}`,
        background: linear(140, color(a, i === 0 ? 25 : 5), color(c, 18)),
        "box-shadow": `-12px 8px 22px ${color(c, 14)}`,
      })),
    contour: () => [
      {
        inset: "-35%",
        transform: `rotate(${tilt}deg)`,
        background: `repeating-radial-gradient(ellipse at 85% 15% in oklab, transparent 0 15px, ${light} 16px 17px, transparent 18px 28px)`,
      },
    ],
    grid: () => [
      {
        inset: "0",
        background: `repeating-linear-gradient(0deg, transparent 0 31px, ${light} 32px 33px), repeating-linear-gradient(90deg, transparent 0 31px, ${light} 32px 33px)`,
        opacity: ".55",
      },
      {
        width: "75%",
        height: "75%",
        left: "45%",
        top: "-12%",
        background: glow,
        "border-radius": "50%",
      },
    ],
    dots: () => [
      {
        inset: "0",
        background: `radial-gradient(circle at 2px 2px, ${edge} 1px, transparent 1.5px) 0 0 / ${12 + (card.seed % 9)}px ${12 + (card.seed % 9)}px`,
        opacity: ".65",
      },
      {
        width: "90%",
        height: "90%",
        left: "45%",
        top: "-30%",
        background: glow,
        "border-radius": "50%",
      },
    ],
    stripes: () => [
      {
        inset: "-50%",
        transform: `rotate(${25 + tilt}deg)`,
        background: `repeating-linear-gradient(90deg in oklab, transparent 0 32px, ${color(a, 28)} 33px 58px)`,
        opacity: ".7",
      },
    ],
    prism: () => [
      {
        width: "100%",
        height: "160%",
        left: "38%",
        top: "-30%",
        transform: `rotate(${30 + tilt}deg)`,
        background: linear(
          90,
          color(a, 0),
          color(a, 65),
          color(b, 15),
          color(c, 0)
        ),
        "box-shadow": `-1px 0 0 ${edge}, -25px 0 50px ${color(c, 25)}`,
      },
      {
        width: "40%",
        height: "150%",
        left: "75%",
        top: "-20%",
        transform: "rotate(30deg)",
        background: linear(90, color(b, 50), color(a, 0)),
      },
    ],
    orbit: () => [
      {
        width: "100%",
        height: "100%",
        left: "35%",
        top: "-18%",
        "border-radius": "50%",
        border: `1px solid ${edge}`,
        transform: "rotate(-35deg) scaleX(.5)",
        "box-shadow": `0 0 0 22px ${color(a, 7)}, 0 0 0 44px ${color(b, 8)}`,
      },
      {
        width: "24%",
        height: "24%",
        left: "58%",
        top: "12%",
        "border-radius": "50%",
        background: radial("25% 20%", color(a), color(b), color(c)),
        "box-shadow": `8px 16px 25px ${color(c, 30)}`,
      },
    ],
    fold: () => [
      {
        width: "85%",
        height: "160%",
        left: "52%",
        top: "-35%",
        transform: "rotate(32deg)",
        background: linear(90, color(a, 35), color(b, 70)),
        "box-shadow": `-16px 0 35px ${color(c, 25)}, inset 1px 0 0 ${edge}`,
      },
      {
        width: "80%",
        height: "110%",
        left: "75%",
        top: "10%",
        transform: "rotate(32deg)",
        background: linear(90, color(c, 55), color(a, 15)),
      },
    ],
    bubbles: () =>
      Array.from({ length: 5 }, (_, i) => ({
        width: `${24 + i * 9}%`,
        height: `${24 + i * 9}%`,
        left: `${63 - i * 13}%`,
        top: `${-8 + i * 17}%`,
        "border-radius": "50%",
        background: radial("25% 20%", color(a, 70), color(b, 15), color(c, 30)),
        border: `1px solid ${light}`,
        "box-shadow": `inset 2px 3px 10px ${light}, 8px 12px 20px ${color(c, 12)}`,
      })),
    window: () => [
      {
        width: "68%",
        height: "74%",
        left: "43%",
        top: "-8%",
        "border-radius": "28px",
        transform: `rotate(${12 + tilt}deg)`,
        background: linear(145, color(a, 30), color("white", 8)),
        border: `1px solid ${color("white", 40)}`,
        "backdrop-filter": "blur(8px)",
        "box-shadow": `0 20px 50px ${color(c, 20)}, inset 0 1px 0 ${color("white", 45)}`,
      },
    ],
    halftone: () => [
      {
        inset: "0",
        background: `radial-gradient(circle at 1px 1px, ${color(c, 30)} 1px, transparent 1.5px) 0 0 / 5px 5px`,
        "mix-blend-mode": "multiply",
        opacity: ".45",
      },
      {
        width: "90%",
        height: "90%",
        left: "45%",
        top: "-15%",
        "border-radius": "50%",
        background: linear(30, color(a, 15), color(b, 55)),
      },
    ],
    eclipse: () => [
      {
        width: "75%",
        height: "75%",
        left: "40%",
        top: "-4%",
        "border-radius": "50%",
        background: linear(135, color(c), color(b, 80)),
        "box-shadow": `-14px -8px 0 ${color(a, 75)}, -20px -12px 40px ${color(a, 50)}`,
      },
    ],
    steps: () =>
      Array.from({ length: 5 }, (_, i) => ({
        width: "90%",
        height: "18%",
        left: `${26 + i * 12}%`,
        top: `${-4 + i * 18}%`,
        transform: "rotate(-18deg)",
        background: linear(180, color(a, 50), color(b, 40)),
        "box-shadow": `-12px 16px 20px ${color(c, 22)}, inset 0 1px 0 ${edge}`,
      })),
  };
  return motifs[card.motif]();
}

function backgroundFor(card: CardRecipe): string {
  const palette = card.palette.map((token) => color(token));
  const [a, b, c] = card.dark ? palette.toReversed() : palette;
  const angle = 110 + (card.seed % 9) * 15;
  if (card.family === "Conic and spectral") {
    return `conic-gradient(from ${angle}deg at 68% 36% in oklab, ${a}, ${b}, ${c}, ${a})`;
  }
  if (card.family === "Mesh and aurora") {
    return `${radial("10% 15%", `${a} 0%`, "transparent 65%")}, ${radial("90% 80%", `${b} 0%`, "transparent 70%")}, ${c}`;
  }
  return linear(angle, a, b, c);
}

export function shadowFor(card: CardRecipe): string {
  const { 2: c } = card.palette;
  const shadows = [
    "none",
    `0 12px 30px ${color(c, 20)}`,
    `5px 7px 0 ${color(c, 40)}`,
    `inset 0 1px 0 ${color("white", 45)}, inset 0 -8px 24px ${color(c, 18)}`,
    `0 2px 2px ${color(c, 15)}, 0 18px 40px ${color(c, 22)}`,
    `0 0 30px ${color(c, 28)}`,
    `0 1px 0 ${color(c, 35)}, 0 6px 0 -2px ${color(c, 20)}, 0 11px 0 -4px ${color(c, 12)}`,
  ];
  return shadows[card.seed % shadows.length];
}

const declarations = (value: Layer) =>
  Object.entries(value)
    .map(([key, text]) => `${key}: ${text};`)
    .join(" ");

export function recipeCSS(card: CardRecipe): string {
  const selector = `.gradient-card.gc-${card.id}`;
  const radius =
    card.family === "Tactile textures" ? 8 : 18 + (card.seed % 3) * 8;
  const foreground = color(card.dark ? "white" : "zinc-900");
  const imageOverlay = card.dark
    ? linear(180, color("zinc-950", 35), color("zinc-950", 82))
    : linear(180, color(card.palette[0], 14), color(card.palette[0], 96));
  return `${selector} { --gc-cols: ${card.columns}; --gc-rows: ${card.rows}; --gc-tablet-cols: ${Math.min(2, card.columns)}; --gc-tablet-rows: ${Math.min(2, card.rows)}; --gc-ink: ${foreground}; color: ${foreground}; background: ${backgroundFor(card)}; border-radius: ${radius}px; box-shadow: ${shadowFor(card)}; }
${selector} > .gc-scrim { background: ${card.image ? imageOverlay : linear(180, color(card.dark ? "zinc-950" : "white", 8), color(card.dark ? "zinc-950" : "white", card.dark ? 42 : 32))}; }
${layersFor(card)
  .map(
    (layer, index) =>
      `${selector} .gc-layer-${index} { ${declarations(layer)} }`
  )
  .join("\n")}`;
}

// The same base rules and recipe rules power both the gallery and CSS exports.
export const baseCSS = `
.gradient-gallery { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.gradient-card { position: relative; isolation: isolate; display: flex; min-width: 0; min-height: 17rem; margin: 0; container-type: inline-size; border: 1px solid color-mix(in oklab, var(--gc-ink) 10%, transparent); transition: transform 220ms ease; }
.gc-art-viewport, .gc-art, .gc-scrim, .gc-photo { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; pointer-events: none; }
.gc-art-viewport { z-index: -1; }
.gc-photo { z-index: -3; }
.gc-photo img { width: 100%; height: 100%; object-fit: cover; }
.gc-scrim { z-index: -2; }
.gc-layer { position: absolute; pointer-events: none; }
.gc-content { position: relative; display: flex; flex: 1; min-width: 0; flex-direction: column; justify-content: space-between; gap: 1.25rem; padding: 1.5rem; overflow-wrap: anywhere; }
.gc-topline { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .5rem; padding-right: 2.5rem; font-size: .625rem; line-height: 1.5; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; opacity: .8; }
.gc-main { display: flex; flex-direction: column; gap: .75rem; }
.gc-title { margin: 0; font-size: clamp(1.5rem, 9cqw, 4.5rem); line-height: 1.06; font-weight: 650; letter-spacing: -.045em; text-wrap: balance; }
.gc-body { max-width: 34ch; margin: 0; font-size: .8125rem; line-height: 1.65; opacity: .85; text-wrap: pretty; }
.gc-detail { margin: 0; font-size: .625rem; line-height: 1.65; letter-spacing: .1em; text-transform: uppercase; opacity: .8; }
.gc-inspect { position: absolute; z-index: 3; top: .875rem; right: .875rem; display: grid; width: 2rem; height: 2rem; place-items: center; padding: 0; border: 1px solid currentColor; border-radius: 50%; background: transparent; color: inherit; cursor: pointer; opacity: .6; transition: opacity 150ms, background-color 150ms; }
.gc-inspect:hover, .gc-inspect:focus-visible { opacity: 1; background: color-mix(in oklab, var(--gc-ink) 10%, transparent); }
.gc-inspect:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.gradient-card:focus-within { outline: 2px solid var(--color-action); outline-offset: 5px; }
.gc-composition-poster .gc-main { margin-block: auto; padding-block: 1rem; }
.gc-composition-poster .gc-title { font-size: clamp(2rem, 13cqw, 6.5rem); font-weight: 800; letter-spacing: -.065em; }
.gc-composition-quiet .gc-main { margin-top: auto; }
.gc-composition-quiet .gc-title { font-family: Georgia, serif; font-style: italic; font-weight: 400; letter-spacing: -.04em; }
.gc-composition-editorial .gc-main { margin-block: auto; padding-block: 1rem; }
.gc-composition-editorial .gc-title { font-family: Georgia, serif; font-weight: 400; font-size: clamp(1.7rem, 10cqw, 5rem); }
.gc-composition-editorial .gc-detail { border-top: 1px solid color-mix(in oklab, var(--gc-ink) 25%, transparent); padding-top: .75rem; }
.gc-composition-metric .gc-title, .gc-composition-weather .gc-title { font-size: clamp(3rem, 21cqw, 8rem); font-weight: 400; letter-spacing: -.07em; font-variant-numeric: tabular-nums; }
.gc-composition-metric .gc-main { margin-top: auto; }
.gc-composition-quote .gc-main { margin-block: auto; border-left: 2px solid color-mix(in oklab, var(--gc-ink) 45%, transparent); padding: 1rem 0 1rem 1rem; }
.gc-composition-quote .gc-title { font-family: Georgia, serif; font-weight: 400; font-size: clamp(1.5rem, 7cqw, 3.25rem); line-height: 1.25; }
.gc-composition-label .gc-main { align-self: flex-start; padding: 1rem; border: 1px solid color-mix(in oklab, var(--gc-ink) 25%, transparent); border-radius: 12px; background: color-mix(in oklab, var(--color-white) 10%, transparent); }
.gc-composition-label .gc-title { font-size: clamp(1.25rem, 7cqw, 3rem); }
.gc-composition-ticket .gc-main { margin-block: auto; padding-block: 1.25rem; border-block: 1px dashed color-mix(in oklab, var(--gc-ink) 45%, transparent); }
.gc-composition-ticket .gc-title { font-size: clamp(1.75rem, 10cqw, 4.5rem); font-weight: 800; }
.gc-barcode { width: 6rem; height: 1.25rem; background: repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 3px, currentColor 3px 5px, transparent 5px 7px); opacity: .7; }
.gc-composition-weather .gc-main { margin-block: auto; }
.gc-weather-line { width: 100%; height: 2rem; border-bottom: 1px solid currentColor; border-radius: 50%; opacity: .5; }
.gc-composition-player .gc-main { margin-top: auto; }
.gc-record { display: grid; width: clamp(4rem, 32cqw, 10rem); aspect-ratio: 1; place-items: center; margin-bottom: .5rem; border: 1px solid color-mix(in oklab, var(--gc-ink) 40%, transparent); border-radius: 50%; background: repeating-radial-gradient(circle, transparent 0 5px, color-mix(in oklab, var(--gc-ink) 10%, transparent) 6px 7px); }
.gc-record::after { content: ''; width: 22%; aspect-ratio: 1; border: 1px solid currentColor; border-radius: 50%; background: color-mix(in oklab, var(--gc-ink) 25%, transparent); }
.gc-player-line { display: flex; align-items: center; gap: .75rem; margin-top: .5rem; }
.gc-progress { flex: 1; height: 2px; background: color-mix(in oklab, var(--gc-ink) 25%, transparent); }
.gc-progress::before { content: ''; display: block; width: 37%; height: 100%; background: currentColor; }
.gc-composition-product .gc-main { margin-top: auto; }
.gc-composition-product .gc-title { max-width: 14ch; font-weight: 500; }
.gc-product-mark { display: grid; width: 3rem; aspect-ratio: 1; place-items: center; border: 1px solid currentColor; border-radius: 50% 50% 15% 15%; font-family: Georgia, serif; font-size: 1.5rem; opacity: .7; }
.gc-grain { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: .2; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath filter='url(%23n)' opacity='.35' d='M0 0h180v180H0z'/%3E%3C/svg%3E"); }
.gradient-card[data-motion] .gc-art { animation: gc-drift 16s ease-in-out infinite alternate; animation-play-state: paused; transform-origin: 70% 30%; }
.gradient-card[data-motion][data-visible=true] .gc-art { animation-play-state: running; }
.gc-preview.gradient-card { min-height: min(28rem, 65dvh); grid-column: auto; grid-row: auto; }
@keyframes gc-drift { from { transform: scale(1) rotate(-2deg); opacity: .8; } to { transform: scale(1.12) rotate(4deg); opacity: 1; } }
@media (min-width: 640px) {
  .gradient-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(12rem, auto); }
  .gradient-gallery > .gradient-card { grid-column: span var(--gc-tablet-cols); grid-row: span var(--gc-tablet-rows); }
}
@media (min-width: 1024px) {
  .gradient-gallery { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .gradient-gallery > .gradient-card { grid-column: span var(--gc-cols); grid-row: span var(--gc-rows); }
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) { .gradient-gallery > .gradient-card:hover { transform: translateY(-3px); } }
@media (prefers-reduced-motion: reduce) { .gradient-card, .gc-inspect { transition: none; } .gradient-card[data-motion] .gc-art { animation: none; } }
`;

export function exportCSS(card: CardRecipe): string {
  return `/* ${card.id} · ${card.name}
 * ${card.family} · desktop: ${card.columns} columns × ${card.rows} rows
 * Palette: ${card.palette.join(", ")}
 * Uses this site's Tailwind color variables and the preview's .gc-* markup.
${card.image ? ` * Image: ${imagePath(card.image)}\n` : ""} */\n${baseCSS}\n${recipeCSS(card)}`;
}
