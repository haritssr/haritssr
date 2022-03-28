import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

const defaultFormData = {
  title: '',
  body: '',
};
const inputStyle =
  'focus:outline-none focus:border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md px-2 py-0.5 border border-zinc-400';
const wrapperStyle = 'flex flex-col';
const buttonStyle = 'rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600';

export default function TypeScriptForm() {
  const [formData, setFormData] = useState(defaultFormData);
  const { title, body } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      // e.target.id is id='title' and id='body' on input elements
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(defaultFormData);
  };

  return (
    <LayoutToExperiments title='TypeScript Form' domain='React'>
      <SubTitle>TypeScript React form</SubTitle>
      <form onSubmit={onSubmit} className='mx-auto max-w-sm space-y-5'>
        <div className={wrapperStyle}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={e => onChange(e)}
            className={inputStyle}
          />
        </div>
        <div className={wrapperStyle}>
          <label htmlFor='body'>Body</label>
          <input
            type='text'
            id='body'
            value={body}
            onChange={e => onChange(e)}
            className={inputStyle}
          />
        </div>
        <button type='submit' className={buttonStyle}>
          Post
        </button>
      </form>
    </LayoutToExperiments>
  );
}
