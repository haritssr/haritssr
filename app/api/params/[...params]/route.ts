// Named experiment for inspecting catch-all route parameters.
// /api/params/one/two returns ["one", "two"].
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const { params: routeParams } = await params;

  return Response.json(routeParams);
}
