"use client";

import "./globals.css";
import GlobalErrorContent from "@/components/GlobalErrorContent";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Something went wrong · Harits Syah</title>
        <meta content="noindex" name="robots" />
      </head>
      <body>
        <GlobalErrorContent error={error} retry={retry} />
      </body>
    </html>
  );
}
