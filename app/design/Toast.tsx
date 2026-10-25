"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";

import Box from "@/components/Box";
import Button from "@/components/Button";

export default function Toast() {
  const { add } = BaseToast.useToastManager();

  return (
    <Box name="Toast" title="Toast">
      <Button
        onClick={() => {
          add({
            id: "design-toast",
            description: "Your action was completed.",
            title: "Toast notification",
            timeout: 5000,
          });
        }}
      >
        Show
      </Button>
    </Box>
  );
}
