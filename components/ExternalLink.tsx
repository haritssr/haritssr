export default function ExternalLink({
  name,
  href,
  big,
  size,
}: {
  name: string;
  href: string;
  big?: boolean;
  size?: "base" | "inherit" | "lg";
}) {
  const resolvedSize = size ?? (big === true ? "lg" : "base");
  const textClass = {
    base: "text-base",
    inherit: "text-[length:inherit]",
    lg: "text-lg",
  }[resolvedSize];
  const iconClass = {
    base: "h-4 w-4",
    inherit: "size-[1em]",
    lg: "h-4.5 w-4.5",
  }[resolvedSize];

  return (
    <a
      aria-label={name}
      className="group text-action hover:text-action-hover cursor-pointer"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={href}
    >
      <span>
        <span className={textClass}>{name}</span>
        <svg
          aria-hidden="true"
          className={`${iconClass} text-action group-hover:text-action-hover ml-1 inline align-middle`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
