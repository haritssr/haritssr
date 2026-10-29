import type { ToggleListNode } from "@/components/ToggleList";

interface FileNode {
  id: string;
  label: string;
  children: FileNode[];
}

interface PatternRow {
  pattern: string;
  meaning: string;
  count: number;
}

const pageExtensions = /\.(?:tsx?|jsx?|mdx)$/u;
const conventionNames = new Map([
  ["page", "Page entry points"],
  ["layout", "Shared layouts"],
  ["route", "API and other request handlers"],
  ["loading", "Loading boundaries"],
  ["error", "Error boundaries"],
  ["global-error", "Global error boundaries"],
  ["not-found", "Not-found boundaries"],
  ["template", "Remounting route templates"],
  ["default", "Parallel route fallbacks"],
]);

function extension(file: string): string {
  const name = file.slice(file.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot).toLowerCase() : "No extension";
}

export function buildProjectStructure(files: readonly string[]): {
  nodes: ToggleListNode[];
  analytics: { title: string; rows: PatternRow[] }[];
} {
  const root: FileNode = { id: "project:.", label: "haritssr/", children: [] };
  const nodes = new Map<string, FileNode>();
  const folders = new Set<string>();
  const types = new Map<string, number>();
  const conventions = new Map<string, number>();
  for (const file of files) {
    const segments = file.split("/");
    let parent = root;
    for (let index = 0; index < segments.length; index += 1) {
      const key = segments.slice(0, index + 1).join("/");
      let node = nodes.get(key);
      if (!node) {
        const folder = index < segments.length - 1;
        node = {
          id: `project:${key}`,
          label: `${segments[index]}${folder ? "/" : ""}`,
          children: [],
        };
        nodes.set(key, node);
        parent.children.push(node);
        if (folder) {
          folders.add(key);
        }
      }
      parent = node;
    }
    const type = extension(file);
    types.set(type, (types.get(type) ?? 0) + 1);
    if (file.startsWith("app/")) {
      const name = (segments.at(-1) ?? "").replace(pageExtensions, "");
      if (conventionNames.has(name) && pageExtensions.test(file)) {
        conventions.set(name, (conventions.get(name) ?? 0) + 1);
      }
    }
  }
  function sort(node: FileNode) {
    node.children = node.children.toSorted(
      (left, right) =>
        Number(right.children.length > 0) - Number(left.children.length > 0) ||
        left.label.localeCompare(right.label, "en") ||
        (left.id < right.id ? -1 : Number(left.id > right.id))
    );
    for (const child of node.children) {
      sort(child);
    }
  }
  sort(root);
  const folderPatterns: [string, string, (name: string) => boolean][] = [
    ["(name)/", "App route groups", (name) => /^\([^.)][^)]*\)$/u.test(name)],
    [
      "[name]/",
      "Dynamic app segments",
      (name) => /^\[(?![.[])[^\]]+\]$/u.test(name),
    ],
    [
      "[...name]/",
      "Catch-all app segments",
      (name) => /^\[\.\.\.[^\]]+\]$/u.test(name),
    ],
    [
      "[[...name]]/",
      "Optional catch-all app segments",
      (name) => /^\[\[\.\.\.[^\]]+\]\]$/u.test(name),
    ],
    ["_name/", "Private app folders", (name) => name.startsWith("_")],
    ["@name/", "Parallel app slots", (name) => name.startsWith("@")],
  ];
  const appFolders = [...folders].filter((folder) => folder.startsWith("app/"));
  return {
    nodes: [root],
    analytics: [
      {
        title: "Overview",
        rows: [
          {
            pattern: "All files",
            meaning: "Included project files",
            count: files.length,
          },
          {
            pattern: "All folders",
            meaning: "Folders containing included files; root excluded",
            count: folders.size,
          },
          {
            pattern: "Deepest folder level",
            meaning: "Folder depth below haritssr/ (root = 0)",
            count: Math.max(
              0,
              ...[...folders].map((folder) => folder.split("/").length)
            ),
          },
        ],
      },
      {
        title: "File types",
        rows: [...types]
          .toSorted(([left], [right]) => left.localeCompare(right, "en"))
          .map(([type, count]) => ({
            pattern: type === "No extension" ? type : `*${type}`,
            meaning:
              type === "No extension"
                ? "Extensionless files, including dotfiles without a suffix"
                : `${type.slice(1).toUpperCase()} files`,
            count,
          })),
      },
      {
        title: "App conventions",
        rows: [
          ...[...conventionNames].map(([name, meaning]) => ({
            pattern: `${name}.*`,
            meaning,
            count: conventions.get(name) ?? 0,
          })),
          ...folderPatterns.map(([pattern, meaning, matches]) => ({
            pattern,
            meaning,
            count: appFolders.filter((folder) =>
              matches(folder.slice(folder.lastIndexOf("/") + 1))
            ).length,
          })),
        ].filter((row) => row.count > 0),
      },
    ],
  };
}
