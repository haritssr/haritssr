"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { useState } from "react";

import { prepareTaskSound } from "@/app/(tools)/timer/utils/timerSound";
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
            prepareTaskSound();
            add({
              id: "design-toast",
              type: "timer-completion",
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
          Error
        </Button>
      </div>
      {showError ? (
        <FloatingRetryNotification
          message="Timer took too long. Try again."
          onRetry={() => {
            setShowError(false);
          }}
        />
      ) : null}
    </Box>
  );
}
