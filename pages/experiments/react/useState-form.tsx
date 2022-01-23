import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { useState } from 'react';

const defaultFormData = {
  title: '',
  body: '',
};

export default function useStateForm() {
  const [formData, setFormData] = useState(defaultFormData);
  const { title, body } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log([e.target.id], e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(defaultFormData);
  };

  return (
    <LayoutSubWorkToTopic href='/work/react' hrefName='React' title='useState on Form'>
      <form onSubmit={onSubmit} className='flex flex-col space-y-5'>
        <div className='flex flex-col'>
          <label htmlFor='title'>Title</label>
          <input
            className='px-2 py-1.5 rounded max-w-sm'
            id='title'
            type='text'
            value={title}
            onChange={onChange}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='body'>Body</label>
          <input
            className='px-2 py-1.5 rounded max-w-sm'
            id='body'
            type='text'
            value={body}
            onChange={onChange}
          />
        </div>
        <button
          type='submit'
          className='px-3 py-1 text-white bg-blue-500 rounded sm:w-1/6 hover:bg-blue-600'
        >
          Reset data
        </button>
      </form>
    </LayoutSubWorkToTopic>
  );
}
