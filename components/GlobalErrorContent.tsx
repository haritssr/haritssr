"use client";

import { StatusActionButton, StatusActionLink, StatusPage } from "./StatusPage";

export default function GlobalErrorContent({
  error,
  retry,
  fullScreen = true,
}: {
  error: Error & { digest?: string };
  retry: () => void;
  fullScreen?: boolean;
}) {
  return (
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
          We couldn’t load this page. Try again, or head home to keep exploring.
          {error.digest !== undefined && error.digest.length > 0 ? (
            <span className="text-muted mt-4 block text-sm wrap-anywhere">
              Error ID: {error.digest}
            </span>
          ) : null}
        </>
      }
      fullScreen={fullScreen}
      title="Something went wrong"
      tone="error"
    />
  );
}
