import Layout from '@/components/Layout';
import ExperimentsBox from '@/components/ExperimentsBox';
import { SubTitle } from '@/components/DesignSystem';
import { ExperimentsLogo } from '@/components/Icons';
import { ExperimentsData } from '../../data/ExperimentsData';

export default function Experiments() {
  return (
    <Layout browserTitle='Experiments' description='Experiments'>
      <h2 id='work' className='z-40 flex h-auto items-center  space-x-4 pt-16 pb-3'>
        <div className='text-3xl font-extrabold text-gray-800 sm:text-4xl'>Experiments</div>
        <ExperimentsLogo />
      </h2>
      <SubTitle>All my experiments in the following domains</SubTitle>
      <section className='grid grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-3 sm:gap-10 '>
        {ExperimentsData.map(({ id, title, imgSrc, links }) => (
          <ExperimentsBox key={id} imgSrc={imgSrc} title={title} links={links} />
        ))}
      </section>
    </Layout>
  );
}
