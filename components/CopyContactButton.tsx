"use client";

import DocumentDuplicateIcon from "@heroicons/react/24/outline/esm/DocumentDuplicateIcon";

interface CopyContactButtonProps {
  label: string;
  value: string;
}

export default function CopyContactButton({
  label,
  value,
}: CopyContactButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error: unknown) {
      console.error(`Unable to copy ${label}.`, error);
    }
  };

  return (
    <button
      aria-label={`Copy ${label} to clipboard`}
      className="text-muted focus-visible:outline-action hover:text-foreground text-foreground/70 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={() => {
        void handleCopy();
      }}
      title="copy"
      type="button"
    >
      <DocumentDuplicateIcon aria-hidden="true" className="size-4" />
    </button>
  );
}
