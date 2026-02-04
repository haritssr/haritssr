import { Users } from "../../../data/searchWithApi";

// biome-ignore lint/suspicious/useAwait: Response.json() returns a Promise
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const data = Users.filter((item) =>
    ["firstName", "lastName", "maidenName"].some((key) =>
      item[key as keyof typeof item]?.toString().toLowerCase().includes(q)
    )
  );

  return Response.json(data.slice(0, 10));
}
