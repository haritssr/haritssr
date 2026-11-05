import type { Period } from "../utils/timer";

export function firstFutureSlot(minute: number) {
  return Math.max(0, Math.min(96, Math.floor(minute / 15) + 1));
}

/** The quarter-hour slot under `y`, within the visible `view` and not before `first`. */
export function timelineSlot(
  y: number,
  top: number,
  height: number,
  first: number,
  view: Period
) {
  const firstSlot = view.from / 15;
  const slots = (view.until - view.from) / 15;
  return Math.max(
    first,
    Math.min(
      firstSlot + slots - 1,
      firstSlot + Math.floor(((y - top) / height) * slots)
    )
  );
}

export function selectedWindow(anchor: number, slot: number): Period {
  return {
    from: Math.min(anchor, slot) * 15,
    until: (Math.max(anchor, slot) + 1) * 15,
  };
}

export type ResizeEdge = "from" | "until";

export function resizedWindow(
  original: Period,
  edge: ResizeEdge,
  boundary: number,
  first: number,
  spent: number
): Period | null {
  const minimum = Math.max(15, (Math.floor(spent / 900) + 1) * 15);
  const earliest = first * 15;
  if (
    original.from < earliest ||
    (original.until - earliest < minimum && edge === "from")
  ) {
    return null;
  }
  const snapped = Math.round(boundary / 15) * 15;
  if (edge === "from") {
    return {
      from: Math.max(earliest, Math.min(original.until - minimum, snapped)),
      until: original.until,
    };
  }
  if (original.from + minimum > 1440) {
    return null;
  }
  return {
    from: original.from,
    until: Math.min(1440, Math.max(original.from + minimum, snapped)),
  };
}
