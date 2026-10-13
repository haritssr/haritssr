"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";

import { SITE_DARK_THEME_COLOR, SITE_THEME_COLOR } from "@/utils/site";
import { THEME_PREFERENCE_STORAGE_KEY } from "@/utils/theme";

const themeBootstrapScript = `(() => {
  let preference = null;

  try {
    preference = localStorage.getItem("${THEME_PREFERENCE_STORAGE_KEY}");
  } catch {}

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme =
    preference === "dark" || (preference !== "light" && prefersDark)
      ? "dark"
      : "light";

  document.documentElement.dataset.theme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content =
      theme === "dark" ? "${SITE_DARK_THEME_COLOR}" : "${SITE_THEME_COLOR}";
  }
})();`;

export default function ThemeBootstrap() {
  const inserted = useRef(false);

  // Insert executable HTML only in the server stream, before the page paints.
  // Client navigation and Fast Refresh never mount an inert script element.
  useServerInsertedHTML(() => {
    if (inserted.current) {
      return null;
    }
    inserted.current = true;

    return (
      <script
        id="theme-bootstrap"
        // oxlint-disable-next-line react/no-danger -- This static bootstrap is emitted only by Next.js's server HTML insertion hook.
        dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
      />
    );
  });

  return null;
}
