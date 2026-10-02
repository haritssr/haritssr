"use client";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";

export default function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    },
    []
  );
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        if (timer.current !== null) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          setLoading(false);
        }, 800);
      }}
    >
      Button
    </Button>
  );
}
