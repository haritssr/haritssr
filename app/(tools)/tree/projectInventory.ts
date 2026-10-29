import { spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  watch,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const outputDirectory = "app/(tools)/tree/_generated";
const outputFile = `${outputDirectory}/projectFiles.json`;

function git(root: string, args: string[], input?: string): string[] {
  // Deployment source archives may omit .git. A temporary empty index lets Git
  // apply the same nested ignore rules without changing the source directory.
  const temporary = existsSync(path.join(root, ".git"))
    ? undefined
    : mkdtempSync(path.join(tmpdir(), "haritssr-inventory-"));
  try {
    if (temporary !== undefined) {
      const initialized = spawnSync(
        "git",
        ["init", "--bare", "--quiet", temporary],
        { encoding: "utf-8" }
      );
      if (initialized.error || initialized.status !== 0) {
        throw new Error(
          `Project inventory requires Git: ${initialized.error?.message ?? initialized.stderr.trim()}`
        );
      }
    }
    const repository =
      temporary === undefined
        ? []
        : ["--git-dir", temporary, "--work-tree", root];
    const result = spawnSync("git", [...repository, ...args], {
      cwd: root,
      encoding: "utf-8",
      input,
      maxBuffer: 16 * 1024 * 1024,
    });
    if (
      result.error ||
      (result.status !== 0 &&
        !(args[0] === "check-ignore" && result.status === 1))
    ) {
      throw new Error(
        `Project inventory: ${result.error?.message ?? result.stderr.trim()}`
      );
    }
    return result.stdout.split("\0").filter(Boolean);
  } finally {
    if (temporary !== undefined) {
      rmSync(temporary, { recursive: true, force: true });
    }
  }
}

function ignoredPaths(root: string, paths: string[]): Set<string> {
  return new Set(
    paths.length === 0
      ? []
      : git(
          root,
          ["check-ignore", "--no-index", "--stdin", "-z"],
          `${paths.join("\0")}\0`
        )
  );
}

function collectProjectFiles(root: string): string[] {
  const listed = [
    ...new Set(
      git(root, [
        "ls-files",
        "--cached",
        "--others",
        "--exclude-standard",
        "-z",
      ])
    ),
  ];
  const ignored = ignoredPaths(root, listed);
  return listed
    .filter((file) => {
      if (
        ignored.has(file) ||
        file.startsWith(`${outputDirectory}/`) ||
        file.split("/").includes(".git")
      ) {
        return false;
      }
      try {
        return !lstatSync(path.join(root, file)).isDirectory();
      } catch (error) {
        if (
          error instanceof Error &&
          "code" in error &&
          error.code === "ENOENT"
        ) {
          return false;
        }
        throw error;
      }
    })
    .toSorted();
}

export function generateProjectInventory(root: string): boolean {
  const source = `${JSON.stringify({ files: collectProjectFiles(root) }, null, 2)}\n`;
  const target = path.join(root, outputFile);
  try {
    if (readFileSync(target, "utf-8") === source) {
      return false;
    }
  } catch (error) {
    if (
      !(error instanceof Error && "code" in error && error.code === "ENOENT")
    ) {
      throw error;
    }
  }
  mkdirSync(path.dirname(target), { recursive: true });
  const temporary = `${target}.${process.pid}.tmp`;
  writeFileSync(temporary, source);
  renameSync(temporary, target);
  return true;
}

export function watchProjectInventory(root: string) {
  const failure = Promise.withResolvers<never>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let excluded: string[] = [];
  const pending = new Set<string>();
  const refreshExclusions = () => {
    excluded = git(root, [
      "ls-files",
      "--others",
      "--ignored",
      "--exclude-standard",
      "--directory",
      "-z",
    ]);
  };
  const close = () => {
    clearTimeout(timer);
    watcher.close();
  };
  const fail = (error: unknown) => {
    close();
    failure.reject(error instanceof Error ? error : new Error(String(error)));
  };
  const watcher = watch(root, { recursive: true }, (_event, filename) => {
    const file = filename?.toString().replaceAll(path.sep, "/") ?? "";
    const ignoreChanged =
      path.posix.basename(file) === ".gitignore" ||
      file === ".git/info/exclude";
    if (
      file.startsWith(`${outputDirectory}/`) ||
      file === outputDirectory ||
      (file.startsWith(".git/") && !ignoreChanged)
    ) {
      return;
    }
    if (
      !ignoreChanged &&
      excluded.some((entry) =>
        entry.endsWith("/") ? file.startsWith(entry) : file === entry
      )
    ) {
      return;
    }
    pending.add(file);
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        const events = [...pending];
        pending.clear();
        const changedRules = events.some(
          (entry) =>
            path.posix.basename(entry) === ".gitignore" ||
            entry === ".git/info/exclude"
        );
        const ignored = ignoredPaths(root, events.filter(Boolean));
        if (changedRules || events.some((entry) => !ignored.has(entry))) {
          generateProjectInventory(root);
          refreshExclusions();
        }
      } catch (error) {
        fail(error);
      }
    }, 150);
  });
  watcher.on("error", fail);
  try {
    generateProjectInventory(root);
    refreshExclusions();
  } catch (error) {
    close();
    throw error;
  }
  return { close, failure: failure.promise };
}
