import { useState } from "react";

export default function Comments() {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");

	//not only fetching data, but we can also calling this again as a way to refreshing data
	async function fetchComments() {
		const res = await fetch("/api/comments");
		const data = await res.json();
		setComments(data);
	}

	async function submitComment() {
		const res = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({ comment }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		console.log(data);
	}

	async function deleteComment(commentId) {
		const res = await fetch(`/api/comments/${commentId}`, {
			method: "DELETE",
		});
		const data = await res.json();
		console.log(data);
		fetchComments();
	}

	return (
		<div className="space-x-5">
			<input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
			<button className="bg-blue-600 px-3 py-2 text-white hover:bg-[#2563eb]/90" onClick={submitComment}>
				Submit comment
			</button>
			<button onClick={fetchComments} className="bg-blue-600 px-3 py-2 text-white hover:bg-[#2563eb]/90">
				load comments
			</button>
			{comments.map((comment) => (
				<div key={comment.id}>
					<div>{comment.comment}</div>
					<button onClick={() => deleteComment(comment.id)}>Delete</button>
				</div>
			))}
		</div>
	);
}
