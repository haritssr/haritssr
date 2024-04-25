import { comments } from "../../../data/comments";

export default function handler(req, res) {
	const { commentId } = req.query;
	if (req.method === "GET") {
		//commentId is string
		//comment.id is number
		const comment = comments.find(
			(comment) => comment.id === Number.parseInt(commentId),
		);
		res.status(200).json(comment);
	} else if (req.method === "DELETE") {
		const deletedComment = comments.find(
			(comment) => comment.id === Number.parseInt(commentId),
		);

		const index = comments.findIndex(
			(comment) => comment.id === Number.parseInt(commentId),
		);

		comments.splice(index, 1);

		res.status(200).json(deletedComment);
	}
}
