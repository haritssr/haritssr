import { describe, expect, test } from "bun:test";
import { appleStock } from "@visx/mock-data";

describe("visx bar chart data", () => {
  test("loads the apple stock data from the package root export", () => {
    expect(appleStock.length).toBeGreaterThan(0);
    expect(appleStock[0]).toMatchObject({
      close: expect.any(Number),
      date: expect.any(String),
    });
  });
});
