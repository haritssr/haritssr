import LayoutGlobalNavigation from '@/components/LayoutGlobalNavigation';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../data/ExperimentsData';
import { ExternalLink } from '@/components/DesignSystem';

export default function Experiments() {
  return (
    <LayoutGlobalNavigation
      browserTitle='Experiments'
      description='Experiments'
      domain='Experiments'
    >
      {/* Search */}
      <div className='mb-5 flex justify-start'>
        <div className='justfy-center flex w-full items-center sm:w-1/3'>
          <input
            type='search'
            placeholder='Search experiments..'
            className='w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md px-2.5 py-1.5 border border-zinc-400'
          />
        </div>
      </div>

      {/* Notes */}
      <div className='mb-14 rounded border border-zinc-300 p-2'>
        <div className='text-sm font-bold'>NOTE</div>
        <div className='text-zinc-600'>
          Below is all of my experiments with these technology stack, I made these to document what
          I&apos;ve made so that I don&apos;t forget, can be reused, and hopefully it can benefit
          others. Grouped by tech stack. The source code can be found{' '}
          <ExternalLink href='https://github.com/haritssr/haritssr' name='here' />
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
