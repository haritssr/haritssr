import { describe, expect, test } from "bun:test";

import { isValidTaskDate, parseTaskPayload } from "./validation";

const validTask = {
  duration: 30,
  progress: 50,
  title: "Review notes",
  type: "Other",
} as const;

describe("task API validation", () => {
  test("accepts valid calendar dates", () => {
    expect(isValidTaskDate("2026-09-12")).toBe(true);
    expect(isValidTaskDate("2026-02-29")).toBe(false);
    expect(isValidTaskDate("not-a-date")).toBe(false);
  });

  test("normalizes payloads to supported task fields", () => {
    expect(
      parseTaskPayload(
        { tasks: [{ ...validTask, ignored: "field" }] },
        "2026-09-12"
      )
    ).toEqual({ taskDate: "2026-09-12", tasks: [validTask] });
  });

  test("rejects unsafe task payloads", () => {
    expect(
      parseTaskPayload(
        { tasks: [validTask, { ...validTask, title: "REVIEW NOTES" }] },
        "2026-09-12"
      )
    ).toBeNull();
    expect(
      parseTaskPayload({ tasks: [{ ...validTask, duration: 0 }] }, "2026-09-12")
    ).toBeNull();
    expect(
      parseTaskPayload({ date: "2026-99-99", tasks: [] }, "2026-09-12")
    ).toBeNull();
  });
});
