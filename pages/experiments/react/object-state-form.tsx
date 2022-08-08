import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

export default function ObjectStateForm() {
  const [person, setPerson] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  function handleChange(e: { target: { name: string; value: string } }) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  }

  const inputStyle =
    'focus:outline-none focus:ring-2 border border-zinc-400 focus:border-blue-500 focus:ring-blue-200 px-2 py-0.5 rounded text-base';
  const labelStyle = 'flex flex-col space-y-0.5 w-full sm:w-fit text-sm';
  return (
    <LayoutToExperiments domain='React' title='Object state Form'>
      <SubTitle>
        By{' '}
        <ExternalLink
          href='https://beta.reactjs.org/learn/updating-objects-in-state'
          name='Updating objects in state'
        />
      </SubTitle>
      <form className='mb-5 flex flex-col space-y-3'>
        <label className={labelStyle}>
          First Name
          <input
            type='text'
            value={person.firstName}
            onChange={handleChange}
            className={inputStyle}
            placeholder='First Name'
          />
        </label>
        <label className={labelStyle}>
          Last Name
          <input
            type='text'
            value={person.lastName}
            onChange={handleChange}
            className={inputStyle}
            placeholder='Last Name'
          />
        </label>
        <label className={labelStyle}>
          Email
          <input
            type='email'
            value={person.email}
            onChange={handleChange}
            className={inputStyle}
            placeholder='Email'
          />
        </label>
      </form>
      <p className='flex flex-col'>
        <div>
          Full Name : {person.firstName} {person.lastName}
        </div>
        <div>Email : {person.email}</div>
      </p>
    </LayoutToExperiments>
  );
}
