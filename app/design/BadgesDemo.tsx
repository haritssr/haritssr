const BADGES = [
  { className: "border-zinc-300 text-zinc-600", name: "General" },
  { className: "border-green-300 text-green-600", name: "Success" },
  { className: "border-red-300 text-red-600", name: "Danger" },
  { className: "border-yellow-300 text-yellow-600", name: "Attention" },
  { className: "border-purple-300 text-purple-600", name: "Information" },
] as const;

export default function BadgesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {BADGES.map((badge) => (
        <Badge className={badge.className} key={badge.name}>
          {badge.name}
        </Badge>
      ))}
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return (
    <span
      className={`w-fit rounded-full border px-2.5 py-0.5 text-center text-sm font-medium select-none ${className}`}
    >
      {children}
    </span>
  );
}
