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
      <div className='mb-5 mt-3 text-zinc-800'>
        These experiments are UI exploration for{' '}
        <ExternalLink href='https://www.harislab.com' name='Haris Lab' /> website. Every link
        include their own uniqe things.
        <ExternalLink
          href='https://github.com/haritssr/haritssr/tree/main/pages/experiments'
          name='See the full code'
        />
      </div>

      {/* Search */}
      <div className='mb-10 flex justify-start'>
        <div className='justfy-center flex w-full items-center sm:w-1/3'>
          <input type='search' placeholder='Search experiments' />
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
