const BADGES = [
  {
    className: "border-border bg-foreground/5",
    dotClassName: "bg-muted",
    name: "General",
  },
  {
    className: "border-success/30 bg-success/10",
    dotClassName: "bg-success",
    name: "Success",
  },
  {
    className: "border-danger/30 bg-danger/10",
    dotClassName: "bg-danger",
    name: "Danger",
  },
  {
    className: "border-progress/30 bg-progress/10",
    dotClassName: "bg-progress",
    name: "Progress",
  },
  {
    className: "border-accent/30 bg-accent/10",
    dotClassName: "bg-accent",
    name: "Information",
  },
] as const;

export default function Badges() {
  return (
    <div className="flex flex-wrap gap-2">
      {BADGES.map((badge) => (
        <Badge
          className={badge.className}
          dotClassName={badge.dotClassName}
          key={badge.name}
        >
          {badge.name}
        </Badge>
      ))}
    </div>
  );
}

function Badge({
  children,
  className,
  dotClassName,
}: {
  children: string;
  className: string;
  dotClassName: string;
}) {
  return (
    <span
      className={`text-foreground/70 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${dotClassName}`}
      />
      {children}
    </span>
  );
}
