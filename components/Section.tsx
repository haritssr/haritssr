export default function Section({
  as: Heading = "h2",
  className,
  id,
  name,
  variant = "default",
}: {
  as?: "h2" | "h3";
  className?: string;
  id?: string;
  name: string;
  variant?: "default" | "compact";
}) {
  const headingSize = Heading === "h2" ? "text-2xl" : "text-xl";
  const appearance =
    variant === "compact"
      ? "text-muted text-sm font-medium"
      : `text-foreground mb-4 ${headingSize} font-semibold`;

  return (
    <Heading className={className ?? appearance} id={id}>
      {name}
    </Heading>
  );
}
