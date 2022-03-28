import LayoutToExperiments from '@/components/LayoutToExperiments';
import useSWR from 'swr';

export default function WithAndWithoutSWR() {
  const fetcher = url => fetch(url).then(res => res.json());
  const { data, error } = useSWR('/api/ngetest', fetcher);
  if (error)
    return (
      <LayoutToExperiments title='With SWR' domain='Next.js'>
        <div>Error</div>
      </LayoutToExperiments>
    );

  if (!data)
    return (
      <LayoutToExperiments title='With SWR' domain='Next.js'>
        <div>No data</div>
      </LayoutToExperiments>
    );

  return (
    <LayoutToExperiments title='With SWR' domain='Next.js'>
      <div>{data.name}</div>
    </LayoutToExperiments>
  );
}
