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
  return (
    <a
      aria-label={name}
      className="group text-action hover:text-action-hover cursor-pointer hover:underline"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={href}
    >
      <span>
        <span className={textClass}>{name}</span>
        <svg
          aria-hidden="true"
          className="text-action group-hover:text-action-hover ml-0.5 inline h-4.5 w-4.5 align-middle"
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
      </span>
    </a>
  );
}
