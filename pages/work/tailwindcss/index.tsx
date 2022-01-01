import { InternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { tailwindcssData } from 'lib/work-data';

export default function Tailwindcss() {
  return (
    <LayoutSubWorkToTopic title='Tailwind CSS' href='/work' hrefName='My Work'>
      <SubTitle>My implementation of TailwindCSS</SubTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-flow-col md:grid-cols-4 sm:grid-rows-4'>
        {tailwindcssData.map(f => (
          <InternalLink key={f.name} name={f.name} href={f.href} />
        ))}
      </div>
    </LayoutSubWorkToTopic>
  );
}
