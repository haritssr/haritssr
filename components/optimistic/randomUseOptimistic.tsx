"use client";

import { useOptimistic, useState, useRef } from "react";
import { addTodo } from "./addTodo";

type Todo = {
	todo: string;
};

export default function Todos() {
	const [todos, setTodos] = useState<Todo[]>();
	const formRef = useRef<HTMLFormElement>(null);

	const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(
		todos,
		(state: string[], newTodo: string) => [...state, { todo: newTodo }],
	);

	const formAction = async (formData: FormData) => {
		const todo = formData.get("todo") as string;
		addOptimisticTodo(todo);
		formRef.current?.reset();

		try {
			const result = await addTodo(todo);
			setTodos((prevTodos) => [
				...(prevTodos as Todo[]),
				{ todo: result.todo },
			]);
		} catch (error) {
			console.error(`Error adding todo: ${error}`);
		}
	};

	return (
		<div>
			{optimisticTodos.map((m) => (
				<div key={m.todo}>{m.todo}</div>
			))}
			<form action={formAction} ref={formRef}>
				<input type="text" name="todo" />
				<button type="submit">Send</button>
			</form>
		</div>
	);
}

import { use } from "react";

async function fetchUser(something: string) {
	await fetch(`localhost:3000/${something}`);
}

export function Profile({ userId }) {
	const user = use(fetchUser(userId));
	return <h1>{user.name}</h1>;
}
