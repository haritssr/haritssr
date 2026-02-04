import InternalLink from "@/components/InternalLink";
import SubTitle from "@/components/SubTitle";

interface Student {
  id: number;
  name: string;
}

export default async function StudentsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  const students: Student[] = await res.json();

  return (
    <>
      <SubTitle>A list of students come from JSONPlaceholder API</SubTitle>
      <div className="flex flex-col space-y-3">
        {students.map((a: Student) => (
          <InternalLink
            href={`/experiments/nextjs/students/${a.id}`}
            key={a.id}
          >
            {a.name}
          </InternalLink>
        ))}
      </div>
    </>
  );
}
