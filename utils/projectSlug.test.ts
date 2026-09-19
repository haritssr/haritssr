import { describe, expect, test } from "bun:test";

import { getProjectSlug } from "./projectSlug";

describe("getProjectSlug", () => {
  test("normalizes surrounding and repeated whitespace", () => {
    expect(getProjectSlug("  Haris   Lab  ")).toBe("haris-lab");
  });

  test("uses locale-stable lowercase output", () => {
    expect(getProjectSlug("MIXA PERKASA")).toBe("mixa-perkasa");
  });
});
