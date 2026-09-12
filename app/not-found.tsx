"use client";

import { useRouter } from "next/navigation";

import {
  StatusActionButton,
  StatusActionLink,
  StatusPage,
} from "../components/StatusPage";

export default function NotFound() {
  const router = useRouter();
  const handlePreviousPage = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <StatusPage
      actions={
        <>
          <StatusActionLink href="/" variant="primary">
            Back to Home
          </StatusActionLink>
          <StatusActionButton onClick={handlePreviousPage} variant="secondary">
            Previous Page
          </StatusActionButton>
        </>
      }
      description="The route may have moved or no longer exists."
      fullScreen
      title="Page Not Found"
    />
  );
}
