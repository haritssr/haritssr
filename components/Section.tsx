export default function Section({
  as: Heading = "h2",
  className,
  id,
  name,
}: {
  as?: "h2" | "h3";
  className?: string;
  id?: string;
  name: string;
}) {
  const headingSize = Heading === "h2" ? "text-2xl" : "text-xl";

  return (
    <Heading
      className={
        className ?? `text-foreground mb-4 ${headingSize} font-semibold`
      }
      id={id}
    >
      {name}
    </Heading>
  );
}
