import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

export default function TodoList() {
  const editButtonStyle =
    'rounded-md bg-white px-2 py-1 text-gray-500 hover:text-gray-700 ml-5 shadow font-medium active:ring-1 active:ring-gray-400 active:translate-y-0.5 text-sm  ease-in-out';
  const deleteButtonStyle =
    'rounded-md bg-white px-2 py-1 text-gray-500 hover:text-rose-500 ml-2 shadow font-medium active:ring-1 active:ring-rose-300 active:translate-y-0.5 text-sm  ease-in-out';
  const buttonStyle =
    'px-2.5 py-2 xs:py-1.5 xs:px-4 text-white  bg-blue-600 hover:bg-blue-700   rounded-md shadow active:shadow-none active:translate-y-0.5 antialiased focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 font-semibold';
  const inputStyle =
    'px-2.5 py-2 xs:py-1.5 placeholder-gray-400 rounded-md shadow focus:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset hover:shadow-md caret-orange-500 caret focus:shadow-none border border-zinc-300';

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });
    console.log(filteredTodos);
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function generateId() {
    return Date.now();
  }

  const [activity, setActivity] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({ id: '', activity: '' });

  function saveTodoHandler(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
      },
    ]);
    setActivity('');
  }

  if (edit.id) {
    console.log('edit');
    return;
  }

  return (
    <LayoutToExperiments title='Todo List' domain='React'>
      <SubTitle>Stupid todo list. Only can edit but cannot edit or delete the todo list.</SubTitle>
      <form
        action=''
        onSubmit={saveTodoHandler}
        className='flex flex-col space-y-2 xs:flex-row xs:space-y-0 xs:space-x-2'
      >
        <input
          id='inputTodo'
          type='search'
          value={activity}
          className={inputStyle}
          placeholder='Todo name'
          onChange={e => {
            setActivity(e.target.value);
          }}
        />
        <button type='submit' className={buttonStyle}>
          {edit.id ? 'Save' : 'Add'}
        </button>
      </form>
      <ul className='mt-5 list-inside list-decimal space-y-2'>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.activity}</span>
            <button className={editButtonStyle} onClick={editTodoHandler.bind(this, todo.id)}>
              Edit
            </button>
            <button className={deleteButtonStyle} onClick={removeTodoHandler.bind(this, todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </LayoutToExperiments>
  );
}
