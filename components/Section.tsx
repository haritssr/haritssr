export default function Section({ id, name }: { id?: string; name: string }) {
  return (
    <h2 className="text-foreground mb-4 text-xl font-semibold" id={id}>
      {name}
    </h2>
  );
}
