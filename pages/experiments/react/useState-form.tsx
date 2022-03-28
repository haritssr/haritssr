import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

const defaultFormData = {
  title: '',
  body: '',
};
//here we make the default state is equal to the name of the id attribute of the input form, so we can access the id of the input form to setState the default data, whatever

export default function useStateForm() {
  const [formData, setFormData] = useState(defaultFormData);
  const { title, body } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(e.target.id);
    //e.target.id is an input's id attribute, which is string 'title' or string body
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(defaultFormData);
  };

  return (
    <LayoutToExperiments domain='React' title='useState on Form'>
      <SubTitle>
        Simple but not useful useState form. Open your console to see what is going on
      </SubTitle>
      <form onSubmit={onSubmit} className='flex flex-col space-y-5'>
        <div className='flex flex-col'>
          <label htmlFor='title'>Title</label>
          <input
            className='max-w-sm rounded border border-zinc-300 px-2 py-1.5'
            id='title'
            type='text'
            value={title}
            onChange={onChange}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='body'>Body</label>
          <input
            className='max-w-sm rounded border border-zinc-300 px-2 py-1.5'
            id='body'
            type='text'
            value={body}
            onChange={onChange}
          />
        </div>
        <button
          type='submit'
          className='rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 sm:w-1/6'
        >
          Reset data
        </button>
      </form>
    </LayoutToExperiments>
  );
}
