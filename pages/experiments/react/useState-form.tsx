import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useEffect, useState } from 'react';

export default function useStateForm() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    //[e.target.id] is an input's id attribute, 'title' or 'body'
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('This is the form data: ', formData);
    setFormData({
      title: '',
      body: '',
    });
  };

  return (
    <LayoutToExperiments domain='React' title='useState on Form'>
      <SubTitle>
        Simple but not useful useState form. Open your console to see what is going on
      </SubTitle>
      <form onSubmit={onSubmit} className='flex flex-col'>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='title'>Title</label>
          <input
            className='sm:w-1/3'
            id='title'
            type='text'
            value={formData.title}
            onChange={onChange}
          />
        </div>
        <div className='mb-8 flex flex-col'>
          <label htmlFor='body'>Body</label>
          <input
            className='sm:w-1/3'
            id='body'
            type='text'
            value={formData.body}
            onChange={onChange}
          />
        </div>
        <button type='submit' className={` sm:w-1/3`}>
          Submit
        </button>
      </form>
    </LayoutToExperiments>
  );
}
