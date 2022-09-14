import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Key, useState } from 'react';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TodoListUseState() {
  const [todos, setTodos] = useState(initialTodos);
  function handleAddTodo(title: string) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false,
      },
    ]);
  }
  function handleChangeTodo(nextTodo) {
    setTodos(
      todos.map(t => {
        if (t.id === nextTodo.id) {
          return nextTodo;
        } else {
          return t;
        }
      })
    );
  }
  function handleDeleteTodo(todoId: number) {
    setTodos(todos.filter(t => t.id !== todoId));
  }

  return (
    <>
      <LayoutToExperiments title='TodoList useState' domain='React'>
        <SubTitle>Todo list with useState</SubTitle>
        <AddTodo onAddTodo={handleAddTodo} />
        <TaskList todos={todos} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />
        <button onClick={() => console.log(todos)}>Console Todos</button>
      </LayoutToExperiments>
    </>
  );
}

function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <div className='mb-5 space-y-2 sm:space-y-0 sm:space-x-2'>
      <input
        placeholder='Write todo'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='w-full rounded border border-zinc-700 px-2 py-0.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-fit'
      />
      <button
        onClick={() => {
          setTitle('');
          onAddTodo(title);
          //handleChangeTodo(nextTodo)
        }}
        className='w-full rounded border border-blue-500 bg-blue-500 px-2 py-0.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-fit'
      >
        Add
      </button>
    </div>
  );
}

function TaskList({ todos, onChangeTodo, onDeleteTodo }) {
  return (
    <ul className='space-y-2'>
      {todos.map((todo: { id: Key }) => (
        <li key={todo.id}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent: {};
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({ ...todo, title: e.target.value });
          }}
          className='rounded border border-zinc-700 px-1 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300'
        />
        <button
          onClick={() => setIsEditing(false)}
          className='ml-2 rounded border border-green-500 bg-green-500 px-2 text-sm text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
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
          onClick={() => setIsEditing(true)}
          className='ml-2 rounded border border-yellow-500 bg-yellow-500 px-2 text-sm text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300'
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        type='checkbox'
        checked={todo.done}
        onChange={e => {
          onChange({ ...todo, done: e.target.checked });
        }}
        className='mr-2'
      />
      {todoContent}
      <button
        onClick={() => onDelete(todo.id)}
        className='ml-2 rounded border border-rose-500 bg-rose-500 px-2 text-sm text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300'
      >
        Delete
      </button>
    </label>
  );
}
