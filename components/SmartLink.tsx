export function SmartLink({ value }) {
  if (value.startsWith("https://www.")) {
    return (
      <a
        className="hover:text-zinc-800 hover:underline"
        href={value}
        rel="noreferrer noopener"
        target="_blank"
        title={value}
      >
        {value.slice(12)}
      </a>
    );
  }

  if (value.startsWith("https://")) {
    return (
      <a
        className="hover:text-zinc-800 hover:underline"
        href={value}
        rel="noreferrer noopener"
        target="_blank"
        title={value}
      >
        {value.slice(8)}
      </a>
    );
  }

  if (value.includes("@")) {
    return (
      <a
        className="hover:text-zinc-800 hover:underline"
        href={`mailto:${value}`}
      >
        {value}
      </a>
    );
  }

  return <span>{value}</span>;
}
