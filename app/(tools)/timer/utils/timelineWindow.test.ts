import { describe, expect, test } from "bun:test";

import {
  isDaytime,
  overlapsView,
  pageAt,
  pagePeriod,
  periodRange,
} from "./timelineWindow";

describe("timeline windows", () => {
  test("the four pages tile the whole day", () => {
    expect([0, 1, 2, 3].map(pagePeriod)).toEqual([
      { from: 0, until: 360 },
      { from: 360, until: 720 },
      { from: 720, until: 1080 },
      { from: 1080, until: 1440 },
    ]);
  });

  test("pageAt picks the page for a minute and rejects outside the day", () => {
    expect(pageAt(0)).toBe(0);
    expect(pageAt(359)).toBe(0);
    expect(pageAt(360)).toBe(1);
    expect(pageAt(1439)).toBe(3);
    expect(pageAt(1440)).toBeNull();
    expect(pageAt(-1)).toBeNull();
  });

  test("only the 06:00-18:00 pages are daytime", () => {
    expect([0, 1, 2, 3].map((page) => isDaytime(pagePeriod(page)))).toEqual([
      false,
      true,
      true,
      false,
    ]);
  });

  test("overlap is strict at the edges", () => {
    const view = { from: 360, until: 720 };
    expect(overlapsView(300, 360, view)).toBe(false);
    expect(overlapsView(300, 361, view)).toBe(true);
    expect(overlapsView(720, 780, view)).toBe(false);
    expect(overlapsView(719, 780, view)).toBe(true);
  });

  test("range labels share a suffix when they can", () => {
    expect(periodRange({ from: 780, until: 1080 })).toBe("1-6PM");
    expect(periodRange({ from: 360, until: 720 })).toBe("6AM-12PM");
    expect(periodRange({ from: 0, until: 360 })).toBe("12-6AM");
  });
});
