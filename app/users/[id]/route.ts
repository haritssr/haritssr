import { users } from "../route";

export async function GET(
	_request: Request,
	{ params }: { params: { id: string } },
) {
	// id here refers to our folder name [id]
	const { id } = params;
	const user = users.find((user) => user.id === Number.parseInt(id));
	return Response.json(user);
}
