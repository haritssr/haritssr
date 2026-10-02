import { z } from "zod";

const peopleSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    age: z.number().int().nonnegative(),
    city: z.string(),
  })
);

export type Person = z.infer<typeof peopleSchema>[number];

export async function fetchPeople(url: string): Promise<Person[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load people (${response.status})`);
  }
  return peopleSchema.parse(await response.json());
}
