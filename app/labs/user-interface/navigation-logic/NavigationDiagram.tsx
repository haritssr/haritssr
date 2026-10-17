"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowsPointingOutIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

import Button from "@/components/Button";

interface RenderedDiagram {
  src: string;
  width: number;
  height: number;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

async function loadMermaid() {
  const { default: mermaid } = await import("mermaid");
  return mermaid;
}

export default function NavigationDiagram({
  definition,
  title,
}: {
  definition: string;
  title: string;
}) {
  const id = useId().replaceAll(/[^a-zA-Z0-9_-]/gu, "");
  const [diagram, setDiagram] = useState<RenderedDiagram | null>(null);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = await loadMermaid();
        if (cancelled) {
          return;
        }
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme: "neutral",
          htmlLabels: false,
          flowchart: { curve: "linear", useMaxWidth: false },
        });
        const { svg } = await mermaid.render(`navigation-${id}`, definition);
        if (cancelled) {
          return;
        }
        const document = new DOMParser().parseFromString(svg, "image/svg+xml");
        const element = document.documentElement;
        if (
          element.localName !== "svg" ||
          element.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          setStatus("error");
          return;
        }
        const viewBox = element.getAttribute("viewBox")?.trim().split(/\s+/u);
        const width = Number(viewBox?.[2]);
        const height = Number(viewBox?.[3]);
        if (
          !Number.isFinite(width) ||
          !Number.isFinite(height) ||
          width <= 0 ||
          height <= 0
        ) {
          setStatus("error");
          return;
        }
        // Give the standalone image the same viewport as its complete drawing.
        // Mermaid's responsive sizing can otherwise clip the exported SVG.
        element.setAttribute("width", String(width));
        element.setAttribute("height", String(height));
        element.setAttribute("preserveAspectRatio", "xMinYMin meet");
        element.setAttribute(
          "style",
          `width:${width}px;height:${height}px;max-width:none;max-height:none;`
        );
        const imageSvg = new XMLSerializer().serializeToString(element);
        setDiagram({
          src: `data:image/svg+xml,${encodeURIComponent(imageSvg)}`,
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
  }, [definition, id]);

  return (
    <Dialog.Root>
      <figure className="border-border bg-surface min-w-0 space-y-4 rounded-xl border p-4 sm:p-6">
        <figcaption className="sr-only">{title} navigation diagram</figcaption>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ZoomControls
            disabled={status !== "ready"}
            onZoomChange={setZoom}
            zoom={zoom}
          />
          <Dialog.Trigger
            render={<Button disabled={status !== "ready"} variant="outline" />}
          >
            <ArrowsPointingOutIcon aria-hidden="true" className="size-4" />
            Full width
          </Dialog.Trigger>
        </div>
        {status === "loading" ? (
          <output className="text-muted block">Rendering diagram…</output>
        ) : null}
        {status === "error" ? (
          <div className="space-y-3">
            <output className="text-muted block">
              Unable to render the diagram. Its Mermaid source is shown below.
            </output>
            <pre className="overflow-x-auto text-sm">{definition}</pre>
          </div>
        ) : null}
        {diagram === null ? null : (
          <DiagramViewport diagram={diagram} title={title} zoom={zoom} />
        )}
      </figure>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/40 fixed inset-0 z-80 backdrop-blur-xs" />
        <Dialog.Popup className="border-border bg-background text-foreground fixed inset-0 z-90 flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden border p-4 outline-hidden sm:inset-4 sm:rounded-xl sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Dialog.Title className="text-lg font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close full-width diagram"
              render={<Button iconOnly variant="outline" />}
            >
              <XMarkIcon aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-muted text-sm">
            Scroll horizontally or vertically to explore. Zoom out to see more
            of the diagram.
          </Dialog.Description>
          <ZoomControls
            disabled={status !== "ready"}
            onZoomChange={setZoom}
            zoom={zoom}
          />
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
      className="m-0 flex items-center gap-2 border-0 p-0"
    >
      <Button
        aria-label="Zoom out"
        disabled={disabled || zoom <= MIN_ZOOM}
        iconOnly
        onClick={() => {
          onZoomChange(Math.max(MIN_ZOOM, zoom - ZOOM_STEP));
        }}
        variant="outline"
      >
        <MinusIcon aria-hidden="true" className="size-4" />
      </Button>
      <Button
        aria-label="Reset zoom to 100 percent"
        className="min-w-18 tabular-nums"
        disabled={disabled}
        onClick={() => {
          onZoomChange(1);
        }}
        variant="outline"
      >
        {Math.round(zoom * 100)}%
      </Button>
      <Button
        aria-label="Zoom in"
        disabled={disabled || zoom >= MAX_ZOOM}
        iconOnly
        onClick={() => {
          onZoomChange(Math.min(MAX_ZOOM, zoom + ZOOM_STEP));
        }}
        variant="outline"
      >
        <PlusIcon aria-hidden="true" className="size-4" />
      </Button>
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
  return (
    <section
      aria-label={`${title} diagram; scroll horizontally and vertically to explore`}
      className={`scrollbar-subtle border-border min-h-0 max-w-full min-w-0 overflow-scroll rounded-lg border ${expanded ? "flex-1" : "max-h-[65dvh]"}`}
    >
      <div
        className="box-content p-4"
        style={{ width: diagram.width * zoom, height: diagram.height * zoom }}
      >
        <Image
          alt={`${title} navigation flowchart`}
          className="h-full w-full max-w-none"
          height={Math.ceil(diagram.height)}
          src={diagram.src}
          unoptimized
          width={Math.ceil(diagram.width)}
        />
      </div>
    </section>
  );
}
