import { watchProjectInventory } from "./projectInventory";

const root = process.cwd();
const inventory = watchProjectInventory(root);

try {
  const child = Bun.spawn(
    [
      "node",
      "node_modules/next/dist/bin/next",
      "dev",
      ...process.argv.slice(2),
    ],
    { cwd: root, stdio: ["inherit", "inherit", "inherit"] }
  );
  const shutdown = (signal: NodeJS.Signals) => {
    inventory.close();
    child.kill(signal);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  try {
    process.exitCode = await Promise.race([child.exited, inventory.failure]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    child.kill("SIGTERM");
    await child.exited;
    process.exitCode = 1;
  } finally {
    process.off("SIGINT", shutdown);
    process.off("SIGTERM", shutdown);
  }
} finally {
  inventory.close();
}
