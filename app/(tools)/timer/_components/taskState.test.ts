import { describe, expect, test } from "bun:test";

import { DATE, at, task } from "../utils/timerTestFixtures";
import { getTaskCollection } from "./taskState";
import { getTaskState } from "./taskStatus";

const window = { from: 9 * 60, until: 10 * 60 };

describe("task phase", () => {
  test("each situation maps to one phase", () => {
    const scheduled = { period: window };
    const cases = [
      ["upcoming", task(scheduled), "08:00"],
      ["ready", task(scheduled), "09:30"],
      [
        "running",
        task({ ...scheduled, startedAt: "2026-03-10T02:30:00.000Z" }),
        "09:45",
      ],
      ["paused", task({ ...scheduled, spent: 300 }), "09:30"],
      [
        "reached",
        task({ ...scheduled, reachedAt: "2026-03-10T02:40:00.000Z" }),
        "09:50",
      ],
      ["missed", task(scheduled), "10:30"],
      ["upcoming", task({ ...scheduled, spent: 300 }), "08:00"],
    ] as const;
    for (const [phase, item, time] of cases) {
      expect(getTaskState(item, DATE, at(time)).phase).toBe(phase);
    }
  });

  test("a task with time spent whose period closed is missed, not paused", () => {
    const state = getTaskState(
      task({ period: window, spent: 300 }),
      DATE,
      at("10:30")
    );
    expect(state.missed).toBe(true);
    expect(state.paused).toBe(false);
  });

  test("at most one of the exclusive flags is ever set", () => {
    const items = [
      task({ period: window }),
      task({ period: window, spent: 300 }),
      task({ period: window, startedAt: "2026-03-10T02:30:00.000Z" }),
      task({ period: window, reachedAt: "2026-03-10T02:40:00.000Z" }),
      task(),
    ];
    for (const item of items) {
      for (const time of [
        "00:00",
        "08:00",
        "09:30",
        "09:59",
        "10:30",
        "23:00",
      ]) {
        const state = getTaskState(item, DATE, at(time));
        const set = [state.running, state.paused, state.reached, state.missed];
        expect(set.filter(Boolean).length).toBeLessThanOrEqual(1);
      }
    }
  });

  test("tasks sort running, paused, ready, upcoming, then finished", () => {
    const tasks = [
      task({ id: "ready", period: { from: 0, until: 1440 } }),
      task({ id: "upcoming", period: { from: 20 * 60, until: 21 * 60 } }),
      task({ id: "paused", period: { from: 0, until: 1440 }, spent: 300 }),
      task({
        id: "running",
        duration: 7200,
        period: { from: 0, until: 1440 },
        startedAt: "2026-03-10T05:00:00.000Z",
      }),
    ];
    const { active } = getTaskCollection(tasks, DATE, at("13:00"));
    expect(active.map(({ task: item }) => item.id)).toEqual([
      "running",
      "paused",
      "ready",
      "upcoming",
    ]);
  });
});
