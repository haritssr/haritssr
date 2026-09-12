import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

const repositoryIgnorePatterns = [
  "**/*.md",
  "**/*.mdx",
  "**/.agents/**",
  "**/.swc/**",
  "**/.vscode/**",
];

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    ...repositoryIgnorePatterns,
  ],
});
