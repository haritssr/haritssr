import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

type Base = {
  id: string;
  title: string;
};

type GenericTypeSelect<TValue> = {
  values: TValue[];
  onChange: (value: TValue) => void;
  selectType: string;
};

function GenericSelect<TValue extends Base>({
  values,
  onChange,
  selectType,
}: GenericTypeSelect<TValue>) {
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = values.find(value => value.id === event.target.value);
    if (val) onChange(val);
  };

  return (
    <div>
      <div className='text-sm'>{selectType}</div>
      <select className='rounded border border-zinc-400' onChange={onSelectChange}>
        {values.map(value => (
          <option key={value.id} value={value.id}>
            {value.title}
          </option>
        ))}
      </select>
    </div>
  );
}

type Subject = {
  id: string;
  title: string;
  author: string;
};

type Teacher = {
  id: string;
  title: string;
  region: string;
};

const subjects: Subject[] = [
  { id: '1', title: 'Matematika', author: 'Haris Lab' },
  { id: '2', title: 'Fisika', author: 'Haris Lab' },
];

const teachers: Teacher[] = [
  { id: '1', title: 'Harits Syah', region: 'Tangerang Selatan' },
  { id: '2', title: 'Aura Salvia', region: 'Jakarta Barat' },
];

export default function GenericTypeScript() {
  const [subject, setSubject] = useState<Subject>(subjects[0]);
  const [teacher, setTeacher] = useState<Teacher>(teachers[0]);

  return (
    <LayoutToExperiments title='Generic TypeScript on <select>' domain='React'>
      <SubTitle>
        Inspired by{' '}
        <ExternalLink
          href='https://www.developerway.com/posts/typescript-generics-for-react-developers'
          name='Nadia Makarevich'
        />
      </SubTitle>
      <div>
        <div className='my-5 space-y-1'>
          <div>Pelajaran yang dipilih : {subject.title}</div>
          <div>Guru yang dipilih : {teacher.title}</div>
          <div>Domisili guru : {teacher.region}</div>
        </div>

        <div className='flex space-x-5'>
          <GenericSelect<Subject>
            selectType='Pilih pelajaran'
            onChange={value => setSubject(value)}
            values={subjects}
          />
          <GenericSelect<Teacher>
            selectType='Pilih guru'
            onChange={value => setTeacher(value)}
            values={teachers}
          />
        </div>
      </div>
    </LayoutToExperiments>
  );
}
