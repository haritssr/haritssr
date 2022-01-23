import { SubTitle } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import ProjectsBox from '@/components/ProjectBox';
import { ExperimentsData } from '../../lib/ExperimentsData';

export default function Experiments() {
  return (
    <Layout browserTitle='Experiments' description='Experiments'>
      <h2
        id='work'
        className='z-40 block w-full h-auto pt-16 pb-3 mx-auto text-3xl font-extrabold text-gray-800 sm:text-4xl '
      >
        Experiments
      </h2>
      <SubTitle>All Experiments</SubTitle>
      <section>
        <div className='grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 skew '>
          {ExperimentsData.map(d => (
            <ProjectsBox
              key={d.title}
              href={d.href}
              description={d.description}
              title={d.title}
              period={d.period}
              color={d.color}
              status={d.status}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
