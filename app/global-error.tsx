"use client";

import "./globals.css";
import {
  StatusActionButton,
  StatusActionLink,
  StatusPage,
} from "../components/StatusPage";

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
        <StatusPage
          actions={
            <>
              <StatusActionButton onClick={retry}>Try again</StatusActionButton>
              <StatusActionLink href="/" variant="secondary">
                Back to home
              </StatusActionLink>
            </>
          }
          description={
            <>
              We couldn’t load this page. Try again, or head home to keep
              exploring.
              {error.digest !== undefined && error.digest.length > 0 ? (
                <span className="text-muted mt-4 block text-sm wrap-anywhere">
                  Error ID: {error.digest}
                </span>
              ) : null}
            </>
          }
          fullScreen
          title="Something went wrong"
          tone="error"
        />
      </body>
    </html>
  );
}
