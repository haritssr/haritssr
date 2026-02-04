"use client";

import {
  type ReactElement,
  type ReactNode,
  type ReactPortal,
  useState,
} from "react";
import type { JSX } from "react/jsx-runtime";
import SubTitle from "@/components/SubTitle";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

interface AddTodoProps {
  onAddTodo: (title: string) => void;
}

interface TaskListProps {
  todos: Todo[];
  onChangeTodo: (nextTodo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
}

interface TaskProps {
  todo: Todo;
  onChange: (nextTodo: Todo) => void;
  onDelete: (todoId: number) => void;
}

let nextId = 3;
const initialTodos = [
  { id: 0, title: "Buy milk", done: true },
  { id: 1, title: "Eat tacos", done: false },
  { id: 2, title: "Brew tea", done: false },
];

function AddTodo({ onAddTodo }: AddTodoProps) {
  const [title, setTitle] = useState("");
  return (
    <div className="mb-5 space-y-2 sm:space-x-2 sm:space-y-0">
      <input
        className="w-full rounded border border-zinc-700 px-2 py-0.5 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-300 sm:w-fit"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write todo"
        value={title}
      />
      <button
        className="w-full rounded border border-blue-500 bg-blue-500 px-2 py-0.5 text-white hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-300 sm:w-fit"
        onClick={() => {
          setTitle("");
          onAddTodo(title);
          //handleChangeTodo(nextTodo)
        }}
        type="button"
      >
        Add
      </button>
    </div>
  );
}

function TaskList({ todos, onChangeTodo, onDeleteTodo }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task onChange={onChangeTodo} onDelete={onDeleteTodo} todo={todo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  let todoContent:
    | string
    | number
    | bigint
    | boolean
    | JSX.Element
    | Iterable<ReactNode>
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
  if (isEditing) {
    todoContent = (
      <>
        <input
          className="rounded border border-zinc-700 px-1 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-300"
          onChange={(e) => {
            onChange({ ...todo, title: e.target.value });
          }}
          value={todo.title}
        />
        <button
          className="ml-2 rounded border border-green-500 bg-green-500 px-2 text-sm text-white hover:bg-green-600 focus:outline-hidden focus:ring-2 focus:ring-green-300"
          onClick={() => setIsEditing(false)}
          type="button"
        >
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button
          className="ml-2 rounded border border-yellow-500 bg-yellow-500 px-2 text-sm text-white hover:bg-yellow-600 focus:outline-hidden focus:ring-2 focus:ring-yellow-300"
          onClick={() => setIsEditing(true)}
          type="button"
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        checked={todo.done}
        className="mr-2"
        onChange={(e) => {
          onChange({ ...todo, done: e.target.checked });
        }}
        type="checkbox"
      />
      {todoContent}
      <button
        className="ml-2 rounded border border-rose-500 bg-rose-500 px-2 text-sm text-white hover:bg-rose-600 focus:outline-hidden focus:ring-2 focus:ring-rose-300"
        onClick={() => onDelete(todo.id)}
        type="button"
      >
        Delete
      </button>
    </label>
  );
}

export default function ReactUseStateTodoListDemo() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  function handleAddTodo(title: string) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title,
        done: false,
      },
    ]);
  }
  function handleChangeTodo(nextTodo: Todo) {
    setTodos(
      todos.map((t) => {
        if (t.id === nextTodo.id) {
          return nextTodo;
        }
        return t;
      })
    );
  }
  function handleDeleteTodo(todoId: number) {
    setTodos(todos.filter((t) => t.id !== todoId));
  }

  return (
    <>
      <SubTitle>Todo list with useState</SubTitle>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
      <button onClick={() => console.log(todos)} type="button">
        Console Todos
      </button>
    </>
  );
}
