// biome-ignore lint/suspicious/useAwait: Response.json() returns a Promise
export async function GET() {
  return Response.json([
    { id: "1", name: "Harits Syah", age: "22", city: "Boston, New York" },
  ]);
}
