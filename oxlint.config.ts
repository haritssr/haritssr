import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";
import shadcn from "ultracite/oxlint/shadcn";

const repositoryIgnorePatterns = [
  "**/.agents/**",
  "**/.swc/**",
  "**/.vscode/**",
];

export default defineConfig({
  extends: [core, next, react, shadcn],
  ignorePatterns: [...(core.ignorePatterns ?? []), ...repositoryIgnorePatterns],
  jsPlugins: shadcn.jsPlugins,
  overrides: [
    {
      files: ["app/api/og/OpenGraphCard.tsx"],
      rules: {
        // ImageResponse renders inline styles and SVG colors without browser CSS.
        "shadcn/no-inline-styles": "off",
        "shadcn/no-raw-colors": "off",
      },
    },
    {
      files: ["components/**"],
      rules: {
        // Component definitions own their appearance and class composition.
        "shadcn/no-arbitrary-values": "off",
        "shadcn/no-restyle": "off",
        "shadcn/require-static-classes": "off",
      },
    },
    {
      files: ["app/experiments/**"],
      rules: {
        // Experiments intentionally demonstrate alternative UI approaches.
        "shadcn/no-arbitrary-values": "off",
        "shadcn/no-inline-styles": "off",
        "shadcn/no-raw-colors": "off",
        "shadcn/no-restyle": "off",
        "shadcn/no-unknown-classes": "off",
        "shadcn/require-static-classes": "off",
      },
    },
    {
      files: ["app/design/ColorsDemo.tsx"],
      rules: {
        // This page intentionally documents the raw Tailwind color palette.
        "shadcn/no-raw-colors": "off",
      },
    },
    {
      files: ["**/*.js"],
      rules: {
        "eslint/require-await": "off",
        "eslint/require-unicode-regexp": "off",
        "promise/no-nesting": "off",
        "promise/prefer-await-to-callbacks": "off",
        "promise/prefer-await-to-then": "off",
        "typescript/no-floating-promises": "off",
        "typescript/no-unsafe-argument": "off",
        "typescript/no-unsafe-assignment": "off",
        "typescript/no-unsafe-call": "off",
        "typescript/no-unsafe-member-access": "off",
        "typescript/no-unsafe-return": "off",
        "typescript/prefer-nullish-coalescing": "off",
        "typescript/promise-function-async": "off",
        "typescript/strict-boolean-expressions": "off",
      },
    },
    {
      files: [
        "app/experiments/{browser,nextjs,react,tailwind-css,ui-explorations}/**/demo.{ts,tsx,js,jsx}",
      ],
      rules: {
        // Several examples intentionally demonstrate APIs from older package
        // versions and should not fail the application-wide deprecated API gate.
        "eslint/func-name-matching": "off",
        "eslint/no-empty-function": "off",
        "eslint/no-shadow": "off",
        "eslint/require-await": "off",
        "import/no-named-as-default": "off",
        "promise/avoid-new": "off",
        "react/capitalized-calls": "off",
        "react/display-name": "off",
        "react/exhaustive-effect-dependencies": "off",
        "react/immutability": "off",
        "react/incompatible-library": "off",
        "react/memo-dependencies": "off",
        "react/no-unstable-nested-components": "off",
        "react/purity": "off",
        "react/refs": "off",
        "react/set-state-in-effect": "off",
        "react/todo": "off",
        "react-hooks/exhaustive-deps": "off",
        "typescript/consistent-return": "off",
        "typescript/no-confusing-void-expression": "off",
        "typescript/no-floating-promises": "off",
        "typescript/no-misused-promises": "off",
        "typescript/no-unsafe-argument": "off",
        "typescript/no-unsafe-assignment": "off",
        "typescript/no-unsafe-call": "off",
        "typescript/no-unsafe-member-access": "off",
        "typescript/no-unsafe-return": "off",
        "typescript/no-unsafe-type-assertion": "off",
        "typescript/no-unnecessary-type-conversion": "off",
        "typescript/non-nullable-type-assertion-style": "off",
        "typescript/prefer-nullish-coalescing": "off",
        "typescript/restrict-template-expressions": "off",
        "typescript/strict-boolean-expressions": "off",
        "typescript/strict-void-return": "off",
        "typescript/no-deprecated": "off",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/no-await-expression-member": "off",
        "unicorn/prefer-export-from": "off",
        "unicorn/prefer-number-coercion": "off",
        "unicorn/prefer-ternary": "off",
      },
    },
    {
      files: ["components/Button.tsx"],
      rules: {
        // The wrapper supplies a safe default for the caller-controlled type.
        "react/button-has-type": "off",
      },
    },
    {
      files: ["app/experiments/nextjs/router/demo.tsx"],
      rules: {
        // This example intentionally contrasts a native anchor with Next Link.
        "nextjs/no-html-link-for-pages": "off",
      },
    },
    {
      files: ["app/experiments/ui-explorations/task/architecture/page.tsx"],
      rules: {
        // React Compiler does not support import expressions yet. Keeping
        // Mermaid dynamic avoids shipping it in the initial client bundle.
        "react/todo": "off",
      },
    },
  ],
  options: {
    reportUnusedDisableDirectives: "error",
    typeAware: true,
  },
  settings: {
    shadcn: {
      ui: "@/components",
    },
  },
  rules: {
    "eslint/func-style": "off",
    "eslint/no-use-before-define": "off",
    "eslint/require-unicode-regexp": "off",
    "promise/prefer-await-to-then": "off",
    "react/function-component-definition": "off",
    "sort-keys": "off",
    "sort-vars": "off",
    "unicorn/prefer-module": "off",
    "unicorn/filename-case": "off",
  },
});
