import Layout from '@/components/Layout';
import { SubTitle, Topic } from '@/components/DesignSystem';
import KotakWork from '@/components/KotakWork';
import { DataWork } from '../../lib/work-data';
import KotakWorkProjects from '@/components/KotakWorkProjects';

export default function Work() {
  return (
    <Layout browserTitle='My Work' description='My Work'>
      <h1 className='z-40 block w-full h-auto pt-16 pb-5 mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        My Work
      </h1>
      <SubTitle>
        <span className='block'>
          All my experiments on the web, past projects, designs and portfolios.
        </span>{' '}
        <span className='block'>All the projects have implemented typescript.</span>
      </SubTitle>
      <div className='mb-20'>
        <Topic name='Experiments' />
        <div className='mb-5 border-b border-gray-300' />
        <div className='grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 skew '>
          {DataWork[0].map(d => (
            <KotakWork key={d.title} href={d.href} description={d.description} title={d.title} />
          ))}
        </div>
      </div>
      <div>
        <Topic name='Projects' />
        <div className='mb-5 border-b border-gray-300' />
        <div className='grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 skew '>
          {DataWork[1].map(d => (
            <KotakWorkProjects
              key={d.title}
              href={d.href}
              description={d.description}
              title={d.title}
              period={d.period}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
