"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { RefObject } from "react";

import Button from "@/components/Button";

import CardVisual from "./CardVisual";
import { cards } from "./catalog";
import { color, exportCSS, shadowFor } from "./styles";

interface InspectorProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClosed: () => void;
  returnFocus: RefObject<HTMLButtonElement | null>;
}

export default function Inspector({
  id,
  open,
  onOpenChange,
  onClosed,
  returnFocus,
}: InspectorProps) {
  const card = cards.find((entry) => entry.id === id);
  const [feedback, setFeedback] = useState<string | null>(null);
  if (!card) {
    return null;
  }
  const css = exportCSS(card);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setFeedback("CSS copied.");
    } catch {
      setFeedback("Could not copy. Select the CSS below and copy it manually.");
    }
  };
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(visible) => {
        if (!visible) {
          onClosed();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/50 fixed inset-0 z-70 backdrop-blur-xs" />
        <Dialog.Popup
          className="corner-squircle border-border bg-background focus-visible:outline-action fixed top-1/2 left-1/2 z-80 max-h-[calc(100dvh-2rem)] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-xl border p-5 shadow-xl outline-hidden supports-[corner-shape:squircle]:rounded-3xl sm:p-6"
          finalFocus={returnFocus}
        >
          <div className="mb-5 pr-10">
            <Dialog.Title className="text-foreground text-xl font-semibold">
              {card.id} · {card.name}
            </Dialog.Title>
            <Dialog.Description className="text-muted mt-1 text-sm">
              {card.family} · {card.motion ? "Animated" : "Static"} composition
            </Dialog.Description>
          </div>
          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            <CardVisual card={card} preview />
            <div className="min-w-0 space-y-5">
              <div>
                <p className="text-foreground mb-2 text-sm font-medium">
                  Palette
                </p>
                <ul className="space-y-2">
                  {card.palette.map((token) => (
                    <li className="flex items-center gap-2 text-sm" key={token}>
                      <span
                        aria-hidden="true"
                        className="border-foreground/10 size-6 shrink-0 rounded-full border"
                        style={{ background: color(token) }}
                      />
                      <code>{token}</code>
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted">Desktop</dt>
                <dd>
                  {card.columns} columns × {card.rows} rows
                </dd>
                <dt className="text-muted">Tablet</dt>
                <dd>
                  {Math.min(2, card.columns)} columns × {Math.min(2, card.rows)}{" "}
                  rows
                </dd>
                <dt className="text-muted">Mobile</dt>
                <dd>1 column · content height</dd>
                <dt className="text-muted">Artwork</dt>
                <dd className="capitalize">{card.motif}</dd>
                <dt className="text-muted">Layout</dt>
                <dd className="capitalize">{card.composition}</dd>
                <dt className="text-muted">Shadow</dt>
                <dd className="min-w-0">
                  <code className="block wrap-anywhere">{shadowFor(card)}</code>
                </dd>
              </dl>
              <Button
                onClick={() => {
                  void copy();
                }}
              >
                Copy CSS
              </Button>
              <output aria-live="polite" className="text-muted block text-sm">
                {feedback}
              </output>
              <details className="border-border rounded-lg border p-3">
                <summary className="focus-visible:outline-action cursor-pointer text-sm font-medium">
                  View CSS and layers
                </summary>
                <pre
                  className="text-foreground mt-3 max-h-72 overflow-auto text-xs leading-relaxed"
                  // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Scrollable CSS needs native keyboard access.
                  tabIndex={0}
                >
                  <code>{css}</code>
                </pre>
              </details>
            </div>
          </div>
          <Dialog.Close
            aria-label="Close inspector"
            className="focus-visible:outline-action text-muted hover:bg-interface-hover absolute top-4 right-4 grid size-9 place-items-center rounded-full focus-visible:outline-2"
          >
            <XMarkIcon aria-hidden="true" className="size-5" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
