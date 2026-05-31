import { Effect } from "effect";
import { headers } from "next/headers";

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

// Using Effect
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

export default async function InputListPage() {
  // Regular fetch
  // const response = await fetch(`${await getBaseUrl()}/api/hello`);
  // const data: Person[] = await response.json();

  const data: Person[] = await Effect.runPromise(getPeople);

  return (
    <div>
      <ul className="space-y-3">
        {data.map((d) => (
          <li className="w-fit border p-2" key={d.id}>
            <div>Name: {d.name}</div>
            <div>Age: {d.age}</div>
            <div>City: {d.city}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
