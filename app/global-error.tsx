"use client";

import {
  StatusActionButton,
  StatusActionLink,
  StatusPage,
} from "../components/StatusPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <StatusPage
          actions={
            <>
              <StatusActionButton onClick={reset}>Try again</StatusActionButton>
              <StatusActionLink href="/" variant="secondary">
                Back to Home
              </StatusActionLink>
            </>
          }
          description={
            error.digest !== undefined && error.digest.length > 0
              ? `Error ID: ${error.digest}`
              : "An unexpected error occurred while rendering this page."
          }
          fullScreen
          title="Something went wrong"
          tone="error"
        />
      </body>
    </html>
  );
}
