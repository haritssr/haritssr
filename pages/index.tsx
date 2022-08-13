import Layout from '@/components/Layout';
import Image from 'next/image';
import ContactComponent from '@/components/ContactComponent';
import { ExternalLink } from '@/components/DesignSystem';
import {
  Backend,
  DataVisulization,
  Hosting,
  MainTools,
  CodeManagement,
  ComponentLibrary,
  ProgrammingLanguage,
  Styling,
  Animation,
  FrontendFramework,
  Documentation,
} from '../data/TechnologyData';
import { ContactData } from '../data/ContactData';
import ProjectsBox from '@/components/ProjectBox';
import { ProjectsData } from '../data/ProjectsData';
import { BooksData } from 'data/BooksData';
import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { TechStackComponent } from '@/components/TechStackComponents';
import ExperimentsIndexBox from '@/components/ExperimentsIndexBox';
import { ExperimentIndexData } from 'data/ExperimentsIndexData';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <div className='mt-5 space-y-28 sm:mt-10'>
        <Contacts />
        <Projects />
        <Experiments />
        <TechStack />
        <Blog />
        <FavoriteReading />
      </div>
    </Layout>
  );
}

const Wrapper = ({
  topic,
  subtitle,
  className,
  children,
  id,
}: {
  topic: string;
  subtitle: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div id={id}>
      <div className='mb-8'>
        <span className='text-2xl font-semibold text-zinc-800 sm:text-3xl'>{topic}. </span>
        <span className='text-2xl font-medium text-zinc-500 sm:text-3xl'>{subtitle}</span>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div
      id='Contacts'
      className='grid grid-cols-1 gap-10 rounded-lg border border-zinc-300 bg-gradient-to-t from-zinc-100 via-white to-white px-5 py-10 shadow sm:grid-cols-2 sm:gap-0 sm:bg-gradient-to-bl sm:via-zinc-50 sm:p-10'
    >
      <section className='mx-auto flex flex-col sm:mx-0 sm:mr-10  sm:px-0 sm:pl-4'>
        <article className=' mb-5 flex justify-center object-center sm:flex sm:h-auto sm:items-center sm:justify-start'>
          <Image
            src='/me.jpg'
            height='180'
            width='180'
            className='z-10 rounded-full'
            alt='Harits Syah'
            blurDataURL='/me.jpg'
            placeholder='blur'
          />
        </article>
        <article className='space-y-2 text-center sm:text-left'>
          <div className='text-2xl font-bold text-zinc-800'>Harits Syah</div>
          <div className='flex items-center space-x-1 text-lg text-zinc-500'>
            <div className='div'>South Tangerang City, Indonesia</div>{' '}
            <a
              href='https://goo.gl/maps/zNCvRABE5bfJHPcbA'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LocationMarkerIcon className='h-4 w-4 text-rose-500 hover:text-rose-600 hover:ring-1 hover:ring-rose-300 sm:h-5 sm:w-5' />
            </a>
          </div>
          <div className='text-lg text-zinc-500'>Web Frontend React Engineer</div>
          <div className='flex justify-center sm:justify-start'>
            <ExternalLink big={true} name='Haris Lab' href='https://www.harislab.com' />
          </div>
        </article>
      </section>
      <section className='px-5 sm:flex sm:justify-end sm:px-0'>
        <div className='grid  grid-cols-1 gap-4'>
          {ContactData.map(c => (
            <ContactComponent
              href={c.href}
              name={c.name}
              key={c.imgSrc}
              imgSrc={c.imgSrc}
              title={c.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const Projects = () => {
  return (
    <Wrapper
      id='Projects'
      topic='Projects'
      subtitle='Projects that already hosted.'
      className='grid grid-cols-1 gap-8 px-20 sm:grid-cols-3 sm:gap-5 sm:px-0 lg:grid-cols-4'
    >
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
        />
      ))}
    </Wrapper>
  );
};

const TechStack = () => {
  return (
    <Wrapper
      id='TechStack'
      topic='Tech Stack'
      subtitle='Frontend technology I have used.'
      className='grid grid-flow-row grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4'
    >
      <TechStackComponent data={Backend} title='Backend' />
      <TechStackComponent data={DataVisulization} title='Data Visualization' />
      <TechStackComponent data={Animation} title='Animation' />
      <TechStackComponent data={Hosting} title='Hosting' />
      <TechStackComponent data={ProgrammingLanguage} title='Programming Language' />
      <TechStackComponent data={FrontendFramework} title='Frontend Framework' />
      <TechStackComponent data={Documentation} title='Documentation' />
      <TechStackComponent data={Styling} title='Styling' />
      <TechStackComponent data={ComponentLibrary} title='Component Library' />
      <TechStackComponent data={CodeManagement} title='Code Management' />
      <TechStackComponent data={MainTools} title='Main Tools' />
    </Wrapper>
  );
};

const Experiments = () => {
  return (
    <Wrapper
      id='Experiments'
      topic='Experiments'
      subtitle='My exploration on these Tech Stack.'
      className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 '
    >
      {ExperimentIndexData.map(({ title, href, imgSrc, sum, type }) => (
        <ExperimentsIndexBox
          key={title}
          href={href}
          imgSrc={imgSrc}
          title={title}
          sum={sum}
          type={type}
        />
      ))}
    </Wrapper>
  );
};

const Blog = () => {
  return (
    <Wrapper id='Blog' topic='Blog' subtitle='A place to pour my thoughts.' className='space-y-4'>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
    </Wrapper>
  );
};
const FavoriteReading = () => {
  return (
    <Wrapper
      id='Reading'
      topic='Reading'
      subtitle='I reading and enjoy re-reading these.'
      className='grid w-fit grid-flow-row grid-cols-2 gap-5  sm:grid-cols-3 sm:gap-5 sm:gap-x-5 md:grid-cols-5'
    >
      {BooksData.map(({ title, href, imgSrc }) => (
        <div
          className='flex h-full flex-col rounded-md border border-zinc-300 bg-white bg-gradient-to-b from-zinc-50 to-white p-2 shadow hover:to-zinc-50 '
          key={title}
        >
          <a
            title={title}
            href={href}
            target='_blank'
            rel='noreferrer noopener'
            className='mb-1 inline-block h-full px-3 pt-3'
          >
            <Image src={imgSrc} alt={title} height={190} width={150} />
            <div className='pb-1 text-[12px] text-zinc-700 sm:text-sm'>{title}</div>
          </a>
        </div>
      ))}
    </Wrapper>
  );
};
