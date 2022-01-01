import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Swr() {
  const { data, error } = useSWR('/api/hello', fetcher);
  if (error) return 'An error has occurred.';
  if (!data)
    return (
      <LayoutSubWorkToTopic title='Loading...' href='/work/others' hrefName='Others'>
        <div></div>
      </LayoutSubWorkToTopic>
    );
  return (
    <LayoutSubWorkToTopic title='SWR' href='/work/others' hrefName='Others'>
      <SubTitle>
        Using SWR to fetch data from{' '}
        <code className='font-mono px-2 py-1.5 text-sm font-medium text-orange-500 bg-gray-200 rounded-md'>
          /api/hello
        </code>{' '}
        and populate the data to{' '}
        <code className='font-mono px-2 py-1.5 text-sm font-medium bg-gray-200 rounded-md text-rose-500'>{`<NameCard/>`}</code>{' '}
        component
      </SubTitle>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {data.map(d => (
          <NameCard key={d.id} name={d.name} age={d.age} city={d.city} />
        ))}
      </div>
    </LayoutSubWorkToTopic>
  );
}

const NameCard = ({ name, age, city }) => {
  return (
    <div className='p-4 space-y-2 bg-white rounded-md shadow hover:shadow-md'>
      <div className='text-xl font-semibold text-gray-700'>{name}</div>
      <div className='text-gray-500'>{age}</div>
      <div className='text-blue-500'>{city}</div>
    </div>
  );
};
