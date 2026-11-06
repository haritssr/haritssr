import { describe, expect, test } from "bun:test";

import { task } from "../utils/timerTestFixtures";
import { layoutTimelineTasks } from "./timelineLayout";

const at = (from: number, until: number) => task({ period: { from, until } });

describe("layoutTimelineTasks", () => {
  test("separate tasks each get the full width", () => {
    const entries = layoutTimelineTasks([at(60, 120), at(180, 240)]);
    expect(entries.map(({ lane, lanes }) => [lane, lanes])).toEqual([
      [0, 1],
      [0, 1],
    ]);
  });

  test("touching tasks do not overlap", () => {
    const entries = layoutTimelineTasks([at(60, 120), at(120, 180)]);
    expect(entries.every(({ lanes }) => lanes === 1)).toBe(true);
  });

  test("overlapping tasks share lanes in start order", () => {
    const first = at(60, 180);
    const second = at(90, 150);
    const entries = layoutTimelineTasks([second, first]);
    expect(entries.map(({ task: entry }) => entry.id)).toEqual([
      first.id,
      second.id,
    ]);
    expect(entries.map(({ lane, lanes }) => [lane, lanes])).toEqual([
      [0, 2],
      [1, 2],
    ]);
  });

  test("a freed lane is reused inside the same group", () => {
    const entries = layoutTimelineTasks([
      at(60, 120),
      at(60, 240),
      at(120, 180),
    ]);
    expect(entries.map(({ lane }) => lane)).toEqual([0, 1, 0]);
    expect(entries.every(({ lanes }) => lanes === 2)).toBe(true);
  });
});
