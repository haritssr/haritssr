import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExperimentsData } from '../../../data/ExperimentsData';
import { InternalLink, SubTitle } from '@/components/DesignSystem';

export default function BrowserAPIIndex() {
  // console.log(ExperimentsData[3].link);
  return (
    <LayoutToExperiments title='Browser API' domain='Browser API'>
      <SubTitle>My Browser API example</SubTitle>
      <div className='w-fit rounded-xl bg-gray-100 px-10 py-5'>
        <ol className='flex list-outside list-decimal flex-col space-y-2'>
          {ExperimentsData[3].links.map(({ name }) => (
            <li key={name} className='text-zinc-600'>
              <InternalLink
                href={`/experiments/browser-api/${name.toLowerCase().replace(/\s/g, '-')}`}
                name={name}
              />
            </li>
          ))}
        </ol>
      </div>
    </LayoutToExperiments>
  );
}
