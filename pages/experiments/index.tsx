import LayoutGlobalNavigation from '@/components/LayoutGlobalNavigation';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../data/ExperimentsData';

export default function Experiments() {
  return (
    <LayoutGlobalNavigation
      browserTitle='Experiments'
      description='Experiments'
      domain='Experiments'
    >
      {/* Search */}
      <div className='mb-10 flex justify-start'>
        <div className='justfy-center flex w-full items-center sm:w-1/3'>
          <input
            type='search'
            placeholder='Search experiments..'
            className='w-full rounded-md border border-zinc-400 px-2.5 py-1.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
          />
        </div>
      </div>

      <section className='grid grid-cols-1 gap-14 xs:grid-cols-2 sm:grid-cols-3'>
        {ExperimentsData.map(({ id, title, links, description, logoSrc }) => (
          <ExperimentsBox
            key={id}
            title={title}
            links={links}
            description={description}
            logoSrc={logoSrc}
          />
        ))}
      </section>
    </LayoutGlobalNavigation>
  );
}
