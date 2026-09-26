export default function Section({
  className = "text-foreground mb-4 text-xl font-semibold",
  id,
  name,
}: {
  className?: string;
  id?: string;
  name: string;
}) {
  return (
    <h2 className={className} id={id}>
      {name}
    </h2>
  );
}
