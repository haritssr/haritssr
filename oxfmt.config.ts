import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

const repositoryIgnorePatterns = [
  "**/*.md",
  "**/*.mdx",
  "**/.agents/**",
  "**/.swc/**",
  "**/.contentlayer/**",
  "**/.content-collections/**",
  "**/.vscode/**",
];

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    ...repositoryIgnorePatterns,
  ],
});
