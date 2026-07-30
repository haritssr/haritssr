import { Effect } from "effect";
import { headers } from "next/headers";
import Section from "@/components/Section";

interface Person {
  id: string;
  name: string;
  age: string;
  city: string;
}

const getBaseUrl = async () => {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    throw new Error("Missing host header");
  }

  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
};

// Fetch people object using Effect
const getPeople = Effect.tryPromise({
  try: async () => {
    const response = await fetch(`${await getBaseUrl()}/api/hello`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as Person[];
  },
  catch: (cause) => new Error("Failed to load /api/hello", { cause }),
});

// Fetch catch-all route using Effect
const getRouteParams = Effect.tryPromise({
  try: async () => {
    const response = await fetch(`${await getBaseUrl()}/api/one/two/three`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as string[];
  },
  catch: (cause) => new Error("Failed to load /api/one/two/three", { cause }),
});

export default async function InputListPage() {
  // Regular fetch
  // const response = await fetch(`${await getBaseUrl()}/api/hello`);
  // const data: Person[] = await response.json();

  const [people, routeParams] = await Promise.all([
    Effect.runPromise(getPeople),
    Effect.runPromise(getRouteParams),
  ]);

  return (
    <div>
      <Section name="People" />
      <ul className="mb-10 space-y-3">
        {people.map((p) => (
          <li className="w-fit border p-2" key={p.id}>
            <div>Name: {p.name}</div>
            <div>Age: {p.age}</div>
            <div>City: {p.city}</div>
          </li>
        ))}
      </ul>
      <Section name="Catch-all Route" />
      <div>{routeParams.join(" ")}</div>
    </div>
  );
}
