import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useReducer, useState } from 'react';

let nextId = 3;
const initialTask = [
  { id: 0, text: 'mandi', done: false },
  { id: 1, text: 'makan', done: false },
  { id: 2, text: 'tidur', done: false },
];

//NOTES
/* 
  - Jika id dimulai dari 1 maka akan error, karena ada 2 key yang sama yaitu key 3
*/

// MASALAH
/*
  - GIMANA CARANYA SUPAYA TASK YANG DITAMBAHKAN TIDAK BISA EMPTY STRING??
  - Ketika tombol edit ditekan, checklist otomatis true, padahal bukan itu maunya
  - Ketika tombol edit ditekan, checklist otomasis true, tapi sebenarnya checklist false, dan ketika checklist itu diklik maka checklist keliatannya false, tapi setelah menekan tombol save checklist sebenarnya true
  - Ketikda klik dua kali secara cepat pada sebuah kata, malah men-select kata nya, dan tiga kali secara cepat malah menyelek kalimat, padahal mengklik pada kata di task berguna untuk menchecklist (karena pakai <label/>)
*/

export default function UseReducerTodoList() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTask);
  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }
  return (
    <LayoutToExperiments domain='React' title='useReducer Todo List'>
      <SubTitle>
        Todo list with useReducer by{' '}
        <ExternalLink
          href='https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer'
          name='beta.reactjs.org'
        />
      </SubTitle>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
      <button onClick={() => console.log(tasks)}>Console Tasks</button>
    </LayoutToExperiments>
  );
}

interface taskType {
  id: number;
  text: string;
  done: boolean;
}

function tasksReducer(tasks: taskType[], action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t: taskType) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action:' + action.type);
    }
  }
}

function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        type='text'
        placeholder='Add Task'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
}

// a list of task
function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <IndividualTask task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

//every task
function IndividualTask({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  // after checkbox
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          type='text'
          value={task.text}
          onChange={e => onChange({ ...task, text: e.target.value })}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        <div className='flex items-center space-x-2'>
          <div className={`${task.done ? 'text-red-500 line-through' : 'text-blue-500'}  `}>
            {task.text}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </>
    );
  }
  return (
    <label className='flex items-center space-x-2'>
      <input
        type='checkbox'
        checked={task.done}
        onChange={e => {
          onChange({ ...task, done: e.target.checked });
        }}
      />
      <div className='flex items-center space-x-2'>
        <div className='inline-block'>{taskContent}</div>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </label>
  );
}
