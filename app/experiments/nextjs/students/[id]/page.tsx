import type { Metadata } from "next";

interface Address {
  city: string;
}

interface Person {
  name: string;
  email: string;
  website: string;
  address: Address;
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const person: Person = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { cache: "force-cache" }
  ).then((p) => p.json());

  return {
    title: `Student: ${person.name}`,
    description: `Details for ${person.name}`,
  };
}

export default async function StudentPage({ params }: Props) {
  const { id } = await params;
  const person: Person = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { cache: "force-cache" }
  ).then((p) => p.json());

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-zinc-800">Student Details</h1>
        <div className="mt-5 space-y-2">
          <div className="text-zinc-500">
            <span className="font-semibold text-zinc-800">Name :</span>{" "}
            {person.name}
          </div>
          <div className="text-zinc-500">
            <span className="font-semibold text-zinc-800">Email </span>:{" "}
            {person.email}
          </div>
          <div className="text-zinc-500">
            <span className="font-semibold text-zinc-800">Website</span>:{" "}
            {person.website}
          </div>
          <div className="text-zinc-500">
            <span className="font-semibold text-zinc-800">City :</span>{" "}
            {person.address.city}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (user) => user.json()
  );

  return users.map((user: { id: number }) => ({
    id: user.id.toString(),
  }));
}
