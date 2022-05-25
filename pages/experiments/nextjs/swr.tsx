import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Key } from 'react';
import useSWR from 'swr';

const fetcher = (url: RequestInfo) => fetch(url).then(res => res.json());

export default function SWR() {
  const { data, error } = useSWR('/api/hello', fetcher);
  
  if (error) return 'An error has occurred.';

  if (!data)
    return (
      <LayoutToExperiments title='Loading...' domain='Next.js'>
        <div>No Data</div>
      </LayoutToExperiments>
    );

  return (
    <LayoutToExperiments title='SWR' domain='Next.js'>
      <SubTitle>
        Using SWR to fetch data from{' '}
        <code className='rounded-md border border-green-200 bg-green-50 px-2 py-1 font-mono text-sm font-semibold text-green-500'>
          /api/hello
        </code>{' '}
        and populate the data to{' '}
        <code className='rounded-md border border-rose-200 bg-rose-50 px-2 py-1 font-mono text-sm font-semibold text-rose-500'>{`<NameCard/>`}</code>{' '}
        component
      </SubTitle>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {data.map((d: { id: Key; name: string; age: number; city: string; }) => (
          <NameCard key={d.id} name={d.name} age={d.age} city={d.city} />
        ))}
      </div>
    </LayoutToExperiments>
  );
}

const NameCard = ({ name, age, city }) => {
  return (
    <div className='space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4'>
      <div className='text-xl font-semibold text-gray-700'>{name}</div>
      <div className='text-gray-500'>{age}</div>
      <div className='text-blue-500'>{city}</div>
    </div>
  );
};
