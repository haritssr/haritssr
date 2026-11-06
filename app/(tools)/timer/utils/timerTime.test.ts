import { describe, expect, test } from "bun:test";

import {
  cardTimeRange,
  formatPeriod,
  inputTime,
  inputWindow,
  isScheduledWindow,
  timelineTime,
  windowRange,
} from "./timerTime";

describe("timer time formatting", () => {
  test("timeline labels keep 24:00 while inputs wrap it", () => {
    expect(timelineTime(90)).toBe("01:30");
    expect(timelineTime(1440)).toBe("24:00");
    expect(inputTime(1440)).toBe("00:00");
  });

  test("inputWindow treats an Until of 00:00 as midnight", () => {
    expect(inputWindow("09:00", "00:00")).toEqual({ from: 540, until: 1440 });
    expect(inputWindow("09:00", "10:30")).toEqual({ from: 540, until: 630 });
  });

  test("invalid inputs parse to NaN", () => {
    expect(inputWindow("25:00", "10:00").from).toBeNaN();
    expect(inputWindow("09:00", "10:60").until).toBeNaN();
    expect(inputWindow(null, "10:00").from).toBeNaN();
  });

  test("window labels", () => {
    expect(windowRange({ from: 480, until: 570 })).toBe("08:00–09:30");
    expect(windowRange(null)).toBe("—");
    expect(formatPeriod({ from: 1080, until: 1170 })).toBe("18/19:30");
    expect(formatPeriod(null)).toBeUndefined();
  });

  test("card ranges drop the shared am/pm suffix", () => {
    expect(cardTimeRange(480, 510)).toBe("8-8.30am");
    expect(cardTimeRange(660, 780)).toBe("11am-1pm");
  });
});

describe("scheduled windows", () => {
  test("accept 15-minute steps of at least 15 minutes", () => {
    expect(isScheduledWindow({ from: 540, until: 555 })).toBe(true);
    expect(isScheduledWindow({ from: 0, until: 1440 })).toBe(true);
  });

  test("reject off-grid, short, reversed or out-of-day windows", () => {
    expect(isScheduledWindow({ from: 541, until: 600 })).toBe(false);
    expect(isScheduledWindow({ from: 540, until: 540 })).toBe(false);
    expect(isScheduledWindow({ from: 600, until: 540 })).toBe(false);
    expect(isScheduledWindow({ from: 0, until: 1455 })).toBe(false);
    expect(isScheduledWindow({ from: Number.NaN, until: 60 })).toBe(false);
  });
});
