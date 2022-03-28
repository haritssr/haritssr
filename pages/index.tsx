import Layout from '@/components/Layout';
import Image from 'next/image';
import TechStack from '@/components/TechStack';
import { BigInternalLink, Topic } from '@/components/DesignSystem';
import { TechStackData } from '../data/TechStackData';

import { ContactData } from '../data/ContactData';
import ProjectsBox from '@/components/ProjectBox';
import { ProjectsData } from '../data/ProjectsData';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <section className='mx-auto mt-10 mb-24 flex flex-col justify-center gap-y-10 rounded-xl sm:mt-20 md:flex-row-reverse md:justify-between md:gap-y-0 md:gap-x-10  xl:px-0'>
        <article className='sm:jusitfy-center flex justify-center object-center sm:flex sm:h-auto sm:items-center'>
          <Image
            src='/me.jpg'
            height='200'
            width='200'
            className='rounded-full'
            alt='Harits Syah'
            blurDataURL='/me.jpg'
            placeholder='blur'
          />
        </article>
        <article className='space-y-3 text-center sm:my-auto md:text-left'>
          <div className='text-3xl font-bold text-zinc-700 sm:text-5xl'>Harits Syah</div>
          <div className='text-xl font-medium text-zinc-600 sm:text-2xl'>
            Frontend Engineer & Web Designer
          </div>
          <div className='text-xl text-zinc-500'>
            Creator of {``}
            <a
              href='www.harislab.com'
              target='_blank'
              rel='noopener norefferer'
              className='hover:text-white-500 hover:underline'
            >
              Haris Lab
            </a>{' '}
            &{' '}
            <a
              href='www.harislab.com'
              target='_blank'
              rel='noopener norefferer'
              className='hover:text-white-500 hover:underline'
            >
              Haris Studio
            </a>
          </div>

          <div className='flex w-full flex-col items-center justify-center space-y-4 sm:flex-row  sm:justify-start sm:space-y-0 sm:space-x-5'>
            <BigInternalLink href='/experiments' name='Experiments' />
            <BigInternalLink href='/blog' name='Blog' />
          </div>
        </article>
      </section>

      <section className='my-28'>
        <Topic name='Projects' />
        <div className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4'>
          {ProjectsData.map(d => (
            <ProjectsBox
              key={d.title}
              href={d.href}
              description={d.description}
              title={d.title}
              period={d.period}
              status={d.status}
              imgSrc={d.imgSrc}
              industry={d.industry}
              hrefCaseStudy={d.hrefCaseStudy}
            />
          ))}
        </div>
      </section>

      <section className='mb-28'>
        <Topic name='Tech Stack' />
        <div className='mt-3 grid grid-flow-row grid-cols-1 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-4'>
          {TechStackData.map(c => (
            <TechStack href={c.href} name={c.name} key={c.name} imgSrc={c.imgSrc} />
          ))}
        </div>
      </section>

      <section>
        <Topic name='Contacts' />
        <div className='mt-3 grid grid-flow-row grid-cols-1 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-4'>
          {ContactData.map(c => (
            <TechStack href={c.href} name={c.name} key={c.imgSrc} imgSrc={c.imgSrc} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
