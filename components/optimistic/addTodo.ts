"use server";

type Todo = {
	todo: string;
};
export async function addTodo(newTodo: string): Promise<Todo> {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return { todo: `${newTodo} test` };
}
