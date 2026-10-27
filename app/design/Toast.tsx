"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { useState } from "react";

import Box from "@/components/Box";
import Button from "@/components/Button";
import FloatingRetryNotification from "@/components/floating/FloatingRetryNotification";

export default function Toast() {
  const { add } = BaseToast.useToastManager();
  const [showError, setShowError] = useState(false);

  return (
    <Box name="Toast" title="Toast">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => {
            add({
              id: "design-toast",
              description: "Your action was completed.",
              title: "Toast notification",
            });
          }}
        >
          Show
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setShowError(true);
          }}
        >
          Show error
        </Button>
      </div>
      {showError ? (
        <FloatingRetryNotification
          message="Timer is taking too long to load. Try again."
          onRetry={() => {
            setShowError(false);
          }}
        />
      ) : null}
    </Box>
  );
}
