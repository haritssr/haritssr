import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExperimentsData } from '../../../data/ExperimentsData';
import { InternalLink, SubTitle } from '@/components/DesignSystem';

export default function BrowserAPIIndex() {
  // console.log(ExperimentsData[3].link);
  return (
    <LayoutToExperiments title='Browser API' domain='Browser'>
      <SubTitle>My Browser API example</SubTitle>
      <ol className='flex flex-col space-y-2'>
        {ExperimentsData[3].links.map(({ name }) => (
          <li key={name} className='text-zinc-600'>
            <InternalLink
              href={`/experiments/browser-api/${name.toLowerCase().replace(/\s/g, '-')}`}
              name={name}
            />
          </li>
        ))}
      </ol>
    </LayoutToExperiments>
  );
}
