import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
} from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

beforeAll(() => {
  tempDir = mkdtempSync(path.join(os.tmpdir(), "tools-db-"));
  process.env.TOOLS_DB_DIR = tempDir;
});

afterAll(() => {
  if (tempDir) {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("tools db", () => {
  function loadDb() {
    return import("./db.bun");
  }

  afterEach(async () => {
    const db = await loadDb();
    for (const tool of db.listTools()) {
      db.deleteTool(tool.id);
    }
  });

  test("starts empty for each test", async () => {
    const db = await loadDb();
    const tools = db.listTools();
    expect(tools.length).toBe(0);
  });

  test("create/list/update/delete", async () => {
    const db = await loadDb();

    const created = db.createTool({
      name: "Hammer",
      price: 15_000,
      amount: 2,
    });
    expect(created.changes).toBe(1);

    let tools = db.listTools();
    expect(tools.length).toBe(1);
    expect(tools[0].name).toBe("Hammer");

    const updated = db.updateTool(tools[0].id, {
      name: "Hammer",
      price: 20_000,
      amount: 3,
    });
    expect(updated.changes).toBe(1);

    tools = db.listTools();
    expect(tools[0].price).toBe(20_000);
    expect(tools[0].amount).toBe(3);

    const deleted = db.deleteTool(tools[0].id);
    expect(deleted.changes).toBe(1);

    tools = db.listTools();
    expect(tools.length).toBe(0);
  });

  test("unique name + nonnegative constraints", async () => {
    const db = await loadDb();

    db.createTool({ name: "Saw", price: 10_000, amount: 1 });
    expect(() => {
      db.createTool({ name: "Saw", price: 12_000, amount: 1 });
    }).toThrow();
    expect(() => {
      db.createTool({ name: "Wrench", price: -1, amount: 1 });
    }).toThrow();
    expect(() => {
      db.createTool({ name: "Pliers", price: 1000, amount: -5 });
    }).toThrow();
  });
});
