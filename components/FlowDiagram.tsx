"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import Button from "@/components/Button";

interface RenderedDiagram {
  src: string;
  svg?: string;
  width: number;
  height: number;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const DIAGRAM_FONT_FAMILY =
  'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

async function loadPele(definition: string) {
  const [pele, { default: renderer }] = await Promise.all([
    import("pele/core"),
    definition.trimStart().startsWith("erDiagram")
      ? import("pele/diagrams/er")
      : import("pele/diagrams/flowchart"),
  ]);
  pele.register(renderer);
  return pele;
}

export default function FlowDiagram({
  definition,
  legend,
  mathLabels,
  title,
}: {
  definition: string;
  legend?: ReactNode;
  mathLabels?: Record<string, ReactNode>;
  title: string;
}) {
  const figureRef = useRef<HTMLElement>(null);
  const mathRef = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  const id = useId().replaceAll(/[^a-zA-Z0-9_-]/gu, "");
  const [diagram, setDiagram] = useState<RenderedDiagram | null>(null);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    const figure = figureRef.current;
    if (figure === null) {
      return () => {
        /* No figure to observe. */
      };
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(figure);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!nearby) {
      return () => {
        /* Defer work until the diagram is near the viewport. */
      };
    }
    let cancelled = false;

    async function render() {
      try {
        const pele = await loadPele(definition);
        await document.fonts.ready;
        if (cancelled) {
          return;
        }
        const theme = getComputedStyle(document.body);
        const math = new Map(
          [...(mathRef.current?.children ?? [])].flatMap((element) => {
            if (!(element instanceof HTMLElement)) {
              return [];
            }
            const bounds = element.getBoundingClientRect();
            return [
              [
                element.dataset.tex ?? "",
                {
                  html: element.innerHTML,
                  width: Math.ceil(bounds.width),
                  height: Math.ceil(bounds.height),
                },
              ] as const,
            ];
          })
        );
        const { svg, width, height } = pele.render(definition, {
          idPrefix: `diagram-${id}`,
          responsive: false,
          autoDirection: false,
          fontFamily: DIAGRAM_FONT_FAMILY,
          fontFamilyMono: DIAGRAM_FONT_FAMILY,
          links: false,
          images: false,
          math: mathLabels ? (tex) => math.get(tex) : undefined,
        });
        const svgDocument = new DOMParser().parseFromString(
          svg,
          "image/svg+xml"
        );
        const element = svgDocument.documentElement;
        if (
          element.localName !== "svg" ||
          element.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          setStatus("error");
          return;
        }
        if (
          !Number.isFinite(width) ||
          !Number.isFinite(height) ||
          width <= 0 ||
          height <= 0
        ) {
          setStatus("error");
          return;
        }
        // Standalone SVG images cannot inherit the page's CSS variables.
        for (const [name, token] of [
          ["bg", "background"],
          ["fg", "foreground"],
          ["muted", "muted"],
          ["line", "foreground"],
          ["surface", "surface"],
          ["surface-alt", "interface-hover"],
          ["border", "border"],
          ["accent", "action"],
        ]) {
          element.style.setProperty(
            `--pele-${name}`,
            theme.getPropertyValue(`--color-${token}`).trim()
          );
        }
        // Token classes color outlines and add a subtle matching background.
        for (const token of ["action", "attention", "success", "danger"]) {
          const color = theme
            .getPropertyValue(
              `--color-${token === "attention" ? "progress" : token}`
            )
            .trim();
          for (const shape of element.querySelectorAll<SVGElement>(
            `.pele-node.${token} [stroke]`
          )) {
            shape.style.setProperty("stroke", color);
            shape.style.setProperty(
              "fill",
              `color-mix(in srgb, ${color} 12%, ${theme.getPropertyValue("--color-background").trim()})`
            );
          }
        }
        element.setAttribute("width", String(width));
        element.setAttribute("height", String(height));
        element.setAttribute("preserveAspectRatio", "xMinYMin meet");
        const imageSvg = new XMLSerializer().serializeToString(element);
        setDiagram({
          src: `data:image/svg+xml,${encodeURIComponent(imageSvg)}`,
          svg: mathLabels ? imageSvg : undefined,
          width,
          height,
        });
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [definition, id, mathLabels, nearby]);

  return (
    <Dialog.Root>
      <figure className="min-w-0 space-y-3" ref={figureRef}>
        {mathLabels ? (
          <div
            aria-hidden="true"
            className="pointer-events-none invisible fixed top-0 left-0 w-max -translate-x-full"
            ref={mathRef}
          >
            {Object.entries(mathLabels).map(([tex, label]) => (
              <div className="w-max text-base" data-tex={tex} key={tex}>
                {label}
              </div>
            ))}
          </div>
        ) : null}
        <figcaption className="sr-only">{title} diagram</figcaption>
        <div className="border-border relative rounded-lg border">
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start gap-3">
            <div className="bg-background pointer-events-auto rounded-lg">
              {legend}
            </div>
            <div className="bg-background pointer-events-auto ml-auto flex shrink-0 items-center gap-2 rounded-lg">
              <ZoomControls
                disabled={status !== "ready"}
                onZoomChange={setZoom}
                zoom={zoom}
              />
              <Dialog.Trigger
                aria-label="Expand diagram"
                render={
                  <Button
                    disabled={status !== "ready"}
                    iconOnly
                    variant="outline"
                  />
                }
              >
                <ArrowsPointingOutIcon aria-hidden="true" className="size-4" />
              </Dialog.Trigger>
            </div>
          </div>
          {status === "loading" ? (
            <output className="text-muted block min-h-24 p-4">
              Rendering diagram…
            </output>
          ) : null}
          {status === "error" ? (
            <div className="space-y-3 p-4">
              <output className="text-muted block">
                Unable to render the diagram. Its diagram source is shown below.
              </output>
              <pre className="overflow-x-auto text-sm">{definition}</pre>
            </div>
          ) : null}
          {diagram === null ? null : (
            <DiagramViewport diagram={diagram} title={title} zoom={zoom} />
          )}
        </div>
      </figure>
      <Dialog.Portal>
        <Dialog.Backdrop className="flow-diagram-backdrop bg-foreground/40 fixed inset-0 z-80 backdrop-blur-xs" />
        <Dialog.Popup className="corner-squircle bg-background text-foreground fixed inset-0 z-90 flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden rounded-lg p-4 outline-hidden supports-[corner-shape:squircle]:rounded-2xl sm:inset-4 sm:p-6">
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Drag to pan, scroll, or focus the diagram and use the arrow keys.
            Zoom out to see more of the diagram.
          </Dialog.Description>
          <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex flex-wrap items-start gap-3 sm:inset-x-6 sm:top-6">
            <div className="bg-background pointer-events-auto rounded-lg">
              {legend}
            </div>
            <div className="bg-background pointer-events-auto ml-auto flex shrink-0 items-center gap-2 rounded-lg">
              <ZoomControls
                disabled={status !== "ready"}
                onZoomChange={setZoom}
                zoom={zoom}
              />
              <Dialog.Close
                aria-label="Collapse diagram"
                render={<Button iconOnly variant="outline" />}
              >
                <ArrowsPointingInIcon aria-hidden="true" className="size-4" />
              </Dialog.Close>
            </div>
          </div>
          {diagram === null ? null : (
            <DiagramViewport
              diagram={diagram}
              expanded
              title={title}
              zoom={zoom}
            />
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ZoomControls({
  disabled,
  onZoomChange,
  zoom,
}: {
  disabled: boolean;
  onZoomChange: (zoom: number) => void;
  zoom: number;
}) {
  return (
    <fieldset
      aria-label="Diagram zoom"
      className="border-border text-foreground m-0 flex shrink-0 items-center rounded-md border p-0"
    >
      <button
        aria-label="Zoom out"
        className="border-border hover:bg-interface-hover focus-visible:outline-action flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-l-md border-r focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || zoom <= MIN_ZOOM}
        onClick={() => {
          onZoomChange(Math.max(MIN_ZOOM, zoom - ZOOM_STEP));
        }}
        type="button"
      >
        <MinusIcon aria-hidden="true" className="size-4" />
      </button>
      <button
        aria-label="Reset zoom to 100 percent"
        className="hover:bg-interface-hover focus-visible:outline-action h-8 min-w-16 shrink-0 cursor-pointer px-3 text-center text-sm font-medium whitespace-nowrap tabular-nums focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onClick={() => {
          onZoomChange(1);
        }}
        type="button"
      >
        {Math.round(zoom * 100)}%
      </button>
      <button
        aria-label="Zoom in"
        className="border-border hover:bg-interface-hover focus-visible:outline-action flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-r-md border-l focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || zoom >= MAX_ZOOM}
        onClick={() => {
          onZoomChange(Math.min(MAX_ZOOM, zoom + ZOOM_STEP));
        }}
        type="button"
      >
        <PlusIcon aria-hidden="true" className="size-4" />
      </button>
    </fieldset>
  );
}

function DiagramViewport({
  diagram,
  expanded = false,
  title,
  zoom,
}: {
  diagram: RenderedDiagram;
  expanded?: boolean;
  title: string;
  zoom: number;
}) {
  const drag = useRef<{
    pointerId: number;
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const dimensions: CSSProperties & {
    "--diagram-width": string;
    "--diagram-height": string;
  } = {
    "--diagram-width": `${diagram.width * zoom}px`,
    "--diagram-height": `${diagram.height * zoom}px`,
  };

  return (
    <section
      aria-label={`${title} diagram; drag, scroll, or use arrow keys to explore`}
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Focusable scroll regions support native keyboard panning.
      tabIndex={0}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) {
          return;
        }
        const viewport = event.currentTarget;
        drag.current = {
          pointerId: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          left: viewport.scrollLeft,
          top: viewport.scrollTop,
        };
        viewport.setPointerCapture(event.pointerId);
        viewport.dataset.dragging = "true";
      }}
      onPointerMove={(event) => {
        const start = drag.current;
        if (start === null || start.pointerId !== event.pointerId) {
          return;
        }
        event.currentTarget.scrollLeft = start.left + start.x - event.clientX;
        event.currentTarget.scrollTop = start.top + start.y - event.clientY;
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onLostPointerCapture={(event) => {
        drag.current = null;
        delete event.currentTarget.dataset.dragging;
      }}
      className={`focus-visible:outline-action min-h-0 max-w-full min-w-0 cursor-grab overflow-auto overscroll-contain rounded-lg select-none focus-visible:outline-2 focus-visible:outline-offset-2 data-dragging:cursor-grabbing ${expanded ? "scrollbar-hide flex-1" : "scrollbar-subtle max-h-[65dvh]"}`}
    >
      <div
        className="box-content h-(--diagram-height) w-(--diagram-width) p-4"
        style={dimensions}
      >
        {diagram.svg === undefined ? (
          <Image
            alt={`${title} diagram`}
            className="pointer-events-none h-full w-full max-w-none"
            draggable={false}
            height={Math.ceil(diagram.height)}
            src={diagram.src}
            unoptimized
            width={Math.ceil(diagram.width)}
          />
        ) : (
          <div
            aria-label={`${title} diagram`}
            className="pointer-events-none h-full w-full [&>svg]:h-full [&>svg]:w-full"
            // oxlint-disable-next-line react/no-danger -- Pele generates this SVG from local definitions and our KaTeX-rendered React nodes, without external markup.
            dangerouslySetInnerHTML={{ __html: diagram.svg }}
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Inline SVG preserves HTML KaTeX labels, which an img cannot render.
            role="img"
          />
        )}
      </div>
    </section>
  );
}
