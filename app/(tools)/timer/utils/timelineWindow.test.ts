import { describe, expect, test } from "bun:test";

import { overlapsView } from "./timelineWindow";

describe("timeline windows", () => {
  test("overlap is strict at the edges", () => {
    const view = { from: 360, until: 720 };
    expect(overlapsView(300, 360, view)).toBe(false);
    expect(overlapsView(300, 361, view)).toBe(true);
    expect(overlapsView(720, 780, view)).toBe(false);
    expect(overlapsView(719, 780, view)).toBe(true);
  });
});
