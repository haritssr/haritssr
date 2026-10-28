export default function ExternalLink({
  name,
  href,
  big,
  size,
  showArrow = true,
  variant = "default",
}: {
  name: string;
  href: string;
  big?: boolean;
  size?: "base" | "inherit" | "lg";
  showArrow?: boolean;
  variant?: "default" | "muted";
}) {
  const resolvedSize = size ?? (big === true ? "lg" : "base");
  const textClass = {
    base: "text-base",
    inherit: "text-[length:inherit]",
    lg: "text-lg",
  }[resolvedSize];
  return (
    <a
      aria-label={name}
      className={`group inline-block cursor-pointer transition-transform hover:underline focus-visible:underline active:scale-[0.98] motion-reduce:transition-none ${variant === "muted" ? "text-muted hover:text-foreground underline" : "text-action hover:text-action-hover"}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={href}
    >
      <span>
        <span className={textClass}>{name}</span>
        {showArrow ? (
          <svg
            aria-hidden="true"
            className="-mt-0.5 ml-0.5 inline size-4 align-middle"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18 18 6M7 6h11v11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </a>
  );
}
