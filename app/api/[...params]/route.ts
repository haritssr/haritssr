// Catch-all route for /api/*
// /api/one returns ["one"]
// /api/one/two returns ["one", "two"]

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const { params: routeParams } = await params;
  return Response.json(routeParams);
}
