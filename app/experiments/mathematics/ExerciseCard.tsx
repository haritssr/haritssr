import type { ReactNode } from "react";

export default function ExerciseCard({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="border-border text-foreground flex min-w-0 flex-col gap-4 rounded-xl border p-4">
      <h3 className="font-normal">{title}</h3>
      {children}
    </li>
  );
}
