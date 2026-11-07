import { describe, expect, test } from "bun:test";

import { TimerReadError } from "./timerClient";
import { timerConnection } from "./timerConnection";

const confirmed = {};
const offline = new TimerReadError("offline", "network");
const refused = new TimerReadError("forbidden", "http", 403);

const state = (overrides = {}) => ({
  error: null,
  confirmed,
  loadFailure: null,
  loadFailures: 0,
  ...overrides,
});

describe("timer connection", () => {
  test("is loading until the first snapshot arrives", () => {
    expect(timerConnection(state({ confirmed: undefined }))).toBe("loading");
  });

  test("is ready once a snapshot is confirmed", () => {
    expect(timerConnection(state())).toBe("ready");
  });

  test("is reconnecting after a few retryable failures", () => {
    for (const loadFailures of [1, 2]) {
      expect(
        timerConnection(state({ loadFailure: offline, loadFailures }))
      ).toBe("reconnecting");
    }
  });

  test("fails after three retryable failures", () => {
    expect(
      timerConnection(state({ loadFailure: offline, loadFailures: 3 }))
    ).toBe("failed");
  });

  test("fails at once for a failure that cannot be retried", () => {
    expect(
      timerConnection(state({ loadFailure: refused, loadFailures: 1 }))
    ).toBe("failed");
  });

  test("fails when the first load never succeeded", () => {
    expect(
      timerConnection(
        state({ confirmed: undefined, loadFailure: offline, loadFailures: 1 })
      )
    ).toBe("failed");
  });

  test("a save error stops it counting as reconnecting", () => {
    expect(
      timerConnection(
        state({ error: "save failed", loadFailure: offline, loadFailures: 1 })
      )
    ).toBe("failed");
  });
});
