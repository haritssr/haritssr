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
            Back to home
          </StatusActionLink>
          <StatusActionButton onClick={handlePreviousPage} variant="secondary">
            Go back
          </StatusActionButton>
        </>
      }
      description="We couldn’t find this page. Check the address, go back, or head home to keep exploring."
      title="Page not found"
    />
  );
}
