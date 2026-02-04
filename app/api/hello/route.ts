// biome-ignore lint/suspicious/useAwait: Response.json() returns a Promise
export async function GET() {
  return Response.json([
    {
      id: "1",
      name: "Harits Syah",
      age: "22",
      city: "San Francisco, California",
    },
    {
      id: "2",
      name: "Guillermo Rauch",
      age: "32",
      city: "San Francisco, California",
    },
    { id: "3", name: "Lee Robinson", age: "28", city: "Austin, Texas" },
  ]);
}
