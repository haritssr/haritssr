import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

export default function EditProfile() {
  const [firstName, setFirstName] = useState('Harits');
  const [lastName, setLastName] = useState('Syah');
  const [isEditing, setIsEditing] = useState(false);
  return (
    <LayoutToExperiments domain='React' title='Edit Profile'>
      <SubTitle>
        From{' '}
        <ExternalLink
          href='https://beta.reactjs.org/learn/reacting-to-input-with-state#challenges'
          name='beta.reactjs.org'
        />{' '}
        <br />
        <ExplanationList>
          <li>Try to edit the profile and save to see the result of change.</li>
        </ExplanationList>
      </SubTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          setIsEditing(!isEditing);
        }}
      >
        <div className='flex w-fit flex-col space-y-2'>
          <label className='flex items-center space-x-2 '>
            <div>FirstName :</div>
            {isEditing ? (
              <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
            ) : (
              <b>{firstName}</b>
            )}
          </label>
          <label className='flex items-center space-x-2 '>
            <div className=''>LastName :</div>
            {isEditing ? (
              <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
            ) : (
              <b>{lastName}</b>
            )}
          </label>
          <button className='w-fit' type='submit'>
            {isEditing ? 'Save' : 'Edit'} Profile
          </button>
        </div>
        <div className='mt-5 italic'>
          Hello, {firstName} {lastName}
        </div>
      </form>
    </LayoutToExperiments>
  );
}
