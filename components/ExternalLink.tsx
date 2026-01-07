export default function ExternalLink({
  name,
  href,
  big,
}: {
  name: string;
  href: string;
  big?: boolean;
}) {
  return (
    <cite className="group not-italic">
      {" "}
      <a
        className="group inline-block w-fit cursor-pointer items-center text-action group-hover:text-action/80 sm:hover:underline"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        title={href}
      >
        <span className="flex items-center">
          <span className={`${big ? "text-lg" : "text-base"} `}>{name}</span>
          <svg
            className={` ${big ? "h-[18px] w-[18px]" : "h-4 w-4"} mt-0.5 ml-1 text-action group-hover:text-action/80`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>External Link Icon</title>
            <path
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>{" "}
    </cite>
  );
}
