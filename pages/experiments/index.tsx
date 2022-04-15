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
      <div className='mb-14 border border-zinc-200 p-2 sm:w-1/2'>
        {/* <div className='font-semibold  text-zinc-700 text-xl'>Introduction</div> */}
        <div className='text-zinc-500'>
          Below is all of my experiments with these technology stack, I made these to document what
          I&apos;ve made so that I don&apos;t forget, can be reused, and hopefully it can benefit
          others. The source code can be found{' '}
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
